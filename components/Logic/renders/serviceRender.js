import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { SvgXml } from 'react-native-svg';

import { fontStyle, fontFamilyStyle, fontSizes, fontAlignStyle, serviceCardForm, iconStyle } from '../../../styles/style';
import { ICONS } from '../../../constants';
import * as SecureStore from 'expo-secure-store';
import {  STORAGE } from '../../../constants/server';


const { width } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.54 : width * 0.56;
const SPACING = 16;
const CARD_WIDTH = ITEM_SIZE - SPACING;
const CARD_HEIGHT = 280;


export const Service = ({kop, enable, servname, price, steps, logo_url, duration_avg_min, focused }) => {

    const [SvgContent, setSvgContent] = useState(null);

    const [logoLoaded, setLogoLoaded] = useState(false);

    const filteredSteps = steps.filter(step => step !== "Ініціалізація");


    useEffect(() => {
        const fetchSvg = async () => {
            try {

                const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);

                const tokenData = JSON.parse(tokenDataString);
                const currentDatetime = new Date();
                
                const utoken = tokenData.token;

                if (utoken) {
                    const response = await fetch(logo_url, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${utoken}`,
                        },
                    });

                    if (response.ok) {
                        const svgText = await response.text();
                        setSvgContent(svgText);
                        setLogoLoaded(true);
                    } else {
                        console.error('Failed to fetch SVG:', response.status, response.statusText);
                        setSvgContent(ICONS.vip_method)
                        setLogoLoaded(true)
                    }
                } else {
                    console.error('User token not available.');
                }
            } catch (error) {
                //console.error('Error fetching SVG:', error);
            }
        };
        fetchSvg();
    }, [logo_url]);

    const cardStyle = focused ? [serviceCardForm.card, serviceCardForm.focusedCard] : serviceCardForm.card;

    // Calculate the number of items in the list
    const numberOfItems = steps.length;
    // Calculate the available space for the list
    const availableSpace = CARD_HEIGHT;
    // Calculate the estimated content height for each item
    const estimatedItemHeight = availableSpace / numberOfItems;
    // Calculate the font size based on the estimated item height
    const fontSize = Math.min(Math.max(estimatedItemHeight * 0.5, 12), 16);

    return (
        <FlipCard 
            flipHorizontal={true} 
            flipVertical={false} 
            style={serviceCardForm.flipCard}
        >
            {/* Rest of the component */}
            <View style={[cardStyle, {height: CARD_HEIGHT, width: CARD_WIDTH}]}>
                {/* Icon */}
                {logoLoaded ? ( 
                    <View style={iconStyle.serviceIcon}>
                        <SvgXml xml={SvgContent} />
                    </View>
                ) : ( 
                    // Render a placeholder or loading indicator while waiting for the logo
                    <View style={iconStyle.serviceIcon}>
                        <ICONS.default_method width={60} height={60}/>
                    </View>
                )}
                {/* Content */}
                <View style={serviceCardForm.textContainer}>
                    <View>
                        <Text style={fontStyle.title}>{servname}</Text>
                    </View>
                    <View>
                        <Text style={[fontStyle.bigTitle, {fontSize: 30}]}>{price}₴</Text>
                    </View>
                    { duration_avg_min ? (
                        <View style={serviceCardForm.bottomTextBox}>
                            <Text style={[fontFamilyStyle.MMedium, fontSizes.size13, fontAlignStyle.centerAlign]}>Тривалість мийки ~ {duration_avg_min} хв</Text>
                        </View>
                    ) : (
                        <>
                        </>
                    )}
                </View>
            </View>
            <View style={[cardStyle, {height: CARD_HEIGHT, width: CARD_WIDTH}]}>
                <View 
                    style = {filteredSteps.length < 5 ? serviceCardForm.smallBackListBox : serviceCardForm.backListBox}
                >
                    {filteredSteps.map((step, index) => (
                        <View key={index} style={serviceCardForm.itemBox}>
                            <View style={iconStyle.listDotIconContainer}>
                                <ICONS.list_dot />
                            </View>
                            <Text 
                                style={[fontStyle.services, { fontSize }]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {step}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </FlipCard>
    );
};