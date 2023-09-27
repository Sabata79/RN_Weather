import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Weather from './Weather';

const INITIAL_LATITUDE = 65.0800;
const INITIAL_LONGITUDE = 25.4800;
const INITIAL_LATITUDE_DELTA = 0.00922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

export default function Position() {
    const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
    const [longitude, setLongitude] = useState(INITIAL_LONGITUDE);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            try {
                if (status === 'granted') {
                    const location = await Location.getLastKnownPositionAsync({ accuracy: 6});
                    setLatitude(location.coords.latitude);
                    setLongitude(location.coords.longitude);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            } catch (error) {
                alert(error);
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Retrieving location...</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Your location:</Text>
                <Text>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
                <Weather latitude={latitude} longitude={longitude} />
            </View>
        );
    }
}
