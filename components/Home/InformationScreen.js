// Import necessary modules from React and React Native
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


// Import constants containing images and icons
import { IMAGES, ICONS } from '../../constants';

// Import styles for various components
import { informationCardStyle } from '../../styles/cards';
import { fontAlignStyle, fontStyle, fontFamilyStyle, fontSizes } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';


  

// Create the LoginScreen component
const InformationScreen = () => {

    // Get access to navigation functions
    const navigation = useNavigation();

    // Return the login form
    return (
        <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            <View style={ informationCardStyle.bonusCard }>
                <View style={informationCardStyle.upMenuBox  }>
                    <TouchableOpacity
                        style={ ButtonsStyle.backButton }
                        onPress={() => { navigation.navigate('AppNavigator', {screen: "Bonus"}) }}
                    >
                        <View>
                            <ICONS.back width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                    <View style={ informationCardStyle.titleBox }>
                        <Text style={ fontStyle.pageTitle }>Інформація</Text>
                    </View>
                </View>
                <View style={ informationCardStyle.cardBox }>
                    <View style = { informationCardStyle.cardTitleBox }>
                        <View>
                            <Text style={fontStyle.title}>
                                Про нарахування {'\n'}та використання бонусів
                            </Text>
                        </View>
                        <View style = { informationCardStyle.cardTextBox }>
                            <View style={ informationCardStyle.textBox }>
                                <Text style={fontStyle.infoText}>
                                    <Text style={fontStyle.infoBoldText}>
                                        Запроси друга – отримай бонуси*
                                    </Text>
                                    {'\n'}Ти отримаєш бонусних 10грн за кожного друга, який встановить додаток за твоїм посиланням. Чим більше друзів встановить додаток – тим більше бонусів ти отримаєш.
                                </Text>
                            </View>
                            <View style={ informationCardStyle.textBox }>
                                <Text style={fontStyle.infoText}>
                                    <Text style={fontStyle.infoBoldText}>
                                        Бонус* 5 грн за інформацію про себе
                                    </Text>
                                    {'\n'}Ти отримаєш додатковий бонус за кожне заповнене поле у розділі «Особисті дані».
                                </Text>
                            </View>
                            <View>
                                <Text style={fontStyle.infoText}>
                                    *ці бонусні кошти можна використати при розрахунку за купівлю води лише через цей додаток. Бонуси не передаються іншим людям і не переводяться в готівку.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default InformationScreen;