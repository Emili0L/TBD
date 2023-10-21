import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View , Button, Alert, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LoginScreen from './components/pages/LoginScreen.js';
import RegisterScreen from './components/pages/RegisterScreen.js';
import WelcomeScreen from './components/pages/WelcomeScreen.js';
import * as Linking from 'expo-linking';

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
              initialRouteName="Home"
              screenOptions={{
                  cardOverlayEnabled: true,
                  headerShown: false,
                  presentation: "modal",
              }}
          >
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
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
                <Button title="Bezahlen" onPress={() => navigation.navigate("Payment", {
                    userId: "Test"
                })} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const PaymentScreen = ({route, navigation}) => {
    const [poolData, setPoolData] = useState({
        receiverId: null,
        receiverName: "Loading",
        receiverPicture: null,
        paymentAmount: 999,
    });
    const [modalHeight, setModalHeight] = useState(0);
    const handleAmountChange = (value) => {
        setPoolData(({ ...poolData, paymentAmount: !isNaN(parseFloat(value)) ? parseFloat(value): 0 }));
    }

    const { userId } = route.params;

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setModalHeight(height);
            }}
        >
            <View style={{...styles.containerPayment, height: modalHeight}}>
                <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate("Home") }}>
                    <Text style={styles.closeButtonText}>Abbrechen</Text>
                </TouchableOpacity>
                {
                    poolData.receiverPicture != null ? <></> : <View style={styles.profileImagePlaceholder}></View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={styles.amount}
                        value={`${poolData.paymentAmount}`}
                        onChangeText={handleAmountChange}
                        keyboardType="numeric"
                        maxLength={4}
                        selectTextOnFocus={true}
                        selectionColor="transparent"
                        underlineColorAndroid="transparent"
                    />
                    <Text style={styles.euroSymbol}>€</Text>
                </View>
                <TouchableOpacity style={styles.sendButton} onPress={() => { navigation.navigate("Home") }}>
                    <Text style={styles.sendButtonText}>An {poolData.receiverName} senden</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const { width, height } = Dimensions.get('window');

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
  },
    containerPayment: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    profileImagePlaceholder: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        backgroundColor: '#eee',
        marginTop: 50
    },
    amount: {
        fontSize: 56,
        fontWeight: 'bold',
        marginVertical: 20
    },
    euroSymbol: {
        marginLeft: 5,
        fontSize: 56,
        fontWeight: 'bold'
    },
    sendButton: {
        width: width * 0.6,
        height: 50,
        backgroundColor: '#002E3F',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    sendButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    closeButtonText: {
        color: '#000',
        fontSize: 16,
    }
});
