// Import necessary modules from React and React Native
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

// Import styles for various components
import { passwordCardStyle } from '../../../styles/cards';
import { fontColor, fontAlignStyle, fontFamilyStyle, fontSizes, inputStyle, marginStyle, fontStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

import { handleRecovery1 } from '../../Logic/requests/passwordRecovery1Request';


const RPasswordScreen = ({ route }) => {
    // Get access to navigation functions
    const navigation = useNavigation();

    const [isRequest, setIsRequest] = useState(false);

    const hideKeyboard = () => {
        Keyboard.dismiss();
    };

    // State for getting values of login and password input
    const [USER, setUsername] = useState(route.params ? route.params.login : '');

    const isPhoneNumber = (str) => /^380\d{9}$/.test(str);
    // Function to control input fields and trigger registration if all fields are filled
    const inputControl = () => {
    
        /* start: login input digits handling */
        const user = USER.replace(/[^0-9]/g, '');
        /* end: login input digits handling */
        if ( isPhoneNumber(user) ) {
            handleRecovery1Button(user);
        }
    };
    
    const handleRecovery1Button = async (user) => {
        setIsRequest(true);
        try {
            // Call handleLogin function with the entered login and password
            const response = await handleRecovery1(user);
            if ( "result" in response ) {
                if (response.result.ack_code != '') {
                    Alert.alert("Код для тестових номерів", `Введіть ${response.result.ack_code}`)
                }
                navigation.navigate("AppNavigator", {
                    screen: "Code",
                    params: {
                      sms_ack_timeout: response.result.sms_ack_timeout,
                      path: 'reset',
                      utoken: response.result.utoken,
                      fields: {
                        user: user
                      }
                      // You can add more parameters as needed
                    }
                  });
            }
            else if (response.error.code === -17) {
                setIsRequest(false);
                const message = 'Користувача не існує';
                Alert.alert(`Помилка`, `${message}`);
            } else if (response.error.code) {
                setIsRequest(false);
                const message = response.error.message === '' ? 'Користувача не існує!' : response.error.message
                Alert.alert(`Помилка`, `${message}`);
            } else {
                setIsRequest(false);
                Alert.alert(`Неочікувана відповідь: ${response}!`);
            }
        } catch (error) {
            setIsRequest(false);
            // Handle any errors that might occur during login
            console.log(error);
        }
    };

    // Render the password recovery screen
    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={{ flex: 1 }}>
                <View style = { passwordCardStyle.passwordCard }>
                    <View>
                        {/* Display password recovery title */}
                        <View style = {passwordCardStyle.titleBox}> 
                            <Text style = {fontStyle.bigTitle}>
                                Відновлення паролю
                            </Text>
                        </View>
                        {/* Display a message to instruct the user */}
                        <View style = { passwordCardStyle.smallMessageBox }>
                            <Text style = {[fontSizes.size17, fontColor.darkgreyText, fontFamilyStyle.SFMedium, fontAlignStyle.centerAlign]}>
                                Введіть номер телефону для ідентифікації {'\n'}вашого акаунту
                            </Text>
                        </View>
                    </View>
                    <View>
                        {/* Input for phone number */}
                        <View style = {{marginBottom: 8}}>
                            <Text style={fontStyle.inputHint}>
                                Номер телефону
                            </Text>
                        </View>
                        <TextInputMask
                            type={'custom'}
                            style={[
                                inputStyle.userInput,
                                marginStyle.logInput,
                            ]}
                            options={{
                                mask: '380(99)-999-99-99',
                              }}
                            keyboardType="numeric"
                            placeholder="380"
                            onChangeText={(text) => setUsername(text)}
                            value={USER}
                        />
                    </View>
                    <View style={passwordCardStyle.bottomContainer}>
                        {/* Button to proceed to code verification */}
                        <View>
                            <TouchableOpacity 
                                style={ButtonsStyle.greenButton} 
                                onPress={inputControl}
                                disabled={isRequest}
                            >
                                <Text style={fontStyle.greenButtonText}>
                                    Далі
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* Button to cancel and go back to login */}
                        <View>
                            <TouchableOpacity 
                                style={ButtonsStyle.greenReverseButton} 
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={fontStyle.whiteButtonText}>
                                    Скасувати
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        
    );
};

export default RPasswordScreen;

    