import axios from "axios";
import { Alert, Platform, StyleSheet, Text, TextInput, View , Dimensions, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../common/Button.js'
import { useUser } from "../../context/UserContext";


const CreatePoolScreen = ({navigation}) => {
    const userId = useUser().userId !== null ? useUser().userId : 2;
    const [poolAmount, setPoolAmount] = useState(0);
    const handleAmountChange = (value) => {
        setPoolAmount( !isNaN(parseFloat(value)) ? parseFloat(value): 0);
    }
    const showSuccessAlert = () => {
        Alert.alert(
            "Success! 🥳",
            `Successfully created money pool.`,
            [
                {text: "Close", onPress: () => navigation.navigate("Home")}
            ]
        )
    }

    const showErrorAlert = () => {
        Alert.alert(
            "Oh... ☹️",
            "something must have gone wrong, try again later.",
            [
                {text: "Back", onPress: () => navigation.navigate("CreatePool")},
                {text: "Go Back", onPress: () => navigation.navigate("Home")}
            ]
        )
    }

    const apiCall = async () => {
        try {
            const response = await axios.post(
                "http://172.16.220.49:8080/sessions",
                {
                    amountTobePayedLeft: poolAmount,
                    receiverID: userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(response.data, response.status);
            if (response.status !== 200) {
                showErrorAlert();
            }
            else {
                showSuccessAlert();
            }
        }
        catch (error) {
            showErrorAlert();
        }
    }

    return (
        <KeyboardAvoidingView
            keyboardShouldPersistTaps="handled"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.containerPayment}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate("Home") }}>
                        <Text style={styles.closeButtonText}>Abort</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={styles.amount}
                            value={`${poolAmount}`}
                            onChangeText={handleAmountChange}
                            keyboardType="numeric"
                            maxLength={4}
                            selectTextOnFocus={true}
                            selectionColor="transparent"
                            underlineColorAndroid="transparent"
                            autoFocus={true}
                        />
                        <Text style={styles.euroSymbol}>€</Text>
                    </View>
                    <View style={{width: "80%"}}>
                        <CustomButton
                            title={`Create`}
                            onPress={apiCall}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerPayment: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly'
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

export default CreatePoolScreen;