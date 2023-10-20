import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View , Button} from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>PayAFriend</Text>
            <View>
                <Text>iOS > Android</Text>
                <Button title={"Willkommen"} onPress={() => navigation.navigate("Welcome")} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Willkommen</Text>
            <Button title={"Zurück"} onPress={() => navigation.navigate("Home")} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
