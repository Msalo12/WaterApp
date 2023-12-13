// Import necessary modules from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

// Import constants containing images and icons
import { IMAGES, ICONS } from '../../../constants'

// Import styles for various components
import { signUpCardStyle } from '../../../styles/cards';
import { generalStyle, iconStyle, inputStyle, marginStyle, fontColor, imageStyle, fontAlignStyle, fontFamilyStyle, fontSizes, fontDecorationStyle, fontStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

// Import the registration logic
import { formatTime } from '../../Logic/renders/timeRender';
import { handleRegistration } from '../../Logic/requests/registerRequest';
import { hashPassword } from '../../Logic/utilities/authUtils';


const SignUpScreen = ({ route }) => {

    const [isRequest, setIsRequest] = useState(false);

    const rtime = route.params ? route.params.rtime : 0; 
    const prev_user = route.params ? route.params.prev_user : ''; 
    // Get access to navigation functions
    const navigation = useNavigation();

    // State for securing the entering of the password (hide/show symbols in password)
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setSecureTextEntry(!secureTextEntry);
    };

    // State for getting values of login and password input
    const [USER, setUsername] = useState('');
    const [PWD, setPassword] = useState('');
    const [EMAIL, setEmail] = useState('');

    // State to keep track of empty fields and the message for empty fields
    const [emptyFields, setEmptyFields] = useState([]);
    const emptyMessage = "Це обов'язкове поле!";

    const [wrongField, setWrongFields] = useState('');



    const [rtimer, setRtime] = useState(rtime);


    useEffect(() => {
        let timer;
        if (rtimer > 0) {
            timer = setInterval(() => {
                setRtime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            // Clear the interval if time is 0
            clearInterval(timer);
        }
        
        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, [rtimer]); // Only time is used as a dependency

    //login input control
    const isAllDigits = (str) => /^\d+$/.test(str);

    // Function to control input fields and trigger registration if all fields are filled
    const inputControl = () => {
        
        /* clearing all error arrays, for checking again */
        const newEmptyFields = [];
        setWrongFields('');

        /* start: empty input handling */
        if (!USER) {
          newEmptyFields.push('login');
        }
        if (!PWD) {
          newEmptyFields.push('password');
        }
        if (!EMAIL) {
          newEmptyFields.push('email');
        }
        
        // Update the state with the array of empty fields
        setEmptyFields(newEmptyFields); 
        /* end: empty input handling */

        /* start: password special symbols input handling */
        const passwordRegex = /^[a-zA-Z0-9а-яА-ЯіІїЇєЄ]*$/;

        if (!passwordRegex.test(PWD)) {
            setWrongFields('Пароль не має містити спеціальних символів!');
        }
        else {
            setWrongFields('');
        }
        /* end: password special symbols input handling */
        
        /* start: login input digits handling */
        const user = USER.replace(/[^0-9]/g, '');
        /* end: login input digits handling */

        if ((newEmptyFields.length === 0) && (wrongField === '') && (isAllDigits(user))) {
            const hPWD = hashPassword(PWD)
          // All fields are filled, proceed with registration

            if ( rtimer === 0) {
                handleRegistrationButton(user, hPWD);
            } else if (user != prev_user) {
                handleRegistrationButton(user, hPWD);
            } else {
                Alert.alert('Помилка', `Мінімальний проміжок між спробами реєстрації - 3 хв. Залишилося чекати ${formatTime(rtimer)}`)
            }
        }


    };

    // Function to handle the registration button press
    const handleRegistrationButton = async (user, hPWD) => {
        setIsRequest(true);
        try {
            // Call handleLogin function with the entered login and password
            const response = await handleRegistration(user, hPWD, EMAIL);
            if ( "result" in response ) {
                if (response.result.ack_code != '') {
                    Alert.alert("Код для тестових номерів", `Введіть ${response.result.ack_code}`)
                }
                navigation.navigate("AppNavigator", {
                    screen: "Code",
                    params: {
                      sms_ack_timeout: response.result.sms_ack_timeout,
                      path: 'register',
                      utoken: response.result.utoken,
                      fields: {
                        user: user,
                        hPWD: hPWD,
                        email: EMAIL
                      }
                      // You can add more parameters as needed
                    }
                  });
            }
            else if (response.error.code === -16) {
                setIsRequest(false);
                Alert.alert(
                    'Помилка',
                    'Користувач вже існує. Хочете відновити пароль?',
                    [
                      {
                        text: 'Скасувати',
                        style: 'cancel',
                      },
                      {
                        text: 'Відновити',
                        onPress: () => {navigation.navigate('AppNavigator', {
                            screen: 'RPassword',
                            params: {
                                login: user
                            }

                        })},
                      },
                    ],
                    { cancelable: false }
                  );
            } else if (response.error) {
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

    // Return the registration form
    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true} style = { generalStyle.backStyle}>
            <View style = { signUpCardStyle.signUpCard }>
                {/* Display login image */}
                <View  style = { imageStyle.Login }>
                    <IMAGES.login_img  width={528} height={168}  />
                </View>

                {/* Display registration title */}
                <View style = { signUpCardStyle.titleBox }>
                    <Text style = { fontStyle.bigTitle }>
                        Реєстрація
                    </Text>
                </View>

                <View>
                    {/* Input for phone number */}
                    <View>
                        <View style={{marginBottom: 8}}>
                            <Text style={fontStyle.inputHint}>
                                Номер телефону
                            </Text>
                        </View>
                        <TextInputMask
                            type={'custom'}
                            style={[
                                inputStyle.userInput,
                                marginStyle.signInput,
                                emptyFields.length != 0 && emptyFields.includes('login') ? generalStyle.wrongInput : null,
                            ]}
                            options={{
                                mask: '380(99)-999-99-99',
                              }}
                            placeholder="380"
                            keyboardType='numeric'
                            onChangeText={(text) => setUsername(text)}
                            value={USER}
                        />
                        {emptyFields.length != 0 && emptyFields.includes('login') && (
                        <View style={generalStyle.bubbleContainer}>
                            <View style={generalStyle.bubble}>
                                <Text style={[fontColor.redText, fontFamilyStyle.MMedium]}>{emptyMessage}</Text>
                            </View>
                            <View style={generalStyle.triangle} />
                        </View>
                        )}
                    </View>

                    {/* Input for email */}
                    <View>
                        <View style={{marginBottom: 8}}>
                            <Text style={fontStyle.inputHint}>
                                Електрона пошта
                            </Text>
                        </View>
                        <TextInput
                            style={[
                                inputStyle.userInput,
                                marginStyle.signInput,
                                emptyFields.length != 0 && emptyFields.includes('email') ? generalStyle.wrongInput : null,
                            ]}
                            placeholder=''
                            onChangeText={(text) => setEmail(text)}
                            value={EMAIL}
                        />
                        {emptyFields.length != 0 && emptyFields.includes('email') && (
                        <View style={generalStyle.bubbleContainer}>
                            <View style={generalStyle.bubble}>
                                <Text style={[fontColor.redText, fontFamilyStyle.MMedium]}>{emptyMessage}</Text>
                            </View>
                            <View style={generalStyle.triangle} />
                        </View>
                        )}
                    </View>

                    {/* Input for password */}
                    <View>
                        <View style={{marginBottom: 8}}>
                            <Text style = { fontStyle.inputHint }>
                                Створіть пароль
                            </Text>
                        </View>
                        <TextInput 
                            style={[
                                inputStyle.userInput,
                                marginStyle.signInput,
                                emptyFields.length != 0 && emptyFields.includes('password') ? generalStyle.wrongInput : null,
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
                        {(emptyFields.length != 0 && emptyFields.includes('password') || (wrongField != '')) && (
                        <View style={generalStyle.bubbleContainer}>
                            <View style={generalStyle.bubble}>
                                {wrongField != '' ? <Text style={[fontColor.redText, fontFamilyStyle.MMedium]}>{wrongField}</Text> : <Text style={[fontColor.redText, fontFamilyStyle.MMedium]}>{emptyMessage}</Text>}
                            </View>
                            <View style={generalStyle.triangle} />
                        </View>
                        )}
                    </View>
                </View>

                {/* Registration button */}
                <View style = {signUpCardStyle.buttonBox}>
                    <TouchableOpacity 
                        title = "Login" 
                        onPress = {inputControl} 
                        style = { ButtonsStyle.greenButton }
                        disabled = {isRequest}
                    >
                        <Text style = { fontStyle.greenButtonText }>
                            Зареєструватись
                        </Text>
                    </TouchableOpacity>  
                </View>

                {/* Link to the login screen */}
                <View style={signUpCardStyle.smallMessageBox}>
                    <Text style={[fontSizes.size14, fontAlignStyle.centerAlign, fontFamilyStyle.MRegular]}>
                        Є акаунт?{' '}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={[fontFamilyStyle.MMedium, fontSizes.size14, fontColor.friendlyText, fontDecorationStyle.underlined]}>
                            Увійти
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;