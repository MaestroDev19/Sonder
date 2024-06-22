import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Avatar from '../avatar';
import {iconContainer } from './styles';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import {welcome} from '../../api/endpoints/authentication'


export function getHomeNavbarOptions() {
    const navigation = useNavigation('/(screens)')
    return {
      headerLeft: () => (
        <TouchableOpacity className={iconContainer}  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Avatar src="https://upload.wikimedia.org/wikipedia/en/3/32/Frank_Ocean-Nostalgia_Ultra.jpeg" initials="S" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity className={iconContainer}>
          <Text className=''>Notifications</Text>
        </TouchableOpacity>
      ),
    };
  }