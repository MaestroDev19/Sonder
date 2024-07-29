import { ScrollView, View, Text, Pressable, Modal, FlatList, Linking } from "react-native";
import { Skeleton } from "../skeleton";
import { scale, verticalScale } from "react-native-size-matters";
import { Image } from "expo-image";
import {useState} from "react";
import { FavouriteTrack } from "../../types/types";
import { SpotifyLink } from "../spotify-linking";
import {Dropdown} from "react-native-element-dropdown"

interface FavouriteSongsProp {
    isLoading: boolean;
    favouriteSongs: FavouriteTrack[];
}

const FavoriteSongsTab = ({ isLoading, favouriteSongs }: FavouriteSongsProp) => {
     const data = [
        { label: 'Listen on Spotify', value: 'open_spotify' },
        { label: 'Preview', value: 'preview' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const handleDropdownChange = (trackId) => {
        if (value === 'open_spotify') {
            Linking.openURL(`https://open.spotify.com/track/${trackId}`);
        } else if (value === 'preview') {
            // play track
        }
    }

    return (
        <View style={{ height: "75%" }}>
            <ScrollView className="border border-[#EFEFEF4A] p-4 rounded-lg" style={{ flex: 1, height: "80%" }}>
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
                    favouriteSongs?.map((track) => (
                    <View className="bg-[#B3B3B31A] rounded-md flex flex-row gap-4 items-center p-3 border border-[#EFEFEF33] mb-4" key={track.id}>
                        <Text className="text-white py-4 px-5 font-bold rounded-md border border-[#EFEFEF4A] bg-[#B3B3B31A]">
                            {track?.position}
                        </Text>
                        <Image source={{ uri: track?.image }} style={{ width: scale(50), height: verticalScale(50), borderRadius: 6 }}/>
                        <View className="w-[60%] flex flex-col gap-0.5">
                            <Text className="text-white text-xl font-semibold whitespace-break-spaces">{track.name}</Text>
                            <Text className="text-light-grey">{track.artists.map((artist) => artist.name).join(', ')}</Text>
                            {/* <SpotifyLink url={`https://open.spotify.com/track/${track.id}`}>
                                <Text className="text-green-400">Listen on Spotify</Text>
                            </SpotifyLink> */}
                            <Dropdown
                            style={{width: 150, height:10}}
                            data={data}
                            maxHeight={150}
                            labelField="label"
                            valueField="value"
                            placeholder={'...'}
                            value={'...'}
                            containerStyle={{backgroundColor: '#B3B3B3', borderRadius: 10}}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                                handleDropdownChange(track.id);
                            }}
                            />
                        </View>
                        

                    </View>
                    ))
                }

            </ScrollView>

        </View>
    )
};


export default FavoriteSongsTab;