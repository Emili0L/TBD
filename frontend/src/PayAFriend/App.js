import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View , Button, Alert } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './components/pages/LoginScreen.js';
import RegisterScreen from './components/pages/RegisterScreen.js';
import WelcomeScreen from './components/pages/WelcomeScreen.js';
import PaymentScreen from "./components/pages/PaymentScreen";
import * as Linking from 'expo-linking';
import CreatePoolScreen from "./components/pages/CreatePoolScreen";
import HomePage from './components/HomePage/index.js';
import SettingsScreen from './components/pages/SettingsScreen.js'

const Stack = createNativeStackNavigator();

export default function App() {
    const prefix = Linking.createURL("/");
    const config = {
        screens: {
            Payment: "payment/:userId"
        }
    }
    const linking = {
        prefixes: [prefix, "https://payafriend.ggrs.eu", "payafriend://"],
        config
    };
  return (
    <NavigationContainer linking={linking}>
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                cardOverlayEnabled: true,
                headerShown: false,
                presentation: "modal",
            }}
        >
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="CreatePool" component={CreatePoolScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}