import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from "react-native";
import Button from "../common/Button";
import CustomTextInput from "../common/TextInput";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const RegisterScreen = ({ navigation }) => {
    const [imageUrl, setImageUrl] = useState(null)
    const [username, setUsername] = useState("")
    const defaultProfile = require("../../assets/profile.jpg")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUrl(result.assets[0].uri);
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.screenWrapper}>
                <View style={styles.contentWrapper}>
                    <View style={styles.formWrapper}>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={{ marginBottom: 50, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                {!imageUrl && 
                                    <Image source={require("../../assets/profile.jpg")} style={{ width: 100, height: 100, borderRadius: 999 }} />
                                }
                                {imageUrl && 
                                    <Image source={{ uri: imageUrl }} style={{ width: 100, height: 100, borderRadius: 999 }} />
                                }
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: "100%" }}>
                            <CustomTextInput placeholder="Username" value={username} onChangeText={setUsername} />
                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button title={"Register"} onPress={() => navigation.navigate("Home")} />
                            <Button title={"Go back"} type="secondary" onPress={() => navigation.navigate("Welcome")} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    contentWrapper: {
        width: width * 0.8,
        height: height,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        display: "flex",
        gap: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    formWrapper: {
        flex: 1,
        gap: 15,
        justifyContent: "center",
        width: "100%"
    }
})

export default RegisterScreen;