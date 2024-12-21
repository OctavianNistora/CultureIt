import { StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import axios from 'axios';
import { router } from 'expo-router';


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


    useEffect(() => {
        const fetchEventData = async () => {
            try {

                const response = await axios.get(
                    `${process.env.EXPO_PUBLIC_API_URL}/v1/events/map-points`,
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6dmluY2FhbGV4YW5kcnVAZ21haWwuY29tIiwiaWF0IjoxNzM0Nzk3NjA3LCJleHAiOjE3MzUwNTY4MDd9.ApnruEmKF4gwILnw_N5OBfKWAxi_pLHtx4WtQXGBaog`,
                        }
                    }
                );



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
