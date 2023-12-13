import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Alert, ActivityIndicator } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { SvgXml } from 'react-native-svg';

import { fontStyle, fontFamilyStyle, fontSizes, fontAlignStyle, serviceCardForm, iconStyle, fontColor } from '../../../styles/style';
import { ICONS, COLOR } from '../../../constants';
import * as SecureStore from 'expo-secure-store';
import {  STORAGE } from '../../../constants/server';
//<SvgXml xml={imgContent} />

const { width } = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.54 : width * 0.56;
const SPACING = 16;
const CARD_WIDTH = ITEM_SIZE - SPACING;
const CARD_HEIGHT = 280;


export const CatalogueItem = ({data}) => {

    const [imgContent, setImgContent] = useState(null);

    const [logoLoaded, setLogoLoaded] = useState(false);


    useEffect(() => {
        const fetchSvg = async () => {
            try {

                const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);

                const tokenData = JSON.parse(tokenDataString);
                const currentDatetime = new Date();
                
                const utoken = tokenData.token;

                if (utoken) {
                    const response = await fetch(data.img_url, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${utoken}`,
                        },
                    });

                    if (response.ok) {
                        const svgText = await response.text();
                        setImgContent(svgText);
                        setLogoLoaded(true);
                    } else {
                        console.error('Failed to fetch SVG:', response.status, response.statusText);
                        setImgContent(ICONS.vip_method)
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
    }, []);
    // paddingHorizontal:((width - 120)/25)
    return (
        <View 
            style=  {{alignItems: 'center', marginBottom: 10, flex: 0.17}}
        >
            {logoLoaded ? (
                <SvgXml xml={imgContent}/>
            ) : (
                <ActivityIndicator size={'small'} color={COLOR.accent} />
            )}
            <Text style={[fontFamilyStyle.SFRegular, fontSizes.size13, fontColor.darkgreyText, {textAlign: 'center'}]}>{data.clopt_name}</Text>
        </View>
    );
};