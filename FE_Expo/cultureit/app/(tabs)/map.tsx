import { StyleSheet, View } from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {router} from 'expo-router';

export default function Map() {

    const [region, setRegion] = useState({
        latitude: 45.760696,
        longitude: 21.226788,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    // const [markers, setMarkers] = useState([
    //     {
    //         id: 1,
    //         latlng: { latitude: 45.7552003, longitude: 21.2272141 },
    //         title: 'Cover me softly',
    //         description: 'Cover me softly',
    //     },
    //     {
    //         id: 2,
    //         latlng: { latitude: 45.7539753, longitude: 21.2258655 },
    //         title: 'Multisensorial',
    //         description: 'Multisensorial',
    //     },
    // ]);

    const markers = [
        {
            id: 1,
            latlng: { latitude: 45.7552003, longitude: 21.2272141},
            title: 'Cover me softly',
            description: 'Cover me softly',
        },
        {
            id: 2,
            latlng: { latitude: 45.7539753, longitude: 21.2258655 },
            title: 'Multisensorial',
            description: 'Multisensorial',
        },
    ];

    const mapRef = useRef(null);


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
                        title={marker.title}
                        description={marker.description}
                        onPress={() => router.push({
                            pathname: '/details/details',
                            params:{
                                title: marker.title,
                                description: marker.description
                            }
                        })}
                    />
                ))}
            </MapView>
        </View>
    );
};
