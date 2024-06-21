import React from 'react';
import { View, Dimensions } from 'react-native';
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

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const { isLoading, currentTrack } = useCurrentTrack()
    console.log(currentTrack)

    return (
        <View className={container}>
            <Drawer.Screen options={getHomeNavbarOptions()} />

            <View className='px-4'>
                <NowPlaying
                    songName={currentTrack?.name || "The Last Year"}
                    albumArtUrl={currentTrack?.image || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg'}
                    artist={currentTrack?.artists.join(', ') || 'Jessica Pratt'}
                    timestamp='0:45'
                    device='Your Phone'
                />
            </View>
            {/* <ProfileCard
                headerImage={profileCards[0].headerImage}
                avatar={profileCards[0].avatar}
                avatarInitials={profileCards[0].avatarInitials}
                userName={profileCards[0].userName}
                description={profileCards[0].description}
                likedArtist={profileCards[0].likedArtist}
                likedGenre={profileCards[0].likedGenre}
                favoriteSong={profileCards[0].favoriteSong}
                favoriteArtist={profileCards[0].favoriteArtist}
            /> */}

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