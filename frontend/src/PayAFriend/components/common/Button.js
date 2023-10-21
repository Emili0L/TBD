import { TouchableOpacity, Text, StyleSheet, View, Dimensions } from "react-native";

const Button = ({ title, onPress, type }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, type === "secondary" ? styles.secondary : styles.primary]} onPress={onPress}>
                <Text style={[styles.title, type === "secondary" ? styles.titleSecondary : styles.titlePrimary]}>{title}</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
    },
    button: {
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    secondary: {
        backgroundColor: "#eee",
    },
    primary: {
        backgroundColor: "#002e3f",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    titlePrimary: {
        color: "white",
    },
    titleSecondary: {
        color: "black"
    }
})

export default Button;