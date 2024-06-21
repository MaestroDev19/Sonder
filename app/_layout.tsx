// Import your global CSS file
import { Stack } from "expo-router"
import "../global.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function RootLayout() {

  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{
      contentStyle: {
        backgroundColor: "#121212",
      },
      headerShown: false,
      }}/>
    </QueryClientProvider>
  )
}
