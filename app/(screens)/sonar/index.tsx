import { ArrowLeft, Send } from "lucide-react-native";
import { useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import useSonar from "../../../hooks/sonar";
import useDrawer from "../../../hooks/drawer"
import { scale, verticalScale } from "react-native-size-matters";
import { TypeAnimation } from "react-native-type-animation"
import Drawer from "expo-router/drawer";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

export default function SonarPage() {

    const [message, setMessage] = useState("");
    const chatList = useRef<FlatList>(null);
    const { openDrawer } = useDrawer();
    const router = useRouter();

    const { isLoading, searchResults, lastMessageId, searchPending, saveLastMessageId, search } = useSonar()


    const createNewChat = async () => {
        await search(message);
        return setMessage("")
    }

    return (
        <View className="relative px-4">
            <Drawer.Screen 
                options={{ header: () => null }}/>
            <KeyboardAvoidingView 
                style={{ height: Dimensions.get("window").height - 20, position: "relative" }}
                className="relative"
                behavior="position"
            >
                <View className="mt-14 -z-20">
                    {
                        isLoading ? <ActivityIndicator size="large" color="#1DB954" /> : 
                        searchResults.length < 1 ? 
                        <View style={{ height: verticalScale(420), zIndex: 10 }}>
                            <Text className="text-white text-2xl">Start a Chat</Text>
                        </View>
                        :
                        <FlatList
                            ref={chatList}
                            data={searchResults}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item: message, index }) => (
                                <View>
                                    <Text className="text-white font-semibold text-xl">{message.question || "Give me a list of people that like"}</Text>
                                    <ScrollView horizontal className="grid grid-cols-2 gap-4 mt-5">
                                        {
                                            message.users.map((user) => (
                                                <TouchableOpacity 
                                                    onPress={() => router.push(`/profile/${user.id}`)}
                                                    style={{ width: scale(150) }} className="bg-[#B3B3B31A] rounded-md flex flex-col gap-2 p-4 mr-4 border border-[#EFEFEF33] mb-4">
                                                    <Image 
                                                        source={{ uri: user.profile_image }} 
                                                        style={{ width: scale(80), height: verticalScale(80), borderRadius: 6 }} 

                                                    />
                                                    <Text className="text-white text-xl font-semibold">{user.name}</Text>
                                                    <Text className="text-white text-lg">{user.bio}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </ScrollView>
                                    {
                                        index === searchResults.length - 1 && lastMessageId !== message.id ?
                                        <TypeAnimation 
                                            sequence={[
                                                { text: message.summary, typeSpeed: 10, action: () => saveLastMessageId(message.id) }
                                            ]}
                                            style={{
                                                color: "#fff"
                                            }}
                                            
                                        />
                                        :
                                        <Text className="text-white text-lg">{message.summary}</Text>
                                    }
                                </View>
                            )}
                            style={{ height: verticalScale(520), zIndex: 10 }}
                            onContentSizeChange={() => chatList?.current.scrollToEnd({ animated: true })}
                            onLayout={() => chatList?.current.scrollToEnd({ animated: true })}
                        />

                    }
                    {
                        searchPending ? 
                        <View>
                            <Text className="text-white text-lg font-semibold">Sonar</Text> 
                            <TypeAnimation
                                sequence={[
                                    { text: "Making your search", typeSpeed: 20 },
                                    { text: "Supersizing your fries", typeSpeed: 20 },
                                    { text: "Playing the guitar", typeSpeed: 20 },
                                    { text: "We're almost there, just a bit longer", typeSpeed: 20 }
                                ]}
                                delayBetweenSequence={1000}
                                style={{
                                    color: "#fff",
                                    fontSize: scale(12),
                                }}
                            />
                        </View>
                        : null
                    }
                </View>

                <View
                    className="z-20 w-auto bg-[#b3b3b333] my-4 py-3 flex-row justify-between items-center gap-4 px-3 flex border rounded-xl border-[#EFEFEF33]"
                >
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
                        onPress={createNewChat}
                        className="bg-primary rounded-md p-3"
                    >
                        <Send size="14px" stroke="black" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>


        </View>
    )
}