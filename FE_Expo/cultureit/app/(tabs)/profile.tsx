import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import {router} from "expo-router";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    is_publisher: boolean;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const userId = SecureStore.getItem('secure_user_id');


    useEffect(() => {

        axios
            .get(`${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}/profile`, {
                headers: {
                    Authorization: `Bearer ${SecureStore.getItem('secure_token')}`,
                },
            })
            .then((response) => {
                setUser(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch((err) => {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data');
                setLoading(false);
            });


    }, [userId]);



    const handleToggleRole = () => {
        if (!user) return;



        const newRole = user.is_publisher ? 'user' : 'publisher';
        SecureStore.setItem('secure_role', newRole);

        SecureStore.getItemAsync('secure_token').then((token) => {
            if (!token) throw new Error("Token not found");

            axios({
                url: `${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}/role`,
                method: "PUT",
                data: JSON.stringify(newRole),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    setUser((prevUser) => prevUser ? { ...prevUser, is_publisher: !prevUser.is_publisher } : prevUser);

                    const roleText = newRole === 'publisher' ? 'You are now a publisher!' : 'You are now a user!';
                    Alert.alert("Success", roleText);
                })
                .catch((err) => {
                    console.error('Error changing role:', err);
                    Alert.alert("Error", "Failed to change role. Please try again.");
                })
                .finally(() => {
                    console.log("Role toggle attempt completed.");
                });
        }).catch((err) => {
            console.error('Error retrieving token:', err);
            Alert.alert("Error", "Failed to retrieve token. Please try again.");
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#F7BA4B" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.title}>Profile</Text>
            </View>


            {user && (
                <View style={styles.profileContainer}>
                    <Text style={styles.name}>
                        {user.first_name} {user.last_name}
                    </Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.dob}>Date of Birth: {user.date_of_birth}</Text>
                    <Text style={styles.publisherStatus}>
                        Publisher Status: {user.is_publisher ? 'Publisher' : 'Not a Publisher'}
                    </Text>
                    <TouchableOpacity
                        style={styles.toggleButton}
                        onPress={handleToggleRole}
                    >
                        <Text style={styles.buttonText}>
                            {user.is_publisher ? 'Switch to User' : 'Become a Publisher'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#393838',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#393838',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    dob: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    publisherStatus: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    toggleButton: {
        marginTop: 30,
            backgroundColor: '#F7BA4B',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
    },
    buttonText: {
        color: 'white',
            fontWeight: 'bold',
            fontSize: 16,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
