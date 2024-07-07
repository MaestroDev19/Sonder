

export interface ProfileCardProps {
    headerImage: string;
    avatar: string;
    avatarInitials: string;
    userName: string;
    description: string;
    likedArtist?: string[];
    likedGenre: string[];
    favoriteSong: FavouriteTrack;
    favoriteArtist: FavouriteArtist,
    onPress?: () => void
}

export interface SimilarUser {
    artist: FavouriteArtist
    banner: string|null,
    bio: string,
    id: string,
    likes: string[],
    name: string,
    profile_image: string,
    spotify_username: string,
    track: FavouriteTrack
}

export interface User {
    id: string,
    name: string,
    profile_image: string,
    email: string,
    created_at: null,
    bio: string,
    spotify_username: string,
    friend_count: number,
    banner: string,
    country: string
}

export interface CurrentTrack {
    artists: string[],
    duration: number,
    image: string,
    is_playing: boolean,
    name: string,
    progress: number,
    device: {
        name: string,
        type: string
    }
}

export interface FavouriteTrack {
    id: string,
    name: string,
    image: string,
    preview_url: string,
    position: number
    artists: {
        name: string,
        id: string,
        image: string
    }[]
}

export interface FavouriteArtist {
    position: number
    name: string,
    id: string,
    image: string
}

export interface FriendRequest {
    sender_username: string,
    sender_avatar: string,
    user_id: string,
    friend_id: string,
    created_at: string
}

export type StorageFolder = "banners"|"avatars"|"images"


export enum AsyncStorageKeys {
    ACCESS_TOKEN = "access-token",
    REFRESH_TOKEN = "refresh-token",
}

export enum ReactQueryKeys {
    FRIEND_REQUESTS = "friend-requests",
    CURRENT_USER = "current-user",
    CURRENT_TRACK = "current-track",
    SIMILAR_USERS = "similar-users"
}