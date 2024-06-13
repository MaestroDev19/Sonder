import { Link } from "expo-router";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React from "react";
import { View, Dimensions, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
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
  const [homeState, setHomeState] = React.useState(false);
  if (!homeState) {
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
        onDone={() => {
          setHomeState(true);
        }}
      />
    );
  }
  return (
    <View className={"flex flex-1 justify-center items-center"}>
      <Text className="text-white">
        <Link href={"/screens/homeScreen"}>Home</Link>
      </Text>
    </View>
  );
}
