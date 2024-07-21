import { View, Text, Image } from "react-native";
import * as icons from '../assets/svg/exports';
import { ArrowRight, Home } from "lucide-react-native";

export default [
    {
        name: "home/index",
        options: {
            drawerLabel: () => (
            <View className="flex-row items-center w-full">
                <Text className="text-[#EFEFEF]">
                    Home
                </Text>
                <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#1DB954] p-1.5 items-center justify-center absolute left-36'>
                    <ArrowRight size="14px" stroke="#000"/>
                </View>
            </View>
            ),
            title: 'Home',
        }
    },
    {
        name: "profile/index",
        options: {
            drawerLabel: () => (
                <View className="flex-row items-center w-full">
                    <Text className="text-[#EFEFEF]">
                        Profile
                    </Text>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#1DB954] p-1.5 items-center justify-center absolute left-36'>
                        <ArrowRight size="14px" stroke="#000"/>
                    </View>
                </View>
            ),
            title: 'Profile',
        }
    },
    {
        name: "chat/index",
        options: {
            drawerLabel: () => (
                <View className="flex-row items-center w-full">
                    <Text className="text-[#EFEFEF]">
                        Chats
                    </Text>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#1DB954] p-1.5 items-center justify-center absolute left-36'>
                        <ArrowRight size="14px" stroke="#000"/>
                    </View>
                </View>
            ),
            title: 'Chats',
        }
    },
    {
        name: "settings/index",
        options: {
            drawerLabel: () => (
                <View className="flex-row items-center w-full">
                    <Text className="text-[#EFEFEF]">
                        Settings
                    </Text>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#1DB954] p-1.5 items-center justify-center absolute left-36'>
                        <ArrowRight size="14px" stroke="#000"/>
                    </View>
                </View>
            ),
            title: 'Settings',
        }
    },
]