import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeFormFieldProps {
    title: string;
    value: Date;
    handleChangeTime: (time: Date) => void;
    placeholder?: string;
    otherStyles?: string;
}

export function TimeFormField({
                                  title,
                                  value,
                                  handleChangeTime,
                                  placeholder = 'Select a time',
                                  otherStyles,
                              }: TimeFormFieldProps) {
    const [tempTime, setTempTime] = useState<Date>(value || new Date());
    const [showPicker, setShowPicker] = useState(false);

    const openPicker = () => {
        setTempTime(value || new Date());
        setShowPicker(true);
    };

    const confirmTime = (selectedTime?: Date) => {
        setShowPicker(false);
        if (selectedTime) {
            handleChangeTime(selectedTime);
        }
    };

    const cancelPicker = () => {
        setShowPicker(false);
    };

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-primary font-inter_bold">
                {title}
            </Text>

            <TouchableOpacity
                onPress={openPicker}
                className={`border-2 border-lighter_primary w-full h-16 px-4 bg-lighter_primary rounded-2xl justify-center
                ${value ? 'border-black' : 'border-lighter_primary'}`}
            >
                <Text
                    className={`text-base font-inter_regular ${value ? 'text-black' : 'text-gray-400'}`}
                >
                    {value
                        ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        : placeholder}
                </Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={tempTime}
                    mode="time"
                    display="spinner"
                    onChange={(event, selectedTime) => {
                        if (event.type === 'set') {
                            confirmTime(selectedTime);
                        } else {
                            cancelPicker();
                        }
                    }}
                />
            )}
        </View>
    );
}
