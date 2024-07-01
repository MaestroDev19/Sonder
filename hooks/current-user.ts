import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { User } from "../types/types";

const useCurrentUser = () => {
    const { accessToken, removeTokens } = useAccessToken();
    const queryClient = useQueryClient();

    const { isLoading, data: userProfile } = useQuery({
        queryKey: ['current-user'],
        queryFn: async () => {
            const response = await SonderApi.get('/users/me', {
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

    const logoutUser = () => {
        queryClient.removeQueries({
            queryKey: ['current-user'],
        })
        return removeTokens()
    }



    return { isLoading, userProfile, refreshUser, logoutUser }
}

export default useCurrentUser