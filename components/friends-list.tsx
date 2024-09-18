import { useFriendsList } from "../hooks/friends-list";
import Avatar from "../components/avatar";
import { scale, verticalScale } from "react-native-size-matters";
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  Pressable,
} from "react-native";
import Header from "../components/header";
import { ArrowLeft } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import { Friend } from "../types/types";
import { generateConsistentString } from "../utils/functions";
import CustomBackButton from "./CustomBackButton";

interface FriendsListProps {
  friends: Friend[];
  mode: "profile" | "chat";
  currentUserId: string;
}

export const FriendsList = ({
  friends,
  mode,
  currentUserId,
}: FriendsListProps) => {
  const router = useRouter();

  const selectProfile = (selectedId: string) => {
    if (mode === "chat") {
      const chatId = generateConsistentString(currentUserId, selectedId);
      return router.push({
        pathname: `/chat/${chatId}`,
        params: { friend_id: selectedId },
      });
    } else {
      return router.push(`/profile/${selectedId}`);
    }
  };

  return (
    <>
      {friends?.length > 0 ? (
        <FlatList
          ListHeaderComponent={
            <Header className="flex px-0 mb-5 flex-row gap-4 items-center">
              <CustomBackButton />

              <Text className="text-white font-bold text-2xl">Friends</Text>
            </Header>
          }
          className="px-4"
          data={friends!}
          renderItem={({ item: userProfile }) => (
            <TouchableOpacity
              onPress={() => selectProfile(userProfile?.id)}
              className="bg-[#b3b3b31a] mb-3 border rounded-md border-[#EFEFEF33]"
            >
              <View className="py-3 flex-row gap-3 items-center px-3 flex">
                <Avatar
                  src={userProfile?.profile_image}
                  initials={userProfile?.name.at(0) || "S"}
                  width={scale(45)}
                  height={scale(45)}
                  containerStyle="z-40"
                />
                <View>
                  <Text className="text-white text-xl font-semibold">
                    {userProfile.name}
                  </Text>
                  <Text className="text-[#efefef80] text-md font-semibold">
                    @{userProfile.username}
                  </Text>
                  <Text className="text-sm text-light-grey">
                    {userProfile.bio.replace(/\n(\r\n|\n|\r)/gm, "").trim()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <>
          <Header className="flex px-0 mb-5 flex-row gap-4 items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-6 h-6 rounded-md border-[#EFEFEF33] border p-5 items-center justify-center"
            >
              <ArrowLeft stroke="white" />
            </TouchableOpacity>

            <Text className="text-white font-bold text-2xl">Friends</Text>
          </Header>
          <View className="flex flex-1 flex-row justify-center items-center ">
            <Text className="text-white">You do not have any friends yet</Text>
          </View>
        </>
      )}
    </>
  );
};
