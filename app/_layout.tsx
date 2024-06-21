// Import your global CSS file
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: "#121212",
          },
          headerShown: false,
        }}
      />
    </QueryClientProvider>
  );
}
