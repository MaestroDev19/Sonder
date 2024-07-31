import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import Avatar from "../../../components/avatar";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { ArrowLeft, Calendar } from "lucide-react-native";
import { ImageBackground } from "expo-image";
import { moderateScale, verticalScale } from "react-native-size-matters";
import useDrawer from "../../../hooks/drawer";
import { Link } from "expo-router";

import FavouriteSongs from "../../../components/profile/songs";
import FavouriteArtists from "../../../components/profile/artists";
import FavouriteGenres from "../../../components/profile/genres";
import useFavouriteSongs from "../../../hooks/favourite-songs";
import useFavouriteGenres from "../../../hooks/favourite-genres";
import useFavouriteArtists from "../../../hooks/favourite-artists";


const FavouriteSongsTab = () => {
    const { isLoading, favouriteSongs } = useFavouriteSongs();

    return <FavouriteSongs isLoading={isLoading} favouriteSongs={favouriteSongs} />
};
  
const FavouriteArtistsTab = () => {
    const { isLoading, favouriteArtists } = useFavouriteArtists();

    return <FavouriteArtists isLoading={isLoading} favouriteArtists={favouriteArtists} />
};

const FavouriteGenresTab = () => {
    const { isLoading, favouriteGenres } = useFavouriteGenres();
    console.log(favouriteGenres)

    return <FavouriteGenres isLoading={isLoading} favouriteGenres={favouriteGenres} />
};


  
  
const renderScene = SceneMap({
    first: FavouriteSongsTab,
    second: FavouriteArtistsTab,
    third: FavouriteGenresTab
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
                        source={{ uri: userProfile?.banner || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg' }}
                        style={{ height: verticalScale(115), top: 0, zIndex: -20 }}
                        contentPosition="center"
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
                <Link href="/profile/edit" className="text-white border border-[#EFEFEF4A] bg-[#EFEFEF1A] py-3 px-6 rounded-lg">
                    <Text className="text-white font-semibold">Edit Profile</Text>
                </Link>
            </View>

            <Text className="text-white text-3xl font-bold">{userProfile?.name}</Text>
            <Text className="text-lg text-light-grey">@{userProfile?.spotify_username}</Text>
            
            <View className="border border-[#EFEFEF33] rounded-lg px-4 py-3 my-4">
                <Text className="text-white font-medium text-xl mb-3">{userProfile?.bio || "Insert a bio"}</Text>

                <View className="flex flex-row gap-1 items-center">
                    <Calendar size="16px" stroke="#EFEFEF33"/>
                    <Text className="text-[#EFEFEF33] text-lg">
                        Joined {userProfile?.created_at || "June " +new Date().getFullYear()}
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