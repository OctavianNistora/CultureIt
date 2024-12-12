import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router'; // Import the router for navigation

interface Event {
    id: number;
    name: string;
    photo: any;
    description: string;
    location: string;
    datePeriod: string;
    openingHours: string;
}

export default function Favorites() {
    const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([
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
            photo: require('../../assets/images/music_festival.jpg'),
            description: 'Live music performances.',
            location: 'City Park',
            datePeriod: 'Feb 10, 2024 - Feb 12, 2024',
            openingHours: '12:00 PM - 11:00 PM',
        },
        {
            id: 3,
            name: 'Food Fair',
            photo: require('../../assets/images/food_fair.png'),
            description: 'Taste the best local foods.',
            location: 'Food Plaza, Central Square',
            datePeriod: 'Mar 5, 2024 - Mar 10, 2024',
            openingHours: '9:00 AM - 8:00 PM',
        },
    ]);

    const removeFavorite = (eventId: number) => {
        setFavoriteEvents((prevFavorites) => prevFavorites.filter((event) => event.id !== eventId));
    };

    // Handle navigation to the event details page
    const navigateToDetails = (eventId: number) => {
        router.push({
            pathname: `/details/details`, // Assuming dynamic path is being used
            params: { eventId },
        });
    };

    const renderEvent = ({ item }: { item: Event }) => (
        <View className="flex-row justify-between items-center mb-4">
            {/* Touchable to navigate to details page when image is clicked */}
            <TouchableOpacity onPress={() => navigateToDetails(item.id)} className="flex-1">
                <Image
                    source={item.photo}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View className="flex-1 ml-4">
                {/* Touchable to navigate to details page when name is clicked */}
                <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
                    <Text className="text-xl font-inter_bold text-gray-800">{item.name}</Text>
                </TouchableOpacity>
                <Text className="text-sm text-gray-600">{item.location}</Text>
                <Text className="text-sm text-gray-400">{item.datePeriod}</Text>
            </View>

            <TouchableOpacity
                onPress={() => removeFavorite(item.id)}
                className="ml-4 justify-center items-center"
                style={{
                    backgroundColor: '#F7BA4B',
                    padding: 8,
                    borderRadius: 5,
                }}
            >
                <Text className="text-white font-inter_bold text-sm">Remove</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="px-4 py-6">
                <Text className="text-3xl font-inter_bold text-gray-500 mb-4 text-center">
                    Favorites
                </Text>

                <FlatList
                    data={favoriteEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderEvent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </SafeAreaView>
    );
}
