import { ScrollView, View, Text } from "react-native";
import useFavouriteArtists from "../../hooks/favourite-artists";
import { Skeleton } from "../skeleton";
import { scale, verticalScale } from "react-native-size-matters";
import { Image } from "expo-image";


const FavouriteArtistsTab = () => {
    const { isLoading, favouriteArtists } = useFavouriteArtists();
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
                        </View>
                    </View>
                    ))
                }

            </ScrollView>
        </View>
    )
};


export default FavouriteArtistsTab