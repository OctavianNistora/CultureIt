import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const eventData = {
    photo: 'https://via.placeholder.com/400x300', // Replace with actual event photo URL
    location: '123 Event St., Cityville',
    datePeriod: '2024-01-01 to 2024-01-07',
    openingHours: '10:00 AM - 6:00 PM',
    price: '$15.00',
};

export default function Summary() {
    const { title, description } = useLocalSearchParams();
    const [isFavorite, setIsFavorite] = useState(false);

    // Function to toggle the favorite status
    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        // You can add logic here to store the favorite status, e.g., API or local storage
    };

    const handleMoreDetails = () => {
        // Navigate to the more details page
        // Adjust the navigation path as necessary for your app
        // Example: router.push('/more-details');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Event Image */}
            <Image source={{ uri: eventData.photo }} style={styles.eventImage} />

            {/* Event Name and Add to Favorites Button */}
            <View style={styles.headerContainer}>
                <Text style={styles.eventName}>{title}</Text>
                <Button
                    title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    onPress={handleFavorite}
                    color="#F7BA4B"
                />
            </View>

            {/* Event Description */}
            <Text style={styles.eventDescription}>{description}</Text>

            {/* Event Summary */}
            <View style={styles.detailsContainer}>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Location:</Text> {eventData.location}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Date:</Text> {eventData.datePeriod}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Opening Hours:</Text> {eventData.openingHours}
                </Text>
                <Text style={styles.detailText}>
                    <Text style={styles.bold}>Price:</Text> {eventData.price}
                </Text>
            </View>

            {/* More Summary Button */}
            <Button title="More Summary" onPress={handleMoreDetails} color="#F7BA4B" />
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
