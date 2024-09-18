import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import Header from "../../../components/header";
import { ArrowLeft, Send, Image, X } from "lucide-react-native";
import Drawer from "expo-router/drawer";
import Avatar from "../../../components/avatar";
import { scale, verticalScale } from "react-native-size-matters";
import { Message } from "../../../components/chat-message";
import useFriend from "../../../hooks/friend";
import { useLocalSearchParams, useRouter } from "expo-router";
import useCurrentUser from "../../../hooks/current-user";
import useChats from "../../../hooks/chats";
import useChatMessages from "../../../hooks/chat-messages";
import usePhotoLibrary from "../../../hooks/photo-library";
import { ImagePickerAsset } from "expo-image-picker";
import { Image as ExpoImage } from "expo-image";
import { ImageUploadService } from "../../../services/ImageUpload";
import { generateRandomId } from "../../../utils/functions";
import { Media } from "../../../types/types";
import CustomBackButton from "../../../components/CustomBackButton";

const ChatScreen = () => {
  const { data: chats } = useChats();
  const { id: chatId, friend_id: friendId } = useLocalSearchParams();
  const { userProfile } = useCurrentUser();
  const { getPhotos } = usePhotoLibrary();

  const currentChat = chats.find((chat) => chat.id === chatId);
  const friend = useFriend(
    (friendId as string) ||
      currentChat?.members.find((member) => member !== userProfile?.id)
  );
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState<ImagePickerAsset[]>([]);

  const { messages, sendNewMessage } = useChatMessages(chatId as string);

  const { addChatMutation } = useChats();
  const chatList = useRef<FlatList>(null);

  const sendMessage = useCallback(async () => {
    if (selectedImages?.length === 0 && !message.trim()) return;

    let media: Media[] = [];
    if (selectedImages?.length > 0) {
      const images = await Promise.all(
        selectedImages.map(async (image) => {
          const id = generateRandomId(7);
          return await ImageUploadService.uploadImage(
            "images",
            `${id}.png`,
            image.uri
          );
        })
      );
      media = images.map((image) => ({ url: image, type: "image" }));
    }

    if (messages?.length > 0) {
      await sendNewMessage(message, media);
    } else {
      await addChatMutation.mutateAsync({
        friend_id: friend.id as string,
        message,
        media,
        chat_id: chatId as string,
      });
    }

    setMessage("");
    setSelectedImages([]);
  }, [
    message,
    selectedImages,
    messages,
    friend.id,
    chatId,
    sendNewMessage,
    addChatMutation,
  ]);

  const selectImages = async () => {
    const photos = await getPhotos();
    return setSelectedImages(photos);
  };

  const removeImageFromSelection = (image: ImagePickerAsset) => {
    const remainingPhotos = selectedImages.filter((image_) => {
      return image.assetId !== image_.assetId;
    });
    return setSelectedImages(remainingPhotos);
  };

  return (
    <View style={{ flex: 1 }}>
      <Drawer.Screen options={{ header: () => null }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Header className="gap-4 px-0">
          <CustomBackButton />

          <View className="h-full flex flex-row gap-4 items-end">
            <Avatar
              src={friend?.profile_image}
              initials={friend?.name.at(0) || "S"}
              width={scale(35)}
              height={scale(35)}
              containerStyle="z-40"
            />
            <Text className="text-white font-bold text-2xl">
              {friend?.name}
            </Text>
          </View>
        </Header>

        <FlatList
          ref={chatList}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item: message, index }) => (
            <Message
              key={message.id}
              message={message}
              currentUserId={userProfile?.id}
              showDate={messages[index + 1]?.senderId !== message?.senderId}
            />
          )}
          style={{ flex: 1 }}
          onContentSizeChange={() =>
            chatList?.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => chatList?.current?.scrollToEnd({ animated: true })}
        />

        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {selectedImages?.length > 0 && (
            <ScrollView
              horizontal
              className="flex flex-row bg-[#b3b3b333] gap-2 py-3 px-3 border rounded-xl border-[#EFEFEF33] z-20"
              contentContainerClassName="z-20"
            >
              {selectedImages.map((image) => (
                <View key={image.assetId} className="relative">
                  <TouchableOpacity
                    onPress={() => removeImageFromSelection(image)}
                    className="bg-red-500 z-20 rounded-full absolute -top-2 -right-3 p-1"
                  >
                    <X size="12px" stroke="#fff" />
                  </TouchableOpacity>
                  <ExpoImage
                    key={image.assetId!}
                    source={{ uri: image.uri }}
                    style={{ width: 80, height: 80, borderRadius: 10 }}
                  />
                </View>
              ))}
            </ScrollView>
          )}

          <View className="z-20 w-auto bg-[#b3b3b333] my-4 py-3 flex-row justify-between items-center gap-4 px-3 flex  rounded-xl ">
            <TouchableOpacity
              onPress={selectImages}
              className="bg-[#b3b3b333] p-3 flex rounded-md"
            >
              <Image stroke="#fff" size="14px" />
            </TouchableOpacity>
            <TextInput
              className="w-[73%] h-full text-white font-semibold"
              placeholder="Type a message..."
              placeholderTextColor="#fff"
              placeholderClassName="font-bold"
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={{ color: "#fff" }}
            />
            <TouchableOpacity
              onPress={sendMessage}
              className="bg-primary rounded-xl p-3"
            >
              <Send size="14px" stroke="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;
