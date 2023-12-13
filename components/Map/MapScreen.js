// Import necessary modules from React and React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RNFetchBlob from "rn-fetch-blob";


import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getDistance} from 'geolib';

import { COLOR, ICONS } from '../../constants';
import { handleAllVendInfo } from '../Logic/requests/vobjInfoRequest';
import { VobjRender } from '../Logic/renders/vobjObjects';
import { WashInfoRender } from '../Logic/renders/washInfoRender';
import { getWashes } from '../../components/Logic/utilities/db_utils/WashesService';


  

// Create the LoginScreen component
const MapScreen = () => {

    // Get access to navigation functions
    const navigation = useNavigation();
    const bottomSheetModalRef = useRef(null);
    const bottomSheetWashRef = useRef(null);
    const mapRef = useRef(null); // map reference


    const [bottomPosition, setBottomPosition] = useState('15%'); // bottom position of geolocation button
    const [currentRegion, setCurrentRegion] = useState(null); // current region (what is in the center part of screen, e.g. )
    const [mapLoaded, setMapLoaded] = useState(false); // indicator when location is loaded, so the map can be rendered
    const [permissionGranted, setPermissionGranted] = useState(false); // indicator of whether permition on location is granted or not

    const [currentSnapIndex, setCurrentSnapIndex] = useState(0); // current snap index (position) of bottom modal sheet ( -1: it is fully closed, 0: it is in the bottom of screen with just title, 1: it takes half of screen, 2: it is fully opened )
    const [currentSnapWashIndex, setCurrentSnapWashIndex] = useState(-1); // current snap index (position) of bottom modal sheet ( -1: it is fully closed, 0: it is in the bottom of screen with just title, 1: it takes half of screen, 2: it is fully opened )

    const [vobjInfo, setVobjInfo] = useState([]); // to keep information about all vobj objects
    const [currentVobjObject, setCurrentVobjObject] = useState(null);
    const [sortedVobjInfo,  setSortedVobjInfo] = useState([]); // to keep information about filtered and sorted
    const [optionCatalogue, setOptionCatalogue] = useState([]); // to keep information about filter catalogue and it's options
    const [userInfo, setUserInfo] = useState([]); // to keep information about user information for each vobj
    const [dataLoaded, setDataLoaded] = useState(false); // to keep information about whether info abot data about vobj is get from server
    const [infoLoaded, setInfoLoaded] = useState(false); // to keep information about whether info about vobj loaded with rendered information to render markers and wahs renders

    const [uLatitude, setULatitude] = useState(null); // to keep information abot user current latitude
    const [uLongitude, setULongitude] = useState(null); // to keep information abot user current longitude
    const [water, setWater] = useState(null);


    {/*
        WHEN SCREEN IS OPENED:
            - open modal form with all rendered washes
    */}

    useEffect(() => {
      // Open the bottom sheet when the component mounts
        bottomSheetModalRef.current?.present();
    }, []);


    {/*
        WHEN CURRENT SNAP INDEX IS CHANGED (POSITION OF MODAL SHEET)
            - change bottom position of geoposition button
    */}

    useEffect(() => {
            let newBPosition = '15%';
            if ( currentSnapIndex === 0 ) {
                newBPosition = '15%';
            } else if ( currentSnapIndex === -1 ) {
                newBPosition = '15%';
            } else if ( currentSnapIndex === 1 ) {
                newBPosition = '70%';
            } else if ( currentSnapIndex === 2 ) {
                newBPosition = '85%';
            }
            setBottomPosition(newBPosition);
        
    }, [currentSnapIndex]);

    const snapPoints = ['10%', '65%'];
    const snapPointsWash = ['65%', '100%'];


    const requestLocationPermission = async () => {
        try {
            const result = await request(
            Platform.OS === 'android'
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            );
    
            if (result === RESULTS.GRANTED) {
                setPermissionGranted(true);
            } else {
            }
        } catch (err) {
          console.warn(err);
        }
     };

     useEffect(() => {
        requestLocationPermission();
        const interval = setInterval(requestLocationPermission, 10000);

        return () => {
          clearInterval(interval);
        };
      }, []);
    

    useEffect(() => {
        if (permissionGranted) {
            Geolocation.getCurrentPosition(
                (position) => {
                const { latitude, longitude } = position.coords;

                setULatitude(latitude);
                setULongitude(longitude);

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                setMapLoaded(true);
                },
                (error) => console.error(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                
            );
        } else {
            setCurrentRegion({
                latitude: 49.842957,
                longitude: 24.031111,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            setMapLoaded(true);
        }
    }, [permissionGranted]);


    {/*
        WHEN GET LOCATION PRESSED:
            if location is permissed:
                - get geolocation of user
                - change user latitude and longitude state
                - animate to user's position
            if not:
                - explain user how to enable permission
                - open settings for user
    */}
    const handleGetLocation = async() => {
        let newRegion;
        if (permissionGranted) {
            Geolocation.getCurrentPosition(
                (position) => {
                const { latitude, longitude } = position.coords;

                setULatitude(latitude);
                setULongitude(longitude);

                newRegion = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                };

                if (!(newRegion === currentRegion)) {
                    setCurrentRegion(newRegion);
                }

                mapRef.current?.animateToRegion(newRegion, 2000);
                },
                (error) => console.error(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } else {
            openSettings();
        }
    }

    {/*
        WHEN MARKER OR WASH RENDER WAS PRESSED:
            - if marker: on ios change region
            - if wash render: change region
    */}
    const handleWashPress = (wash, marker) => {
        setCurrentVobjObject(wash);
        bottomSheetWashRef.current?.present();
        if (marker) {
            if (Platform.OS === 'ios') {
                const newRegion = {
                    latitude: wash.lat,
                    longitude: wash.lng,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                };
                if (!(newRegion === currentRegion)) {
                    setCurrentRegion(newRegion);
                }

                const camera =  {
                    center: { ...newRegion },
                };
                mapRef.current?.animateToRegion(newRegion, 2000);
                
            }
        } else if (!marker) {
            const newRegion = {
                latitude: wash.lat,
                longitude: wash.lng,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            };
            if (!(newRegion === currentRegion)) {
                setCurrentRegion(newRegion);
            }
            
            mapRef.current?.animateToRegion(newRegion, 2000);
        }
    }

        // Define a function to fetch and set cards data
        const fetchCards = () => {
            getWashes()
                .then((data) => {
                    const formattedData = data.map((item) => ({
                        id_cl: item.id_cl, 
                        company_name: item.company_name, 
                        is_active: item.is_active, 
                        is_favorite: item.is_favorite, 
                        n_comments: item.n_comments, 
                        rating: item.rating, 
                        dTo_recommend: item.dTo_recommended, 
                        lat: item.lat, 
                        lng: item.lng, 
                        opts: item.opts, 
                        gallery_image_urls: item.gallery_image_urls, 
                        bns: item.bns,
                    }))
                        setVobjInfo(formattedData);
                   


                    // Set the cards state with the result of getCards

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        };

    {/* 
        GET ALL VOBJ (request to server):
            - get all vobj from server
            - set vobj info state
            - set options state
            - set user info state
            - set filter catalogue state
    */}
    const handleGetVobjInfo = async() => {
        try {
            const response = await handleAllVendInfo();
            if (response.result) {
                //setUserInfo(response.result.u_info);
                //setOptionCatalogue(response.result.option_catalogue);
                fetchCards();

            } else if (response.error) {
                Alert.alert(`${response.error.code}`, `${response.error.message}`);
            } else {
                Alert.alert(`Неочікувана помилка`, `Щось трапилося під час запиту`);
            }
        }
        catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        if (vobjInfo.length > 0){
            setDataLoaded(true);
            setInfoLoaded(true);
            const updatedVobjInfo = vobjInfo.map((item, index) => {
                return {
                    ...item,
                    id_cl: index + 1
                };
            });
            setSortedVobjInfo(updatedVobjInfo);


        }
    }, [vobjInfo])

    {/*
        FOR CONNECTING BONUSES AND FAVOURITE POINTS:
            - add bal (bonuses) to every item in sorted data
            - add is_favorite to every item in sorted data 
    */}
    const connectData = (sortedData) => {
        if (sortedData !== null) {
            return sortedData.map(item => {
                const id_cl = item.id_cl.toString();
        
                if (userInfo[id_cl]) {
                    const { bal, is_favorite } = userInfo[id_cl];
                    return {
                        ...item,
                        bal: bal,
                        is_favorite
                    };
                } else {
                    return item;
                }
            });
        }
    }

    {/*
        ONCE SCREEN LOADED:
            - get information about existing vobj
    */}
    useEffect(() => {
        if (dataLoaded === false) {
            handleGetVobjInfo().then(() => {
                console.log('loaded data');
                console.log(vobjInfo)
            });
        }
    }, [dataLoaded])

    {/*
        DATA FORMATTING:
             - filter data, to show only with existing position (latitude !== 0 && longitude !== 0) 
            - sort by user's location to show the list in the ascending order
            - add distance to data
            - add bonuses to data
            - add is_favorite to data
    */}
    const formatData = async() => {
        const filteredData = vobjInfo.filter(item => item.lat !== 0 && item.lng !== 0);  

        const dataWithDistances = filteredData.map(item => {
            const distanceInMeters = getDistance(
              { latitude: uLatitude, longitude: uLongitude },
              { latitude: item.lat, longitude: item.lng }
            );
          
            const distanceInKm = distanceInMeters / 1000;
            const formattedDistance = parseFloat(distanceInKm.toFixed(2));

            return { ...item, distance: formattedDistance };
          });       
        if (permissionGranted) {
            const sortedData = dataWithDistances.sort((a, b) => a.distance - b.distance);
            const connectedData = connectData(sortedData);
            
            setSortedVobjInfo(connectedData);
        } else {
            const sortedData = dataWithDistances.sort((a, b) => a.distance - b.distance);
            const sortedDataWithoutDistance = sortedData.map(({ distance, ...rest }) => rest);
            const connectedData = connectData(sortedDataWithoutDistance);
            setSortedVobjInfo(connectedData);
        }
        setInfoLoaded(true);
    }

    {/* 
        AFTER DATA AND MAP LOADED || AFTER USER LOCATION CHANGED: 
            - format data
    */}
    useEffect(() => {
        if (uLatitude !== null && uLongitude !== null && !infoLoaded && dataLoaded ) {
            formatData().then(() => {
                console.log('loaded info');
            })
        }
    }, [ uLatitude, uLongitude, dataLoaded])

    // Return the login form
    return (
        <View style={{ flex: 1 }}>
            {mapLoaded ? (
                <MapView
                ref={mapRef}
                style={[
                    styles.mapContainer,
                    { height: currentSnapIndex === 1 ? '40%' : '100%', marginTop: currentSnapIndex === 1 ? 0 : 'auto' }
                ]}
                region={currentRegion}
                showsUserLocation={true}
                clustering={true}
                clusterColor={COLOR.accent}
                clusterTextColor="#FFF"
                animationEnabled={true}
                moveOnMarkerPress={true}
                >
                    {infoLoaded ? (
                    sortedVobjInfo.map((markerInfo, index) => (
                    <Marker
                        key={markerInfo.id_cl}
                        description={markerInfo.company_name}
                        coordinate={{
                            latitude: markerInfo.lat,
                            longitude: markerInfo.lng,
                        }}
                        onPress={() => {handleWashPress(markerInfo, true)}}
                
                    >
                    </Marker>
                ))
                    ) : (
                        <></>
                    )}

            
                
            </MapView>
                ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Завантажуємо мапу...</Text>
                </View>
            )}

            <TouchableOpacity 
                style={{ position: 'absolute', bottom: bottomPosition, right: '5%', padding: 16, backgroundColor:'white', borderRadius: 32 }}
                onPress={handleGetLocation}
            >
                <ICONS.geo_position width={24} height={24}/>
            </TouchableOpacity>

            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    backgroundStyle={{backgroundColor: COLOR.background}}
                    index={0}
                    snapPoints={snapPoints}
                    onDismiss={() => {bottomSheetModalRef.current?.present();}}
                    onChange={(index) => {
                        setCurrentSnapIndex(index);
                        bottomSheetModalRef.current?.present();
                    }}
                >
                    <View
                    style={!infoLoaded && currentSnapIndex !== 0 ? {flex: 1, justifyContent: 'center', alignItems: 'center'} : {}}
                    >
                        {currentSnapIndex === 0 ? 
                            (
                                <View style={styles.content}>
                                    <View style={{marginBottom: 15, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={styles.title}>Список Терміналів</Text>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    {infoLoaded ? (
                                        (sortedVobjInfo.length !== 0) ? (
                                            <VobjRender 
                                                data={sortedVobjInfo}
                                                handleWashPress={handleWashPress}
                                            />
                                        ) : (
                                            <Text>Не знайдено інформації</Text>
                                        )
                                    ) : (
                                        <View>
                                            <ActivityIndicator size={'large'} color={COLOR.accent} />
                                        </View>
                                    )}
                                </View>
                            )
                        }
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>

            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetWashRef}
                    backgroundStyle={{backgroundColor: COLOR.background}}
                    index={0}
                    snapPoints={snapPointsWash}
                    onChange={(index) => {
                        setCurrentSnapWashIndex(index);
                    }}
                    onDismiss={()=>{
                        if(Platform.OS === 'android'){
                        RNFetchBlob.session('img_tmp').dispose().then(() => {console.log('disposed')})
                        }
                    }}
                >
                    <BottomSheetScrollView>
                        <WashInfoRender 
                            data={currentVobjObject}
                            setDataLoaded={setDataLoaded}
                            setInfoLoaded={setInfoLoaded}
                            optionCatalogue={optionCatalogue}
                            uLatitude={uLatitude}
                            uLongitude={uLongitude}
                            bottomSheetWashRef = {bottomSheetWashRef}
                        />
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
                
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      height: 40,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    headerText: {
      fontWeight: 'bold',
    },
    content: {
      padding: 5,
    },
    title: {
      fontSize: 24,
      fontFamily: 'MSemiBold'
    },
    mapContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
});



export default MapScreen;