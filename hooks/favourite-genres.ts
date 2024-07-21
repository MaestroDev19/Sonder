import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteArtist, FavouriteTrack, ReactQueryKeys } from "../types/types";
import { createSentrySpan } from "../sentry/spans";

const useFavouriteGenres = (userId?: string) => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();

    const { isLoading, data: favouriteGenres } = useQuery({
        queryKey: [ReactQueryKeys.FAVOURITE_GENRES],
        queryFn: async () => {
            const res = await createSentrySpan("genres", async () => {
                const response = await SonderApi.post('/users/me/top/genres', { user_id: userProfile?.id }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                })
                return response.data.data as string[]
            }) as string[]

            return res
        },
        enabled: !!accessToken && !!userProfile?.id
    })

    const { isLoading: favouriteGenresLoading, data: userFavouriteGenres } = useQuery({
        queryKey: [ReactQueryKeys.FAVOURITE_GENRES, userId],
        queryFn: async () => {
            const res = await createSentrySpan("genres/:id", async () => {
                const response = await SonderApi.get(`/users/${userId}/top/genres`)
                return response.data.data as string[]
            }) as string[]

            return res
        },
        enabled: !!userId
    })


    return {
        isLoading,
        favouriteGenres,

        favouriteGenresLoading,
        userFavouriteGenres
    }
}

export default useFavouriteGenres;