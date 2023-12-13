import React from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback, Text, ScrollView, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { fontFamilyStyle, fontSizes, fontStyle} from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

import { ICONS } from '../../../constants';

import { readCard } from '../utilities/db_utils/CardService';

const { height } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.45;

export const CardChoice = ({ visible, onClose, cards, setUseCard, term_code, path }) => {

    const defaultCard =  {"icon": <ICONS.my_cards />, "id": -1, "name": "Default", "number": "", "token": ""}

    /* START: NAVIGATION */
    const navigation = useNavigation();
    /* END: NAVIGATION */

    const handleBackdropPress = (event) => {
        const { locationY } = event.nativeEvent;
        
        // Check if the touch was inside the modal container
        if (locationY > height - MODAL_HEIGHT) {
            return;
        }

        // Close the modal when touching the backdrop
        onClose();
    };

    const addCard = async() => {
        try {
            const response = await saveCardPortmone();
            if (response.result) {
                navigation.navigate('AppNavigator', {
                    screen: 'AddCard',
                    params: {
                        c_mask: response.result.cardMask,
                        c_token: response.result.token,
                        term_code: term_code,
                        path: path
                    }
                })
            }
            console.log(response);
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleReadCard = async(id) => {
        const card = await readCard(id);
        navigation.navigate("AppNavigator", {
            screen: 'EditCard',
            params: {
                term_code: term_code,
                path: path,
                card: card
            }
        })
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.modalBackdrop}>
                    <View style={[styles.modalContainer, { height: MODAL_HEIGHT }]}>
                        <View>
                            <View style={{paddingVertical: 12, marginBottom: 15}}>
                                <Text style={[fontFamilyStyle.MSemiBold, fontSizes.size17]}>Обери спосіб оплати</Text>
                            </View>
                            <ScrollView style={{height: 120}}>
                                {cards.length > 0 ? (
                                    <>
                                        {cards.map((card, index) => (
                                            <TouchableOpacity 
                                                key={index}
                                                style={{flexDirection: 'row', paddingVertical: 16, alignContent: 'center'}}
                                                onPress={()=>
                                                    {
                                                        setUseCard(cards[index]);
                                                        onClose();
                                                    }
                                                }
                                                onLongPress={() => {
                                                    handleReadCard(card.id)
                                                }}
                                            >
                                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                    {card.icon}
                                                </View>
                                                <View style={{flex:1, marginLeft: 16}}>
                                                    <Text style={[fontFamilyStyle.MSemiBold, fontSizes.size15]}>{card.name}</Text>
                                                </View>
                                                <View style={{alignItems: 'flex-end'}}>
                                                    <Text style={[fontFamilyStyle.MSemiBold, fontSizes.size13]}>{card.number !== '' && `.${card.number.slice(-4)}`}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))} 
                                        <TouchableOpacity 
                                                style={{flexDirection: 'row', paddingVertical: 16, alignContent: 'center'}}
                                                onPress={()=>
                                                    {
                                                        setUseCard(defaultCard)
                                                        onClose();
                                                    }
                                                }
                                            >
                                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                    <ICONS.my_cards />
                                                </View>
                                                <View style={{flex:1, marginLeft: 16}}>
                                                    <Text style={[fontFamilyStyle.MSemiBold, fontSizes.size15]}>Інша платіжна картка</Text>
                                                </View>
                                                <View style={{alignItems: 'flex-end'}}>
                                                    <Text style={[fontFamilyStyle.MSemiBold, fontSizes.size13]}></Text>
                                                </View>
                                        </TouchableOpacity>
                                    </>
                                ) : (
                                    <View style={{flex: 1, justifyContent: 'center', marginTop: 10, alignItems: 'center'}}>
                                        <Text style={[fontFamilyStyle.MMedium, fontSizes.size15, {textAlign: 'center'}]}>У вас немає збережених карток. Бажаєте додати?</Text>
                                    </View>
                                )}
                            </ScrollView>
                            <View>
                                <View>
                                    <TouchableOpacity 
                                        style={[ButtonsStyle.greenButton, {marginTop: 35}]}
                                        onPress={addCard}
                                    >
                                        <Text style={fontStyle.greenButtonText}>Додати карту</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity 
                                        style={ButtonsStyle.greenReverseButton}
                                        onPress={onClose}    
                                    >
                                        <Text style={fontStyle.whiteButtonText}>Скасувати</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});