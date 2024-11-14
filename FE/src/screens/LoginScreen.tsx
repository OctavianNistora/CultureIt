import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});