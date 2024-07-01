import { useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import useAccessToken from "./access-token"
import { User } from "../types/types";

const useUserProfile = (id: string) => {
    const queryClient = useQueryClient();

    const { isLoading, data: userProfile } = useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await SonderApi.get(`/users/${id}`);
            return response.data.data as User
        }
    })


    const refreshUser = () => {
        queryClient.invalidateQueries({
            queryKey: ['user', id],
        })
    }


    return { isLoading, userProfile, refreshUser }
}

export default useUserProfile