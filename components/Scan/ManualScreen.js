import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Alert, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { scanCardStyle } from '../../styles/cards';
import { fontStyle, inputStyle } from '../../styles/style';
import { IMAGES } from '../../constants';
import { ButtonsStyle } from '../../styles/buttons';

import { handleBoxInfo } from '../Logic/requests/boxInfoRequest';


const ManualScreen = ({ route }) => {
  const navigation = useNavigation();
  
  const [term_code, setCode] = useState(route.params ? route.params.code : '');
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state variable
  const submitButtonRef = useRef(); // Create a ref for the submit button

  
    useFocusEffect(
        React.useCallback(() => {
          // Change the value of myVariable to false when the component gains focus
            setIsSubmitting(false);

            return () => {
            // Cleanup function if needed when the component loses focus
            };
        }, [])
    );


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async() => {
    console.log(`isSubmitting - ${isSubmitting}`)

    if (isSubmitting) {
        Alert.alert('submitting')   
    }

    

    const regex = /^[0-9]*$/;
    if (term_code === '' || !regex.test(term_code)) {
        Alert.alert("Помилка", "Введіть код, який вказан на терміналі!")
    } else {
        setIsSubmitting(true); // Set the flag to indicate submission is in progress

        const currentDateTime = new Date();
        console.log(currentDateTime);
        const params = {};
        params.box_num = term_code;
        try {
            const response = await handleBoxInfo(params);
            if (response.result) {
                const gift_bal = response.result.enable_gift_bal === 1 ? response.result.gift_bal : 0;
                if (response.result.max_sum) {
                    navigation.navigate('AppNavigator', {
                        screen: 'Payment', 
                        params: {
                            term_code: response.result.box_num,
                            max_sum: response.result.max_sum,
                            bal: response.result.bal,
                            gift_bal: gift_bal,
                        }
                    });
                } else if (response.result.services) {
                    navigation.navigate('AppNavigator', {
                        screen: 'AlternativePayment', 
                        params: {
                            term_code: response.result.box_num,
                            bal: response.result.bal,
                            gift_bal: gift_bal,
                            services1: response.result.services
                        }
                    });
                } else {
                    Alert.alert('Неочікувана відповідь');
                    setIsSubmitting(false);

                }
            } else if (response.error) {
                Alert.alert('Помилка', `${response.error.message}`);
                setIsSubmitting(false);

            } else {
                Alert.alert('Неочікувана відповідь', `${response}`);
                setIsSubmitting(false);

            }
        }
        catch (error) {
            Alert.alert("Неочікувана помилка під час запиту", error.response);
            setIsSubmitting(false);
        }
    }
  }


  return (
    <View style={scanCardStyle.manualBackround}>
        <KeyboardAwareScrollView  
        contentContainerStyle={scanCardStyle.manualCard}
        behavior="padding">
            <View>
                <IMAGES.scan />
            </View>
            <View style={scanCardStyle.codeInputBox}>
                <TextInput 
                    style={inputStyle.codeInput} 
                    keyboardType='numeric' 
                    placeholder='00000' 
                    maxLength={5}
                    placeholderTextColor='#F3F3F3'
                    autoFocus={true}
                    value={term_code}
                    onChangeText={(value) => setCode(value)}
                />
            </View>  
            <View 
                style={keyboardIsOpen ? scanCardStyle.buttonOnBox : scanCardStyle.buttonOffBox} 
            >
                <TouchableOpacity 
                    style={ButtonsStyle.greenReverseButton}
                    onPress={()=>{navigation.navigate("TabNavigator", {screen: "Сканувати"})}}
                >
                    <Text style={fontStyle.whiteButtonText}>Скасувати</Text>
                </TouchableOpacity>  
                <TouchableOpacity 
                    style={[ButtonsStyle.greenButton, scanCardStyle.secondButtonBox]}
                    disabled={isSubmitting} // Disable the button when submitting
                    onPress={handleSubmit}
                    ref={submitButtonRef} // Assign the ref to the button
                >
                    <Text style={fontStyle.greenButtonText}>Далі</Text>
                </TouchableOpacity>  
            </View> 
        </KeyboardAwareScrollView>
    </View>
    );
};

export default ManualScreen;