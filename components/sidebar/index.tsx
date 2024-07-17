import {
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    Pressable,
    RefreshControl
  } from "react-native";
import Avatar from "../avatar";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import useCurrentUser from "../../hooks/current-user";
import { useState, useCallback } from "react";
import { Skeleton } from "../skeleton";
import { router } from "expo-router";
  
  const CustomDrawer = (props) => {
    const { userProfile, isLoading, refreshUser } = useCurrentUser();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      refreshUser()
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    return (
      <>
        <DrawerContentScrollView
          {...props}
          style={{ backgroundColor: "#121212" }}
          contentContainerStyle={{ marginHorizontal: 15 }}
          className="bg-background pt-[65px] h-full"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >   
          {
            isLoading ? <Skeleton width={100} height={100} borderRadius={999} /> :
            <Avatar 
              src={userProfile?.profile_image} 
              initials={userProfile?.name.at(0)?.toUpperCase() || "S"} 
            />
          }
          <View className="mt-3 text-white">
            {
              isLoading ? 
              <View className="flex flex-col gap-3 mt-3">
                <Skeleton height={20} width={"90%"}/>
                <Skeleton width={"50%"}/>
              </View>
              :
              <TouchableOpacity>
                <Text className="text-3xl capitalize font-bold text-white">
                  { userProfile?.name }
                </Text>
                <Text className="text-grey-text font-semibold">
                  @{userProfile?.spotify_username}
                </Text>
              </TouchableOpacity>
            }

            <TouchableOpacity
              onPress={() => router.push("/friends")}
              className="flex-row flex gap-2 items-center mt-3.5"
            >
              <View style={{ padding: 4, borderRadius: 3 }} className="bg-[#EFEFEF1A] rounded-[10px] border-[#B3B3B333] border p-4 px-4 py-1.5">
                  <Text className="text-center text-white font-semibold">{userProfile?.friend_count || 0}</Text>
              </View>
              <Text className="ml-1.5 text-xl text-grey-text font-semibold">Friends</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-6">
            <DrawerItemList {...props} /> 
          </View>
        </DrawerContentScrollView>
        <View className="pb-20 px-4 bg-[#121212]">

          <Pressable className="flex items-center justify-center h-10 rounded-md" style={{ backgroundColor: "#C62525", borderRadius: 12 }}>
            <Text className="text-white font-semibold text-xl">Logout</Text>
          </Pressable>
        </View>
      </>
    );
  };
  
  export default CustomDrawer;