// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from "./src/screens/HomeScreen.tsx";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home',}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
}