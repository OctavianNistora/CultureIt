import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Modal, Button } from 'react-native';
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

    const confirmTime = () => {
        handleChangeTime(tempTime);
        setShowPicker(false);
    };

    const cancelPicker = () => {
        setShowPicker(false);
    };

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-primary font-inter_bold">{title}</Text>

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
                <Modal
                    transparent
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={cancelPicker}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                padding: 20,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}
                        >
                            <DateTimePicker
                                value={tempTime}
                                mode="time"
                                display="spinner"
                                onChange={(event, selectedTime) => {
                                    if (event.type === 'set') {
                                        setTempTime(selectedTime || tempTime);
                                    }
                                }}
                            />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Button title="Cancel" onPress={cancelPicker} />
                                <Button title="Done" onPress={confirmTime} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}
