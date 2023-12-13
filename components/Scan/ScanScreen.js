import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { fontStyle } from '../../styles/style';
import { ICONS } from '../../constants';
import { ButtonsStyle } from '../../styles/buttons';

import { handleBoxInfo } from '../Logic/requests/boxInfoRequest';

const ScanScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();


    const [hasPermission, setHasPermission] = useState(null);
    const [flashOn, setFlashOn] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [restrictedArea, setRestrictedArea] = useState(null);

      // Screen Ratio and image padding
    const [camera, setCamera] = useState(null);
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] =  useState(false);

    const isScreenFocused = useIsFocused();


    const handleFlashToggle = () => {
        setFlashOn(!flashOn);
    };

    // Function to reset the 'scanned' state to false
    const resetScanned = () => {
        setScanned(false);
    };

    useEffect(() => {
        // Request camera permissions and set camera ready
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

        // Set up an interval to reset 'scanned' only when the component is focused
        let intervalId;

        if (isScreenFocused) {
            intervalId = setInterval(resetScanned, 3000);
        }

        // Clear the interval when the component unmounts or loses focus
        return () => {
            clearInterval(intervalId);
        };
    }, [isScreenFocused]); // Re-run the effect when the screen focus changes


  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();
            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio; 
                distances[ratio] = distance;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder);
            setRatio(desiredRatio);

            setIsRatioSet(true);
        }
    };

  // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async() => {
        if (!isRatioSet) {
        await prepareRatio();
        }
    };


    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const params = {};
        params.qr = data; 
        try {
            const response = await handleBoxInfo(params);
            if (response.result) {
                const gift_bal = response.result.enable_gift_bal === 1 ? response.result.gift_bal : 0;
                if (response.result.max_sum) {
                    navigation.navigate('AppNavigator', {
                        screen: 'Payment', 
                        params: {
                            term_code: response.result.box_num,
                            max_sum: response.result.max_sum,
                            bal: response.result.bal,
                            gift_bal: gift_bal,
                        }
                    });
                } else if (response.result.services) {
                    navigation.navigate('AppNavigator', {
                        screen: 'AlternativePayment', 
                        params: {
                            term_code: response.result.box_num,
                            bal: response.result.bal,
                            gift_bal: gift_bal,
                            services1: response.result.services
                        }
                    });
                } else {
                    Alert.alert('Неочікувана відповідь');
                }
            } else if (response.error === -3) {
                Alert.alert('Помилка', `${response.error.message}: такого терміналу не існує`);
            } else if (response.error === -23) {
                Alert.alert('Помилка', `Ви заблоковані!`);
            } else if (response.error === -24) {
                Alert.alert('Помилка', `Ви заблоковані на даному терміналі`);
            } else if (response.error) {
                Alert.alert('Помилка', `${response.error.message}`);
            } else {
                Alert.alert('Неочікувана відповідь', `${response}`)
            }
        }
        catch (error) {
            Alert.alert("Неочікувана помилка під час запиту", error.response);
        }
    };


    const handleBarcodeMaskLayout = (event) => {
        const { layout } = event.nativeEvent;
        setRestrictedArea(layout); // Store the layout of the restricted area
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={{flex:1}}>
            { isFocused && (<Camera
                style={[StyleSheet.absoluteFill, styles.container]}
                type={Camera.Constants.Type.back}
                barCodeScannerSettings={{
                  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                onCameraReady={setCameraReady}
                ratio={ratio}
                ref={(ref) => {
                    setCamera(ref);
                }}
            >
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: '20%', left: 0, right: 0, zIndex: 1 }}>
                    <Text style={[fontStyle.greenButtonText]}>Для оплати: скануй QR-код або введи номер термінала вручну</Text>
                </View>

                <View style={{ flex: 1, zIndex: 0 }}>
                    <BarcodeMask
                        onLayoutMeasured={handleBarcodeMaskLayout}
                        edgeColor='white'
                        edgeBorderWidth={6}
                        edgeHeight={60}
                        edgeWidth={60}
                        width={270}
                        height={270}
                    />
                </View>

                <TouchableOpacity style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: '72%', left: 0, right: 0, zIndex: 1 }} onPress={handleFlashToggle}>
                    {flashOn ? <ICONS.on_flashlight /> : <ICONS.flashlight />}
                </TouchableOpacity>

                <View style={{ flex: 1, flexDirection: 'column', position: 'absolute', alignItems: 'center', justifyContent: 'center', top: '75%', left: 0, right: 0, zIndex: 1, paddingHorizontal: 16, }}>
                    <View style={{flex:1, width: '100%'}}>

                        <TouchableOpacity style={[ButtonsStyle.greenLinedButton, {marginTop: 45}]} onPress={() => {setScanned(false)}}>
                            <Text style={[fontStyle.greenButtonText]}>Сканувати ще раз</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{flex:1, width: '100%'}}>
                        <TouchableOpacity style={[ButtonsStyle.greenButton, { marginTop: 10 }]} onPress={() => {setScanned(false); navigation.navigate("AppNavigator", {screen: "Manual"})}}>
                            <Text style={[fontStyle.greenButtonText]}>Ввести номер вручну</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default ScanScreen;