import { StyleSheet, TextInput } from "react-native";

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
    return (
        <TextInput 
            placeholder={placeholder} 
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
        >
        </TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
    }
})

export default CustomTextInput;