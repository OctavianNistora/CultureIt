import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeFormFieldProps {
    title: string;
    value: Date;
    handleChangeTime: (time: Date) => void;
    placeholder?: string;
}

export function TimeFormField({
                                  title,
                                  value,
                                  handleChangeTime,
                                  placeholder = 'Select a time',
                              }: TimeFormFieldProps) {
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedTime?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // Keep the picker open for iOS
        if (selectedTime) {
            handleChangeTime(selectedTime);
        }
    };

    return (
        <View style={{ marginVertical: 10 }}>

            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{title}</Text>


            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={{
                    height: 50,
                    borderColor: '#ccc',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                }}
            >
                <Text style={{ color: value ? '#000' : '#aaa' }}>
                    {value ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : placeholder}
                </Text>
            </TouchableOpacity>


            {showPicker && (
                <DateTimePicker
                    value={value || new Date()} // Default to the current time
                    mode="time"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
}
