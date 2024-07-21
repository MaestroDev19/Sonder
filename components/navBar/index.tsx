import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Avatar from '../avatar';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Bell } from 'lucide-react-native';
import useCurrentUser from '../../hooks/current-user';
import { Skeleton } from '../skeleton';


export function getHomeNavbarOptions() {
  const navigation = useNavigation('/(screens)');
  const router = useRouter()

  const { userProfile, isLoading } = useCurrentUser();

  return {
    header: () => (
      <View className='mt-10 flex items-center justify-between flex-row w-screen px-4 py-5'>
        {
          isLoading ? <Skeleton borderRadius={999} width={50} height={50}/> :
          <TouchableOpacity  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Avatar 
              width={50} 
              height={50} 
              className='h-10 w-10' 
              src={userProfile?.profile_image || ""} 
              initials={userProfile?.name.at(0) || "S"}
            />
          </TouchableOpacity>
        }
        
        <TouchableOpacity 
          onPress={() => router.push('/friend-requests')} 
          className="bg-[#EFEFEF1A] p-3 rounded-xl border border-muted"
        >
          <Bell stroke="white"/>
        </TouchableOpacity>
      </View>
    )
  };
}