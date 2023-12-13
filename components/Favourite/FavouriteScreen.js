// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';




// Import constants containing images and icons
import { IMAGES, ICONS } from '../../constants';

import { favwashesDATA } from '../DATA/washesDATA';
import { WashesRender } from '../Logic/renders/washesRender';

// Import styles for various components
import { favouriteCardStyle } from '../../styles/cards';
import { generalStyle, fontAlignStyle, fontColor, fontFamilyStyle, fontSizes, fontStyle } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';
 

// Create the LoginScreen component
const FavouriteScreen = () => {


    const [favPage, setFavPage] = useState('nofav')
    
    const toggleFavouritePage = (pageName) => {
        (pageName === 'nofav') ? setFavPage('fav') : setFavPage('nofav');
    }

    // Get access to navigation functions
    const navigation = useNavigation();

    const NoFavourities = () => {
        return (
            <View>
                <View style={ favouriteCardStyle.cardBox }>
                    <View>
                        <IMAGES.favourite_add width={320} height={185}/>
                    </View>
                    <View style = { favouriteCardStyle.cardTitleImageBox }>
                        <View>
                            <Text style={fontStyle.title}>
                                Додайте більше терміналів до улюблених
                            </Text>
                        </View>
                        <View style = { favouriteCardStyle.cardTextBox }>
                            <Text style={fontStyle.text}>
                                Отримуйте сповіщення про акційні години та персональні бонуси
                            </Text>
                        </View>
                    </View>
                    <View style={ favouriteCardStyle.findFavouriteButtonBox}>
                        <View>
                            <TouchableOpacity 
                                style={ButtonsStyle.greenLinedButton}
                                onPress={()=>{navigation.navigate("TabNavigator", {screen: "Мапа"})}}
                            >
                                <View style={generalStyle.insideButtonBox}>
                                    <Text style={fontStyle.greenLinedButtonText}>
                                        Знайти улюблену
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>                
            </View>
        );
    }

    const Favourities = () => {
        return (
            <View>
                <View>
                    {favwashesDATA.map((data, index) => (
                        <WashesRender key={index} data={data} />
                    ))}
                </View>
                <View style={ favouriteCardStyle.cardBox }>    
                    <View style = { favouriteCardStyle.cardTitleBox }>
                        <View>
                            <Text style={fontStyle.title}>
                                Додайте більше терміналів до улюблених
                            </Text>
                        </View>
                        <View style = { favouriteCardStyle.cardTextBox }>
                            <Text style={fontStyle.text}>
                                Отримуйте сповіщення про акційні години та персональні бонуси
                            </Text>
                        </View>
                    </View>
                    <View style={ favouriteCardStyle.findFavouriteButtonBox}>
                        <View>
                            <TouchableOpacity 
                                style={ButtonsStyle.greenLinedButton}
                                onPress={()=>{navigation.navigate("TabNavigator", {screen: "Мапа"})}}
                            >
                                <View style={generalStyle.insideButtonBox}>
                                    <Text style={fontStyle.greenLinedButtonText}>
                                        Знайти улюблену
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>           
            </View>
        );
    }

    // Return the login form
    return (
        <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            <View style={ favouriteCardStyle.bonusCard }>
                <View style={favouriteCardStyle.upMenuBox  }>
                    <View style={ favouriteCardStyle.titleBox }>
                        <TouchableOpacity
                            onPress={() => {toggleFavouritePage(favPage)}}
                        >
                            <Text style={ fontStyle.pageTitle }>
                                Улюблені термінали
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                        style={ ButtonsStyle.infoButton }
                        onPress={() => {navigation.navigate('AppNavigator',{ screen: "Notification"})}}
                    >
                        <View>
                            <ICONS.bell width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 45}}>
                    {favPage === 'nofav' ? (
                        <NoFavourities />
                    ) : (
                        <Favourities />
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default FavouriteScreen;