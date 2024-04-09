
// Import your global CSS file
import { StatusBar } from "expo-status-bar"
import { View, Text } from "react-native"
import "../global.css"

export default function RootLayout() {
    return (
    <View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    )
}