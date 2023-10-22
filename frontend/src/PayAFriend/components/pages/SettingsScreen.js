import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Modal, TextInput, TouchableOpacity } from 'react-native';
import Button from '../common/Button';

const SettingsScreen = ({ navigation }) => {

    // State to control the visibility of the modal
    const [isPaypalVisible, setPaypalVisible] = useState(false);
    const [isBankVisible, setBankVisible] = useState(false);

    // State to hold and manage the text input value
    const [inputPaypal, setPaypalValue] = useState('');
    const [inputBank, setBankValue] = useState('');


    // Function to toggle modal visibility
    const togglePayPal = () => {
        setPaypalVisible(!isPaypalVisible);
    };

    const toggleBank = () => {
      setBankVisible(!isBankVisible);
  };

    // Function to handle text input change
    const handlePaypalChange = (text) => {
      setPaypalValue(text);
    };

    const handleBankChange = (text) => {
      setBankValue(text);
    };


    // Function to render the popup modal with text input
    const renderPayPalModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isPaypalVisible}
            onRequestClose={togglePayPal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>PayPal</Text>
                    <TextInput
                        style={styles.modalText}
                        onChangeText={handlePaypalChange}
                        value={inputPaypal}
                        placeholder="Enter your details"
                    />
                    <Button
                      style={styles.button}
                      onPress={togglePayPal}
                      title="Submit Details"
                    />
                    <Button
                      style={styles.button}
                      onPress={togglePayPal}
                      title="Cancel"
                    />
                </View>
            </View>
        </Modal>
    );

    const renderBankingModal = () => (
      <Modal
          animationType="slide"
          transparent={true}
          visible={isBankVisible}
          onRequestClose={toggleBank}>
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text>Bank</Text>
                  <TextInput
                      style={styles.modalText}
                      onChangeText={handleBankChange}
                      value={inputBank}
                      placeholder="Enter your details"
                  />
                  <Button
                    style={styles.button}
                    onPress={toggleBank}
                    title="Submit Details"
                  />
                  <Button
                    style={styles.button}
                    onPress={toggleBank}
                    title="Cancel"
                  />
              </View>
          </View>
      </Modal>
  );

    return (
        <View style={styles.container}>
            <Text style={StyleSheet.compose(styles.large)}>Add your payment methods.</Text>
            <View>
              <TouchableOpacity style={styles.flexRow} onPress={togglePayPal}>
                <Image style={styles.image} source={require("../../assets/paypal-icon.png")}></Image>
                <Text style={styles.small}>PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.flexRow} onPress={toggleBank}>
                <Image style={styles.image} source={require("../../assets/bank.png")}></Image>
                <Text style={styles.small}>Bank</Text>
              </TouchableOpacity>
              {renderBankingModal()}
              {renderPayPalModal()}
            </View>
        </View>
    )
}

export default SettingsScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
    flexRow: {
      width:"80%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom:20
    },
    textContainer: {
      paddingTop: 50,
    },
    buttonWrapper: {
      flex:1,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 20,
      paddingRight: 20
    },
    yellow: {
      color: "#FED600"
    },
    white: {
      color: "#FAFAFA"
    },
    image: {
      height: 100,
      width: 100
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
      padrdingBottom: 10, // spaces the buttons
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center", // this ensures your button is horizontally centered
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%', // or whatever size you want
      maxWidth: '90%', // Prevent the modal from being too wide on large screens
  },
  textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      width: '100%', // ensures the text is the full width of the button
  },
})
