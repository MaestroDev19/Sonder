import { View } from 'react-native';
import { getHomeNavbarOptions } from '../navBar';
import NowPlaying from '../nowPlaying';
import { container } from './styles';
import { Drawer } from 'expo-router/drawer';
import useCurrentTrack from '../../hooks/current-song';
import { SwipeCardsContainer } from '../../components/swipeCardsContainer';
import { millisecondsToMSFormat } from '../../utils/functions';

export const HomePageLayout = () => {
    const { isLoading, currentTrack, currentTrackProgress } = useCurrentTrack();
    //const { refreshUser } = useCurrentUser()
  
    return (
      <View className={container}>
        <Drawer.Screen options={getHomeNavbarOptions()} />
  
        <View className='px-4'>
          <NowPlaying
            isLoading={isLoading}
            songName={currentTrack?.name || "--"}
            albumArtUrl={currentTrack?.image || 'https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg'} //Change default to green image
            artist={currentTrack?.artists.join(', ') || '--'}
            timestamp={millisecondsToMSFormat(currentTrackProgress)}
            device={currentTrack?.device.name || "N/A"}
            deviceType={currentTrack?.device.type || "Computer"}
            songID={currentTrack?.id || ""}
          />
        </View>
  
        <SwipeCardsContainer/>
  
      </View>
    );
     
}