import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { ReactQueryKeys, User } from "../types/types";
import { createSentrySpan } from "../sentry/spans";

const useCurrentUser = () => {
    const { accessToken, removeTokens } = useAccessToken();
    const queryClient = useQueryClient();

    const { isLoading, data: userProfile } = useQuery({
        queryKey: [ReactQueryKeys.CURRENT_USER],
        queryFn: async () => {
            const res = await createSentrySpan("current-user", async () => {
                const response = await SonderApi.get('/users/me', {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                return response.data.data as User
            })

            return res as User
        },
        enabled: !!accessToken,
    })


    const refreshUser = () => {
        queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.CURRENT_USER],
        })
    }

    const logoutUser = () => {
        queryClient.removeQueries({
            queryKey: [ReactQueryKeys.CURRENT_USER],
        })
        return removeTokens()
    }



    return { isLoading, userProfile, refreshUser, logoutUser }
}

export default useCurrentUser