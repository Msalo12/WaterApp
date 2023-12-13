import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { fontStyle, inputStyle, marginStyle, cardFormStyle, iconStyle } from '../../styles/style';
import { ICONS } from '../../constants';

const CardForm = ({ cardName, cardNumber, expiryDate, cvv, onCardNameChange, onCardNumberChange, onExpiryDateChange, onCVVChange }) => {
  return (
    <View style={{flex: 1}}>
        <View style={cardFormStyle.inputDistance}>
            <View style={marginStyle.signInput}>
                <Text style={fontStyle.inputHint}>Назва картки</Text>
            </View>
            <TextInput
                style={inputStyle.cardInput}
                placeholder='Visa'
                value={cardName}
                onChangeText={onCardNameChange}
            />
        </View>
        <View style={cardFormStyle.inputDistance}>
            <View style={marginStyle.signInput}>
                <Text style={fontStyle.inputHint}>Номер картки</Text>
            </View>
            <TextInputMask
                type={'custom'}
                options={{
                  mask: '9999 **** **** 9999',
                }}
                style={inputStyle.cardInput}
                placeholder='0000 0000 0000 0000'
                value={cardNumber}
                keyboardType='numeric'
                onChangeText={onCardNumberChange}
                editable={false}
            />
        </View>
        
    </View>
  );
};

export {CardForm};