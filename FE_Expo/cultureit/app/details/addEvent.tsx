import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormField } from '@/components/FormField';
import { DateFormField } from '@/components/DateFormField';
import { TimeFormField } from '@/components/TimeFormField';
import CustomButton from '@/components/CustomButton';
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

export default function AddEvent() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        location: '',
        latitude: '',
        longitude: '',
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        price: '',
    });

    const [imageUri, setImageUri] = useState<string | null>(null);

    const createEvent = async () => {
        try {
            const {
                title,
                description,
                location,
                latitude,
                longitude,
                startDate,
                endDate,
                startTime,
                endTime,
                price,
            } = form;

            if (!title || !description || !imageUri) {
                alert("Please fill all required fields and select an image.");
                return;
            }

            const token = await SecureStore.getItemAsync("secure_token");
            if (!token) {
                throw new Error("Authentication token is missing.");
            }


            const eventData = {
                title,
                description,
                location,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                start_date: startDate.toISOString().split("T")[0],
                end_date: endDate.toISOString().split("T")[0],
                start_time: startTime.toTimeString().split(" ")[0],
                end_time: endTime.toTimeString().split(" ")[0],
                price: parseFloat(price),
            };

            axios({
                url: `${process.env.EXPO_PUBLIC_API_URL}/v1/events`,
                method: "POST",
                data: eventData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    console.log("Event created successfully:", response.data);
                    alert("Event created successfully!");


                    setForm({
                        title: '',
                        description: '',
                        location: '',
                        latitude: '',
                        longitude: '',
                        startDate: new Date(),
                        endDate: new Date(),
                        startTime: new Date(),
                        endTime: new Date(),
                        price: '',
                    });
                    setImageUri(null);
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("API error:", error.response.data);
                        alert(error.response.data?.message || "Failed to create the event.");
                    } else {
                        console.error("Unexpected error:", error.message);
                        alert("An unexpected error occurred. Please try again.");
                    }
                });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error creating event:", error.message);
                alert("Failed to create the event. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred.");
            }
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            //mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!form.title || !form.description || !imageUri) {
            Alert.alert('Validation Error', 'Please fill all required fields and select an image.');
            return;
        }

        try {

            await createEvent();
            console.log("Event creation successful");
        } catch (error) {
            console.error("Error during event creation:", error);
            alert("Failed to create event. Please try again.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.form}>
                    <Text style={styles.title}>Add Event</Text>

                    <FormField
                        title="Title"
                        value={form.title}
                        handleChangeText={(e) => setForm({ ...form, title: e })}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Description"
                        value={form.description}
                        handleChangeText={(e) => setForm({ ...form, description: e })}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Location"
                        value={form.location}
                        handleChangeText={(e) => setForm({ ...form, location: e })}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Latitude"
                        value={form.latitude}
                        handleChangeText={(e) => setForm({ ...form, latitude: e })}
                        otherStyles="mt-7"
                    />

                    <FormField
                        title="Longitude"
                        value={form.longitude}
                        handleChangeText={(e) => setForm({ ...form, longitude: e })}
                        otherStyles="mt-7"
                    />

                    <DateFormField
                        title="Start Date"
                        value={form.startDate}
                        handleChangeDate={(date) => setForm({ ...form, startDate: date })}
                    />

                    <DateFormField
                        title="End Date"
                        value={form.endDate}
                        handleChangeDate={(date) => setForm({ ...form, endDate: date })}
                    />

                    <TimeFormField
                        title="Start Time"
                        value={form.startTime}
                        handleChangeTime={(time) => setForm({ ...form, startTime: time })}
                    />

                    <TimeFormField
                        title="End Time"
                        value={form.endTime}
                        handleChangeTime={(time) => setForm({ ...form, endTime: time })}
                    />

                    <FormField
                        title="Price"
                        value={form.price}
                        handleChangeText={(e) => setForm({ ...form, price: e })}
                        otherStyles="mt-7"
                    />

                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                        <Text style={styles.imagePickerText}>
                            {imageUri ? 'Change Event Photo' : 'Select Event Photo'}
                        </Text>
                    </TouchableOpacity>

                    {imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                        />
                    )}

                    <CustomButton
                        title="Create Event"
                        handlePress={handleSubmit}
                        containerStyles="mt-7"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    imagePicker: {
        marginTop: 20,
        backgroundColor: '#F7BA4B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    imagePickerText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    imagePreview: {
        marginTop: 10,
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});
