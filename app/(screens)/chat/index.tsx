import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../components/avatar/styles";
import { Fragment, useState } from "react";
import Avatar from "../../../components/avatar";
import useCurrentUser from "../../../hooks/current-user";
import { ArrowLeft, ArrowRight, Plus, Search } from "lucide-react-native";
import Page from "../../../components/page";
import Drawer from "expo-router/drawer";
import Header from "../../../components/header";
import useDrawer from "../../../hooks/drawer";
import { useRouter } from "expo-router";
import useChats from "../../../hooks/chats";
import { Chat } from "../../../types/types";
import useFriend from "../../../hooks/friend";
import { formatRelativeDate } from "../../../utils/functions";
import { useOnlineStatus } from "../../../hooks/online-status";
import CustomBackButton from "../../../components/CustomBackButton";

export default function ChatList() {
  const { userProfile } = useCurrentUser();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, data: chats, refreshChats } = useChats();

  const { openDrawer } = useDrawer();

  const onRefresh = () => {
    setRefreshing(true);
    refreshChats();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Screen
        options={{
          header: () => (
            <Header className="gap-4 px-0">
              <CustomBackButton />

              <Text className=" mt-6 text-white text-xl font-bold">Chats</Text>
            </Header>
          ),
        }}
      />
      {/*
        <View
          className="bg-[#b3b3b333] h-12 my-5 py-3 flex-row justify-between items-center px-3 flex border rounded-md border-[#EFEFEF33]"
          style={{ marginHorizontal: 22 }}
        >
          <TextInput
            className="w-[70%] h-full"
            placeholder="Search Chats"
            placeholderTextColor="#fff"
            placeholderClassName="font-bold"
            value={search}
            onChangeText={handleSearch}
          />
          <Pressable className="bg-primary rounded-md p-2">
            <ArrowRight size="14px" stroke="black" />
          </Pressable>
        </View>        
        */}

      <View className="flex flex-1">
        {isLoading ? (
          <View className="h-[500px] flex flex-row items-center justify-center">
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        ) : chats?.length > 0 ? (
          <FlatList
            data={chats}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatListItem item={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            refreshing={refreshing}
            className="px-6"
          />
        ) : (
          <View className="flex items-center justify-center flex-1">
            <Text className="text-lg font-medium text-grey-text">
              You don't have any friends yet. Add a friend to start chatting.
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => router.push("/chat/new")}
          className="bg-primary p-2 rounded-lg absolute bottom-24 right-7"
        >
          <Plus stroke="#000" size="40px" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ChatListItem = ({ item }: { item: Chat }) => {
  const { userProfile } = useCurrentUser();
  const friend = useFriend(
    item.members.find((member) => member !== userProfile?.id)
  );
  const router = useRouter();
  const { status } = useOnlineStatus(userProfile?.id);

  const relativeDate = item.updatedAt.toDate();

  return (
    <TouchableOpacity
      className={`bg-[#b3b3b333] border-[#EFEFEF33] border rounded-md my-5 px-5 mb-2 flex-row flex items-center`}
      onPress={() =>
        router.push({
          pathname: `/chat/${item.id}`,
          params: { friend_id: friend.id },
        })
      }
    >
      <View className="z-40 py-2.5  mr-5">
        <Avatar
          src={friend?.profile_image}
          initials={friend?.name.at(0) || "S"}
          width={50}
          height={50}
        />
        {status && status.status === "online" && (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 7,
              backgroundColor: "#22c55e",
              position: "absolute",
              top: 14,
              right: 2,
            }}
          />
        )}
      </View>
      <View className="flex flex-row justify-between items-center flex-1">
        <View>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-xl font-bold text-white">{friend?.name}</Text>
            <Text className="text-sm font-semibold text-light-grey">
              @{friend?.username}
            </Text>
          </View>
          <Text className="text-lg font-medium text-grey-text">
            {item.lastMessage || "Start Chat"}
          </Text>
        </View>
        <Text className="text-base font-medium text-white">
          {formatRelativeDate(relativeDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
