import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from './styles'

interface NowPlayingProps {
    songName: string;
    artist: string;
    albumArtUrl: string;
    timestamp: string;
    device: string;
}

const NowPlaying: React.FC<NowPlayingProps> = ({
    songName,
    artist,
    albumArtUrl,
    timestamp,
    device,
}) => {
    return (
        <View className={styles.container}>
            <View className={styles.row}>
                <View className={styles.leftColumn}>
                    <Text className={styles.songName}>{songName}</Text>
                    <Text className={styles.artist}>{artist}</Text>
                </View>
                <Image className={styles.albumArt} source={{ uri: albumArtUrl }} />
            </View>
            <View className={styles.divider}></View>
            <View className={styles.row}>
                <Text className={styles.device}>{device}</Text>
                <Text className={styles.timestamp}>{timestamp}</Text>
            </View>
        </View>
    );
};


export default NowPlaying;