import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Avatar from '../avatar';
import {iconContainer } from './styles';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Bell } from 'lucide-react-native';
import useCurrentUser from '../../hooks/current-user';
import { StyleSheet } from 'nativewind';


export function getHomeNavbarOptions() {
    const navigation = useNavigation('/(screens)')

    const { userProfile } = useCurrentUser();

    return {
      header: () => (
        <View className='flex items-center justify-between flex-row w-full px-4 py-5'>
          <TouchableOpacity  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Avatar width={50} height={50} className='h-10 w-10' src={userProfile?.profile_image || ""} initials="S" />
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-[#EFEFEF1A] p-3 rounded-xl border border-muted">
            <Bell stroke="white"/>
          </TouchableOpacity>
        </View>
      )
    };
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30
  }
})