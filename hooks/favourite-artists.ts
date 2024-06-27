import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import useCurrentUser from "./current-user";
import { FavouriteArtist, FavouriteTrack } from "../types/types";

const useFavouriteArtists = () => {
    const { accessToken } = useAccessToken();
    const { userProfile } = useCurrentUser();

    console.log(accessToken)
    const { isLoading, data: favouriteArtists } = useQuery({
        queryKey: ['favourite-artists'],
        queryFn: async () => {
            const response = await SonderApi.post('/users/me/top/artists', { user_id: userProfile?.id }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            return response.data.data as FavouriteArtist[]
        },
    })

    return {
        isLoading,
        favouriteArtists
    }
}

export default useFavouriteArtists;