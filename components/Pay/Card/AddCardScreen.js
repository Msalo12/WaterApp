// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import { handleBoxInfo } from '../../Logic/requests/boxInfoRequest';

// Import constants containing images and icons
import { ICONS } from '../../../constants';

// Import styles for various components
import { cardCardStyle } from '../../../styles/cards';
import { fontStyle, upMenuStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

import { CardForm } from '../../Custom/cardForm';
import { addCard } from '../../Logic/utilities/db_utils/CardService'
 




// Create the LoginScreen component
const AddCardScreen = ({ route }) => {

    const { term_code, path, c_mask, c_token } = route.params || {};

    // Get access to navigation functions
    const navigation = useNavigation();


    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState(c_mask);
    const [token, setToken] = useState(c_token);

  
    const handleCardNameChange = (text) => {
      setCardName(text);
    };

    const handleCardAdd = async() => {
        if (!cardName || !cardNumber || !token) {
            Alert.alert('Помилка', 'Заповніть всі поля!');
            return;
        }
        try {
            const insertedId = await addCard(cardName, cardNumber, token);
            // You can also reset the form fields here
            setCardName('');
            setCardNumber('');
            setToken('');
            let toast = Toast.show('Карту було збережено!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            // Refresh the list of cards after adding a new one
            handleGetBack();
        } catch (error) {
            let toast = Toast.show('Помилка при збереженні карти!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });            
            console.error('Error adding the card:', error);
        }
    }

    const handleGetBack = async() => {
        if (path && path === 'Головна') {
            navigation.navigate('TabNavigator', { screen: path })
        } else {
            try {
                const params = {};
                params.box_num = term_code;
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
                    }
                } else if (response.error) {
                    Alert.alert('Помилка', `${response.error.message}`);
                    navigation.navigate("TabNavigator", {screen: 'Головна'});
                }
            }
            catch (error) {
                Alert.alert("Неочікувана помилка під час запиту", error.response);
                navigation.navigate("TabNavigator", {screen: 'Головна'});
            } 
        } 
    }

    const getBackSaveOrNot = () => {
        Alert.alert(
            'Покинути екран збереження',
            'Вийти без збереження картки?',
            [
                {
                    text: 'Вийти без збереження',
                    onPress: () => {handleGetBack()},
                    style: 'destructive',
                },
                {
                    text: 'Зберегти та вийти',
                    onPress: () => {handleCardAdd()},
                },
                {
                    text: 'Відмінити',
                },
            ],
            { cancelable: false } // Prevent dismissing the alert by tapping outside of it
        );
    }
    
    // Return the login form
    return (
        <View style={{ flex: 1 }}>
            <View style={[upMenuStyle.upMenuBox]}>
                <View style={ upMenuStyle.titleBox }>
                    <TouchableOpacity
                        style={ ButtonsStyle.backButton }
                        onPress={getBackSaveOrNot}
                    >
                        <View>
                            <ICONS.back width={24} height={24} />
                        </View>
                    </TouchableOpacity>               
                        <Text style={ fontStyle.pageTitle }>
                            Додати картку
                        </Text>
                </View>
            </View>

            <View style={ cardCardStyle.contentBox }>

                <View style={cardCardStyle.cardFormBox}>
                    <CardForm
                        cardName={cardName}
                        cardNumber={cardNumber}
                        onCardNameChange={handleCardNameChange}
                    />
                </View>

                <View 
                style={{flex: 2.5 }}
                >
                    <View>
                        <TouchableOpacity 
                            style={ButtonsStyle.greenButton}
                            onPress={handleCardAdd}
                        >
                            <Text style={fontStyle.greenButtonText}>Зберегти</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
    
        </View>
    );
};

export default AddCardScreen;