import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteTrack } from "../types/types";

const useFavouriteSongs = (userId?: string) => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();

    const { isLoading, data: favouriteSongs } = useQuery({
        queryKey: ['favourite-songs'],
        queryFn: async () => {
            const response = await SonderApi.post('/users/me/top/tracks', { user_id: userProfile?.id }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data.data as FavouriteTrack[]
        },
    })

    const { isLoading: favouriteSongsLoading, data: userFavouriteSongs } = useQuery({
        queryKey: ['favourite-songs', userId],
        queryFn: async () => {
            const response = await SonderApi.get(`/users/${userId}/top/tracks`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.data.data as FavouriteTrack[]
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