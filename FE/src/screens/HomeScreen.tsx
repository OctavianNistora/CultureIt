import {StyleSheet, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import MapView, {Details, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";

export function HomeScreen() {
  const [location, setLocation] = useState<Region>({
    latitude: 45.7,
    longitude: 24.9668,
    latitudeDelta: 12,
    longitudeDelta: 10,
  });

  function onRegionChangeComplete(region: Region, details: Details) {
    if (details.isGesture) {
      setLocation(region);
    }
  }

  function checkLocationPermission() {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((status) => {
      switch (status) {
        case RESULTS.GRANTED:
          break;
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
          check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((status) => {
            switch (status) {
              case RESULTS.GRANTED:
              case RESULTS.UNAVAILABLE:
              case RESULTS.BLOCKED:
                break;
              case RESULTS.DENIED:
                request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
            }
          });
          break;
        case RESULTS.DENIED:
          check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then((status) => {
            switch (status) {
              case RESULTS.GRANTED:
              case RESULTS.UNAVAILABLE:
              case RESULTS.BLOCKED:
                break;
              case RESULTS.DENIED:
                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            }
          });
      }
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}
        onRegionChangeComplete={onRegionChangeComplete}
        onMapReady={checkLocationPermission}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});