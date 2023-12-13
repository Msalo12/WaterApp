// Import necessary modules from React and React Native
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Switch, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast'

// Import constants containing images and icons
import { IMAGES, ICONS, COLOR } from '../../constants';
import { switchStyle } from '../../styles/style';

export const CustomSwitch = ({ value, onValueChange, condition, sumPay, bonus }) => {


    const [canPress, setCanPress] = useState(false);

    const thumbPosition = new Animated.Value(value ? 1 : 0);
    
    
    const moveThumb = (message) => {
        if (canPress) {
            if (condition) {
                Animated.spring(thumbPosition, {
                    toValue: value ? 0 : 1,
                    useNativeDriver: false,
                }).start();
                onValueChange(!value);
            } else {
                if(!thumbPosition) {
                    Animated.spring(thumbPosition, {
                        toValue: value ? 0 : 1,
                        useNativeDriver: false,
                    }).start();
                    onValueChange(!value);
                }

            }
        } else if (message) {
            Toast.show('Бонуси мають повністю покривати суму оплати!', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        } else {
            
        }

    };
    
    const thumbStyle = {
        transform: [
            {
                translateX: thumbPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 24], // Adjust the range to match thumb width
                }),
            },
        ],
    };

    useEffect(() => {
        if (canPress) {
            if ((sumPay - bonus) <= 0) {
                setCanPress(true);
            } else {
                setCanPress(false);
                moveThumb(true);
            }
        } else {
            if ((sumPay - bonus) <= 0) {
                setCanPress(true);
            } else {
                setCanPress(false);
                moveThumb(false);
            }
        }

    }, [sumPay]);
    
    return (
        <TouchableOpacity
            style={[
              switchStyle.customSwitchContainer,
              value ? switchStyle.customSwitchOn : switchStyle.customSwitchOff,
            ]}
            onPress={moveThumb}
        >
            <Animated.View style={[switchStyle.customSwitchThumb, thumbStyle]} />
        </TouchableOpacity>
    );
};