

export interface ProfileCardProps {
    headerImage: string;
    avatar: string;
    avatarInitials: string;
    userName: string;
    description: string;
    likedArtist: string[];
    // likedGenre: string[];
    favoriteSong: {
        albumart: string;
        songName: string;
        songArtist: string;
    };
    favoriteArtist: {
        albumart: string;
        artist: string
    }
}

export interface User {
    id: string,
    name: string,
    profile_image: string,
    email: string,
    created_at: null,
    bio: string,
    spotify_username: string
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


export enum AsyncStorageKeys {
    ACCESS_TOKEN = "access-token",
    REFRESH_TOKEN = "refresh-token",
}