import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { ReactQueryKeys, User } from "../types/types";
import { createSentrySpan } from "../sentry/spans";

const useUserProfile = (id: string) => {
    const queryClient = useQueryClient();

    const { isLoading, data: userProfile } = useQuery({
        queryKey: [ReactQueryKeys.USER, id],
        queryFn: async () => {
            const res = await createSentrySpan("user/:id", async () => {
                const response = await SonderApi.get(`/users/${id}`);
                return response.data.data as User
            }) as User

            return res
        }
    })


    const refreshUser = () => {
        queryClient.invalidateQueries({
            queryKey: [ReactQueryKeys.USER, id],
        })
    }


    return { isLoading, userProfile, refreshUser }
}

export default useUserProfile