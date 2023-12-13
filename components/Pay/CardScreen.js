// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';




// Import constants containing images and icons
import { ICONS } from '../../constants';

// Import styles for various components
import { cardCardStyle } from '../../styles/cards';
import { fontStyle, upMenuStyle } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';

import { CardForm } from '../Custom/cardForm';
 




// Create the LoginScreen component
const CardScreen = ({ route }) => {

    const { action, term_code, path } = route.params;

    // Get access to navigation functions
    const navigation = useNavigation();

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');

    const [pageName, setPageName] = useState(action === 'add' ? 'add' : 'edit');
  
    const handleCardNameChange = (text) => {
      setCardName(text);
    };
  
    const handleCardNumberChange = (formatted, extracted) => {
      setCardNumber(formatted);
    };
  
    const handleExpiryDateChange = (formatted, extracted) => {
      setExpiryDate(formatted);
    };
  
    const handleCVVChange = (text) => {
      setCVV(text);
    };


    const handlePageName = () => {

        let newName = (pageName === 'add') ? 'edit' : 'add';
        setPageName(newName);     
    }
  

    // Return the login form
    return (
        <View style={{ flex: 1 }}>
            <View style={[upMenuStyle.upMenuBox]}>
                <View style={ upMenuStyle.titleBox }>
                    <TouchableOpacity
                        style={ ButtonsStyle.backButton }
                        onPress={() => { navigation.navigate('AppNavigator', {
                            screen: path,
                            params: {
                                term_code: term_code
                            }
                        }) }}
                    >
                        <View>
                            <ICONS.back width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handlePageName}
                    >
                        <Text style={ fontStyle.pageTitle }>
                            {pageName === 'add' ? 'Додати картку' : 'Редагувати'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={ cardCardStyle.contentBox }>

                <View style={cardCardStyle.cardFormBox}>
                    <CardForm
                        cardName={cardName}
                        cardNumber={cardNumber}
                        expiryDate={expiryDate}
                        cvv={cvv}
                        onCardNameChange={handleCardNameChange}
                        onCardNumberChange={handleCardNumberChange}
                        onExpiryDateChange={handleExpiryDateChange}
                        onCVVChange={handleCVVChange}
                    />
                </View>

                <View 
                style={ pageName === 'add' ? {flex: 2.5} : {flex: 3} }
                >
                    <View>
                        <TouchableOpacity style={ButtonsStyle.greenButton}>
                            <Text style={fontStyle.greenButtonText}>Зберегти</Text>
                        </TouchableOpacity>
                    </View>
                    {pageName === 'add' ? (
                        null
                    ) : (
                        <View style={cardCardStyle.secondButtonBox}>
                            <TouchableOpacity style={ButtonsStyle.redReverseButton}>
                                <Text style={fontStyle.redButtonText}>Видалити картку</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </View>
    
        </View>
    );
};

export default CardScreen;