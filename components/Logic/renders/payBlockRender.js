// Import necessary modules from React and React Native
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';

// Import constants containing images and icons
import { ICONS } from '../../../constants';

// Import styles for various components
import { fontStyle, fontFamilyStyle, fontSizes, fontColor, generalStyle, iconStyle, payBlockForm } from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';
import { CustomSwitch } from '../../Custom/switch';


export const PayBlock = ({ sumPay, toPay, bonus, isEnabled, handleBonusUsage, setIsEnabled, openModal, term_code, useCard, path, kop  }) => {
    // Get access to navigation functions
    const navigation = useNavigation();

    const [isRequest, setIsRequest] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
          // Change the value of myVariable to false when the component gains focus
          setIsRequest(false);

          return () => {
          // Cleanup function if needed when the component loses focus
          };
        }, [])
    );

    const handlePay = async() => {

        setIsRequest(true);

        if (!isEnabled) {
   

        } else if (isEnabled) {
            const payData = {
                box_num: term_code,
                ...(kop ? { kop: kop } : {}),
                amount: sumPay,
                path: path,
                is_enabled: isEnabled
            }
            navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'AppNavigator',
                    state: {
                      routes: [
                        {
                          name: 'AfterPay',
                          params: payData,
                        },
                      ],
                    },
                  },
                ],
              });
        } else { 
            setIsRequest(false);
        }

    }; 

    return (
        <View style={payBlockForm.downPart}>
        <View style={payBlockForm.downInfoBox}>

            <View style={payBlockForm.smallInfoBox}>
                <View style={payBlockForm.textInfoBox}>
                    <Text style={[fontColor.blackText, fontFamilyStyle.MSemiBold, fontSizes.size16]}>Сплатити через</Text>
                </View>
                <View>
                    <TouchableOpacity 
                        style={payBlockForm.cardButton}
                        onPress={()=>{openModal()}}
                    >
                        <View style={iconStyle.applePay}>
                            {(useCard.index === -1) ? <ICONS.my_cards_24 /> : useCard ? useCard.icon : null}
                        </View>
                        <View>
                            <ICONS.next />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View  style={payBlockForm.smallInfoBox}>
                <View style={ generalStyle.separator }></View>
            </View>

            <View style={payBlockForm.smallInfoBox}>
                <View style={payBlockForm.textInfoBox}>
                    <Text style={[fontColor.blackText, fontFamilyStyle.MMedium, fontSizes.size16]}>
                        Вартість
                    </Text>
                </View>
                <View>
                    <Text style={[fontColor.blackText, fontFamilyStyle.MMedium, fontSizes.size16]}>
                        {sumPay} грн
                    </Text>
                </View>
            </View>

            <View style={[payBlockForm.smallInfoBox, {marginTop: 16}]}>
                <View style={[payBlockForm.textInfoBox, {flex: 4}]}>
                    <Text style={[fontColor.blackText, fontFamilyStyle.MMedium, fontSizes.size16]}>
                        Використати бонус
                    </Text>
                </View>
                <View style={[payBlockForm.textInfoBox, {flex: 3}]}>
                    <Text style={[fontColor.friendlyText, fontFamilyStyle.MMedium, fontSizes.size16]}>
                        {bonus} грн
                    </Text>
                </View>
                <View style={[payBlockForm.textInfoBox, {justifyContent: 'flex-end'}]}>

                    <CustomSwitch 
                        value={isEnabled} 
                        onValueChange={(value) => {
                            setIsEnabled(value);
                            handleBonusUsage(); // Call handleBonusUsage when the switch value changes
                        }}
                        condition={(toPay - bonus) <= 0} 
                        sumPay={sumPay}
                        bonus={bonus}
                    />
                </View>
            </View>

            <View style={[payBlockForm.smallInfoBox, {marginTop: 24}]}>
                <View style={payBlockForm.textInfoBox}>
                    <Text style={[fontColor.blackText, fontFamilyStyle.MSemiBold, fontSizes.size18]}>
                        До сплати
                    </Text>
                </View>
                <View>
                    <Text style={[fontColor.blackText, fontFamilyStyle.MSemiBold, fontSizes.size18]}>
                        {toPay} грн
                    </Text>
                </View>
            </View>

        </View>

        <View style={payBlockForm.buttonBox}>
            <TouchableOpacity 
                style={[ButtonsStyle.greenButton, {marginTop: 16}]}
                onPress={handlePay}
                disabled={isRequest}
            >
                <Text style={fontStyle.greenButtonText}>Оплатити</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}