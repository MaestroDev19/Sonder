import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import Avatar from "../../../components/avatar";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { ArrowLeft, Calendar } from "lucide-react-native";
import useFavouriteSongs from "../../../hooks/favourite-songs";
import { Image } from "expo-image";
import { scale, verticalScale } from "react-native-size-matters";
import useFavouriteArtists from "../../../hooks/favourite-artists";

const FirstRoute = () => {
    const { isLoading, favouriteSongs } = useFavouriteSongs();
    return (
        <ScrollView style={{ flex: 1, height: "100%" }} contentContainerClassName="pb-56">
            {
                isLoading ? <Text className="text-white">Loading</Text> :
                favouriteSongs?.map((track) => (
                <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={track.id}>
                    <Text className="text-white py-4 px-5 font-bold rounded-md border border-light-grey">
                        {track?.position}
                    </Text>
                    <Image source={{ uri: track?.image }} style={{ width: scale(50), height: verticalScale(50), borderRadius: 6 }}/>
                    <View>
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
    console.log(favouriteArtists)
    return (
        <ScrollView style={{ flex: 1, height: "100%" }} contentContainerClassName="pb-56">
            {
                isLoading ? <Text className="text-white">Loading</Text> :
                favouriteArtists?.map((artist) => (
                <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={artist.id}>
                    <Text className="text-white py-4 px-5 font-bold rounded-md border border-light-grey">
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

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
  
  
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
});

export default function ProfilePage() {
    const { userProfile, isLoading } = useCurrentUser();
    const layout = useWindowDimensions();

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
                headerLeft: () => (
                    <ArrowLeft stroke="white"/>
                )
            }} />
            <Avatar
                src={userProfile?.profile_image}
                initials={userProfile?.name.at(0) || "S"}
                width={50}
                height={50}
            />

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
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        style={{ 
                            backgroundColor: "#B3B3B31A",
                            borderWidth: 1,
                            borderColor: "#EFEFEF33",
                            borderRadius: 10,
                            marginBottom: 10,
                            padding: 7,
                        }}
                        contentContainerStyle={{ borderWidth: 1 }}
                        tabStyle={{ width: "auto", borderWidth: 1, borderColor: "red" }}
                        indicatorStyle={{ backgroundColor: "#1DB954" }}
                        indicatorContainerStyle={{ width: "100%" }}
                    />
                )}    
                
                    
            />
        </View>
    )
}