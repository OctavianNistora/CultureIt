import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Assuming you're using Expo Router
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

interface TrendingEvent {
    id: number;
    mainImageUrl: string;
    title: string;
    //wishlistedCount: number;
}

const TrendingEvents = () => {
    const [trendingEvents, setTrendingEvents] = useState<TrendingEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const fetchTrendingEvents = async () => {
            try {
                const token = await SecureStore.getItemAsync('secure_token');
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/events/trending`,
                    {
                        params: { page },
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                console.log(response.data);
                setTrendingEvents(response.data);
            } catch (error) {
                console.error("Error fetching trending events:", error);
                setError("Failed to load trending events.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingEvents();
    }, [page]);

    const navigateToDetails = (eventId: number) => {
        router.push({
            pathname: `/details/summary`,
            params: { id: eventId },
        });
    };

    const renderEvent = ({ item }: { item: TrendingEvent }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigateToDetails(item.id)} style={{ flex: 1 }}>
                <Image
                    source={{ uri: "https://placedog.net/500" }} //item.mainImageUrl
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity>

            <View style={{ flex: 1, marginLeft: 12 }}>
                <TouchableOpacity onPress={() => navigateToDetails(item.id)}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>{item.title}</Text>
                </TouchableOpacity>
                {/*<Text style={{ fontSize: 14, color: '#555' }}>*/}
                {/*    {item.wishlistedCount} {item.wishlistedCount === 1 ? "person" : "people"} wishlisted*/}
                {/*</Text>*/}
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#F7BA4B" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
            <Text className="text-3xl font-inter_bold text-gray-500 mb-4 text-center">
                Trending Events
            </Text>

            <FlatList
                data={trendingEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEvent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                {page > 0 && (
                    <TouchableOpacity
                        onPress={() => setPage(page - 1)}
                        style={{ backgroundColor: '#F7BA4B', padding: 10, borderRadius: 5 }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Previous</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    onPress={() => setPage(page + 1)}
                    style={{ backgroundColor: '#F7BA4B', padding: 10, borderRadius: 5 }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TrendingEvents;
