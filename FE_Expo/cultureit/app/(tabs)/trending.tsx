import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';


interface Event {
    id: number;
    name: string;
    photo: any; // Local image source
    description: string;
    location: string;
    datePeriod: string;
    openingHours: string;
}

export default function Trending() {

    const events: Event[] = [
        {
            id: 1,
            name: 'Art Exhibition',
            photo: require('../../assets/images/art_exhibition.jpg'),
            description: 'An inspiring art exhibition.',
            location: 'Art Gallery, Downtown',
            datePeriod: 'Jan 1, 2024 - Jan 15, 2024',
            openingHours: '10:00 AM - 6:00 PM',
        },
        {
            id: 2,
            name: 'Music Festival',
            photo: require('../../assets/images/music_festival.jpg'), // Local image reference
            description: 'Live music performances.',
            location: 'City Park',
            datePeriod: 'Feb 10, 2024 - Feb 12, 2024',
            openingHours: '12:00 PM - 11:00 PM',
        },
        {
            id: 3,
            name: 'Food Fair',
            photo: require('../../assets/images/food_fair.png'), // Local image reference
            description: 'Taste the best local foods.',
            location: 'Food Plaza, Central Square',
            datePeriod: 'Mar 5, 2024 - Mar 10, 2024',
            openingHours: '9:00 AM - 8:00 PM',
        },
    ];


    const renderEvent = ({ item }: { item: Event }) => (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/details/details',
                    params: {
                        title: item.name,
                        description: item.description,
                        photo: item.photo,
                        location: item.location,
                        datePeriod: item.datePeriod,
                        openingHours: item.openingHours,
                    },
                })
            }
            className="mb-4"
        >
            <Image
                source={item.photo}
                style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                }}
                resizeMode="cover"
            />
            <Text className="mt-2 text-xl font-inter_bold text-gray-800">{item.name}</Text>
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
}
