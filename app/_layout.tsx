// Import your global CSS file
import { Stack, useNavigationContainerRef } from "expo-router"
import "../global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import ErrorPage from "../components/error";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppState } from "react-native";
import { useSetOnlineStatus } from "../hooks/online-status";
import useCurrentUser from "../hooks/current-user";

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
  enableTimeToInitialDisplay: Constants.appOwnership !== "expo", // Only in native builds, not in Expo Go.
});

Sentry.init({
  dsn: "https://2fb0ea7fc6844754866e14b106f95d61@o4507575650418688.ingest.us.sentry.io/4507577953812480",
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      enableNativeFramesTracking: Constants.appOwnership !== "expo", // Only in native builds, not in Expo Go.
    }),
  ],
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});



function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const queryClient = new QueryClient();
  const { setStatusToOffline, setStatusToOnline } = useSetOnlineStatus();
  const { userProfile } = useCurrentUser();

  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      routingInstrumentation.registerNavigationContainer(ref);
    }
  }, [ref]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        await setStatusToOnline(userProfile?.id)
      } else if (nextAppState === "inactive" || nextAppState === "background") {
        await setStatusToOffline(userProfile?.id)
      }


      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [])
  
  return (
    <QueryClientProvider client={queryClient}>
      <Sentry.ErrorBoundary 
        fallback={ErrorPage}
        onError={(error) => Sentry.captureException(error)}  
      >
        <GestureHandlerRootView>
          <Toasts/>
          <StatusBar backgroundColor="#fff" style="light"/>
          <Stack 
            screenOptions={{
              contentStyle: {
                backgroundColor: "#121212",
              },
              headerShown: false,
            }}
          />
        </GestureHandlerRootView>
      </Sentry.ErrorBoundary>
    </QueryClientProvider>
  )
}

export default Sentry.wrap(RootLayout);