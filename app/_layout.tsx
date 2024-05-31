
// Import your global CSS file
import { Stack } from "expo-router"
import "../global.css"

export default function RootLayout() {
    return (
      <Stack screenOptions={{
      contentStyle: {
        backgroundColor: "#121212",
      },
      headerShown: false,
      }}/>
    )
}