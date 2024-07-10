import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import SonderApi from "../api"
import { FriendRequest, ReactQueryKeys } from "../types/types"
import useCurrentUser from "./current-user"

const useFriends = (currentFriendId?: string) => {
    const { userProfile } = useCurrentUser();
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery({
        queryKey:[ReactQueryKeys.FRIEND_REQUESTS],
        queryFn: async () => {
            const response = await SonderApi.get('/friends/requests', {
                params: {
                    user_id: userProfile?.id,
                }
            })    
            return response.data.data as FriendRequest[]    
        },
        enabled: !!userProfile
    })

    const { isLoading: isFriendLoading, data: isFriend } = useQuery({
        queryKey:[ReactQueryKeys.FRIEND_CHECK, currentFriendId!],
        queryFn: async () => {
            const response = await SonderApi.get('/friends/check', {
                params: {
                    user_id: userProfile?.id,
                    friend_id: currentFriendId!
                }
            })    
            return response.data.data.is_friend as boolean    
        },
        enabled: !!userProfile && !!currentFriendId
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
        mutationFn: async ({ user_id }: { user_id: string })  => {
            const response = await SonderApi.put('/friends/accept', {
                friend_id: userProfile?.id,
                user_id
            })            

            return response.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[ReactQueryKeys.FRIEND_REQUESTS],
            })
        }
    })

    const rejectFriendRequestMutation = useMutation({
        mutationFn: async ({ user_id }: { user_id: string })  => {
            const response = await SonderApi.put('/friends/reject', {
                friend_id: userProfile?.id,
                user_id
            })            

            return response.data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:[ReactQueryKeys.FRIEND_REQUESTS],
            })
        }
    })

    const blockFriendMutation = useMutation({
        mutationFn: async ({ user_id }: { user_id: string })  => {
            const response = await SonderApi.put('/friends/block', {
                friend_id: userProfile?.id,
                user_id
            })            

            return response.data.data
        }
    })

    return {
        addFriendMutation,
        blockFriendMutation,
        rejectFriendRequestMutation,
        acceptFriendRequestMutation,
        friendRequests: { isLoading, data },
        isFriend,
        isFriendLoading
    }



}

export default useFriends;