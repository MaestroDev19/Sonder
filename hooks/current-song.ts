import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { CurrentTrack, User } from "../types/types";

const useCurrentTrack = () => {
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    const { isLoading, data: currentTrack } = useQuery({
        queryKey: ['current-track'],
        queryFn: async () => {
            const response = await SonderApi.get('/users/me/playing?country=NG', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            return response.data.data as CurrentTrack
        },
        enabled: !!accessToken,
    })

    const refreshTrack = () => {
        queryClient.invalidateQueries({
            queryKey: ['current-track'],
        })
    }



    return { isLoading, currentTrack, refreshTrack }
}

export default useCurrentTrack