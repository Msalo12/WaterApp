// Import necessary modules from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import constants containing images and icons
import { ICONS } from '../../../constants'

// Import styles for various components
import { passwordCardStyle } from '../../../styles/cards';
import { fontColor, fontAlignStyle, fontFamilyStyle, fontSizes, iconStyle, marginStyle, inputStyle, generalStyle, fontStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

import { formatTime } from '../../Logic/renders/timeRender';

import { hashPassword } from '../../Logic/utilities/authUtils';
import { handleRecovery3 } from '../../Logic/requests/passwordRecovery3Request';

const NPasswordScreen = ({ route }) => {

    // Get access to navigation functions
    const navigation = useNavigation();
    
    const [isRequest, setIsRequest] = useState(false);

    const hideKeyboard = () => {
        Keyboard.dismiss();
    };

    const { ackcode, ctime, utoken } = route.params;

    // State to secure the entering of the password (hide/show symbols in password)
    const [secureTextEntry, setSecureTextEntry] = useState(true);    
    
    const [PWD, setPassword] = useState('');
    const [wrongField, setWrongFields] = useState('');
    

    // Function to toggle hide/show password
    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const [time, setTime] = useState(ctime);

    // Timer countdown effect
    useEffect(() => {
        let timer;
        if (time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            Alert.alert('Вийшов час для відновлення паролю')
            // Time has ended, navigate to the login page
            navigation.navigate("AppNavigator", {
                screen: "Login",
              });
        }
        return () => {
            // Clean up the interval when the component is unmounted or time is 0
            clearInterval(timer);
        };
    }, [time, navigation]);



    const inputControl = () => {
        setWrongFields('');
        const passwordRegex = /^[a-zA-Z0-9а-яА-ЯіІїЇєЄ]*$/;
        if (!passwordRegex.test(PWD)) {
            setWrongFields('Пароль не має містити спеціальних символів!');
        }
        else if(PWD === '') {
            setWrongFields("Обов'язкове поле");
        } else {
            setWrongFields('');
            const hpwd = hashPassword(PWD);
            handleRecovery3Button(hpwd);
        }
    };

    // Function to handle the registration button press
    const handleRecovery3Button = async (hpwd) => {
        setIsRequest(true);
        try {
            // Call handleLogin function with the entered login and password
            const response = await handleRecovery3(ackcode, hpwd, utoken)
            if ( response === true) {
                Alert.alert('Ви успішно змінили пароль!')
                navigation.navigate("AppNavigator", {screen: "Login"});
            }
            else if (response.error) {
                setIsRequest(false);
                Alert.alert(`Помилка`, `${response.error.message}`);
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
    // Return the code form
    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={{ flex: 1 }}>
                <View style={passwordCardStyle.passwordCard}>
                    <View>
                        {/* Display password change title */}
                        <View style={passwordCardStyle.titleBox}>
                            <Text style={fontStyle.bigTitle}>
                                Новий пароль
                            </Text>
                        </View>
                        {/* Display a message to instruct the user */}
                        <View style={passwordCardStyle.smallMessageBox}>
                            <Text style={[fontSizes.size17, fontColor.darkgreyText, fontFamilyStyle.SFMedium, fontAlignStyle.centerAlign]}>
                                Створіть новий, надійний пароль
                            </Text>
                            <Text style={[fontSizes.size17, fontColor.darkgreyText, fontFamilyStyle.SFMedium, fontAlignStyle.centerAlign]}>{formatTime(time)}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{marginBottom: 8}}>
                            <Text style = {fontStyle.inputHint}>
                                Пароль
                            </Text>
                        </View>
                        <TextInput 
                            style={[
                                inputStyle.userInput,
                                marginStyle.signInput,
                                wrongField != '' ? generalStyle.wrongInput : null,
                            ]}
                            placeholder =''
                            secureTextEntry={secureTextEntry}
                            onChangeText = {(text) => setPassword(text)}
                            value = {PWD}
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
                        {(wrongField != '') && (
                        <View style={generalStyle.bubbleContainer}>
                            <View style={generalStyle.bubble}>
                                <Text style={[fontColor.redText, fontFamilyStyle.MMedium]}>{wrongField}</Text>
                            </View>
                            <View style={generalStyle.triangle} />
                        </View>
                        )}
                    </View>
                    <View style={passwordCardStyle.bottomContainer}>
                        {/* Button to submit the new password */}
                        <View>
                            <TouchableOpacity
                                style={ButtonsStyle.greenButton}
                                onPress={() => {
                                    // Display a success message and navigate to the login screen
                                    inputControl()
                                }}
                                disabled={isRequest}
                            >
                                <Text style={fontStyle.greenButtonText}>
                                    Далі
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* Button to cancel and go back to the login screen */}
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

export default NPasswordScreen;