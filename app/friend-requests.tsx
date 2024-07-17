import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Page from "../components/page";
import useFriends from "../hooks/friends";
import { Skeleton } from "../components/skeleton";
import Avatar from "../components/avatar";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, Cross, X } from "lucide-react-native";

export default function FriendRequestsPage() {
  const {
    friendRequests,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation,
  } = useFriends();
  const router = useRouter();

  const acceptRequest = async (id: string) => {
    await acceptFriendRequestMutation.mutateAsync({ user_id: id });
  };

  const rejectRequest = async (id: string) => {
    await rejectFriendRequestMutation.mutateAsync({ user_id: id });
  };

  return (
    <Page>
      <View className="flex items-center gap-5 flex-row w-screen px-3 py-5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#EFEFEF1A] p-3 rounded-xl border border-muted"
        >
          <ArrowLeft stroke="white" />
        </TouchableOpacity>

        <Text className="text-white font-bold text-3xl">Friend Requests</Text>
      </View>

      {friendRequests.isLoading ? (
        <Skeleton width="100%" />
      ) : friendRequests.data.length > 0 ? (
        <FlatList
          data={friendRequests.data}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/profile/${item.user_id}`)}
              className="px-3 gap-4 flex flex-row items-center"
            >
              <Avatar
                width={50}
                height={50}
                src={item.sender_avatar}
                initials={item.sender_username.at(0)}
              />
              <Text className="text-white text-xl font-semibold">
                {item.sender_username}
              </Text>

              <View className="flex flex-row items-center gap-3 ml-auto">
                <Pressable
                  onPress={() => acceptRequest(item.user_id)}
                  disabled={acceptFriendRequestMutation.isPending}
                  className="rounded-full disabled:opacity-50 w-12 h-12 bg-green-800/50 flex flex-row items-center justify-center"
                >
                  {acceptFriendRequestMutation.isPending ? (
                    <ActivityIndicator className="text-green-500" />
                  ) : (
                    <Check strokeWidth={3.5} stroke="green" />
                  )}
                </Pressable>
                <Pressable
                  onPress={() => rejectRequest(item.user_id)}
                  disabled={rejectFriendRequestMutation.isPending}
                  className="rounded-full disabled:opacity-50 w-12 h-12 bg-red-800/50 flex flex-row items-center justify-center"
                >
                  {rejectFriendRequestMutation.isPending ? (
                    <ActivityIndicator className="text-red-500" />
                  ) : (
                    <X strokeWidth={3.5} stroke="red" />
                  )}
                </Pressable>
              </View>
            </Pressable>
          )}
        />
      ) : (
        <View className="flex flex-1 flex-row justify-center items-center ">
          <Text className="text-white"> No friend requests at the moment</Text>
        </View>
      )}
    </Page>
  );
}
