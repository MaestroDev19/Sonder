import { FlatList, TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import Page from "../components/page";
import { useFriendsList } from "../hooks/friends-list";
import Header from "../components/header";
import { ArrowLeft } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import Avatar from "../components/avatar";
import { scale, verticalScale } from "react-native-size-matters";

export default function FriendsPage() {
    const { isLoading, data: friends } = useFriendsList(); 
    const router = useRouter()
    
    
    if (isLoading) {
        return (
            <Page>
                <Header className="flex flex-row gap-4 items-center">
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        className='w-6 h-6 rounded-md border-[#EFEFEF33] border p-5 items-center justify-center'>
                        <ArrowLeft stroke="white"/>
                    </TouchableOpacity>

                    <Text className="text-white font-bold text-2xl">Friends</Text>
                </Header>

                <View className="w-full h-[500px] flex flex-row items-center justify-center">
                    <ActivityIndicator size="large" color="#1DB954"/>
                </View>

            </Page>
        )
    }
    
    return (
    <Page>
        <FlatList
            ListHeaderComponent={
                <Header className="flex px-0 mb-5 flex-row gap-4 items-center">
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        className='w-6 h-6 rounded-md border-[#EFEFEF33] border p-5 items-center justify-center'>
                        <ArrowLeft stroke="white"/>
                    </TouchableOpacity>

                    <Text className="text-white font-bold text-2xl">Friends</Text>
                </Header>
            }
            className="px-4"
            data={friends!}
            renderItem={({ item: userProfile }) => (
                <Link 
                    href={{ pathname: "/chat/new", params: { friend_id: userProfile.id } }}
                    className="bg-[#b3b3b31a] mb-3 border rounded-md border-[#EFEFEF33]"
                >
                    <View className="h-full w-full py-3 flex-row gap-3 items-center px-3 flex">
                        <Avatar
                            src={userProfile?.profile_image}
                            initials={userProfile?.name.at(0) || "S"}
                            width={scale(45)}
                            height={scale(45)}
                            containerStyle="z-40"
                        />
                        <View>
                            <View className="flex flex-row gap-2 items-center">
                                <Text className="text-white text-2xl font-semibold">{userProfile.name}</Text>
                                <Text className="text-[#efefef80] text-lg font-semibold">@{userProfile.username}</Text>
                            </View>
                            <Text className="text-sm text-light-grey">{userProfile.bio}</Text>
                        </View>
                    </View>
                </Link>
                )
            }
        />
    </Page>
  )
}
