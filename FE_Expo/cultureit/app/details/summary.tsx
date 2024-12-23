import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

interface EventData {
    mainImage: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    price: number;
    isWishlisted: boolean;
}

export default function Summary() {
    const { id } = useLocalSearchParams();
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/events/${id}/summary`,
                    {
                        headers: {
                            'Authorization': `Bearer ${await SecureStore.getItemAsync('secure_token')}`,
                        },
                    }
                );

                console.log(response.data);
                setEventData(response.data);

            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };
        fetchEventData();
    }, [id]);



    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image source={{ uri: eventData.mainImage }} style={styles.eventImage} />


            <View style={styles.headerContainer}>
                <Text style={styles.eventName}>{eventData.name}</Text>
                <Button
                    title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    //onPress={handleFavorite}
                    color="#F7BA4B"
                />
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Location:</Text> {eventData.location}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Date:</Text> {eventData.startDate} to {eventData.endDate}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Opening Hours:</Text> {eventData.startTime} - {eventData.endTime}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Price:</Text> ${eventData.price}
                </Text>
            </View>


            <Button title="More Summary" /*onPress={handleMoreDetails}*/ color="#F7BA4B" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    eventImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    eventName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#393838',
        flex: 1,
    },
    eventDescription: {
        fontSize: 16,
        color: '#393838',
        marginBottom: 20,
    },
    detailsContainer: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        color: '#393838',
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
});
