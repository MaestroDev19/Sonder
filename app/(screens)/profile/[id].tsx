import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Page from "../../../components/page";
import useCurrentUser from "../../../hooks/current-user";
import Avatar from "../../../components/avatar";
import { SceneMap, TabBar, TabBarItem, TabView } from "react-native-tab-view";
import { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { Activity, ArrowLeft, Calendar } from "lucide-react-native";
import useFavouriteSongs from "../../../hooks/favourite-songs";
import { Image, ImageBackground } from "expo-image";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import useFavouriteArtists from "../../../hooks/favourite-artists";
import useDrawer from "../../../hooks/drawer";
import useFavouriteGenres from "../../../hooks/favourite-genres";
import useUserProfile from "../../../hooks/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import useFriends from "../../../hooks/friends";
import { cn } from "../../../lib/utils";
import FavoriteSongs from "../../../components/profile/songs";
import FavouriteArtists from "../../../components/profile/artists";
import FavouriteGenres from "../../../components/profile/genres";
import { couldStartTrivia } from "typescript";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import useCheckRequestStatus from "../../../hooks/check-request-status";
import { saveFriendRequestSent } from "../../../utils/functions";
import CustomBackButton from "../../../components/CustomBackButton";

const FavouriteSongsTab = () => {
  const { id } = useLocalSearchParams();
  const {
    favouriteSongsLoading: isLoading,
    userFavouriteSongs: favouriteSongs,
  } = useFavouriteSongs(id as string);

  return (
    <FavoriteSongs isLoading={isLoading} favouriteSongs={favouriteSongs} />
  );
};

const FavouriteArtistsTab = () => {
  const { id } = useLocalSearchParams();
  const {
    favouriteArtistsLoading: isLoading,
    userFavouriteArtists: favouriteArtists,
  } = useFavouriteArtists(id as string);

  return (
    <FavouriteArtists
      isLoading={isLoading}
      favouriteArtists={favouriteArtists}
    />
  );
};

const FavouriteGenresTab = () => {
  const { id } = useLocalSearchParams();
  const {
    favouriteGenresLoading: isLoading,
    userFavouriteGenres: favouriteGenres,
  } = useFavouriteGenres(id as string);

  return (
    <FavouriteGenres isLoading={isLoading} favouriteGenres={favouriteGenres} />
  );
};

const renderScene = SceneMap({
  songs: FavouriteSongsTab,
  artists: FavouriteArtistsTab,
  genres: FavouriteGenresTab,
});

export default function ProfilePage() {
  const { id } = useLocalSearchParams();
  const { userProfile, isLoading } = useUserProfile(id as string);
  const { userProfile: currentUser } = useCurrentUser();
  const layout = useWindowDimensions();
  const { openDrawer } = useDrawer();
  const router = useRouter();
  const [requestFirstSent, setRequestFirstSent] = useState(false);

  const {
    addFriendMutation,
    friendRequests,
    acceptFriendRequestMutation,
    isFriend,
    isFriendLoading,
  } = useFriends(id as string);
  const requestSent = useCheckRequestStatus(currentUser.id, id, isFriend);

  const friendRequestPresent = friendRequests.data?.find((request) => {
    return (
      request.friend_id === currentUser.id && request.user_id === (id as string)
    );
  });

  // useEffect(() => {
  //     const checkRequestStatus = async () => {
  //         if (!isFriend) {
  //         const requestAlreadySent = await checkIfFriendRequestSent(currentUser.id, id as string);
  //         setRequestSent(requestAlreadySent);
  //         }  else {
  //             // If they are now friends, then the request not pending anymore
  //             setRequestSent(false);
  //         }

  //     };

  //     checkRequestStatus();
  // }, [currentUser.id, id, isFriend]);

  // Function to save that a friend request has been sent
  //     async function saveFriendRequestSent(currentUser_id, friend_id) {
  //   try {
  //     const key = `friendRequest-${currentUser_id}-${friend_id}`;
  //     await AsyncStorage.setItem(key, 'sent');
  //     console.log('Friend request status saved');
  //   } catch (error) {
  //     console.error('Error saving friend request status', error);
  //   }
  // }

  // Function to check if a friend request has been sent
  // async function checkIfFriendRequestSent(currentUser_id, friend_id) {
  //     try {
  //       const key = `friendRequest-${currentUser_id}-${friend_id}`;
  //       const value = await AsyncStorage.getItem(key);
  //       if(value !== null) {
  //         // Value retrieved
  //         console.log('Friend request status:', value);
  //         return true;
  //       }
  //       // No value found
  //       return false;
  //     } catch (error) {
  //       console.error('Error retrieving friend request status', error);
  //       return false;
  //     }
  //   }

  const handleProfileAction = async () => {
    if (isFriend) {
      return null; //Do nothing
    }

    if (!!!friendRequestPresent) {
      try {
        await addFriendMutation.mutateAsync({ friend_id: id as string });
        await saveFriendRequestSent(currentUser.id, id as string);
        setRequestFirstSent(true);
        // Update button label on success
      } catch (error) {
        console.error("Failed to add friend:", error);
      }
      return;
    }

    return await acceptFriendRequestMutation.mutateAsync({
      user_id: id as string,
    });
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "songs", title: "Songs" },
    { key: "artists", title: "Artists" },
    { key: "genres", title: "Genres" },
  ]);

  if (isLoading) {
    return (
      <Page className="flex flex-row items-center justify-center">
        <Drawer.Screen
          options={{
            headerBackground: () => null,
            headerLeft: () => <CustomBackButton forcedDestination={"/home"} />,
          }}
        />
        <ActivityIndicator size="large" color="#1DB954" />
      </Page>
    );
  }

  return (
    <View className="px-3 h-screen w-screen">
      <Drawer.Screen
        options={{
          headerBackground: () => (
            <ImageBackground
              source={{
                uri:
                  userProfile?.banner ||
                  "https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg",
              }}
              style={{ height: verticalScale(115), top: 0, zIndex: -20 }}
            />
          ),
          headerLeft: () => (
            <Pressable onPress={openDrawer}>
              <View className=" mt-6  ml-6 w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#121212]  border  p-5 items-center justify-center">
                <ArrowLeft size="14px" stroke="white" />
              </View>
            </Pressable>
          ),
        }}
      />

      <View
        style={{ zIndex: 40 }}
        className="flex flex-row mt-20 items-end justify-between z-20"
      >
        <Avatar
          src={userProfile?.profile_image}
          initials={userProfile?.name.at(0) || "S"}
          width={50}
          height={50}
          containerStyle="z-40"
        />
        {currentUser?.id === id ? (
          <Pressable className="text-white border border-[#EFEFEF4A] bg-[#EFEFEF1A] py-3 px-6 rounded-lg">
            <Text className="text-white font-semibold">Edit Profile</Text>
          </Pressable>
        ) : (
          <Pressable
            disabled={
              isFriendLoading ||
              acceptFriendRequestMutation.isPending ||
              addFriendMutation.isPending ||
              requestSent ||
              requestFirstSent
            }
            className={cn(
              "text-white disabled:opacity-50 bg-primary py-3 px-6 rounded-lg",
              isFriend && "bg-green-800/50"
            )}
            onPress={handleProfileAction}
          >
            <Text
              className={cn(
                "text-black font-semibold",
                isFriend && "text-primary"
              )}
            >
              {isFriend
                ? "Friends"
                : requestFirstSent || requestSent === true
                ? "Requested"
                : !!!friendRequestPresent
                ? "Add Friend"
                : "Accept Request"}
            </Text>
          </Pressable>
        )}
      </View>

      <Text className="text-white text-3xl font-bold">{userProfile?.name}</Text>
      <Text className="text-lg text-light-grey">
        @{userProfile?.spotify_username}
      </Text>

      <View className="border border-[#EFEFEF33] rounded-lg px-4 py-3 my-4">
        <Text className="text-white font-medium text-xl mb-3">
          {userProfile?.bio || "Insert a bio"}
        </Text>

        <View className="flex flex-row gap-1 items-center">
          <Calendar size="16px" stroke="#EFEFEF33" />
          <Text className="text-[#EFEFEF33] text-lg">
            Joined{" "}
            {userProfile?.created_at || "June " + new Date().getFullYear()}
          </Text>
        </View>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ width: "100%" }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor="#000000"
            inactiveColor="#ffffff"
            labelStyle={{
              fontWeight: "600",
              textTransform: "capitalize",
              fontSize: moderateScale(16),
            }}
            style={{
              backgroundColor: "#B3B3B31A",
              borderWidth: 1,
              borderColor: "#EFEFEF33",
              borderRadius: 10,
              marginBottom: 10,
              padding: 5,
            }}
            contentContainerStyle={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
            //tabStyle={{ flex: 0.5 }}
            indicatorStyle={{
              backgroundColor: "#1DB954",
              height: "100%",
              borderRadius: 10,
            }}
            indicatorContainerStyle={{ margin: 7, marginRight: 10 }}
            renderTabBarItem={(props) => (
              <TabBarItem {...props} style={{ width: layout.width / 3.4 }} />
            )}
          />
        )}
      />
    </View>
  );
}
