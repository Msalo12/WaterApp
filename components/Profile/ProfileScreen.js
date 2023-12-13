// Import necessary modules from React and React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet, Image, Dimensions, StatusBar, Platform, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import * as RNFS from 'react-native-fs'
import * as Location from 'expo-location';


import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../constants/server';




// Import constants containing images and icons
import { IMAGES, ICONS } from '../../constants';

// Import styles for various components
import { loginCardStyle, homeCardStyle } from '../../styles/cards';
import { generalStyle, iconStyle, inputStyle, marginStyle, fontStyle } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';
import { handleDeleteAccount } from '../Logic/requests/deleteAccountRequest';


  

// Create the LoginScreen component
const ProfileScreen = () => {

    // Get access to navigation functions
    const navigation = useNavigation();

    const openURL = () => {
        Linking.openURL('exp://mnnefa4.marynan.8081.exp.direct/--/pay/result?status=failure&term_code=16002&path=Payment');
    };

    const openMaps = () => {
        const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `37,-122`;
        const label = 'Custom Label';
        const url = Platform.select({
          ios: `googlemaps://app?saddr=49.8030+24.0682&daddr=49.83797275902017+24.046227531152475`,
          android: `google.navigation:q=49.83797275902017+24.046227531152475`
        });
        
            
        Linking.openURL(url);
    };

    const getReverseGeocode = async () => {
        let location = { latitude: 49.83797275902017, longitude: 24.046227531152475 }; // Example coordinates (San Francisco)
        let options = { useGoogleMaps: false }; // Example options (you can modify this as needed)

        try {
          let addressDetails = await Location.reverseGeocodeAsync(location, options);
          console.log('Address Details:', addressDetails);
          // Use the addressDetails data as needed
        } catch (error) {
          console.error('Error fetching address:', error);
          // Handle error if reverse geocoding fails
        }
    };
      

    const handleDeleteAccountButton = async() => {
        try {
            const response = await handleDeleteAccount();
            if (response === true) {
                Alert.alert("Акаунт видалено!", "Ваш акаунт було видалено.")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppNavigator', state: { routes: [{ name: 'Login' }] } }],
                  });
            } else {
                Alert.alert(`Неочікувана відповідь: ${response}`)
            }
        }
        catch (error) {

        }
    }

    const handleExitAccount = async() => {

        await SecureStore.deleteItemAsync(STORAGE.utn);

        navigation.reset(
            {
                index: 0, 
                routes: 
                [
                    { 
                        name: 'AppNavigator', 
                        state: { routes: [{ name: 'Login' }] } 
                    }
                ],
            }
        );
    }

    // Return the login form
    return (

            <View style={{flex: 1, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex:1, width:'100%', justifyContent: 'center'}}>
                    <View>
                        <TouchableOpacity
                            style={ButtonsStyle.greenButton}
                            onPress={handleDeleteAccountButton}
                        >
                            <Text style={fontStyle.RedLinedButtonText}>Видалити акаунт</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 10}}>
                        <TouchableOpacity
                            style={ButtonsStyle.greenLinedButton}
                            onPress={handleExitAccount}
                        >
                            <Text style={fontStyle.greenLinedButtonText}>Вийти з акаунту</Text>
                        </TouchableOpacity>
                    </View>
                   
                   {/*<Button title="Open in Google Maps" onPress={openMaps} />
                    <Button title="Get details" onPress={getReverseGeocode} />*/}

                </View>
            </View>
    );
};
  

export default ProfileScreen;