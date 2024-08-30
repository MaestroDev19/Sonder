import React from "react";
import { View, Text } from "react-native";
import useFriend from "../hooks/friend";
import { format } from "date-fns";
import { Message as IMessage } from "../types/types";
import { Dot } from "lucide-react-native";
import { Image as ExpoImage } from "expo-image";
interface MessageProps {
  message: IMessage;
  currentUserId: string;
  showDate: boolean;
}

export const Message: React.FC<MessageProps> = ({
  showDate,
  message,
  currentUserId,
}) => {
  const friend = useFriend(message.senderId);
  const isCurrentUser = message.senderId === currentUserId;
  const messageDate = message.createdAt.toDate();

  return (
    <View
      className={`mb-4 px-4 ${isCurrentUser ? "items-end" : "items-start"}`}
    >
      <View className={`max-w-[80%] ${isCurrentUser ? "ml-auto" : "mr-auto"}`}>
        {message.media.map((media, index) => (
          <ExpoImage
            key={index}
            source={{ uri: media.url }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 12,
              marginBottom: 8,
            }}
          />
        ))}
        {message.content.trim() && (
          <View
            className={`rounded-2xl px-4 py-3 ${
              isCurrentUser ? "bg-primary" : "bg-[#b3b3b31a] border "
            }`}
          >
            <Text
              className={`text-base ${
                isCurrentUser ? "text-black" : "text-white"
              }`}
            >
              {message.content}
            </Text>
          </View>
        )}
      </View>
      {showDate && (
        <Text className="text-xs text-gray-500 mt-1">
          {format(messageDate, "HH:mm")}
        </Text>
      )}
    </View>
  );
};
