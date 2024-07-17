import React from 'react';
import { View, Text, Image } from 'react-native';
import useFriend from '../hooks/friend';
import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { Message as IMessage } from '../types/types';
import { Dot } from 'lucide-react-native';

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
      <View className={`rounded-xl px-4 py-2 ${isCurrentUser ? 'bg-primary' : 'bg-[#b3b3b31a] border-[#efefef33]'}`}>
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
        <View className='mt-2 px-0 rounded-lg flex flex-row items-center justify-center p-1 border border-gray-500'>
            <Text className="text-xs text-gray-500 mt-1">
                {format(messageDate, 'HH:mm')}
            </Text>
            <Dot color="grey"/>
            <Text className="text-xs text-gray-500 mt-1">
                Sent
            </Text>
        </View>
      }
    </View>
  );
};