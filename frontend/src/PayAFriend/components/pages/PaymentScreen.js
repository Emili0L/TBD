import axios from "axios";
import { Alert, Platform, StyleSheet, Text, TextInput, View , Dimensions, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CustomButton from '../common/Button.js'
import { useUser } from "../../context/UserContext";


const PaymentScreen = ({route, navigation}) => {
    const senderId = useUser().userId !== null ? useUser().userId : 2;
    const {userId} = route.params;
    const receiverId = userId;
    const [poolData, setPoolData] = useState({
        receiverId: null,
        receiverName: "Loading",
        receiverPicture: null,
        paymentAmount: 0,
        poolId: null,
    });
    const handleAmountChange = (value) => {
        setPoolData(({ ...poolData, paymentAmount: !isNaN(parseFloat(value)) ? parseFloat(value): 0 }));
    }
    const showSuccessAlert = () => {
        Alert.alert(
            "Success! 🥳",
            `Successfully send money to ${poolData.receiverName}.`,
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
                {text: "Try Again", onPress: () => navigation.navigate("Payment", {userId: receiverId})},
                {text: "Go Back", onPress: () => navigation.navigate("Home")}
            ]
        )
    }
    const getSessionData = async () => {
        try {
            console.log(receiverId);
            const response = await axios.get(
                `http://172.16.220.49:8080/sessions/${receiverId}`
            )
            console.log(response.data, response.status);
            if (response.status !== 200) {
                showErrorAlert();
            }
            else {
                return response.data;
            }
        }
        catch (error) {
            showErrorAlert();
        }
    }

    const sendPayment = async () => {
        try {
            console.log(`http://172.16.220.49:8080/sessions/${poolData.poolId}/sendmoney/${senderId}/${receiverId}/${poolData.paymentAmount}`);
            const response = await axios.get(
                `http://172.16.220.49:8080/sessions/${poolData.poolId}/sendmoney/${senderId}/${receiverId}/${poolData.paymentAmount}`,
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
    useEffect(() => {
        getSessionData().then((data) => {
            console.log(data);
            setPoolData(
                {
                    ...poolData,
                    receiverId: data.receiver.id,
                    receiverName: data.receiver.name,
                    receiverPicture: `http://172.16.220.49:8080/image/${data.receiver.imageId}`,
                    paymentAmount: data.session.amountTobePayedLeft,
                    poolId: data.session.sessionID
                }
            )
        })
    }, []);
    return (
        <KeyboardAvoidingView
            keyboardShouldPersistTaps="handled"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.containerPayment}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.navigate("Home") }}>
                        <Text style={styles.closeButtonText}>Abort</Text>
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
                    <View style={{width: "80%"}}>
                        <CustomButton
                            title={`Send to ${poolData.receiverName}`}
                            onPress={sendPayment}
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

export default PaymentScreen;