import Carousel from 'react-native-reanimated-carousel';
import { Animated, Dimensions, PanResponder, View } from 'react-native';
import { useRef } from 'react';
import ProfileCard from '../swipeCards';
import { SimilarUser } from '../../types/types';
import { useQuery } from '@tanstack/react-query';
import SonderApi from '../../api';
import { Skeleton } from '../skeleton';
import { useRouter } from 'expo-router';
import { createSentrySpan } from '../../sentry/spans';
import defaultBanner from '../../constants/banner';
import useCurrentUser from '../../hooks/current-user';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export const SwipeCardsContainer = () => {

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
            dy > 0 ? carouselRef.current.prev() : carouselRef.current.next()
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

  const { userProfile } = useCurrentUser();
  const { isLoading, data: similarUsers } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await createSentrySpan("similar-users", async () => {
        const response = await SonderApi.get('/users', {
          params: {
            user_id: userProfile?.id
          }
        });
        const profiles = response.data.data as SimilarUser[]
        return profiles
      }) as SimilarUser[]

      return res
    },
    enabled: !!userProfile,
  })

  const router = useRouter();


  if (isLoading || !userProfile) {
    return (
      <View className='px-4 my-7 h-[600px]'>
        <Skeleton
          width={"100%"}
          height={"90%"}
          borderRadius={10}
        />
      </View>
    )
  }

  
  return (
    // <View>
    //   <View style={{height: height, width: width, overflow: "hidden" }}>
    //     <Animated.View
    //       style={{
    //       transform: [{ translateY: pan }],
    //       }}
    //       {...panResponder.panHandlers}
    //     >
          <Carousel
            ref={carouselRef}
            loop
            width={width}
            height={height}
            // enabled={false}
            vertical
            autoPlay={false}
            data={isLoading ? [] : similarUsers!}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => 
              <RenderProfileCard 
                item={item}
                onPress={() => router.push(`/profile/${item.id}`)}
              />
            }
          />
    //     </Animated.View>
    //   </View>
    // </View>
  )
}

const RenderProfileCard = ({ item, onPress }: { item: SimilarUser, onPress?: () => void }) => {

  return (
    <ProfileCard
      onPress={onPress}
      headerImage={item.banner || defaultBanner}
      avatar={item.profile_image}
      avatarInitials={item.name.at(0)}
      userName={item.spotify_username}
      description={item.bio.replace(/\n(\r\n|\n|\r)/gm,"").trim()}
      likedGenre={item.likes}
      favoriteSong={item.track}
      favoriteArtist={item.artist}
      userId={item.id}
    />
  )
}
