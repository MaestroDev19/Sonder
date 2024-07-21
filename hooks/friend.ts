import { useQuery } from "@tanstack/react-query"
import SonderApi from "../api"
import { createSentrySpan } from "../sentry/spans"
import { Friend, ReactQueryKeys, User } from "../types/types"
import { useFriendsList } from "./friends-list"

const useFriend = (userId: string) => {
    const { data: friends } = useFriendsList()
    const friend = friends?.find((friend) => friend.id === userId)
    
    const { data: userProfile } = useQuery({
        queryKey: [ReactQueryKeys.USER, userId],
        queryFn: async () => {
            const res = await createSentrySpan("user/:id", async () => {
                const response = await SonderApi.get(`/users/${userId}`);
                const user = response.data.data as User

                const friend: Friend = {
                    id: user.id,
                    username: user.spotify_username,
                    profile_image: user.profile_image,
                    name: user.name,
                    bio: user.bio
                }

                return friend
            }) as Friend

            return res
        },
        enabled: userId && !friend
    })

    if (!friend) return userProfile

    return friend
}

export default useFriend
