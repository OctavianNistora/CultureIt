import { View, Text } from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import "../../global.css"

export default function Details(){
    const { title, description } = useLocalSearchParams();
    console.log(title, description);
    return (
        <View>
            <Text className="text-xl font-bold text-primary mb-4">{title}</Text>
            <Text className="text-lg text-gray-600">{description}</Text>
        </View>
    );
};