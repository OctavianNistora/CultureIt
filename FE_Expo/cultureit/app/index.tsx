import {StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {router} from 'expo-router';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { icons } from '../constants';
import CustomButton from "../components/CustomButton";

export default function App() {

    useEffect(() => {
        const checkTokenAndRefresh = async () => {
            try {

                const token = await SecureStore.getItemAsync('secure_token');

                if (token) {

                    const response = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/v1/auth`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.status === 200) {
                        console.log(response.data);

                        await SecureStore.setItemAsync('secure_token', response.data.token);
                        await SecureStore.setItemAsync('secure_user_id', response.data.userId.toString());
                        await SecureStore.setItemAsync('secure_user_role', response.data.role);

                        router.push('/map');
                    } else {

                        await SecureStore.deleteItemAsync('secure_token');
                        await SecureStore.deleteItemAsync('secure_user_id');
                        await SecureStore.deleteItemAsync('secure_user_role');
                    }
                }
            } catch (error) {
                console.error('Error checking token or refreshing:', error);
            }
        };

        checkTokenAndRefresh();
    }, []);

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