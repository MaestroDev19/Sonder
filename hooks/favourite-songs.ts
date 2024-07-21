import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteTrack, ReactQueryKeys } from "../types/types";
import { createSentrySpan } from "../sentry/spans";

const useFavouriteSongs = (userId?: string) => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();

    const { isLoading, data: favouriteSongs } = useQuery({
        queryKey: [ReactQueryKeys.FAVOURITE_TRACKS],
        queryFn: async () => {
            const res = await createSentrySpan("tracks", async () => {
                const response = await SonderApi.post('/users/me/top/tracks', { user_id: userProfile?.id }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                return response.data.data as FavouriteTrack[]
            }) as FavouriteTrack[]

            return res
        },
    })

    const { isLoading: favouriteSongsLoading, data: userFavouriteSongs } = useQuery({
        queryKey: [ReactQueryKeys.FAVOURITE_TRACKS, userId],
        queryFn: async () => {
            const res = await createSentrySpan("tracks/:id", async () => {
                const response = await SonderApi.get(`/users/${userId}/top/tracks`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                return response.data.data as FavouriteTrack[]
            }) as FavouriteTrack[]

            return res
        },
        enabled: !!userId
    })

    

    return {
        isLoading,
        favouriteSongs,

        favouriteSongsLoading,
        userFavouriteSongs
    }
}

export default useFavouriteSongs;