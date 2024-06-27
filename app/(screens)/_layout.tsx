import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../../components/sidebar';
import DrawerItems from '../../constants/DrawerItems';
import { View, Button, Image, _View } from 'react-native';
import { Component, useEffect } from 'react';
import * as icons from '../../assets/svg/exports'
import useAccessToken from '../../hooks/access-token';
import SonderApi from '../../api';
import { Home, MessageCircle, Settings, UserRound } from 'lucide-react-native';


export default function Layout() {

  const { refreshToken } = useAccessToken()

  useEffect(() => {
    const interceptor = SonderApi.interceptors.response.use(
      response => {
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          // Handle 401 error here, refresh access token
          await refreshToken()
          return
        } 
        return Promise.reject(error);
      },
    );

    return () => {
      SonderApi.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={props => <CustomDrawer {...props} containerStyle={{ paddingVertical: 0 }} />}
        screenOptions={{
          drawerContentStyle: {
            backgroundColor: "#121212",
          },
          sceneContainerStyle: {
            backgroundColor: "#121212"
          },
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      >
        {DrawerItems.map(drawer => (
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              ...drawer.options,
              drawerIcon: () =>
                drawer.options.title === 'Profile' ?
                  <View className='w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center' >
                    <UserRound stroke="white"/>
                  </View>
              : drawer.options.title === 'Chats' ?
                  <View className='w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center' >
                    <MessageCircle stroke="white"/>
                  </View>
              : drawer.options.title === 'Home' ?
                  <View className='w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center' >
                    <Home stroke="white"/>
                  </View>
              : 
                <View className='w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center' >
                  <Settings stroke="white"/>
                </View>,
              drawerItemStyle: {
                borderWidth: 1,
                marginHorizontal: 0,
                borderColor: '#B3B3B333',
                borderRadius: 10,
                padding: 5,
                flex: 1,
              },
              drawerActiveTintColor: "#121212",
            }}
          />
        ))}
      </Drawer>

    </GestureHandlerRootView>
  );
}
