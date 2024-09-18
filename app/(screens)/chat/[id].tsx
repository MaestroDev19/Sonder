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

  const createNewChat = async () => {
    if (selectedImages?.length === 0 && !message) return;

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
      setSelectedImages([]);
      const media: Media[] = images.map((image) => {
        return {
          url: image,
          type: "image",
        } satisfies Media;
      });
      setMessage("");
      return await addChatMutation.mutateAsync({
        friend_id: friend.id as string,
        message,
        media,
        chat_id: chatId as string,
      });
    }

    setMessage("");
    return await addChatMutation.mutateAsync({
      friend_id: friend.id as string,
      message,
      media: [],
      chat_id: chatId as string,
    });
  };

  const selectImages = async () => {
    const photos = await getPhotos();
    return setSelectedImages(photos);
  };

  const createNewMessage = async () => {
    if (selectedImages?.length === 0 && !message) return;

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
      setSelectedImages([]);
      const media: Media[] = images.map((image) => {
        return {
          url: image,
          type: "image",
        } satisfies Media;
      });
      setMessage("");
      return await sendNewMessage(message, media);
    }

    setMessage("");
    return await sendNewMessage(message, []);
  };

  const removeImageFromSelection = (image: ImagePickerAsset) => {
    const remainingPhotos = selectedImages.filter((image_) => {
      return image.assetId !== image_.assetId;
    });
    return setSelectedImages(remainingPhotos);
  };

  return (
    <View className="relative">
      <Drawer.Screen options={{ header: () => null }} />

      <KeyboardAvoidingView
        style={{
          height: Dimensions.get("window").height,
          position: "relative",
        }}
        className="relative"
        behavior="position"
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

        <View className="mt-5 -z-20">
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
            style={{ height: verticalScale(450), zIndex: 10 }}
            onContentSizeChange={() =>
              chatList?.current.scrollToEnd({ animated: true })
            }
            onLayout={() => chatList?.current.scrollToEnd({ animated: true })}
          />
        </View>

        <View
          style={{
            position: "absolute",
            bottom: -130,
            width: "100%",
            paddingHorizontal: 16,
            zIndex: 20,
          }}
        >
          {selectedImages?.length < 1 ? null : (
            <ScrollView
              horizontal
              className="flex flex-row bg-[#b3b3b333] gap-2 py-3 px-3 border rounded-xl border-[#EFEFEF33] z-20"
              contentContainerClassName="z-20"
            >
              {selectedImages?.map((image) => (
                <View className="relative">
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

          <View className="z-20 w-auto bg-[#b3b3b333] my-4 py-3 flex-row justify-between items-center gap-4 px-3 flex border rounded-xl border-[#EFEFEF33]">
            <TouchableOpacity
              onPress={selectImages}
              className="bg-[#b3b3b333] p-3 flex border rounded-md border-[#EFEFEF33]"
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
              onPress={messages?.length > 0 ? createNewMessage : createNewChat}
              className="bg-primary rounded-md p-3"
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
