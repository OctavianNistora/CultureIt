import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import axios from 'axios';
import { router } from 'expo-router';

// Define the interface for the event markers
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

    const mapRef = useRef(null);

    // Fetch events from the backend event summaries
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                // Replace with the actual API URL for fetching event summaries
                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/events/map-points`,
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4YW5kcnVAZ21haWwuY29tIiwiaWF0IjoxNzM0MDI2Nzc0LCJleHAiOjE3MzQyODU5NzR9.AKctQAwDQ3HV_uZVnd51CBjJRUIYfsh9l_OMtUVc6qaAsBKluCmlzXYKaqti1ciNcviuS3oA7UM6wXdXU_DMVQ`,
                        }
                    }
                );


                // Map the event summaries into the marker format
                const eventMarkers: EventMarker[] = response.data;

                setMarkers(eventMarkers);
            } catch (error) {
                console.error('Error fetching map points', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventData();
    }, []);

    // Handle region change
    function onRegionChange(region: Region) {
        setRegion(region);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        map: {
            width: '100%',
            height: '100%',
        },
    });

    if (loading) {
        // Show loading spinner while data is being fetched
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
            </View>
        );
    }
    console.log(markers);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={region}
                onRegionChangeComplete={onRegionChange}
                ref={mapRef}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        onPress={() => router.push({
                            pathname: '/details/summary',
                            params: {
                                id: marker.id,
                            },
                        })}
                    />
                ))}
            </MapView>
        </View>
    );
}
