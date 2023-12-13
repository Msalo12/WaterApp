// Import necessary modules from React and React Native
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Carousel, { PaginationLight } from 'react-native-x-carousel';

// Import constants containing images and icons
import { IMAGES, ICONS } from '../../constants';
import { carouselDATA } from '../DATA/carouselDATA';

import { caroselRender } from '../Logic/renders/carouselRender';

// Import styles for various components
import { homeCardStyle } from '../../styles/cards';
import { imageStyle, iconStyle, fontColor, fontFamilyStyle, fontAlignStyle, fontDecorationStyle, fontSizes, fontStyle } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';

import * as Linking from 'expo-linking';


// Create the HomeScreen component
const HomeScreen = () => {

    // Get access to navigation functions
    const navigation = useNavigation();

    {/* 
         // Function to open a URL
         const openURL = async () => {
            const url = 'lwapplication://'; // Replace with the URL you want to open
            await Linking.openURL(url);
        };
        openURL();
  */}
    return (
        <ScrollView style={{flex: 1, }}  contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
            {/* Container for the main content */}
            <View style={[homeCardStyle.backgroundBox]}>
                {/* Display login image */}
                <View style={[imageStyle.Rectangle]}>
                    <View>
                        {Platform.OS === 'android' ? (
                        <IMAGES.rectangle_gradient width={396} height={287} />
                        ) : (
                        <IMAGES.rectangle_gradient width={436} height={316} />
                        )}
                    </View>
                    <View style={homeCardStyle.welcomeBonusBox}>
                        <Text style={[fontColor.whiteText, fontFamilyStyle.MMedium, fontSizes.size22]}>
                            Мої бонуси
                        </Text>
                        <Text style={[fontColor.whiteText, fontStyle.bonusSum]}>
                            10
                            <Text style={[fontStyle.uahSign, fontFamilyStyle.MMedium]}>
                                ₴
                            </Text>
                        </Text>
                    </View>
                    <View style={homeCardStyle.seeBonusButtonBox}>
                        <TouchableOpacity 
                            style={ButtonsStyle.greyButton}
                            onPress={() => {navigation.navigate('AppNavigator', { screen: 'Bonus' })}}
                        > 
                            <Text style={fontStyle.smallGreyButtonText}>
                                Переглянути
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Other content sections */}
                <View style={homeCardStyle.contentBox}>
                    {/* Button for payment */}
                    <View>
                        <TouchableOpacity 
                            style={ButtonsStyle.blueButton}
                            onPress={()=> {navigation.navigate('TabNavigator', {screen: 'Сканувати'})}}
                        >
                            <View style={homeCardStyle.insidePayButtonBox}>
                                <View style={iconStyle.whiteScanContainer}>
                                    <ICONS.white_scan width={24} height={24} />
                                </View>
                                <Text style={fontStyle.greenButtonText}>
                                    Перейти до оплати
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Nearest wash map */}
                    <View style={homeCardStyle.mapBox}>
                        <View style={homeCardStyle.map} pointerEvents='none'>
                            <IMAGES.nearest_wash_map width="100%" preserveAspectRatio="xMinYMin slice"/>
                        </View>
                        <View style={homeCardStyle.mapTextBox}>
                            <View style={{marginRight: 70, }}>
                                <Text style={[fontFamilyStyle.MSemiBold, fontSizes.size15]}>
                                    Найближчий термінал
                                </Text> 
                            </View>
                            <TouchableOpacity
                                onPress={() => {navigation.navigate('TabNavigator', {screen: 'Мапа'})}}
                            >
                                <Text style={[fontFamilyStyle.MMedium, fontSizes.size13, fontDecorationStyle.underlined, fontColor.darkgreyText]}>
                                    Дивитись всі
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Carousel component */}
                    <View style={homeCardStyle.carouselBox}>
                        <Carousel
                            pagination={PaginationLight}
                            renderItem={caroselRender}
                            data={carouselDATA}
                            loop
                            autoplay
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;