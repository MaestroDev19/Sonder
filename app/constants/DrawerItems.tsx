import { View, Text, Image } from "react-native";
import * as icons from '../../assets/svg/exports';

export default [
    {
        name: "homeScreen/index",
        options: {
            drawerLabel: config =>
                <View className="flex-row items-center w-full">
                    <Text className="text-[#EFEFEF]">
                        Profile
                    </Text>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#1DB954] p-1.5 items-center justify-center absolute right-0'>
                        <Image source={icons.ArrowRight} />
                    </View>
                </View>,
            title: 'Profile',
        }
    },
    //uncomment these when the screens are ready
    // {
    //     name: "chatScreen/index",
    //     options: {
    //         drawerLabel: 'Chats',
    //         title: 'Chats',
    //     }
    // },
    // {
    //     name: "settingsScreen/index",
    //     options: {
    //         drawerLabel: 'Settings',
    //         title: 'Settings',
    //     }
    // },
]