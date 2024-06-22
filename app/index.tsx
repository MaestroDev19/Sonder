import { Link, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View, Dimensions, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import useAccessToken from "../hooks/access-token";
interface SliderInfo {
  id: number;
  heading: string;
  body: string;
}
const content = [
  {
    id: 1,
    heading: "Make Music Friends",
    body: "Connect with people who share your musical soul...",
  },
  {
    id: 2,
    heading: "Find Your Vibe Tribe",
    body: "Discover a community of music lovers just like you...",
  },
  {
    id: 3,
    heading: "Spark a Connection",
    body: "Maybe even find your musical soulmate!",
  },
];
export default function Onboarding() {
  const router = useRouter();
  const [showPage, setShowPage] = useState<boolean|null>(null);
  const { accessToken } = useAccessToken()

  useEffect(() => {
    if (accessToken === undefined) return

    //True if access_token is not present meaning user is not logged in and shoould show onboarding, will fix later
    setShowPage(!!!accessToken)

  }, [accessToken])

  if (showPage === null) {
    return null
  }

  if (!showPage) {
    router.push('/home')
    return null
  }

  return (
    <AppIntroSlider
      data={content}
      renderItem={({ item }: { item: SliderInfo }) => {
        return (
          <View className="flex flex-1 justify-center items-start p-5 space-y-2">
            <Text className="text-white text-3xl">{item.heading}</Text>
            <Text className="text-white text-base w-2/3">{item.body}</Text>
          </View>
        );
      }}
      onDone={() => router.push('/login')}
    />
  )
}
