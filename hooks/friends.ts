import { useMutation, useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import { ReactQueryKeys } from "../types/types"
import useCurrentUser from "./current-user"

const useFriends = () => {
    const { userProfile } = useCurrentUser();

    const { isLoading, data } = useQuery({
        queryKey:[ReactQueryKeys.FRIEND_REQUESTS],
        queryFn: async () => {
            const response = await SonderApi.get('/friends/add', {
                params: {
                    user_id: userProfile?.id,
                }
            })    
            return response.data.data        
        },
        enabled: !!userProfile
    })
    
    
    const addFriendMutation = useMutation({
        mutationFn: async ({ friend_id }: { friend_id: string })  => {
            const response = await SonderApi.post('/friends/add', {
                user_id: userProfile?.id,
                friend_id
            })            

            return response.data.data
        }
    })

    const acceptFriendRequestMutation = useMutation({
        mutationFn: async ({ friend_id }: { friend_id: string })  => {
            const response = await SonderApi.put('/friends/accept', {
                user_id: userProfile?.id,
                friend_id
            })            

            return response.data.data
        }
    })

    const rejectFriendRequestMutation = useMutation({
        mutationFn: async ({ friend_id }: { friend_id: string })  => {
            const response = await SonderApi.put('/friends/reject', {
                user_id: userProfile?.id,
                friend_id
            })            

            return response.data.data
        }
    })

    const blockFriendMutation = useMutation({
        mutationFn: async ({ friend_id }: { friend_id: string })  => {
            const response = await SonderApi.put('/friends/block', {
                user_id: userProfile?.id,
                friend_id
            })            

            return response.data.data
        }
    })

    return {
        addFriendMutation,
        blockFriendMutation,
        rejectFriendRequestMutation,
        acceptFriendRequestMutation,
        friendRequests: { isLoading, data }
    }



}

export default useFriends;