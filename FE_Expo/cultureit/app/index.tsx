import {StatusBar } from 'expo-status-bar';
import {Image, ScrollView, Text, View} from 'react-native';
import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';

import { icons } from '../constants';
import CustomButton from "../components/CustomButton";

export default function App() {
    return(
        <SafeAreaView className = "bg-white h-full"> I
            <ScrollView contentContainerStyle={{height: '100%'}}>
                <View className = "w-full justify-center items-center h-full px-4 "
                      style={{ marginTop: -70 }}>
                    <Image
                        source={icons.cathedral_black}
                        className="h-[245px] w-[245px]"
                        resizeMode={"contain"}

                    />

                    <View className = "relative-mt-10"
                        style={{
                            width: 160,
                            marginTop: 10
                        }}>
                          <Text className = "text-5xl font-inter_bold text-primary text-center">
                            Culture It!
                          </Text>
                    </View>

                    <CustomButton
                    title = "Log in or Register"
                    handlePress={() => router.push('/log-in')}
                    containerStyles="w-full"
                    />
                </View>
            </ScrollView>
            <StatusBar
            style = "dark" />
        </SafeAreaView>
    )
}