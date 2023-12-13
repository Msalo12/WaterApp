// Import necessary modules from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import * as SecureStore from 'expo-secure-store';



// Import constants containing images and icons
import { IMAGES, ICONS } from '../../../constants';
import { STORAGE } from '../../../constants/server';


// Import styles for various components
import { loginCardStyle } from '../../../styles/cards';
import { generalStyle, iconStyle, inputStyle, marginStyle, fontColor, imageStyle, fontFamilyStyle, fontAlignStyle, fontSizes, fontDecorationStyle, fontStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

// Import the login logic
import { handleLoginNew } from '../../Logic/requests/loginRequest';
import { hashPassword } from '../../Logic/utilities/authUtils';

// Create the LoginScreen component
const LoginScreen = ({ route }) => {
   
    // Get access to navigation functions
    const navigation = useNavigation();


    // State for controlling password visibility
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isRequest, setIsRequest] = useState(false);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    // State to hold server error message and code
    const [errorMessage, setErrorMessage] = useState('');
    const [errorCode, setErrorCode] = useState('');

    // State to hold the login and password input values
    const [USER, setUsername] = useState('');
    const [PWD, setPassword] = useState('');

    const inputControl = () => {
        
        const user = USER.replace(/[^0-9]/g, '');

        const hPWD = hashPassword(PWD);

        handleLoginButtonNew(user, hPWD);
    }

    // Function to handle the login button press
    const handleLoginButtonNew = async (user, hPWD) => {
        setIsRequest(true);
        try {
            const response = await handleLoginNew(user, hPWD);
            if (response.result) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigator', state: { routes: [{ name: 'Головна' }] } }],
                  });

            } else if (response.error) {
                setIsRequest(false);
                Alert.alert(`Помилка`, `${response.error.message}`);

            } else {
                setIsRequest(false);
                Alert.alert(`Неочікувана відповідь: ${response}!`);
            }
        } catch (error) {
            // Handle any errors that might occur during login
            setIsRequest(false);
            console.error(error);
        }
    }

    const loginOpenControl = async() => {
        await SecureStore.setItemAsync(STORAGE.ath, 'true');
    }

    useEffect(() => {
        loginOpenControl();
    }, [])


    // Return the login form
    return (
        <ScrollView style={{flex: 1}} automaticallyAdjustKeyboardInsets={true}>
            <View style = { loginCardStyle.loginCard }>
                {/* Display login image */}
                <View  style = { imageStyle.Login }>
                    <IMAGES.login_img  width={528} height={168}  />
                </View>

                {/* Display login title */}
                <View style = { loginCardStyle.titleBox }>
                    <Text style = { fontStyle.bigTitle }>
                        Увійти
                    </Text>
                </View>

                <View>
                    {/* Input for phone number */}
                    <View>
                        <View style={{marginBottom: 8}}>
                            <Text style={ fontStyle.inputHint }>
                                Номер телефону
                            </Text>
                        </View>
                        <TextInputMask
                            type={'custom'}
                            style={[
                                inputStyle.userInput,
                                marginStyle.logInput,
                                errorMessage && errorCode === 'Login' ? generalStyle.wrongInput : null,
                            ]}
                            options={{
                                mask: '380(99)-999-99-99',
                            }}
                            keyboardType='numeric'
                            onChangeText={(text) => setUsername(text)}
                            value={USER}
                            placeholder='380'
                        />
                        {errorMessage && errorCode === 'Login' && (
                            <View style={generalStyle.bubbleContainer}>
                                <View style={generalStyle.bubble}>
                                    <Text style={[fontColor.redText, fontFamilyStyle.MMedium,]}>{errorMessage}</Text>
                                </View>
                                <View style={generalStyle.triangle} />
                            </View>
                        )}
                    </View>

                    {/* Input for password */}
                    <View>
                        <View style={{marginBottom: 8}}>
                            <Text style={fontStyle.inputHint}>
                                Пароль
                            </Text>
                        </View>
                        <TextInput
                            style={[
                                inputStyle.userInput,
                                marginStyle.logInput,
                                errorMessage && errorCode === 'Password' ? generalStyle.wrongInput : null,
                            ]}
                            placeholder=""
                            secureTextEntry={secureTextEntry}
                            onChangeText={(text) => setPassword(text)}
                            value={PWD}
                        />
                        <TouchableOpacity 
                            onPress={togglePasswordVisibility} 
                            style={iconStyle.eyeIconContainer}
                        >
                            {/* Show or hide the eye icon based on password visibility */}
                            {secureTextEntry ? (
                                <ICONS.eye_close width={24} height={24} />
                            ) : (
                                <ICONS.eye_open width={24} height={24} />
                            )}
                        </TouchableOpacity>
                        {errorMessage && errorCode === 'Password' && (
                            <View style={generalStyle.bubbleContainer}>
                                <View style={generalStyle.bubble}>
                                    <Text style={[fontColor.redText, fontFamilyStyle.MMedium,]}>{errorMessage}</Text>
                                </View>
                                <View style={generalStyle.triangle} />
                            </View>
                        )}
                    </View>
                </View>

                {/* Link to the password recovery screen */}
                <View>
                    <TouchableOpacity 
                        title = "PWForget" 
                        style = { generalStyle.rightAlign }
                        onPress = { () => navigation.navigate('RPassword') }
                    >
                        <Text style = { [ fontAlignStyle.rightAlign, fontFamilyStyle.MMedium, fontSizes.size14, fontColor.friendlyText, fontDecorationStyle.underlined]}>
                            Забули пароль?
                        </Text>
                    </TouchableOpacity> 
                </View>

                {/* Login button */}
                <View style = {loginCardStyle.buttonBox}>
                    <TouchableOpacity 
                        title = "Login" 
                        disabled = {isRequest}
                        onPress = {inputControl} 
                        style = { ButtonsStyle.greenButton }
                    >
                        <Text style = { fontStyle.greenButtonText }>
                            Увійти
                        </Text>
                    </TouchableOpacity>  
                </View>

                {/* Link to the registration screen */}
                <View style={loginCardStyle.smallMessageBox}>
                    <Text style={[fontSizes.size14, fontAlignStyle.centerAlign, fontFamilyStyle.MRegular]}>
                        Ще не зареєстровані?{' '}
                    </Text>
                    <TouchableOpacity 
                        onPress={()=>{navigation.navigate('AppNavigator', {screen: 'Registration'})}}
                    >
                        <Text style={[fontFamilyStyle.MMedium, fontSizes.size14, fontColor.friendlyText, fontDecorationStyle.underlined]}>
                            Зареєструйтесь
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

// Export the LoginScreen component as the default export
export default LoginScreen;