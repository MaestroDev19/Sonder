import { TextInput, View, TouchableOpacity, Text, Pressable, ScrollView } from "react-native";
import Page from "../../../components/page";
import { ArrowLeft, ArrowRight, Image, Send } from "lucide-react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import useChatMessages from "../../../hooks/chat-messages";
import useChats from "../../../hooks/chats";
import { GiftedChat } from "react-native-gifted-chat";
import Header from "../../../components/header";
import useFriend from "../../../hooks/friend";
import Avatar from "../../../components/avatar";
import { scale } from "react-native-size-matters";
import Drawer from "expo-router/drawer";
import { Message } from "../../../components/chat-message";
import useCurrentUser from "../../../hooks/current-user";

export default function NewChatPage() {
    const { friend_id } = useLocalSearchParams();
    const friend = useFriend(friend_id as string);
    const { userProfile } = useCurrentUser();
    const router = useRouter()
    const [message, setMessage] = useState("");
    const [chatId, setChatId] = useState("");

    const { addChatMutation } = useChats();
    const { messages, sendNewMessage } = useChatMessages(chatId || "new");


    const createNewChat = async () => {
        const chatId = await addChatMutation.mutateAsync({ 
            friend_id: friend_id as string,
            message,
            media: []
        })
        setChatId(chatId)
    }

    const createNewMessage = async () => {
        await sendNewMessage(message, [])
    }




    return (
        <Page className="relative">
            <Drawer.Screen 
                options={{
                    header: () => (
                        <Header className='gap-4 px-0'>
                            <Pressable onPress={() => router.back()} className=' mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33]  border  p-5 items-center justify-center'>
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
                    )
                }} 
            />

            <View>
                <ScrollView contentContainerStyle={{ height: 500 }} style={{ height: 600 }} className="border border-red-500">
                    {
                        messages.map((message, index) => (
                            <Message 
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
                    onPress={!chatId ? createNewChat : createNewMessage}
                    className="bg-primary rounded-md p-3"
                >
                    <Send size="14px" stroke="black" />
                </TouchableOpacity>
            </View>


        </Page>
    )
}
