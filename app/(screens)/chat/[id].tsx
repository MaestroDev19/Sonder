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

  const onSend = useCallback((messages = []) => {
    setMessage((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  useEffect(() => {
    setMessage([
      {
        _id: 1,
        text: "Hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "THE GOAT",
        },
      },
    ]);
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#DCF8C6",
          },
          left: {
            backgroundColor: "#EAEAEA",
          },
        }}
        textStyle={{
          right: {
            color: "#000",
          },
          left: {
            color: "#000",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Text style={styles.sendText}>Send</Text>
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rex</Text>
      </View>
      <GiftedChat
        messages={message}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottom
        alwaysShowSend
      />
    </SafeAreaView>
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
