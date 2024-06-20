

export interface ProfileCardProps {
    headerImage: string;
    avatar: string;
    avatarInitials: string;
    userName: string;
    description: string;
    likedArtist: string[];
    likedGenre: string[];
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

export enum AsyncStorageKeys {
    ACCESS_TOKEN = "access-token",
    REFRESH_TOKEN = "refresh-token",
}