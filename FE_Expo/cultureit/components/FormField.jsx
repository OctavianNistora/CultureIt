import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'

const FormField = ({title, value, placeholder,
handleChangeText, otherStyles, ...props}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className = {`space-y-2 ${otherStyles}`}>
            <Text className = "text-base text-primary font-inter_bold">
                {title}
            </Text>

            <View className = {`border-2 border-lighter_primary w-full h-16 px-4 bg-lighter_primary rounded-2xl
            ${isFocused ? 'border-black' : 'border-lighter_primary'} items-center`}>

                <TextInput
                    className="flex-1 text-primary font-inter_regular text-base"
                    value = {value}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                    onChange={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    onFocus={() => setIsFocused(true)}  // When focused, update state
                    onBlur={() => setIsFocused(false)}
                />

            </View>
        </View>
    )
}

export default FormField