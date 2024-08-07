import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { AsyncStorageKeys, ReactQueryKeys, SonarSearchResult, User } from "../types/types";
import { createSentrySpan } from "../sentry/spans";
import useCurrentUser from "./current-user";
import useFavouriteArtists from "./favourite-artists";
import useFavouriteGenres from "./favourite-genres";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateRandomId } from "../utils/functions";

const useSonar = () => {
    const queryClient = useQueryClient();
    const { userProfile } = useCurrentUser();
    const { favouriteArtists } = useFavouriteArtists();
    const { favouriteGenres } = useFavouriteGenres();

    const { isLoading, data: searchResults } = useQuery({
        queryKey: [AsyncStorageKeys.SEARCH_RESULTS],
        queryFn: async () => {
            const res = await AsyncStorage.getItem(AsyncStorageKeys.SEARCH_RESULTS)
            const searchResults = JSON.parse(res) || [];
            return searchResults as SonarSearchResult[]
        }
    })

    const { data: lastMessageId } = useQuery({
        queryKey: [AsyncStorageKeys.LAST_MESSAGE],
        queryFn: async () => {
            const res = await AsyncStorage.getItem(AsyncStorageKeys.LAST_MESSAGE)
            return res
        }
    })

    const { mutateAsync: saveLastMessageId } = useMutation({
        mutationFn: async (messageId: string) => {
            await AsyncStorage.setItem(AsyncStorageKeys.LAST_MESSAGE, messageId)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [AsyncStorageKeys.LAST_MESSAGE],
            })
        }
    })


    const { isPending, mutateAsync: search } = useMutation({
        mutationKey: ['sonar'],
        mutationFn: async (query: string) => {
            const res = await createSentrySpan("sonar", async () => {
                const response = await SonderApi.post(`/search`, {
                    user: {
                        artists: favouriteArtists.map((artist) =>  artist.name),
                        likes: favouriteGenres,
                        username: userProfile?.spotify_username,
                        profile_image: userProfile?.profile_image,
                        name: userProfile?.name,
                        bio: userProfile?.bio,
                        id: userProfile?.id
                    }
                }, {
                    params: { query }
                });
                const results = response.data.data as { summary: string, users: User[] }
                const messageId = generateRandomId(5);
                const newSearchResults: SonarSearchResult = { ...results, id: messageId, question: query };
                await AsyncStorage.setItem(AsyncStorageKeys.SEARCH_RESULTS, JSON.stringify([...searchResults, newSearchResults]))
                return searchResults
            }) as { summary: string, users: User[] }

            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [AsyncStorageKeys.SEARCH_RESULTS],
            })
        }
        
    })


    return { 
        isLoading: isLoading, 
        searchResults,
        searchPending: isPending,
        search,
        lastMessageId,
        saveLastMessageId 
    }
}

export default useSonar