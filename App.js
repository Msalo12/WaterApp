import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation, CommonActions  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Appearance , Platform, AppState} from 'react-native';
import {StatusBar} from "expo-status-bar";
import { SafeAreaView } from 'react-navigation';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking';
import { initDatabase } from './components/Logic/utilities/db_utils/Database';
import { STORAGE } from './constants/server';
import * as SecureStore from 'expo-secure-store';


import * as SQLite from 'expo-sqlite'
import 'react-native-gesture-handler';

//importing styles
import { COLOR, ICONS } from './constants';

import { customFonts, authScreenConfigurations, tabScreenConfigurations } from './config.js'

SafeAreaView.setStatusBarHeight(0);

//creating stack for navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
//creating appnavigator with all needed pages
const AppNavigator = () => {
    const navigation = useNavigation();

    const checkSecureStore = async () => {
        try {
            const storedValue = await SecureStore.getItemAsync(STORAGE.utn);

            if (storedValue) {
                let parsedValue;
                try {
                    parsedValue = JSON.parse(storedValue);

                    if (parsedValue && parsedValue.token && parsedValue.expiration) {
                        const expirationDate = new Date(parsedValue.expiration);
                        const currentDate = new Date();
    
                        if (currentDate >= expirationDate) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking secure store:', error);
            return false;
        }
    };

    useEffect(() => {
        // Add an event listener for app state changes
        const listenChange = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            // Remove the event listener when the component unmounts
            listenChange.remove();
        };
    })

          // Function to handle app state changes
    const handleAppStateChange = async(nextAppState) => {

        if (nextAppState === "background") {
        } else if (nextAppState === "active") {
            const storedAuth = await SecureStore.getItemAsync(STORAGE.ath);
            checkSecureStore().then((utnFound) => {
                if (!utnFound && storedAuth === 'false') {
                    // Navigate with resetting
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'AppNavigator' }],
                        })
                    );
                }
            });        
        }
    };

    return (
        <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
            cardStyle: {
                backgroundColor: COLOR.background
            },
            headerShown: false,
        }}
    >    
        {authScreenConfigurations.map((screenConfig) => (
            <Stack.Screen
                key={screenConfig.name}
                name={screenConfig.name}
                component={screenConfig.component}
                options={{
                  animationTypeForReplace: 'pop',
                }}
            />
        ))}
    </Stack.Navigator>
    );
};
const TabNavigator = () => {
    const navigation = useNavigation();

    {/* 
    useEffect(() => {
      // Define the function to handle deep links
      const handleDeepLink = ({ url }) => {
        if (url) {
          console.log('url caught')  
          const { path, queryParams } = Linking.parse(url);
          const status = queryParams.status;
          const term_code = queryParams.term_code;
          const back_path = queryParams.path;
  
          if (path === 'pay/result') {
            if (status === 'success') {
                navigation.navigate('AppNavigator', {
                    screen: 'AfterPay',
                    params: {
                        term_code: term_code,
                        path: back_path,
                        status: status
                    }
            }); // Use the screen name directly
            } else if (status === 'failure') {
                navigation.navigate('AppNavigator', {
                    screen: 'AfterPay',
                    params: {
                        term_code: term_code,
                        path: back_path,
                        status: status
                    }
                }); // Use the screen name directly
            }
          }
        }
      };
  
      // Add a listener for deep links
      Linking.addEventListener('url', handleDeepLink);
  
    }, [navigation]);*/}

    const checkSecureStore = async () => {
        try {
            const storedValue = await SecureStore.getItemAsync(STORAGE.utn);


            if (storedValue) {
                let parsedValue;
                try {
                    parsedValue = JSON.parse(storedValue);

                    if (parsedValue && parsedValue.token && parsedValue.expiration) {
                        const expirationDate = new Date(parsedValue.expiration);
                        const currentDate = new Date();
    
                        if (currentDate >= expirationDate) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking secure store:', error);
            return false;
        }
    };

    useEffect(() => {
        // Add an event listener for app state changes
        const listenChange = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            // Remove the event listener when the component unmounts
            listenChange.remove();
        };
    })

          // Function to handle app state changes
    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === "background") {
        } else if (nextAppState === "active") {
            checkSecureStore().then((utnFound) => {
                if (!utnFound) {
                    // Navigate with resetting
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'AppNavigator' }],
                        })
                    );
                }
            });        
        }
    };

    return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarActiveTintColor: COLOR.accent,
            
            tabBarStyle: Platform.OS === 'android' ? { height: 60 } : { height: 90},
            tabBarLabelStyle: {
                fontSize: 12,
                fontFamily: 'SFSemiBold',
                padding: 0,
                marginBottom: 7,
            },
            tabBarIcon: ({ focused }) => {
                let iconName;
                // Set iconName based on route name
                if (route.name === 'Головна') {
                    iconName = focused ? ICONS.active_home : ICONS.home;
                } else if (route.name === 'Улюблені') {
                    iconName = focused ? ICONS.active_favourite : ICONS.favourite;
                } else if (route.name === 'Сканувати') {
                    iconName = focused ? ICONS.active_scan : ICONS.scan;
                } else if (route.name === 'Мапа') {
                    iconName = focused ? ICONS.active_map : ICONS.map;
                } else if (route.name === 'Профіль') {
                    iconName = focused ? ICONS.active_profile : ICONS.profile;
                }
                // 
            
                // Access the icon component dynamically using square brackets
                const IconComponent = iconName;
                // Return the appropriate icon component
                return <View style={{marginTop: 7}}><IconComponent width={26} height={26} /></View>;
            },
            headerShown: false,
        })}
    >
        {tabScreenConfigurations.map((screenConfig) => (
            <Tab.Screen 
                key={screenConfig.name}
                name={screenConfig.name}
                component={screenConfig.component}
            />
        ))}
    </Tab.Navigator>
)
};
  

const App = () => {


    const [fontsLoaded, setFontsLoaded] = useState(false);

    const [utnLoaded, setUtnLoaded] = useState(false);
    const [utnExists, setUtnExists] = useState(false);

    const checkSecureStore = async () => {
        try {
            const storedValue = await SecureStore.getItemAsync(STORAGE.utn);

            if (storedValue) {
                const parsedValue = JSON.parse(storedValue);
                const expirationDate = new Date(parsedValue.expiration);
                const currentDate = new Date();
    
                if (currentDate >= expirationDate) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error checking secure store:', error);
            return false;
        }
    };

    useEffect(() => {
        checkSecureStore().then((utnFound) => {
            setUtnExists(utnFound);
            setUtnLoaded(true);
        });
        
        initDatabase();
        const loadFontsAsync = async () => { // 
            await Font.loadAsync(customFonts);
            setFontsLoaded(true);
        };
        loadFontsAsync();
{/* 
        // Add an event listener for app state changes
        const listenChange = AppState.addEventListener("change", handleAppStateChange);

        return () => {
        // Remove the event listener when the component unmounts
        listenChange.remove();
        };*/}
    }, []);

    {/* 
      // Function to handle app state changes
    const handleAppStateChange = (nextAppState) => {
        if (nextAppState === "background") {

        } else if (nextAppState === "active") {
            checkSecureStore().then((utnFound) => {
                if(!utnFound){
                    
                }
            });        
        }
    };
*/}
    if (!fontsLoaded || !utnLoaded) {
        return null; // You can show a loading screen here while fonts are being loaded.
    }

    // Get the device's color scheme ('light' or 'dark')
    const colorScheme = Appearance.getColorScheme();

    // Define the status bar content color based on the color scheme
    const statusBarContent = colorScheme === 'light' ? 'dark-content' : 'light-content';


    return (
        <View style={{ flex: 1, backgroundColor: COLOR.background }}>
            <StatusBar backgroundColor='transparent' barStyle={statusBarContent} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName={utnExists ? "TabNavigator" : "AppNavigator"} options={{ headerShown: false }}>
                    <Stack.Screen name="AppNavigator" component={AppNavigator}  options={{ headerShown: false }}/>
                    <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

export default App;