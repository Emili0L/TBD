import { Dimensions, Image, StyleSheet, View} from 'react-native';
import Button from '../common/Button';
import CustomText from '../common/Text';
import Heading from '../common/Heading';

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 50,
                    marginBottom: 50
                }}>
                    <Image
                        style={{
                            height: 250,
                            width: 250
                        }}
                        source={require("../../assets/pay.png")}
                    ></Image>
                </View>
                <Heading>Welcome to PayAFriend</Heading>
                <CustomText alignCenter>PayAFriend makes it easy to send money to your friends.</CustomText>
                <View style={styles.buttonWrapper}>
                    <Button title={"Login"} onPress={() => navigation.navigate("Home")} />
                    <Button title={"Register"} type={"secondary"} onPress={() => navigation.navigate("Register")} />
                </View>
            </View>
        </View>
    )
}

const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    contentWrapper: {
        width: width * 0.8,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    placeholder: {
        backgroundColor: "#eee",
        height: height * 0.4,
        width: "100%"
    }
});

export default WelcomeScreen;