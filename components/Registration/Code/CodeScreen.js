// Import necessary modules from React and React Native
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import styles for various components
import { cardCardStyle, codeCardStyle } from '../../../styles/cards';
import { fontAlignStyle, fontColor, fontFamilyStyle, fontSizes, fontStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

import { handleConfirmation } from '../../Logic/requests/confirmRequest';
import { handleRecovery2 } from '../../Logic/requests/passwordRecovery2Request';
import { formatTime } from '../../Logic/renders/timeRender';
import { handleRegistration } from '../../Logic/requests/registerRequest';
import { handleRecovery1 } from '../../Logic/requests/passwordRecovery1Request';
import { handleLoginNew } from '../../Logic/requests/loginRequest';


const CodeScreen = ({ route }) => {
    // Get the 'path' parameter from the route if available
    const { sms_ack_timeout, path, utoken, fields } = route.params;

    const [isRequest, setIsRequest] = useState(false);
    
    // Get access to navigation functions
    const navigation = useNavigation();

    // State for the code inputs
    const [code, setCode] = useState(['', '', '', '']);

    // State to keep track of wrong attempts
    const [wrongAttempts, setWrongAttempts] = useState(0);

    // Initial time for the timer in seconds (3 minutes)
    const initialTime = sms_ack_timeout * 60;
    const [time, setTime] = useState(initialTime);

    // Timer countdown effect
    useEffect(() => {
        let timer;
        if (time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
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

    // Refs to store code input elements
    const codeInputs = useRef([]);

    const handleCodeChange = (index, value) => {
        // Validate that the entered value is a number
        const regex = /^[0-9]*$/;
        if (regex.test(value)) {
            // Update the code state with the entered value
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
    
            // Move focus to the next input field if a value is entered,
            // otherwise, move focus to the previous input field
            if (value !== '') {
                if (index < 3) {
                    codeInputs.current[index + 1].focus();
                }
            } else {
                if (index > 0) {
                    codeInputs.current[index - 1].focus();
                }
            }
        }
    };

    // Function to handle the confirmation button press
    const handleConfirmationButton = async () => {

        setIsRequest(true);

        const ackcode = code.join('');

        if (path === 'register') {
            try {
                // Call handleLogin function with the entered login and password
                const response = await handleConfirmation(ackcode, utoken);
    
                if ( response === true ) {
                    try {
                        const regResponse = await handleLoginNew(fields.user, fields.hPWD);
                        if (regResponse.result) {
                            Alert.alert("Вітаємо", "Вас зареєстровано!");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'TabNavigator', state: { routes: [{ name: 'Головна' }] } }],
                              });
            
                        } else if (regResponse.error) {
                            setIsRequest(false);
                            Alert.alert(`Помилка`, `${regResponse.error.message}`);
                        } else {
                            setIsRequest(false);
                            Alert.alert(`Неочікувана відповідь: ${regResponse}!`);
                        }
                    } catch (error) {
                        // Handle any errors that might occur during login
                        setIsRequest(false);
                        console.error(error);
                    }
                } else if ("error" in response ) {
                    if (response.error.code === -18) {
                        setIsRequest(false);
                        if (wrongAttempts >= 2) {
                            Alert.alert('Закінчилася кількість спроб!', "Ви ввели неравильний код 3 рази.")
                            navigation.navigate('AppNavigator', {screen: 'Login'});
                        } else {
                            setWrongAttempts(wrongAttempts + 1);
                            Alert.alert("Помилка", `${response.error.message}`)
                        }

                    } else if (response.error.code === -30){
                        setIsRequest(false);
                        Alert.alert('Закінчилася кількість спроб!', "Ви ввели неравильний код 3 рази.")
                        navigation.navigate('AppNavigator', {screen: 'Login'});
                    } else {
                        setIsRequest(false);
                        Alert.alert(`Помилка`, `${response.error.message}`);
                    }
                } else {        
                    setIsRequest(false);
                    Alert.alert(`Неочікувана відповідь: ${response}!`);
                }
            } catch (error) {
                setIsRequest(false);
                // Handle any errors that might occur during login
                console.log(error);
            }

        } else if (path === 'reset') {
            try {
                // Call handleLogin function with the entered login and password
                const response = await handleRecovery2(ackcode, utoken);
    
                if ( response === true ) {
                    navigation.navigate("AppNavigator", {
                        screen: "NPassword",
                        params: {
                            ackcode: ackcode,
                            ctime: time,
                            utoken: utoken
                        }
                    });
                } else if ("error" in response ) {
                    setIsRequest(false);
                    if (response.error.code === -18) {
                        if (wrongAttempts >= 2) {
                            Alert.alert('Закінчилася кількість спроб!', "Ви ввели неравильний код 3 рази.")
                            navigation.navigate('AppNavigator', {screen: 'Login'});
                        } else {
                            setWrongAttempts(wrongAttempts + 1);
                            Alert.alert("Помилка", `${response.error.message}`)
                        }
                    } else if (response.error.code === -30){
                        Alert.alert('Закінчилася кількість спроб!', "Ви ввели неравильний код 3 рази.")
                        navigation.navigate('AppNavigator', {screen: 'Login'});
                    } else {
                        Alert.alert(`Error: ${response.error.code}`, `${response.error.message}`);
                    }
                } else {
                    setIsRequest(false);
                    Alert.alert(`Неочікувана відповідь: ${JSON.stringify(response)}!`);
                }
            } catch (error) {                
                // Handle any errors that might occur during login
                setIsRequest(false);
                console.log(error);
            }
        } else {
            setIsRequest(false);
            return 0;
        }
    
    };

    const handleSendAgainButton = async () => {
 
      }
 



    const handleCancel = () => {
        if (path === 'register') {
            setIsRequest(false);
            navigation.navigate('AppNavigator', {
                screen: 'Registration',
                params: {
                    rtime: time,
                    prev_user: fields.user
                }
            })
        }
        else {
            setIsRequest(false);
            navigation.navigate('AppNavigator', {screen: 'Login'})
        }
    }
    

    // Return the code form
    return (
        <View style={{ flex: 1 }}>
            <View style={codeCardStyle.codeCard}>
                <View>
                    {/* Display code screen title */}
                    <View style={codeCardStyle.titleBox}>
                        <Text style={fontStyle.bigTitle}>
                            Введіть код
                        </Text>
                    </View>
                    {/* Display a message to instruct the user */}
                    <View style={codeCardStyle.smallMessageBox}>
                        <Text style={[fontSizes.size17, fontColor.darkgreyText, fontFamilyStyle.SFMedium, fontAlignStyle.centerAlign]}>
                            Введіть код з СМС, що прийшов {'\n'}на ваш мобільний телефон
                        </Text>
                    </View>
                </View>
                <View style={codeCardStyle.codeContainer}>
                    {/* Display code input fields */}
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={codeCardStyle.codeInput}
                            value={digit}
                            onChangeText={(value) => handleCodeChange(index, value)}
                            maxLength={1}
                            keyboardType="numeric"
                            ref={(ref) => (codeInputs.current[index] = ref)}
                            blurOnSubmit={false}
                            autoFocus={index === 0}
                        />
                    ))}
                </View>
                <View style={[ codeCardStyle.timeButtonBox, { alignItems: 'center' }]}>
                    {/* Display the remaining time */}
                    <Text style={[fontSizes.size17, fontColor.darkgreyText, fontFamilyStyle.SFMedium, fontAlignStyle.centerAlign]}>{formatTime(time)}</Text>
                    {/* Button to send a new code */}
                    <TouchableOpacity 
                        style={ButtonsStyle.greyButton}
                        onPress={handleSendAgainButton}    
                    >
                        <Text style={fontStyle.smallGreyButtonText}>
                            Надіслати новий код
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* Confirmation button */}
                <View style={codeCardStyle.buttonsBox}>
                    <View>
                        <TouchableOpacity 
                            style={ButtonsStyle.greenButton} 
                            onPress={handleConfirmationButton}
                            disabled={isRequest}
                        >
                            <Text style={fontStyle.greenButtonText}>
                                Далі
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Button to cancel and go back to login */}
                    <View>
                        <TouchableOpacity style={ButtonsStyle.greenReverseButton} onPress={handleCancel}>
                            <Text style={fontStyle.whiteButtonText}>
                                Скасувати
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CodeScreen;