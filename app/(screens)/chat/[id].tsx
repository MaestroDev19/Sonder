import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";

const ChatScreen = () => {
  const [message, setMessage] = useState([]);
  const onSend = useCallback((message = []) => {
    setMessage((previousMessage) =>
      GiftedChat.append(previousMessage, message)
    );
  }, []);

  useEffect(() => {
    setMessage([
      {
        id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "THE GOAT",
        },
      },
    ]);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <View className=" flex flex-row justify-between px-2 h-[60px]">
        <View>
          <Text className="flex flex-row items-center text-xl">Rex</Text>
        </View>
      </View>
      <GiftedChat
        messages={message}
        onSend={(message) => onSend(message)}
        user={{
          _id: 1,
        }}
        scrollToBottom
      />
    </SafeAreaView>
  );
};
export default ChatScreen;
