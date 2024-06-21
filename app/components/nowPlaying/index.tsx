import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from './styles'
import { useQuery } from '@tanstack/react-query';
import { getCurrentlyPlaying } from '../../api/endpoints/user';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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

    const {data: currentlyPlaying} = useQuery({
        queryKey: ['currentlyPlaying'],
        queryFn: () => getCurrentlyPlaying('NG', 'BQDM50xZPB4FhHNlaOoV7TtS0XeMEbUI1HjkVaYF65B7fR18f0_oyQsNHuVB6emzG8yE4nbEJKFZh_E1len_Kw4K7qC3T-XiyT0d0PQkomjqHDDrIF1B9Ra9YNgu7eGoJwK4RNdJ6zUanNGSFNxujmqvrBFMyk9aP3DJYg-_h1_iG3SYFWiM8M-M49Mh4W9To8Gf1vKmRVWQSJEew2Ktujv3zG6aQISdIorDfqaW')
    });

    return (
        <View className={styles.container}>
            <View className={styles.row}>
                <View className={styles.leftColumn}>
                    <Text className={styles.songName}>{currentlyPlaying?.data.name}</Text>
                    <Text className={styles.artist}>{artist}</Text>
                </View>
                <Image className={styles.albumArt} source={{ uri: currentlyPlaying?.data.image }} />
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