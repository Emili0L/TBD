import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import React, { useState } from "react";
import LoginScreen from "./components/pages/LoginScreen.js";
import RegisterScreen from "./components/pages/RegisterScreen.js";
import WelcomeScreen from "./components/pages/WelcomeScreen.js";
import PaymentScreen from "./components/pages/PaymentScreen";
import * as Linking from "expo-linking";
import CreatePoolScreen from "./components/pages/CreatePoolScreen";
import HomePage from './components/HomePage/index.js';
import SettingsScreen from './components/pages/SettingsScreen.js'
import { UserProvider } from "./context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const prefix = Linking.createURL("/");
  const config = {
    screens: {
      Payment: "payment/:userId",
    },
  };
  const linking = {
    prefixes: [prefix, "https://payafriend.ggrs.eu", "payafriend://"],
    config,
  };
  return (
    <UserProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                cardOverlayEnabled: true,
                headerShown: false
            }}
        >
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} options={{presentation: "modal"}} />
            <Stack.Screen name="CreatePool" component={CreatePoolScreen} options={{presentation: "modal"}} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );

}

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Handle registration logic here
    Alert.alert(
      "Registration Successful",
      `Email: ${email}\nPassword: ${password}`
    );
  };
  return (
    <View style={styles.container}>
      <Text>PayAFriend</Text>
      <View>
        <Text style={styles.headline}>Hello my friend.</Text>
        <Text>Please register yourself.</Text>
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true} // hides the password text
          onChangeText={setPassword}
          value={password}
        />
        <Button title={"Next"} onPress={() => navigation.navigate("Welcome")} />
        <Button
          title="Bezahlen"
          onPress={() =>
            navigation.navigate("Payment", {
              userId: "Test",
            })
          }
        />
        <Button
          title="Pool erstellen"
          onPress={() =>
            navigation.navigate("CreatePool", {
              userId: "Test",
            })
          }
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    color: "#000",
    fontFamily: "",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "600",
  },
});
