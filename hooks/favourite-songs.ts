import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteTrack } from "../types/types";

const useFavouriteSongs = () => {
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

    return {
        isLoading,
        favouriteSongs
    }
}

export default useFavouriteSongs;