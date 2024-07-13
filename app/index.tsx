import { Link, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import useAccessToken from "../hooks/access-token";
import { SafeAreaProvider } from "react-native-safe-area-context";
interface SliderInfo {
  id: number;
  heading: string;
  body: string;
}
const content = [
  {
    id: 1,
    heading: "Make music friends",
    body: "Connect with people who share your musical soul",
  },
  {
    id: 2,
    heading: "Find your vibe tribe",
    body: "Discover a community of music lovers ",
  },
  {
    id: 3,
    heading: "Spark a connection",
    body: "Maybe even find your musical soulmate",
  },
];
export default function Onboarding() {
  const router = useRouter();
  const [showPage, setShowPage] = useState<boolean | null>(null);
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (accessToken === undefined) return;

    //True if access_token is not present meaning user is not logged in and shoould show onboarding, will fix later
    setShowPage(!!!accessToken);
  }, [accessToken]);

  if (showPage === null) {
    return null;
  }

  if (!showPage) {
    router.push("/home");
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppIntroSlider
        data={content}
        bottomButton={true}
        showNextButton={true}
        dotStyle={{
          backgroundColor: "#A8A29E",
          width: 40,
          height: 5,
        }}
        activeDotStyle={{
          backgroundColor: "#1DB954",
          width: 20,
          height: 5,
        }}
        renderItem={({ item }: { item: SliderInfo }) => {
          return (
            <View className="flex flex-1 bg-background justify-center items-start p-5 space-y-2">
              <Text
                className=" tracking-widest leading-10  Poppins_400Regular text-muted-foreground "
                style={{ fontSize: 16 }}
              >
                {item.heading}
              </Text>
              <Text
                className="text-foreground font-Poppins_600SemiBold  dark:muted-foreground font-semibold tracking-widest "
                style={{
                  fontSize: 36,
                  lineHeight: 40,
                }}
              >
                {item.body}
              </Text>
            </View>
          );
        }}
        onDone={() => router.push("/login")}
        renderNextButton={() => {
          return (
            <View className="p-5 flex flex-1 bg-primary">
              <Text
                className="text-center font-Poppins_500Medium"
                style={{ fontSize: 16 }}
              >
                Next
              </Text>
            </View>
          );
        }}
        renderDoneButton={() => {
          return (
            <View className="p-5 flex flex-1 bg-primary">
              <Text
                className="text-center font-Poppins_500Medium"
                style={{ fontSize: 16 }}
              >
                Get started
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaProvider>
  );
}
