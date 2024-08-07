import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../../components/sidebar';
import DrawerItems from '../../constants/DrawerItems';
import { AppState, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import useAccessToken from '../../hooks/access-token';
import SonderApi from '../../api';
import { Home, MessageCircle, Settings, Sparkle, UserRound } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import * as Sentry from "@sentry/react-native"
import { useSetOnlineStatus } from '../../hooks/online-status';
import useCurrentUser from '../../hooks/current-user';

export default function Layout() {
  const { refreshToken } = useAccessToken();
  const { setStatusToOffline, setStatusToOnline } = useSetOnlineStatus();
  const { userProfile } = useCurrentUser();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [userId, setUserId] = useState(userProfile?.id);




  useEffect(() => {
    const interceptor = SonderApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response && error.response.status === 401) {
          // Handle 401 error here, refresh access token
          await refreshToken()
          return
        } else {
          Sentry.captureException(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      SonderApi.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        await setStatusToOnline(userProfile?.id)
        setUserId(userProfile?.id)
      } else if (nextAppState === "inactive" || nextAppState === "background") {
        await setStatusToOffline(userId || userProfile?.id)
      }


      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [])


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Drawer
        drawerContent={(props) => {
          return <CustomDrawer {...props} containerStyle={{ paddingVertical: 0 }} />

        }}
        screenOptions={{
          drawerContentStyle: {
            backgroundColor: "#121212",
          },
          sceneContainerStyle: {
            backgroundColor: "#121212",
          },
          headerStyle: {
            backgroundColor: "#121212",
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      >
        {DrawerItems
        .filter((drawer) => {
          return drawer.name === "profile/index" || drawer.name === "chat/index" || drawer.name === "home/index" || drawer.name === "settings/index" || drawer.name === "sonar/index"
        })
        .map((drawer) => (
          <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              ...drawer.options,
              drawerIcon: () =>
                drawer.options.title === "Profile" ? (
                  <View className="w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center">
                    <UserRound stroke="white" />
                  </View>
                ) : drawer.options.title === "Chats" ? (
                  <View className="w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center">
                    <MessageCircle stroke="white" />
                  </View>
                ) : drawer.options.title === "Home" ? (
                  <View className="w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center">
                    <Home stroke="white" />
                  </View>
                ) : drawer.options.title === "Sonar" ? (
                  <View className="w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center">
                    <Sparkle stroke="white" />
                  </View>
                ) : 
                (
                  <View className="w-9 h-9 rounded-md border-[#EFEFEF33] bg-[#EFEFEF1A] p-1.5 items-center justify-center">
                    <Settings stroke="white" />
                  </View>
                ),
              drawerItemStyle: {
                borderWidth: 1,
                marginHorizontal: 0,
                borderColor: "#B3B3B333",
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
