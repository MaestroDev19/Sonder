import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles'
import { Image } from 'expo-image';
import { scale, verticalScale } from 'react-native-size-matters';

interface NowPlayingProps {
    songName: string;
    artist: string;
    albumArtUrl: string;
    timestamp: string;
    device: string;
}

const row = "flex flex-row items-center justify-between mb-2"
const leftColumn = "flex-1"
const songName = "text-lg font-bold text-white"
const artist = "text-sm text-[#EFEFEF80]"
const albumArt = "w-10 h-10 rounded-lg"
const timestamp = "text-sm text-[#EFEFEF80]"
const device = "text-sm text-white"
const divider = "h-px  mb-2"

const NowPlaying: React.FC<NowPlayingProps> = ({
    songName,
    artist,
    albumArtUrl,
    timestamp,
    device,
}) => {
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
                <Text className="text-white font-semibold">{device}</Text>
                <Text style={styles.text}>{timestamp}</Text>
            </View>
        </View>
    );
};


export default NowPlaying;