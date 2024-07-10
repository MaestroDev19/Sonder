import React from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import useDrawer from "../../../hooks/drawer";
import { Drawer } from "expo-router/drawer";
import useCurrentUser from "../../../hooks/current-user";
import Page from "../../../components/page";
import { Image, ImageBackground } from "expo-image";
import { ArrowLeft, Calendar } from "lucide-react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Avatar from "../../../components/avatar";
import AnimatedToggleButton from '../../../components/togglebutton';
import { ArrowRight} from "lucide-react-native";

export default function SettingsPage() {
    const { openDrawer } = useDrawer()
    const { userProfile, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <Page>
                <Text>Loading</Text>
            </Page>
        )
    }

  return (
    
        <View className="px-3 h-screen w-screen">
            <Drawer.Screen options={{
                headerLeft: () => (
                    <Pressable onPress={openDrawer}>
                        <View className=' mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33]  border  p-5 items-center justify-center'>
                            <ArrowLeft size = "14px" stroke="white"/>
                        </View>
                        
                    </Pressable>
                ),
                headerTitle: () => (
                    <Text className=" mt-6 text-white text-xl font-bold">
                        Settings
                    </Text>
                ),
            }} />

            <View className="border border-[#EFEFEF33] rounded-lg px-4 py-6 mt-10">
                
                <View  className="flex flex-row ">
                <Avatar
                    src={userProfile?.profile_image}
                    initials={userProfile?.name.at(0) || "S"}
                    width={40}
                    height={40}
                    containerStyle="z-40"
                />
                <View className="ml-5">
                <Text className="text-white text-xl font-bold">{userProfile?.name}</Text>
                <Text className="text-sm text-light-grey">@{userProfile?.email}</Text>
                </View>
                </View>
               
            </View>
        <ScrollView>
            <Text className="text-white text-light-grey mt-6 ml-6 ">
                Account Settings
            </Text>
        
            <View className=" flex border border-[#EFEFEF33] bg-[#B3B3B31A] rounded-lg px-4 py-4 mt-4">
                
                 <View  className=" rounded-md flex flex-row  justify-between items-center p-4 border border-[#EFEFEF33] mb-4 ">
                
                    <Text className="text-white ">Dark Mode</Text>
                    <View>
                        <AnimatedToggleButton />
                    </View>
                
                </View>
                <View  className=" rounded-md flex flex-row gap-4 items-center p-4 border border-[#EFEFEF33] mb-4 justify-between">
                    <Text className="text-white  ">Notifications</Text>
                    <View>
                        <AnimatedToggleButton />
                    </View>
                </View>
                <View  className=" rounded-md flex flex-row gap-4 items-center p-4 border border-[#EFEFEF33] justify-between ">
                    <View> 
                        <Text className="text-white  ">Language</Text>
                         <Text className="text-[#808080] text-xs ">English</Text>
                    </View>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#1DB954] p-1.5 items-center justify-center '>
                        <ArrowRight size="14px" stroke="white"/>
                    </View>
               
                </View>
               
            </View>

            <Text className="text-white text-light-grey mt-6 ml-6 ">
                More
            </Text>
        
            <View className=" flex border border-[#EFEFEF33]  rounded-lg px-4 py-4 mt-4">
                
                <View  className=" rounded-md flex flex-row  justify-between items-center p-4 border border-[#EFEFEF33] mb-4 ">
                
                    <Text className="text-white ">FAQ</Text>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#B3B3B31A] p-1.5 items-center justify-center '>
                        <ArrowRight size="14px" stroke="white"/>
                    </View>
                
                </View>
                <View  className=" rounded-md flex flex-row gap-4 items-center p-4 border border-[#EFEFEF33] mb-4 justify-between">
                    <Text className="text-white  ">About Us</Text>
                    <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#B3B3B31A] p-1.5 items-center justify-center '>
                        <ArrowRight size="14px" stroke="white"/>
                    </View>
                </View>
                <View  className=" rounded-md flex flex-row gap-4 items-center p-4 border border-[#EFEFEF33]  justify-between">
                    
                        <Text className="text-white ">Terms of Service</Text>
                        <View className='w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#B3B3B31A] p-1.5 items-center justify-center '>
                            <ArrowRight size="14px" stroke="white"/>
                        </View>
                    
               
                </View>
               
            </View>
        </ScrollView>
      

    </View>
  );
};
