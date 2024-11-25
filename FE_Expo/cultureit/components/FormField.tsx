import {Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  placeholder?: string;
  isSecureText?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoComplete?: 'off' | 'username' | 'password' | 'email' | 'given-name' | 'family-name';
}

export function FormField({
                            title, value, handleChangeText, otherStyles, placeholder, isSecureText,
                            keyboardType, autoComplete
                          }: FormFieldProps) {

  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-primary font-inter_bold">
        {title}
      </Text>

      <View className={`border-2 border-lighter_primary w-full h-16 px-4 bg-lighter_primary rounded-2xl
            ${isFocused ? 'border-black' : 'border-lighter_primary'} items-center`}>

        <TextInput
          className="flex-1 text-black font-inter_regular text-base w-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="white"
          onChangeText={handleChangeText}
          secureTextEntry={isSecureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          autoCapitalize="none"
        />
      </View>
    </View>
  )
}