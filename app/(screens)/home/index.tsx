import React from 'react';
import { useState, useRef } from 'react';
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
import { PanGestureHandler } from 'react-native-gesture-handler';
import { PanResponder } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Page from '../../../components/page';
import useCurrentTrack from '../../../hooks/current-song';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [swipeDirection, setSwipeDirection] = useState(null);
    const animationDuration = 500;
    const carouselRef = useRef(null);
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // Detect swipe gesture
          return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
        },
        onPanResponderRelease: (evt, gestureState) => {
          // Determine swipe direction
          if (gestureState.dy < -20) {
            // Swipe up
            carouselRef.current.next();
          } else if (gestureState.dy > 20) {
            // Swipe down
            carouselRef.current.prev();
          }
        }
      })
    ).current;

    // const delayAnimation = useRef(new Animated.Value(0)).current;
  
    // const handleSnapToItem = (index) => {
    //   console.log('current index:', index);
    //   // You can update the swipe direction here based on the index change.
    // };
  
    // const handlePanGesture = (event) => {
    //   const { translationX, translationY } = event.nativeEvent;
  
    //   // Determine the swipe direction
    //   if (Math.abs(translationX) > Math.abs(translationY)) {
    //     // Horizontal swipe (left or right)
    //     setSwipeDirection(translationX > 0 ? 'right' : 'left');
    //   } else {
    //     // Vertical swipe (up or down)
    //     setSwipeDirection(translationY > 0 ? 'down' : 'up');
    //   }
    // };
  
    // const renderProfileCard = ({ item }: { item: ProfileCardProps }) => {
  
    // //   const delay = swipeDirection ? animationDuration : 0;
    // //   Animated.timing(delayAnimation, {
    // //     toValue: 1,
    // //     duration: delay,
    // //     useNativeDriver: true,
    // //   }).start();
  
    //   return (
    //     <ProfileCard
    //         headerImage={item.headerImage}
    //         avatar={item.avatar}
    //         avatarInitials={item.avatarInitials}
    //         userName={item.userName}
    //         description={item.description}
    //         likedArtist={item.likedArtist}
    //         likedGenre={item.likedGenre}
    //         favoriteSong={item.favoriteSong}
    //         favoriteArtist={item.favoriteArtist}
    //         swipeDirection={"up"}
    //         height={height}
    //     />
    //   );
    // };
  

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
            <View {...panResponder.panHandlers}>
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
            </View>
                {/* <Carousel
                    loop
                    width={width}
                    height={height}
                    vertical
                    autoPlay={false}
                    data={profileCards}
                    scrollAnimationDuration={animationDuration}
                    onSnapToItem={handleSnapToItem}
                    renderItem={renderProfileCard}
                /> */}
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


export default Home;