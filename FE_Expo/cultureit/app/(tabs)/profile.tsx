import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios'; // Import axios for API calls

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


    const userId = 3;


    useEffect(() => {

        axios
            .get(`${process.env.EXPO_PUBLIC_API_URL}/v1/users/${userId}`, {
                //headers: {
                    //Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4YW5kcnUuenZpbmNhQGdtYWlsLmNvbSIsImlhdCI6MTczNDAwNzgwMiwiZXhwIjoxNzM0MjY3MDAyfQ.gMnl7Po6Mzp0SGPAqJv--zXOJE-ivd_KIGON46BJTvTUaXFrNXk49RwhhH3f8EUoaFWciXnY5sK_s4c4OOh-og`,
                //},
            })
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data'); // Set error message
                setLoading(false);
            });
    }, [userId]);

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
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
