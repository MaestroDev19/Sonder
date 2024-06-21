import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { User } from "../types/types";

const useCurrentUser = () => {
    const { accessToken } = useAccessToken();
    const queryClient = useQueryClient();

    const { isLoading, data: userProfile } = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            const response = await SonderApi.get('/me', {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            return response.data.data as User
        },
        enabled: !!accessToken,
    })

    const refreshUser = () => {
        queryClient.invalidateQueries({
            queryKey: ['current-user'],
        })
    }



    return { isLoading, userProfile, refreshUser }
}

export default useCurrentUser