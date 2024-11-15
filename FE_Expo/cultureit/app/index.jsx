
import {StatusBar } from 'expo-status-bar'; 
import { Text, View } from 'react-native'; 
import { Link } from 'expo-router';
export default function App() {
    return(
        <View className="flex-1 items-center justify-center Ibg-white"> I
        <Text className="text-3xl font-Inter-Bold">Culture It!</Text>
        <StatusBar style="auto" />
        <Link href="/map" style={{ color: 'blue' }}>Go to Map</Link>
        </View>
    )
}