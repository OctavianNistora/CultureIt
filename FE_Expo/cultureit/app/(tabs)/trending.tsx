import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import axios from "axios";
import * as SecureStore from "expo-secure-store";


interface Event {
    id: number;
    mainImageUrl: string;
    title: string;
}

export default function Trending() {

    // const events: Event[] = [
    //     {
    //         id: 1,
    //         name: 'Art Exhibition',
    //         photo: require('../../assets/images/art_exhibition.jpg'),
    //         description: 'An inspiring art exhibition.',
    //         location: 'Art Gallery, Downtown',
    //         datePeriod: 'Jan 1, 2024 - Jan 15, 2024',
    //         openingHours: '10:00 AM - 6:00 PM',
    //     },
    //     {
    //         id: 2,
    //         name: 'Music Festival',
    //         photo: require('../../assets/images/music_festival.jpg'),
    //         description: 'Live music performances.',
    //         location: 'City Park',
    //         datePeriod: 'Feb 10, 2024 - Feb 12, 2024',
    //         openingHours: '12:00 PM - 11:00 PM',
    //     },
    //     {
    //         id: 3,
    //         name: 'Food Fair',
    //         photo: require('../../assets/images/food_fair.png'),
    //         description: 'Taste the best local foods.',
    //         location: 'Food Plaza, Central Square',
    //         datePeriod: 'Mar 5, 2024 - Mar 10, 2024',
    //         openingHours: '9:00 AM - 8:00 PM',
    //     },
    // ];


    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const token = await SecureStore.getItemAsync('secure_token');


                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/events/trending`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const eventData: Event[] = response.data.map((event: any) => ({
                    id: event.id,
                    title: event.title,
                    photo: event.mainImageUrl,
                }));
                setEvents(eventData);

            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, []);


    const renderEvent = ({ item }: { item: Event }) => (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/details/summary',
                    params: {
                        id: item.id,
                    },
                })
            }
            className="mb-4"
        >
            <Image
                source={{uri: item.mainImageUrl}}
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                }}
                resizeMode="cover"
            />
            <Text className="mt-2 text-xl font-inter_bold text-gray-800">{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="px-4 py-6">

                <Text className="text-3xl font-inter_bold text-gray-500 mb-4 text-center">
                    Trending
                </Text>


                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderEvent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
    );
};
