import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteArtist, FavouriteTrack } from "../types/types";

const useFavouriteGenres = (userId?: string) => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();

    const { isLoading, data: favouriteGenres } = useQuery({
        queryKey: ['favourite-genres'],
        queryFn: async () => {
            const response = await SonderApi.post('/users/me/top/genres', { user_id: userProfile?.id }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data.data as string[]
        },
        enabled: !!accessToken && !!userProfile?.id
    })

    const { isLoading: favouriteGenresLoading, data: userFavouriteGenres } = useQuery({
        queryKey: ['favourite-genres', userId],
        queryFn: async () => {
            const response = await SonderApi.get(`/users/${userId}/top/genres`)
            return response.data.data as string[]
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