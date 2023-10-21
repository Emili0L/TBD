import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import Button from "../common/Button";
import Text from "../common/Text";
import CustomTextInput from "../common/TextInput";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const RegisterScreen = ({ navigation }) => {
    const [image, setImage] = useState()
    const [username, setUsername] = useState("")

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.screenWrapper}>
            <View style={styles.contentWrapper}>
                <View style={styles.formWrapper}>
                    {!image && 
                        <View style={{
                                borderRadius: 999,
                                backgroundColor: "#eee",
                                width: 150,
                                height: 150,
                                marginBottom: 50
                            }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }} onPress={pickImage}>
                                <Text>Choose picture</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {image &&
                        <View style={{ borderRadius: 999, marginBottom: 50, flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
                        </View>
                    }
                    <CustomTextInput placeholder="Username" value={username} onChangeText={setUsername} />
                    <View style={styles.buttonWrapper}>
                        <Button title={"Register"} onPress={() => navigation.navigate("Home")} />
                        <Button title={"Go back"} type="secondary" onPress={() => navigation.navigate("Welcome")} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    screenWrapper: {
        display: "flex",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    contentWrapper: {
        width: width * 0.8,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    formWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    }
})

export default RegisterScreen;