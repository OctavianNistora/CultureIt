import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import axios from 'axios';
import { router } from 'expo-router';

// Define the interface for the event markers
interface EventMarker {
    id: number;
    mainImage: string;
    latlng: {
        latitude: number;
        longitude: number;
    };
    name: string;
    description: string;
    location: string;
    datePeriod: string;
    openingHours: string;
    price: number;
    isWishlisted: boolean
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
                            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4YW5kcnVAZ21haWwuY29tIiwiaWF0IjoxNzM0MDIyNDI1LCJleHAiOjE3MzQyODE2MjV9.I0sWvinKIVvxyaq8QwYOcNm_6slgmri8AvXR-BzJ-uzDQoL1K2mee6d26Fv-eBApqn-2Bqy8Jutoja8wq089rA`,
                        }
                    }
                );


                // Fetch summary details for each event
                const eventSummaries = await Promise.all(response.data.map((event: { id: number }) =>
                    axios.get(
                        `${process.env.EXPO_PUBLIC_API_URL}/v1/events/${event.id}/summary`,
                        {
                            headers: {
                                Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4YW5kcnVAZ21haWwuY29tIiwiaWF0IjoxNzM0MDIyNDI1LCJleHAiOjE3MzQyODE2MjV9.I0sWvinKIVvxyaq8QwYOcNm_6slgmri8AvXR-BzJ-uzDQoL1K2mee6d26Fv-eBApqn-2Bqy8Jutoja8wq089rA`,
                            }
                        }
                    )
                ));
                console.log(eventSummaries[0].data);
                // Map the event summaries into the marker format
                const eventMarkers: EventMarker[] = eventSummaries.map((eventSummaryResponse) => {
                    const event = eventSummaryResponse.data; // Event data from the summary API
                    return {
                        id: event.id,
                        latlng: {
                            latitude: event.latitude,
                            longitude: event.longitude,
                        },
                        name: event.name,
                        description: event.description,
                        location: event.location,
                        datePeriod: `${event.startDate} - ${event.endDate}`,
                        openingHours: `${event.startTime} - ${event.endTime}`,
                        price: event.price,
                        mainImage: event.mainImage,
                        isWishlisted: event.isWishlisted
                    };
                });

                setMarkers(eventMarkers);
            } catch (error) {
                console.error('Error fetching event summaries:', error);
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
    //console.log(markers);
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
                        coordinate={marker.latlng}
                        title={marker.name}
                        description={marker.description}
                        onPress={() => router.push({
                            pathname: '/details/details',
                            params: {
                                title: marker.name,
                                description: marker.description,
                                location: marker.location,
                                datePeriod: marker.datePeriod,
                                openingHours: marker.openingHours,
                                price: marker.price,
                            },
                        })}
                    />
                ))}
            </MapView>
        </View>
    );
}
