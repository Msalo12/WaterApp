// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';




// Import constants containing images and icons
import { IMAGES, ICONS, COLOR } from '../../constants';

// Import styles for various components
import { favouriteCardStyle, notificationCardStyle } from '../../styles/cards';
import { alertCardStyle, fontColor, iconStyle, fontAlignStyle, fontFamilyStyle, fontSizes, fontStyle } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';
 

// Create the LoginScreen component
const NotificationScreen = () => {

    // Get access to navigation functions
    const navigation = useNavigation();

    const [showCongratsCard, setShowCongratsCard] = useState(false); // State to manage the congrats card visibility
    
    const handleCongratsPress = () => {
        setShowCongratsCard(true); // Show the congrats card when "Сповіщення" is pressed
    };

    const handleDismiss = () => {
        setShowCongratsCard(false); // Hide the congrats card when it's pressed
    };

    // Return the login form
    return (
        <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            {showCongratsCard && (
                <>
                <View style={alertCardStyle.overlay} />
                <View style={alertCardStyle.congratsCardContainer}>
                    <View>
                        <IMAGES.congrats width={211} height={187}/>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={ [fontStyle.title, fontSizes.size22] }>
                            Ти отримав додатковий бонус 10 грн!
                        </Text>
                    </View>
                    <View  style={{marginTop: 10}}>
                        <Text style={ fontStyle.text }>
                            Ти можеш використати його при розрахунку через додаток для терміналів Твоя Вода
                            </Text>
                    </View>
                    <View style={{marginTop: 50}}>
                        <TouchableOpacity style={ButtonsStyle.greenSizedButton} onPress={handleDismiss}>
                            <Text style={fontStyle.greenButtonText}>
                                Продовжити
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            )}
            <View style={ favouriteCardStyle.bonusCard }>
                <View style={favouriteCardStyle.upMenuBox  }>
                    <View style={ favouriteCardStyle.titleBox }>
                        <TouchableOpacity
                            style={ ButtonsStyle.backButton }
                            onPress={() => { navigation.navigate('TabNavigator', {screen: "Улюблені"}) }}
                        >
                            <View style={{}}>
                                <ICONS.back width={24} height={24} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCongratsPress}
                        >
                            <Text style={ fontStyle.pageTitle }>
                                Сповіщення
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ notificationCardStyle.contentBox }>
                    <View>
                        <View style={ notificationCardStyle.dateBox }>
                            <Text style={fontStyle.dateText}>
                                12.12.2022
                            </Text>
                        </View>
                        <View style={ notificationCardStyle.washTextBox }>
                            <View>
                                <Text style={ [fontStyle.title, fontSizes.size22] }>
                                    Твоя Вода(Луганська)
                                </Text>
                            </View>
                            <View style={ notificationCardStyle.textDistance }>
                                <Text style={fontStyle.text}>
                                    Текст від власників терміналів
                                </Text>
                            </View>
                            <View style={ notificationCardStyle.buttonsBox }>
                                <TouchableOpacity
                                    style={ButtonsStyle.greenSizedButton}
                                >
                                    <Text style={fontStyle.greenButtonText}>
                                        Отримати винагороду
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={ notificationCardStyle.distanceCard }>
                        <View style={ notificationCardStyle.dateBox }>
                            <Text style={fontStyle.dateText}>
                                23.11.2022
                            </Text>
                        </View>
                        <View style={ notificationCardStyle.washTextBox }>
                            <View>
                                <Text style={ [fontStyle.title, fontSizes.size22] }>
                                Твоя Вода(Городоцька)
                                </Text>
                            </View>
                            <View style={ notificationCardStyle.textDistance }>
                                <Text style={ fontStyle.text }>
                                Текст від власників терміналів
                                </Text>
                            </View>
                            <View style={ notificationCardStyle.buttonsBox }>
                                <TouchableOpacity
                                    style={ButtonsStyle.greenLinedButton}
                                >
                                    <Text style={fontStyle.greenLinedButtonText}>
                                        Переглянути термінал
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={ iconStyle.directionContainer }>
                                        <ICONS.direction_white width={24} height={24} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};



export default NotificationScreen;