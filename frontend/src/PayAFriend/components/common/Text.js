import { StyleSheet, Text } from "react-native";

const CustomText = ({ children, alignCenter }) => {
    return (
        <Text style={[styles.text, alignCenter && {textAlign: "center"}]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        marginTop: 4,
        marginBottom: 4
    }
})

export default CustomText;