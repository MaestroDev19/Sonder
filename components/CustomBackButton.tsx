import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

const CustomBackButton = ({ forcedDestination = null, className = "" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleBackPress = () => {
    if (forcedDestination) {
      router.push(forcedDestination);
    } else if (pathname.startsWith("/chat/")) {
      router.push("/chat");
    } else if (pathname.startsWith("/profile/")) {
      router.push("/profile");
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/home");
    }
  };

  return (
    <TouchableOpacity
      onPress={handleBackPress}
      className={`mt-6 ml-6 w-6 h-6 rounded-md border-[#EFEFEF33] bg-[#121212] border p-5 items-center justify-center ${className}`}
    >
      <ArrowLeft size="14px" stroke="white" />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
