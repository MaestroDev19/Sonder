import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../components/avatar/styles";
import { Fragment, useState } from "react";
import Avatar from "../../../components/avatar";
import useCurrentUser from "../../../hooks/current-user";
import { Search } from "lucide-react-native";

interface ChatListPreview {
  id: string;
  name: string;
  lastMessage?: string;
  isTyping?: boolean;
  isOnline?: boolean;
  messageStatus?: "Seen" | "Sent";
}

export default function ChatList({ navigation }) {
  const chatpreview: ChatListPreview[] = [
    {
      id: "1",
      name: "Zuhran",
      lastMessage: "Hi, Muntasir! 👋 Can you help...",
      isOnline: false,
      isTyping: false,
      messageStatus: "Seen",
    },
    {
      id: "2",
      name: "Mujahid",
      lastMessage: "Typing...",
      isTyping: true,
      isOnline: true,
    },
    {
      id: "4",
      name: "Rex",
      lastMessage: "hey",
      isTyping: false,
      isOnline: true,
      messageStatus: "Sent",
    },
    {
      id: "5",
      name: "Rex",
      lastMessage: "hey",
      isTyping: false,
      isOnline: true,
      messageStatus: "Sent",
    },
    {
      id: "6",
      name: "Rex",
      lastMessage: "hey",
      isTyping: false,
      isOnline: true,
      messageStatus: "Sent",
    },
  ];

  const { userProfile, isLoading } = useCurrentUser();
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(chatpreview);
  const [selectedId, setSelectedId] = useState(null);

  const handlePress = (item) => {
    setSelectedId(item.id);
    navigation.navigate("ChatScreen", { userName: item.name });
  };

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = chatpreview.filter((user) =>
      user.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        className={`my-5  px-5 mb-2 flex-row  flex items-center ${
          item.id === selectedId ? "bg-muted" : "bg-current"
        }`}
        onPress={() => handlePress(item)}
      >
        <View className="z-40 py-2.5  mr-5">
          <Avatar
            src={userProfile?.profile_image}
            initials={userProfile?.name.at(0) || "S"}
            width={50}
            height={50}
          />
          {item.isOnline && (
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
            ></View>
          )}
        </View>
        <View className="flex flex-row justify-between items-center flex-1">
          <View>
            <Text className="text-xl font-bold text-white">{item.name}</Text>
            <Text className="text-lg font-medium text-grey-text">
              {item.isTyping ? "Typing..." : item.lastMessage}
            </Text>
          </View>
          <Text className="text-base font-medium text-white">
            {item.messageStatus}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View className="flex flex-1">
        <View className="flex flex-row items-center mx-5 my-5">
          <Text className=" font-semibold text-white" style={{ fontSize: 20 }}>
            Chats
          </Text>
        </View>
        <View
          className="h-12  flex-row items-center px-5 flex border"
          style={{ marginHorizontal: 22 }}
        >
          <TextInput
            className="w-full  h-full  "
            placeholder="search"
            value={search}
            onChangeText={handleSearch}
          />
        </View>
        {filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        ) : (
          <View className="flex items-center justify-center flex-1">
            <Text className="text-lg font-medium text-grey-text">
              Your friend was not added
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
