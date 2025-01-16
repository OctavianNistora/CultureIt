import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateFormFieldProps {
    title: string;
    value: Date;
    otherStyles?: string;
    handleChangeDate: (date: Date) => void;
    placeholder?: string;
}

export function DateFormField({
                                  title,
                                  value,
                                  handleChangeDate,
                                  placeholder = 'Select a date',
                                  otherStyles,
                              }: DateFormFieldProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const onChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        if (selectedDate) {
            handleChangeDate(selectedDate);
        }
    };

    const renderPicker = () => {
        if (Platform.OS === 'ios') {
            return (
                <Modal
                    transparent
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={() => setShowPicker(false)}
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
                                backgroundColor: '#F3E9B5',
                                padding: 20,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}
                        >
                            <DateTimePicker
                                value={value || new Date()}
                                mode="date"
                                display="spinner"
                                onChange={(event, date) => {
                                    if (date) handleChangeDate(date);
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPicker(false)}
                                style={{
                                    marginTop: 10,
                                    alignSelf: 'center',
                                    backgroundColor: 'black',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={{ color: 'white' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            );
        }

        return (
            showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )
        );
    };

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-primary font-inter_bold">{title}</Text>

            <TouchableOpacity
                onPress={() => {
                    setShowPicker(true);
                    setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                style={{
                    height: 64,
                    backgroundColor: '#F3E9B5',
                    borderWidth: 2,
                    borderColor: '#F3E9B5',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        color: value ? 'black' : '#aaa',
                        fontSize: 16,
                        fontFamily: 'Inter-Regular',
                    }}
                >
                    {value ? value.toDateString() : placeholder}
                </Text>
            </TouchableOpacity>

            {renderPicker()}
        </View>
    );
}
