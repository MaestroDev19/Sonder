import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles'
import { Image } from 'expo-image';
import { scale, verticalScale } from 'react-native-size-matters';
import { Computer, Laptop } from 'lucide-react-native';
import { Skeleton } from '../skeleton';

interface NowPlayingProps {
    songName: string;
    artist: string;
    albumArtUrl: string;
    timestamp: string;
    device: string;
    deviceType: string,
    isLoading: boolean
}

const row = "flex flex-row items-center justify-between mb-2"
const leftColumn = "flex-1"
const songName = "text-lg font-bold text-white"
const artist = "text-sm text-[#EFEFEF80]"
const albumArt = "w-10 h-10 rounded-lg"
const timestamp = "text-sm text-[#EFEFEF80]"
const device = "text-sm text-white"
const divider = "h-px  mb-2"

const SKELETON_HEIGHT = 15

const NowPlaying: React.FC<NowPlayingProps> = ({
    songName,
    artist,
    albumArtUrl,
    timestamp,
    device,
    deviceType,
    isLoading
}) => {

    const renderIcon = {
        'computer': <Laptop stroke="#1DB954"/>
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <View className='flex flex-col w-[60%] gap-3'>
                        <Skeleton width={"100%"} height={SKELETON_HEIGHT}/>
                        <Skeleton width={"60%"} height={SKELETON_HEIGHT}/>
                    </View>
                    <Skeleton width={scale(40)} height={verticalScale(40)} borderRadius={5}/>
                </View>
                <View style={styles.divider}/>
                <View style={styles.row}>
                    <Skeleton width={"60%"} height={SKELETON_HEIGHT}/>
                    <Skeleton width={"10%"} height={SKELETON_HEIGHT}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View className='max-w-[90%]'>
                    <Text className="text-white text-xl font-semibold">{songName}</Text>
                    <Text style={styles.text}>{artist}</Text>
                </View>
                <Image style={{ borderRadius: 5, width: scale(40), height: verticalScale(40) }} source={{ uri: albumArtUrl }} />
            </View>
            <View style={styles.divider}></View>
            <View style={styles.row}>
                <View className='flex items-center flex-row gap-1'>
                    {renderIcon[deviceType.toLowerCase()]}
                    <Text className="text-white font-semibold">{device}</Text>
                </View>
                <Text style={styles.text}>{timestamp}</Text>
            </View>
        </View>
    );
};


export default NowPlaying;