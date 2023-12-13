import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Alert, Text } from 'react-native';

import { loaderFormStyle } from '../../styles/style';

const UPLoaderAnimation = ({ iconComponentArray, setAnimationEnd }) => {

    
    const [animationIndex, setAnimationIndex] = useState(0);
    const [animation] = useState(new Animated.Value(0));
    const [rotationAnimations, setRotationAnimations] = useState([]);
    const [opacityAnimations, setOpacityAnimations] = useState([]);
    const [scaleAnimations, setScaleAnimations] = useState([]); 

    useEffect(() => {
      // Initialize rotation animations
        const rotations = iconComponentArray.map(() => new Animated.Value(0));
        setRotationAnimations(rotations);
      
        // Initialize opacity animations only if it's not initialized yet
        if (opacityAnimations.length === 0) {
            const opacities = iconComponentArray.map(() => new Animated.Value(0));
            setOpacityAnimations(opacities);
        }

                // Initialize scale animations only if it's not initialized yet
        if (scaleAnimations.length === 0) {
            const scales = iconComponentArray.map(() => new Animated.Value(0));
            setScaleAnimations(scales);
        }
    }, [iconComponentArray, opacityAnimations, scaleAnimations]);

    const onAnimationComplete = () => {
        if (animationIndex < iconComponentArray.length - 1) {
            setAnimationIndex(animationIndex + 1);

        }
    };

    useEffect(() => {
        if (animationIndex < iconComponentArray.length) {
            if (animationIndex === 13) {
              // Apply opacity animation for the 14th and 15th elements
                const currentOpacity = opacityAnimations[animationIndex];
                if (currentOpacity) {
                    Animated.timing(currentOpacity, {
                        toValue: 1,
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }).start(onAnimationComplete);
                }
            } else if (animationIndex === 14) {
                // Apply scaling animation for the 14th and 15th elements
                const currentScale = scaleAnimations[animationIndex];
                if (currentScale) {
                    Animated.timing(currentScale, {
                        toValue: 1.3, // Set the scaling factor you desire
                        duration: 200,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }).start(() => {
                        Animated.timing(currentScale, {
                            toValue: 1, // Set the scaling factor you desire
                            duration: 200,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }).start(() => {
                            // Set animationEnd to true after the animation is complete
                            setAnimationEnd(true);
                        });
                    });
                }
            } else {
                              // Rotate by 40 degrees for other elements
                const currentRotation = rotationAnimations[animationIndex];
                if (currentRotation) {
                    Animated.timing(currentRotation, {
                        toValue: 40,
                        duration: 1000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }).start(() => {
                      // Transition to the next icon
                        Animated.timing(animation, {
                            toValue: animationIndex + 1,
                            duration: 0,
                            useNativeDriver: false,
                        }).start(onAnimationComplete);
                    });
                }
            }
        }
    }, [animationIndex, rotationAnimations, opacityAnimations]);

    const AnimatedSVGIcon = iconComponentArray[animationIndex];

    const currentRotation = rotationAnimations[animationIndex];
    
    const rotateStyle2 = {
        transform: [
            {
                rotate: currentRotation
                    ? currentRotation.interpolate({
                          inputRange: [0, 40],
                          outputRange: ['0deg', '520deg'],
                      })
                    : '0deg', // Default to 0deg if rotation animation is not defined
            },
        ],
    };
    
    
    const rotateStyle = {
        transform: [
            {
                rotate: currentRotation
                    ? currentRotation.interpolate({
                          inputRange: [0, 40],
                          outputRange: ['0deg', '450deg'],
                      })
                    : '0deg', // Default to 0deg if rotation animation is not defined
            },
        ],
    };


    const currentOpacity = opacityAnimations[animationIndex];
    const opacityStyle = {
        opacity: currentOpacity,
    };

    
    const currentScale = scaleAnimations[animationIndex];
    const scaleStyle = {
        transform: [
            {
                scale: currentScale || 1, // Default to 1 if scale animation is not defined
            },
        ],
    };

    return (
        <View style={loaderFormStyle.loader}>
            {AnimatedSVGIcon && animationIndex < 13 && (
                <Animated.View
                    style={[
                        loaderFormStyle.circularContainer,
                        animationIndex === 6 || animationIndex === 8 ? rotateStyle2 : rotateStyle,
                    ]}
                >
                    <AnimatedSVGIcon />
                </Animated.View>
            )}

            {/* Render index 13 and 14 together */}
            {animationIndex === 13 && (
                <Animated.View style={loaderFormStyle.circularContainer}>
                    <Animated.View style={[]}>
                        {iconComponentArray[12]()}
                    </Animated.View>
                    <Animated.View style={[opacityStyle, loaderFormStyle.overlayIcon]}>
                        {iconComponentArray[13]()}
                    </Animated.View>
                </Animated.View>
            )}
            {animationIndex === 14 && (
                <Animated.View style={loaderFormStyle.circularContainer}>
                    <Animated.View style={[]}>
                        {iconComponentArray[13]()}
                    </Animated.View>
                    <Animated.View style={[scaleStyle, loaderFormStyle.overlayIcon]}>
                        {iconComponentArray[14]()}
                    </Animated.View>
                </Animated.View>
            )}            
                    </View>
                );
            };

export default UPLoaderAnimation;