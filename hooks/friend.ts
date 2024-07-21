import { useFriendsList } from "./friends-list"

const useFriend = (userId: string) => {
    const { data: friends } = useFriendsList()

    return friends?.find((friend) => friend.id === userId)
}

export default useFriend
