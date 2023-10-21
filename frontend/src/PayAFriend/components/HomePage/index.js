import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View , Alert, TouchableOpacity, Image} from 'react-native';
import React, { useState } from 'react';
import Button from '../common/Button';

const HomePage = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {

    };
    return (
        <View style={styles.container}>
            <View style={StyleSheet.compose(styles.textContainer, styles.plane)}>
                <TouchableOpacity
                    styles={styles.button}
                    title="Settings"
                    color="#002E3F"
                    borderWidth="5"
                    borderColor="#FAFAFA"
                >
                </TouchableOpacity>
                <Text style={StyleSheet.compose(styles.small, styles.white)}>Is it time to</Text>
                <Text style={StyleSheet.compose(styles.large, styles.yellow)}>PayAFriend?</Text>
                <Image style={styles.image} source={require('../../assets/arrow-white.png')}/>
                <Text style={StyleSheet.compose(styles.small, styles.white, styles.mt20)}>Click to pay</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => {
                        console.log('You tapped the button!');
                    }}
                    title="Send Money"
                />
                <Button
                    onPress={() => {
                        console.log('You tapped the button!');
                    }}
                    title="Receive Money"
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      textContainer: {
        paddingTop: 50,
        marginBottom: 20,
      },
      buttonContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      yellow: {
        color: "#FED600"
      },
      white: {
        color: "#FAFAFA"
      },
      image: {
        marginTop: -80,
        marginLeft: -50,
        transform: [
            { rotate: '280deg' } // rotate by 45 degrees
          ]
      },
      small: {
        fontSize: 20,
        textAlign: 'center',
      },
      large: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      mt20: {
        marginBottom:-1000
      },
      plane: {
        backgroundColor: '#002E3F',
        alignSelf: 'stretch', // makes the plane stretch to fill the parent width
        padding: 10,
        height: "70%"
      },
      buttonContainer: {
        marginBottom: 10, // spaces the buttons
      },
})

export default HomePage;
