import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateFormFieldProps {
    title: string;
    value: Date;
    handleChangeDate: (date: Date) => void;
    placeholder?: string;
}

export function DateFormField({
                                  title,
                                  value,
                                  handleChangeDate,
                                  placeholder = 'Select a date',
                              }: DateFormFieldProps) {
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios'); // Keep the picker open for iOS
        if (selectedDate) {
            handleChangeDate(selectedDate);
        }
    };

    return (
        <View style={{ marginVertical: 10 }}>
            {/* Title */}
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
                    {value ? value.toDateString() : placeholder}
                </Text>
            </TouchableOpacity>


            {showPicker && (
                <DateTimePicker
                    value={value || new Date()} // Default to the current date
                    mode="date"
                    display="default"
                    onChange={onChange}

                />
            )}
        </View>
    );
}
