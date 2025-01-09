import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

const Wishlist = () => {
    const [wishlistEvents, setWishlistEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const userId = SecureStore.getItem('secure_user_id');

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = await SecureStore.getItemAsync('secure_token');
                if (!token) {
                    throw new Error('Authentication token is missing.');
                }

                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}/wishlist`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                setWishlistEvents(response.data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setError("Failed to load wishlist.");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    // Remove an event from wishlist
    const removeFromWishlist = async (eventId: number) => {
        try {
            const token = await SecureStore.getItemAsync('secure_token');
            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            await axios.delete(
                `${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}/wishlist/${eventId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            setWishlistEvents((prevWishlist) => prevWishlist.filter(event => event.id !== eventId));
        } catch (error) {
            console.error("Error removing event from wishlist:", error);
            setError("Failed to remove event from wishlist.");
        }
    };

    const navigateToDetails = (eventId: number) => {
        console.log(eventId);
        router.push({
            pathname: `/details/summary`,
            params: { id: eventId },
        });
    };


    const renderEvent = ({ item }: { item: any }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigateToDetails(item.id)} style={{ flex: 1 }}>
                <Image
                    source={{ uri: item.mainImageUrl }}
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
                <Text style={{ fontSize: 14, color: '#555' }}>{item.location}</Text>
                <Text style={{ fontSize: 14, color: '#777' }}>
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => removeFromWishlist(item.id)}
                style={{
                    backgroundColor: '#F7BA4B',
                    padding: 8,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Remove</Text>
            </TouchableOpacity>
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
                Wishlist
            </Text>

            <FlatList
                data={wishlistEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderEvent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
};

export default Wishlist;
