import { ScrollView, View, Text, Pressable, Linking } from "react-native";
import { Skeleton } from "../skeleton";
import { scale, verticalScale } from "react-native-size-matters";
import { Image } from "expo-image";
import { FavouriteArtist } from "../../types/types";
import { SpotifyLink } from "../spotify-linking";

interface FavouriteArtistsProp {
    isLoading: boolean;
    favouriteArtists: FavouriteArtist[];
}


const FavouriteArtistsTab = ({ isLoading, favouriteArtists }: FavouriteArtistsProp) => {
    return (
        <View style={{ height: "75%" }}>
            <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, height: "100%" }}>
                {
                    isLoading ? 
                    <>
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton 
                                    style={{ marginBottom: verticalScale(10) }} 
                                    key={index} 
                                    height={verticalScale(60)} 
                                    width="100%"
                                />
                            ))
                        }
                    </>
                    :
                    favouriteArtists?.map((artist) => (
                    <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={artist.id}>
                        <Text className="text-white py-4 px-5 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                            {artist?.position}
                        </Text>
                        <Image source={{ uri: artist?.image }} style={{ width: scale(50), height: verticalScale(50), borderRadius: 6 }}/>
                        <View>
                            <Text className="text-white text-xl font-semibold whitespace-break-spaces">{artist.name}</Text>
                            <SpotifyLink 
                                style={{width: 110, height: 27, borderRadius: 30, backgroundColor: '#b3b3b31A'}} 
                                className='flex flex-row justify-center items-center' 
                                url={`https://open.spotify.com/artist/${artist.id}`}
                            >
                                <Image 
                                    source={require('../../assets/spotify-icons/spotify_white.png')} 
                                    style={{ width: 20, height: 20, marginRight: 7 }}
                                />
                                <Text className="text-white font-semibold">See Artist</Text>
                            </SpotifyLink>
                        </View>
                    </View>
                    ))
                }

            </ScrollView>
        </View>
    )
};


export default FavouriteArtistsTab