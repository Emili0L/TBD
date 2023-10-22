import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Button from "../common/Button";
import Text from "../common/Text";
import CustomTextInput from "../common/TextInput";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("name", username);

    if (image) {
      const localUri = image;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", { uri: localUri, name: filename, type });
    }

    try {
      const response = await axios.post(
        "http://172.16.220.109:8080/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration Successful:", response.data);
      navigation.navigate("Home");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.contentWrapper}>
        <View style={styles.formWrapper}>
          {!image ? (
            <TouchableOpacity
              style={styles.imagePlaceholder}
              onPress={pickImage}
            >
              <Text>Choose picture</Text>
            </TouchableOpacity>
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          <CustomTextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.buttonWrapper}>
            <Button title={"Register"} onPress={handleRegister} />
            <Button
              title={"Go back"}
              type="secondary"
              onPress={() => navigation.navigate("Welcome")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  contentWrapper: {
    width: width * 0.8,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonWrapper: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  imagePlaceholder: {
    borderRadius: 999,
    backgroundColor: "#eee",
    width: 150,
    height: 150,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 999,
    width: 150,
    height: 150,
    marginBottom: 50,
  },
});

export default RegisterScreen;
