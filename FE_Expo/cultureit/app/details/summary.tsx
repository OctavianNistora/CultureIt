import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from "expo-secure-store";

const EventSummary = () => {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const route = useRoute();
    const { id } = useLocalSearchParams();;

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
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching event data:", err);
                setError("Failed to load event details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventSummary();
    }, [id]);


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
                source={{ uri: event.imageUri || 'https://fakeimg.pl/600x400' }}
                style={styles.image}
                onError={() => {
                    setError('Failed to load image');
                }}
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
});

export default EventSummary;
