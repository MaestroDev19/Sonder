import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../../../components/header";
import { ArrowLeft, Send, Image } from "lucide-react-native";
import Drawer from "expo-router/drawer";
import Avatar from "../../../components/avatar";
import { scale } from "react-native-size-matters";
import { Message } from "../../../components/chat-message";
import useFriend from "../../../hooks/friend";
import { useLocalSearchParams, useRouter } from "expo-router";
import useCurrentUser from "../../../hooks/current-user";
import useChats from "../../../hooks/chats";
import useChatMessages from "../../../hooks/chat-messages";

const ChatScreen = () => {
  const { data: chats } = useChats();
  const { id: chatId } = useLocalSearchParams();
  const { userProfile } = useCurrentUser();

  const currentChat = chats.find((chat) => chat.id === chatId);
  const friend = useFriend(currentChat?.members.find((member) => member !== userProfile?.id));
  const router = useRouter()
  const [message, setMessage] = useState("");

  const { messages, sendNewMessage } = useChatMessages(chatId as string);


  const createNewMessage = async () => {
    await sendNewMessage(message, [])
    return setMessage("")
  }



  return (
    <View className="relative">
      <Drawer.Screen options={{ header: () => null }} />

      <KeyboardAvoidingView behavior="position">
        <Header className='gap-4 px-0'>
          <Pressable onPress={() => router.push('chat')} className=' mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33]  border  p-5 items-center justify-center'>
              <ArrowLeft size="14px" stroke="white"/>
          </Pressable>

          <View className="h-full flex flex-row gap-4 items-end">
            <Avatar
                src={friend?.profile_image}
                initials={friend?.name.at(0) || "S"}
                width={scale(35)}
                height={scale(35)}
                containerStyle="z-40"
            />
            <Text className="text-white font-bold text-2xl">{friend?.name}</Text>
          </View>
        </Header>

        <View className="mt-5">
          <ScrollView contentContainerStyle={{ height: 500 }} style={{ height: 600 }}>
              {
                  messages.map((message, index) => (
                    <Message 
                      key={message.id} 
                      message={message} 
                      currentUserId={userProfile?.id}
                      showDate={messages[index + 1]?.senderId !== message?.senderId}
                    />
                  ))
              }

          </ScrollView>

        </View>




              <View
                  className="z-20 bg-[#b3b3b333] my-5 py-3 flex-row justify-between items-center px-3 flex border rounded-xl border-[#EFEFEF33]"
                  style={{ marginHorizontal: 22 }}
              >
                  <TouchableOpacity
                      className="bg-[#b3b3b333] p-3 flex border rounded-md border-[#EFEFEF33]"
                  >
                    <Image stroke="#fff" size="14px"/>
                  </TouchableOpacity>
                  <TextInput
                      className="w-[60%] h-full"
                      placeholder="Type a message..."
                      placeholderTextColor="#fff"
                      placeholderClassName="font-bold"
                      value={message}
                      onChangeText={(text) => setMessage(text)}
                  />
                  <TouchableOpacity 
                      onPress={createNewMessage}
                      className="bg-primary rounded-md p-3"
                  >
                      <Send size="14px" stroke="black" />
                  </TouchableOpacity>
            </View>



      </KeyboardAvoidingView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark background for the entire screen
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
    alignItems: "center",
    backgroundColor: "#111", // Dark background for the header
  },
  headerText: {
    fontSize: 24,
    color: "#fff", // White text for the header
  },
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  sendText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default ChatScreen;
