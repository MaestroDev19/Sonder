import React, { useEffect, useState } from 'react';
import { View, Dimensions, Pressable,Text } from 'react-native';
import { getHomeNavbarOptions } from '../../../components/navBar';
import NowPlaying from '../../../components/nowPlaying';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { container } from './styles';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import ProfileCard from '../../../components/swipeCards';
import { ProfileCardProps } from '../../../types/types';
import { profileCards } from '../../../constants/profileCardsTemplate';
import { FlatList } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Page from '../../../components/page';
import useCurrentTrack from '../../../hooks/current-song';

function millisecondsToMSFormat(milliseconds: number): string {
    // Calculate minutes and seconds from milliseconds
    const minutes = Math.floor(milliseconds / (1000 * 60)); // Minutes
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000); // Seconds
  
    // Format minutes and seconds with leading zeros
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
    // Combine minutes and seconds with colon separator
    return `${formattedMinutes}:${formattedSeconds}`;
}

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const { isLoading, currentTrack, refreshTrack, currentTrackProgress } = useCurrentTrack();

    return (
        <View className={container}>
            <Drawer.Screen options={getHomeNavbarOptions()} />

            <View className='px-4'>
                <NowPlaying
                    songName={currentTrack?.name || "The Last Year"}
                    albumArtUrl={currentTrack?.image || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg'}
                    artist={currentTrack?.artists.join(', ') || 'Jessica Pratt'}
                    timestamp={millisecondsToMSFormat(currentTrackProgress)}
                    device={currentTrack?.device.name || "Your Device"}
                />
            </View>

            <Carousel
                loop
                width={width}
                height={height}
                vertical
                autoPlay={false}
                data={profileCards}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={renderProfileCard}
            />
        </View>
    );
};

const renderProfileCard = ({ item }: { item: ProfileCardProps }) => (
    <ProfileCard
        headerImage={item.headerImage}
        avatar={item.avatar}
        avatarInitials={item.avatarInitials}
        userName={item.userName}
        description={item.description}
        likedArtist={item.likedArtist}
        likedGenre={item.likedGenre}
        favoriteSong={item.favoriteSong}
        favoriteArtist={item.favoriteArtist}
    />
);


export default HomeScreen;