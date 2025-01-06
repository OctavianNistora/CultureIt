import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from "expo-secure-store";


const EventSummary = () => {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

    const route = useRoute();
    const { id } = useLocalSearchParams();
    const userId = SecureStore.getItem('secure_user_id');

    useEffect(() => {

        const fetchEventSummary = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/events/${id}/summary`,
                    {
                        headers: {
                            'Authorization': `Bearer ${await SecureStore.getItemAsync('secure_token')}`,
                        },
                    }
                );
                setEvent(response.data);
                //console.log(response.data);
            } catch (err) {
                console.error("Error fetching event data:", err);
                setError("Failed to load event details.");
            } finally {
                setLoading(false);
            }
        };

        const checkWishlistStatus = async () => {
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


                const wishlist = response.data;
                console.log(response.data);
                const eventInWishlist = wishlist.some((item: any) => item.id.toString().trim() === id.toString().trim());
                setIsInWishlist(eventInWishlist);
                console.log(eventInWishlist);
            } catch (error) {
                console.error("Error checking wishlist status:", error);
            }
        };

        fetchEventSummary();
        checkWishlistStatus();
    }, [id]);

    const handleAddToWishlist = async () => {
        try {
            const token = await SecureStore.getItemAsync('secure_token');
            if (!token) {
                throw new Error('Authentication token is missing.');
            }

            console.log(id)

            await axios.post(
                `${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}/wishlist`,
                id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setIsInWishlist(true);
            Alert.alert('Success', 'Event added to wishlist!');
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            Alert.alert('Error', 'Failed to add event to wishlist.');
        }
    };

    const handleRemoveFromWishlist = async () => {
        try {
            const token = await SecureStore.getItemAsync('secure_token');
            if (!token) {
                throw new Error('Authentication token is missing.');
            }


            await axios.delete(
                `${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}/wishlist/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsInWishlist(false);
            Alert.alert('Success', 'Event removed from wishlist!');
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            Alert.alert('Error', 'Failed to remove event from wishlist.');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.container}>
                <Text>No event data available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{event.name}</Text>
            </View>

            <Image
                source={{ uri: "https://placedog.net/500" }}
                style={styles.image}
                onError={(e) => {
                    console.log('Image loading error:', e.nativeEvent);
                    setError('Failed to load image');
                }}
                resizeMode="contain"
            />

            <Text style={styles.subtitle}>Event Description:</Text>
            <Text style={styles.description}>{event.description}</Text>

            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{event.location}</Text>

            <Text style={styles.label}>Start Date:</Text>
            <Text style={styles.value}>{new Date(event.startDate).toLocaleDateString()}</Text>

            <Text style={styles.label}>End Date:</Text>
            <Text style={styles.value}>{new Date(event.endDate).toLocaleDateString()}</Text>

            <Text style={styles.label}>Start Time:</Text>
            <Text style={styles.value}>{event.startTime}</Text>

            <Text style={styles.label}>End Time:</Text>
            <Text style={styles.value}>{event.endTime}</Text>

            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>${event.price}</Text>

            <TouchableOpacity
                style={styles.wishlistButton}
                onPress={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
            >
                <Text style={styles.wishlistButtonText}>
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: '#e0e0e0',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F7BA4B',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#555',
        marginBottom: 15,
        lineHeight: 22,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F7BA4B',
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        color: '#777',
        marginBottom: 15,
    },
    errorText: {
        color: '#f00',
        fontSize: 16,
        textAlign: 'center',
    },

    wishlistButton: {
        backgroundColor: '#F7BA4B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },

    wishlistButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default EventSummary;
