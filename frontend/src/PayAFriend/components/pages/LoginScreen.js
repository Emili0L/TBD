import { View, StyleSheet } from "react-native";
import Button from "../common/Button";

const LoginScreen = ({ navigation }) => {
    return (
        <Button title={"Zurück"} onPress={() => navigation.navigate("Welcome")} />
    )
}

export default LoginScreen;
