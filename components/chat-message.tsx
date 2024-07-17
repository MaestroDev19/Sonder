import React from 'react';
import { View, Text } from 'react-native';
import useFriend from '../hooks/friend';
import { format } from 'date-fns';
import { Message as IMessage } from '../types/types';
import { Dot } from 'lucide-react-native';
import { Image as ExpoImage } from "expo-image"
interface MessageProps {
  message: IMessage;
  currentUserId: string;
  showDate: boolean
}

export const Message: React.FC<MessageProps> = ({ showDate, message, currentUserId }) => {
  const friend = useFriend(message.senderId);
  const isCurrentUser = message.senderId === currentUserId;
  const messageDate = message.createdAt.toDate();

  return (
    <View className={`p-1.5 max-w-[80%] ${isCurrentUser ? 'ml-auto' : 'mr-auto'}`}>
      {
        message.media.map((media) => (
          <ExpoImage  
            source={{ uri: media.url }}
            style={{ width: 100, height: 100, borderRadius: 10, }}
          />
        ))
      }
      <View className={`rounded-xl px-4 py-2 ${isCurrentUser ? 'bg-primary' : 'bg-[#b3b3b31a] border border-[#efefef33]'}`}>
        {/*!isCurrentUser && friend && (
          <Text className="text-sm font-bold mb-1">{friend.name}</Text>
        )*/}
        <Text className={`font-semibold text-xl ${!isCurrentUser ? 'text-white' : 'text-black'}`}>
          {message.content}
        </Text>
        {/*
        message.media.map((mediaUrl, index) => (
          <Image 
            key={index}
            source={{ uri: mediaUrl }}
            className="w-full h-40 mt-2 rounded"
            resizeMode="cover"
          />
        ))*/}
      </View>
      {
        showDate &&
        <View className={`${isCurrentUser ? 'ml-auto' : 'mr-auto'} mt-2 py-1 px-2 rounded-lg flex flex-row items-center justify-center border border-gray-500 self-start flex-wrap`}>
          <Text className="text-xs text-gray-500">
            {format(messageDate, 'HH:mm')}
          </Text>
        </View>
      }
    </View>
  );
};