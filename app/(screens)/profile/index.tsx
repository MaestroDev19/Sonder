import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import Avatar from "../../../components/avatar";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { ArrowLeft, Calendar } from "lucide-react-native";
import useFavouriteSongs from "../../../hooks/favourite-songs";
import { Image, ImageBackground } from "expo-image";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import useFavouriteArtists from "../../../hooks/favourite-artists";
import useDrawer from "../../../hooks/drawer";
import useFavouriteGenres from "../../../hooks/favourite-genres";

const FirstRoute = () => {
    const { isLoading, favouriteSongs } = useFavouriteSongs();
    return (
        <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, height: "80%" }} contentContainerClassName="pb-56">
            {
                isLoading ? <Text className="text-white">Loading</Text> :
                favouriteSongs?.map((track) => (
                <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={track.id}>
                    <Text className="text-white py-4 px-5 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                        {track?.position}
                    </Text>
                    <Image source={{ uri: track?.image }} style={{ width: scale(50), height: verticalScale(50), borderRadius: 6 }}/>
                    <View className="w-[60%] flex flex-col gap-0.5">
                        <Text className="text-white text-xl font-semibold whitespace-break-spaces">{track.name}</Text>
                        <Text className="text-light-grey">{track.artists.map((artist) => artist.name).join(', ')}</Text>
                    </View>
                </View>
                ))
            }

        </ScrollView>
    )
};
  
const SecondRoute = () => {
    const { isLoading, favouriteArtists } = useFavouriteArtists();
    return (
        <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, height: "100%" }} contentContainerClassName="pb-56">
            {
                isLoading ? <Text className="text-white">Loading</Text> :
                favouriteArtists?.map((artist) => (
                <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={artist.id}>
                    <Text className="text-white py-4 px-5 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                        {artist?.position}
                    </Text>
                    <Image source={{ uri: artist?.image }} style={{ width: scale(50), height: verticalScale(50), borderRadius: 6 }}/>
                    <View>
                        <Text className="text-white text-xl font-semibold whitespace-break-spaces">{artist.name}</Text>
                    </View>
                </View>
                ))
            }

        </ScrollView>
    )
};

const ThirdRoute = () => {
    const { isLoading, favouriteGenres } = useFavouriteGenres();

    return (
        <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, height: "100%" }} contentContainerClassName="pb-56">
            {
                isLoading ? <Text className="text-white">Loading</Text> :
                favouriteGenres?.map((genre, index) => (
                <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={genre}>
                    <Text className="text-white py-4 px-5 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                        {index + 1}
                    </Text>
                    <View>
                        <Text className="text-white capitalize text-xl font-semibold whitespace-break-spaces">{genre}</Text>
                    </View>
                </View>
                ))
            }

        </ScrollView>
    )
};
  
  
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
});

export default function ProfilePage() {
    const { userProfile, isLoading } = useCurrentUser();
    const layout = useWindowDimensions();
    const { openDrawer } = useDrawer()

    const [index, setIndex] = useState(0);
    const [routes] = useState([
      { key: 'first', title: 'Songs' },
      { key: 'second', title: 'Artists' },
      { key: 'third', title: 'Genres' }
    ]);

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
                headerBackground: () => (
                    <ImageBackground
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg' }}
                        style={{ height: verticalScale(115), top: 0, zIndex: -20 }}
                    />
                ),
                headerLeft: () => (
                    <Pressable onPress={openDrawer}>
                        <View className=' mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#121212]  border  p-5 items-center justify-center'>
                        <ArrowLeft size="14px" stroke="white"/>
                        </View>
                    </Pressable>
                )
            }} />

            <View style={{ zIndex: 40 }} className="flex flex-row mt-20 items-end justify-between z-20">
                <Avatar
                    src={userProfile?.profile_image}
                    initials={userProfile?.name.at(0) || "S"}
                    width={50}
                    height={50}
                    containerStyle="z-40"
                />
                <Pressable className="text-white border border-[#EFEFEF4A] bg-[#EFEFEF1A] py-3 px-6 rounded-lg">
                    <Text className="text-white font-semibold">Edit Profile</Text>
                </Pressable>
            </View>

            <Text className="text-white text-3xl font-bold">{userProfile?.name}</Text>
            <Text className="text-lg text-light-grey">@{userProfile?.spotify_username}</Text>
            
            <View className="border border-[#EFEFEF33] rounded-lg px-4 py-3 my-4">
                <Text className="text-white font-medium text-xl mb-3">{userProfile?.bio || "Insert a bio"}</Text>

                <View className="flex flex-row gap-1 items-center">
                    <Calendar size="16px" stroke="#EFEFEF33"/>
                    <Text className="text-[#EFEFEF33] text-lg">
                        {userProfile?.created_at || "June " +new Date().getFullYear()}
                    </Text>
                </View>
            </View>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}      
                style={{ width: "100%" }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        activeColor="#000000"
                        inactiveColor="#ffffff"
                        
                        labelStyle={{ fontWeight: '600', textTransform: 'capitalize', fontSize: moderateScale(16) }}
                        style={{ 
                            backgroundColor: "#B3B3B31A",
                            borderWidth: 1,
                            borderColor: "#EFEFEF33",
                            borderRadius: 10,
                            marginBottom: 10,
                            padding: 5,
                        }}
                        contentContainerStyle={{ display: "flex", flexDirection: "row", gap: 10 }}
                        //tabStyle={{ flex: 0.5 }}
                        indicatorStyle={{ backgroundColor: "#1DB954", height: "100%", borderRadius: 10 }}
                        indicatorContainerStyle={{ margin: 7, marginRight: 10 }}
                        renderTabBarItem={(props) => (
                            <TabBarItem
                                {...props}
                                style={{ width: layout.width/(3.4) }}
                                
                            />
                        )}
                    />
                )}    
                
                
                    
            />
        </View>
    )
}