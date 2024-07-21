import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteArtist, FavouriteTrack, ReactQueryKeys } from "../types/types";
import { createSentrySpan } from "../sentry/spans";

const useFavouriteArtists = (userId?: string) => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();

    const { isLoading, data: favouriteArtists } = useQuery({
        queryKey: [ReactQueryKeys.FAVOURITE_ARTISTS],
        queryFn: async () => {
            const res = await createSentrySpan("artists", async () => {
                const response = await SonderApi.post('/users/me/top/artists', { user_id: userProfile?.id }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                return response.data.data as FavouriteArtist[]
            }) as FavouriteArtist[]
            return res
        },
        enabled: !!accessToken && !!userProfile?.id
    })

    const { isLoading: favouriteArtistsLoading, data: userFavouriteArtists } = useQuery({
        queryKey: [ReactQueryKeys.FAVOURITE_ARTISTS, userId],
        queryFn: async () => {
            const res = await createSentrySpan("artists/:id", async () => {
                const response = await SonderApi.get(`/users/${userId}/top/artists`)
                return response.data.data as FavouriteArtist[]
            }) as FavouriteArtist[]

            return res
        },
        enabled: !!userId
    })


    return {
        isLoading,
        favouriteArtists,

        favouriteArtistsLoading,
        userFavouriteArtists
    }
}

export default useFavouriteArtists;