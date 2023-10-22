import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Button from "../common/Button";
import { useUser } from "../../context/UserContext";

const HomePage = ({navigation}) => {
    const [isSending, setIsSending] = useState(false);
    const handleSendingButton = () => {
      setIsSending(!isSending);
    };
    return (
        <View style={styles.container}>
            <Button
              title="Settings"
              onPress={() => {
                navigation.navigate("Settings", {userId: 12345});
            }}
            />
            <TouchableOpacity style={StyleSheet.compose(styles.textContainer, styles.plane)} onPress={handleSendingButton}>
                <Text style={StyleSheet.compose(styles.small, styles.white)}>Is it time to</Text>
                <Text style={StyleSheet.compose(styles.large, styles.yellow)}>PayAFriend?</Text>
                { isSending && (
                  <View>
                    <Image style={styles.image} source={require('../../assets/arrow-white.png')}/>
                    <Text style={StyleSheet.compose(styles.small, styles.white, styles.mt20)}>Scan tag</Text>
                  </View>
                )}
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
                <Button
                    onPress={handleSendingButton}
                    title="Send Money"
                />
                <Button
                    onPress={() => {
                        navigation.navigate("CreatePool", {userId: 12345});
                    }}
                    title="Create Pool"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userIdText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    paddingTop: 50,
  },
  buttonWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  yellow: {
    color: "#FED600",
  },
  white: {
    color: "#FAFAFA",
  },
  image: {
    marginTop: -80,
    marginLeft: -50,
    transform: [{ rotate: "280deg" }],
  },
  small: {
    fontSize: 20,
    textAlign: "center",
  },
  large: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  mt20: {
    marginBottom: -1000,
  },
  plane: {
    backgroundColor: "#002E3F",
    alignSelf: "stretch",
    padding: 10,
    height: "70%",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default HomePage;
