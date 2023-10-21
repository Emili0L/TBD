import React,{ useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import Input from '../common/Input.js';
import paypalIcon from '../../assets/paypal-icon.png';


const LoginPage = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [onEmailInputFocus, setEmailInputFocus] = useState(true);
    const [onPasswordInputFocus, setPasswordInputFocus] = useState(true);
    const [hasPhoneNumber, setPhoneNumber] = useState(true);

    const handleEmailTypeSelection = () => {
        setPhoneNumber({
            hasPhoneNumber: !hasPhoneNumber,
        });
    }

    return (
        <View style={{ height: '100%', marginTop: 10 }}>
            <View style={styles.container}>

            </View>
                <View style={{ padding: 30, height: '57%' }}>
                    <View style={{ width: '100%', flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            style={{
                                borderColor: onEmailInputFocus ? '#169BD7' : '#C3C8CC',
                                width: "200px",
                                height: "40px",
                                marginTop: "16px",
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                            }}
                            placeholder={hasPhoneNumber ? 'Phone number' : 'Email'}
                            placeholderTextColor="#C3C8CC"
                            onChangeText={email => setEmail({ email })}
                            onFocus={() => setEmailInputFocus({ onEmailInputFocus: true })}
                            onBlur={() => setEmailInputFocus({ onEmailInputFocus: false })}
                            type={hasPhoneNumber ? 'number' : 'email'}
                            keyboardType={hasPhoneNumber ? 'numeric' : 'email-address'}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <TextInput
                                style={{
                                    borderColor: onPasswordInputFocus ? '#169BD7' : '#C3C8CC',
                                    width: '75%',
                                    height: "40px",
                                    marginTop: "16px",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 10,
                                }}
                                placeholder="Password"
                                placeholderTextColor="#C3C8CC"
                                onChangeText={password => setPassword({ password })}
                                onFocus={() => setPasswordInputFocus({ onPasswordInputFocus: true })}
                                onBlur={() => setPasswordInputFocus({ onPasswordInputFocus: false })}
                                secureTextEntry={true}
                            />
                            <View style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    borderBottomWidth: 1,
                                    borderColor: onPasswordInputFocus ? '#169BD7' : '#C3C8CC',
                                    width: '25%',
                                }}
                            >
                                <Button
                                    onPress={() =>
                                        navigation.navigate(
                                            'ForgotPassword',
                                            { email: hasPhoneNumber ? 'phone' : 'email' }
                                        )
                                    }
                                    style={{ color: '#169BD7' }}
                                    title="Forgot?"
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Button
                                onPress={handleEmailTypeSelection}
                                style={{ color: '#169BD7' }}
                                title={!hasPhoneNumber ? 'Use phone number instead' : 'Use email instead'}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ top: 10, marginBottom: 20 }}>
                        <Button
                            onPress={() =>
                                navigation.navigate('Home')
                            }
                            style={{ color: '#169BD7' }}
                            title="New to PayPal? Sign up"
                        />
                    </View>
                    
                </View>
            </View>            
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 18, // your desired size
      textAlign: 'center',
    },
  });

export default LoginPage;