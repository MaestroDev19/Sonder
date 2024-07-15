import {
  FlatList,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../components/avatar/styles";
import { Fragment, useState } from "react";
import Avatar from "../../../components/avatar";
import useCurrentUser from "../../../hooks/current-user";
import { ArrowLeft, ArrowRight, Search } from "lucide-react-native";
import Page from "../../../components/page";
import Drawer from "expo-router/drawer";
import Header from "../../../components/header";
import useDrawer from "../../../hooks/drawer";

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

  const { openDrawer } = useDrawer();


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
    <View style={{ flex: 1 }}>
      <Drawer.Screen 
        options={{
            header: () => (
                <Header className='gap-4 px-0'>
                    <Pressable onPress={openDrawer} className=' mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33]  border  p-5 items-center justify-center'>
                        <ArrowLeft size="14px" stroke="white"/>
                    </Pressable>

                    <Text className=" mt-6 text-white text-xl font-bold">
                        Chats
                    </Text>
                </Header>
            )
        }} 
      />

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

      <View className="flex flex-1">

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
    </View>
  );
}
