import { StyleSheet, Text, View } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router'
import "../global.css"
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const[fontsLoaded, error] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name = "index" options={{headerShown: false}} />
      <Stack.Screen name = "(auth)" options={{headerShown: false}} />
      <Stack.Screen name = "(tabs)" options={{headerShown: false}} />
    </Stack>
    )
}

export default RootLayout