import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyles,
                      textStyles, isDisabled}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-primary rounded-xl min-h-[62px] justify-center items-center relative top-10 ${containerStyles} 
            ${isDisabled ? 'opacity-50' : ''}`}
            disabled = {isDisabled}
            >

            <Text className={`text-white font-inter_bold text-lg ${textStyles}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton