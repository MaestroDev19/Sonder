import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { Animated, View, Dimensions, ViewStyle, FlatList } from 'react-native';
import { getHomeNavbarOptions } from '../../../components/navBar';
import NowPlaying from '../../../components/nowPlaying';
import { container } from './styles';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';
import ProfileCard from '../../../components/swipeCards';
import { ProfileCardProps } from '../../../types/types';
import { profileCards } from '../../../constants/profileCardsTemplate';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { PanResponder } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Page from '../../../components/page';
import useCurrentTrack from '../../../hooks/current-song';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const pan = useRef(new Animated.Value(0)).current;
    const carouselRef = useRef(null);

      
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [
            null,
            { dy: pan }
          ],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gestureState) => {
          const { dy } = gestureState;
          if (Math.abs(dy) > 100) {
            Animated.timing(pan, {
              toValue: dy > 0 ? height : -height,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              dy > 0 ? console.log(carouselRef.current.prev()) : carouselRef.current.next() // Reset position for potential reuse
              pan.setValue(0);
            });
          } else {
            Animated.spring(pan, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;
  

    const { isLoading, currentTrack, refreshTrack } = useCurrentTrack()
    useEffect(() => { 
        refreshTrack()
    }, [])
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
              <Animated.View
                style={{
                  transform: [{ translateY: pan }],
                }}
                {...panResponder.panHandlers}
              >
                <Carousel
                  ref={carouselRef}
                  loop
                  width={width}
                  height={height}
                  enabled={false}
                  autoPlay={false}
                  data={profileCards}
                  scrollAnimationDuration={1000}
                  onSnapToItem={(index) => console.log('current index:', index)}
                  renderItem={renderProfileCard}
                  />
              </Animated.View>

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
  )

export default Home;