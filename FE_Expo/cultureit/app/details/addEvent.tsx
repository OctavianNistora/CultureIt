import { View, Text, StyleSheet } from 'react-native';

export default function AddEventPlaceholder() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add Event Page (Placeholder)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#393838',
    },
});