// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast'



import { handleBoxInfo } from '../../Logic/requests/boxInfoRequest';
import { updateCard, deleteCard } from '../../Logic/utilities/db_utils/CardService';
// Import constants containing images and icons
import { ICONS } from '../../../constants';

// Import styles for various components
import { cardCardStyle } from '../../../styles/cards';
import { fontStyle, upMenuStyle } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

import { CardForm } from '../../Custom/cardForm';
 




// Create the LoginScreen component
const EditCardScreen = ({ route }) => {

    const { term_code, path, card } = route.params;

    // Get access to navigation functions
    const navigation = useNavigation();

    const [cardName, setCardName] = useState(card.name);
    const [cardNumber, setCardNumber] = useState(card.mask);

  
    const handleCardNameChange = (text) => {
      setCardName(text);
    };
  

    const handleUpdateCard = async() => {
        const response = await updateCard(card.id, cardName);
        if (!response.error) {
            Toast.show(response, {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });   
        } else {
            Toast.show('Виникла помилка при редагуванні карти!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });   
        }
        handleGetBack()
    }

    const handleDeleteCard = async() => {
        const response = await deleteCard(card.id);
        if (!response.error) {
            Toast.show(response, {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            }); 
        } else {
            Toast.show('Виникла помилка при видаленні карти!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });   
        }
        handleGetBack()
    }


    const handleGetBack = async() => {
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
                } else {
                    Alert.alert('Неочікувана відповідь');
                    navigation.navigate("TabNavigator", {screen: 'Головна'});
                }
            } else if (response.error) {
                Alert.alert('Помилка', `${response.error.message}`);
                navigation.navigate("TabNavigator", {screen: 'Головна'});
            } else {
                Alert.alert('Неочікувана відповідь', `${response}`)
                navigation.navigate("TabNavigator", {screen: 'Головна'});
            }
        }
        catch (error) {
            Alert.alert("Неочікувана помилка під час запиту", error.response);
            navigation.navigate("TabNavigator", {screen: 'Головна'});
        }  
    }

    // Return the login form
    return (
        <View style={{ flex: 1 }}>
            <View style={[upMenuStyle.upMenuBox]}>
                <View style={ upMenuStyle.titleBox }>
                    <TouchableOpacity
                        style={ ButtonsStyle.backButton }
                        onPress={handleGetBack}
                    >
                        <View>
                            <ICONS.back width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                    <Text style={ fontStyle.pageTitle }>
                        Редагувати
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
                style={{flex: 3} }
                >
                    <View>
                        <TouchableOpacity 
                            style={ButtonsStyle.greenButton}
                            onPress={handleUpdateCard}
                        >
                            <Text style={fontStyle.greenButtonText}>Зберегти</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={cardCardStyle.secondButtonBox}>
                        <TouchableOpacity 
                            style={ButtonsStyle.redReverseButton}
                            onPress={handleDeleteCard}
                        >
                            <Text style={fontStyle.redButtonText}>Видалити картку</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
    
        </View>
    );
};

export default EditCardScreen;