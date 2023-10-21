import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View , Button, Alert} from 'react-native';
import React, { useState } from 'react';
import LoginPage from './components/LoginPage/index.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


const HomeScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
    // Handle registration logic here
    Alert.alert('Registration Successful', `Email: ${email}\nPassword: ${password}`);
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
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Willkommen</Text>
            <Button title={"Zurück"} onPress={() => navigation.navigate("Home")} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    color: '#000',
    fontFamily: "",
    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "600",
  }
});
