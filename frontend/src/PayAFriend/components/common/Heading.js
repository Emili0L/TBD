import { Text, StyleSheet } from "react-native";

const Heading = ({ children }) => {
    return (
        <Text style={styles.heading}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "800",
        marginTop: 8,
        marginBottom: 8
    }
})

export default Heading;