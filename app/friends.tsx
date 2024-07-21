import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import Page from "../components/page";
import { useFriendsList } from "../hooks/friends-list";
import Header from "../components/header";
import { ArrowLeft } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import { FriendsList } from "../components/friends-list";
import useCurrentUser from "../hooks/current-user";

export default function FriendsPage() {
  const { isLoading, data: friends } = useFriendsList();
  const { userProfile } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <Page>
        <Header className="flex flex-row gap-4 items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-6 h-6 rounded-md border-[#EFEFEF33] border p-5 items-center justify-center"
          >
            <ArrowLeft stroke="white" />
          </TouchableOpacity>

          <Text className="text-white font-bold text-2xl">Friends</Text>
        </Header>

        <View className="w-full h-[500px] flex flex-row items-center justify-center">
          <ActivityIndicator size="large" color="#1DB954" />
        </View>
      </Page>
    );
  }

  return (
    <Page>
      <FriendsList 
        friends={friends} 
        mode="profile" 
        currentUserId={userProfile?.id} 
      />
    </Page>
  );
}
