import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { getHomeNavbarOptions } from '../../components/navBar';
import NowPlaying from '../../components/nowPlaying';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { container } from './styles';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <View className={container}>
            <Drawer.Screen 
                options={getHomeNavbarOptions()}
             />
    
            <NowPlaying songName='The Last Year' albumArtUrl='https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg' artist='Jessica Pratt' timestamp='0:45' device='lenovo legion'/>
        </View>
    );
};

export default HomeScreen;