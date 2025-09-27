import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "./globals.css";
import { toastConfig } from "@/toastConfig";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>

      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
