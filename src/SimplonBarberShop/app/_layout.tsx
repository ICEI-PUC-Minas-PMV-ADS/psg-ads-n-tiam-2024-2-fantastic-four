import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AuthProvider } from "./context/authContextProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "CircularSpotifyText-Black": require("../assets/fonts/CircularSpotifyText-Black.ttf"),
    "CircularSpotifyText-BlackItalic": require("../assets/fonts/CircularSpotifyText-BlackItalic.ttf"),
    "CircularSpotifyText-Bold": require("../assets/fonts/CircularSpotifyText-Bold.ttf"),
    "CircularSpotifyText-Book": require("../assets/fonts/CircularSpotifyText-Book.ttf"),
    "CircularSpotifyText-BookItalic": require("../assets/fonts/CircularSpotifyText-BookItalic.ttf"),
    "CircularSpotifyText-Light": require("../assets/fonts/CircularSpotifyText-Light.ttf"),
    "CircularSpotifyText-Medium": require("../assets/fonts/CircularSpotifyText-Medium.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
