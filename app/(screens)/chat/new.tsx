import {
    FlatList,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    View,
} from "react-native";
import Page from "../../../components/page";
import { useFriendsList } from "../../../hooks/friends-list";
import Header from "../../../components/header";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FriendsList } from "../../../components/friends-list";
import useCurrentUser from "../../../hooks/current-user";
import { Drawer } from "expo-router/drawer";
  
export default function FriendsPage() {
    const { isLoading, data: friends } = useFriendsList();
    const { userProfile } = useCurrentUser();
    const router = useRouter();
  
    if (isLoading) {
      return (
        <Page>
            <Drawer.Screen options={{ header: () => null }} />
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
        <Drawer.Screen options={{ header: () => null }} />
        <FriendsList 
          friends={friends} 
          mode="chat" 
          currentUserId={userProfile?.id} 
        />
      </Page>
    );
  }
  