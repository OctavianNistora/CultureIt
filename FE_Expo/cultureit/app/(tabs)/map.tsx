import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

interface EventMarker {
    id: number;
    latitude: number;
    longitude: number;
}

export default function Map() {
    const [region, setRegion] = useState({
        latitude: 45.760696,
        longitude: 21.226788,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const [markers, setMarkers] = useState<EventMarker[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPublisher, setIsPublisher] = useState(false);
    const [instructionText, setInstructionText] = useState("Hold a finger for 3 seconds on the location of the event you want to publish");
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const mapRef = useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            const fetchEventData = async () => {
                try {
                    const role = await SecureStore.getItemAsync('secure_role');
                    setIsPublisher(role === 'publisher');

                    const token = await SecureStore.getItemAsync('secure_token');
                    if (!token) throw new Error('Token not found');

                    const response = await axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/v1/events/map-points`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    console.log(response.data);
                    const eventMarkers: EventMarker[] = response.data;
                    setMarkers(eventMarkers);
                } catch (error) {
                    console.error('Error fetching map points', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchEventData();
        }, [])
    );

    function onRegionChange(region: Region) {
        setRegion(region);
    }

    const handleLongPress = (e: any) => {
        if (!isPublisher) return;

        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });

        setTimeout(() => {
            if (selectedLocation) {
                Alert.alert(
                    'Create Event',
                    `Do you want to create an event at Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}?`,
                    [
                        {
                            text: 'No',
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: () => {
                                router.push({
                                    pathname: '../details/addEvent',
                                    params: {
                                        lat: latitude,
                                        long: longitude,
                                    },
                                });
                            },
                        },
                    ]
                );
            }
        }, 1000);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        map: {
            width: '100%',
            height: '100%',
        },
        addEventButton: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: '#F7BA4B',
            padding: 15,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
        instructionText: {
            position: 'absolute',
            top: 20,
            left: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: 10,
            borderRadius: 5,
            fontSize: 16,
            maxWidth: '80%',
        },
    });

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                region={region}
                onRegionChangeComplete={onRegionChange}
                ref={mapRef}
                onLongPress={handleLongPress}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        onPress={() =>
                            router.push({
                                pathname: '/details/summary',
                                params: {
                                    id: marker.id,
                                },
                            })
                        }
                    />
                ))}
            </MapView>

            {isPublisher && (
                <Text style={styles.instructionText}>{instructionText}</Text>
            )}
        </View>
    );
}
