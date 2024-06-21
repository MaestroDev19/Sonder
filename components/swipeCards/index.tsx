import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Animated } from 'react-native';
import Avatar from "../avatar"
import { ProfileCardProps } from '../../types/types';
import { SharedValue } from 'react-native-reanimated';

const ProfileCard = (
    {
        headerImage,
        avatar,
        avatarInitials,
        userName,
        description,
        likedArtist,
        likedGenre,
        favoriteSong,
        favoriteArtist,
    }: ProfileCardProps
) => {
    return (
        <View className={styles.container}>
            <ImageBackground imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16}} source={{uri: headerImage}} className={styles.headerImage}>
                <Avatar src={avatar} initials={avatarInitials} containerStyle={"w-16 h-16 translate-y-8"} />
            </ImageBackground>
            {/* <Image
                source={{uri: 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg'}}
                className={styles.headerImage}
            /> */}
            <View className='mx-4'>
                <Text className={styles.userName}>
                    {userName}
                </Text>
                <Text className={styles.description}>
                    {description}
                </Text>
            </View>
            <View className={styles.likesContainer}>
                <Text className='font-bold text-white text-xl mb-4'>
                    Likes
                </Text>
                <View className={styles.row}>
                    {likedArtist.map((artist) => (
                        <View key={artist} className={styles.liked}>
                            <Text className={styles.likedText}>{artist}</Text>
                        </View>
                    ))}
                </View>
                <View className={styles.row}>
                    {likedGenre.map((genre) => (
                        <View key={genre} className={styles.liked}>
                            <Text className={styles.likedText}>{genre}</Text>
                        </View>
                    ))}
                </View>
                <Text className={styles.favoriteSong}>Favorite Song</Text>
                <View className='flex-row gap-x-4'>
                    <Image className="w-9 h-9 rounded-md" source={{ uri: favoriteSong.albumart}} />
                    <View>
                        <Text className="text-base font-bold text-white">{favoriteSong.songName}</Text>
                        <Text className="text-sm text-[#EFEFEF80]">{favoriteSong.songArtist}</Text>
                    </View>
                </View>
                <Text className={styles.favoriteArtist}>Favorite Artist</Text>
                <View className='flex-row gap-x-4'>
                    <Image className="w-9 h-9 rounded-md" source={{ uri: favoriteArtist.albumart }} />
                    <View>
                        <Text className="text-base font-bold text-white">{favoriteArtist.artist}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = {
    container: "bg-[#B3B3B31A] mt-5 rounded-2xl mx-5",
    headerImage: "w-full rounded-t-full h-28 flex-row justify-center items-end",
    userName: "text-4xl font-bold text-white mt-10",
    description: "mt-1 text-sm text-[#EFEFEF80]",
    likesContainer: "mt-4 mx-4 mb-8 border border-[#EFEFEF33] p-4 rounded-xl",
    row: "flex-row mb-2 ml-1 flex-wrap gap-y-2 w-full",
    liked: "mr-2 bg-[#12121280] rounded-[10px] border-[#B3B3B333] border px-2 py-1.5",
    likedText: "text-center text-[#EFEFEF]",
    favoriteSong: "mt-4 mb-2 font-bold text-white text-xl",
    favoriteArtist: "mt-2 mb-2 font-bold text-white text-xl",
};

export default ProfileCard;