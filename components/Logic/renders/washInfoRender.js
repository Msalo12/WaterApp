// Import necessary modules from React and React Native
import React, {useState, useEffect, useRef} from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator, Image, StyleSheet, Platform, Animated, Easing} from 'react-native';
import RNFetchBlob from "rn-fetch-blob";
import * as RNFS from 'react-native-fs'
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';



// Import constants containing images and icons
import { COLOR, ICONS, IMAGES } from '../../../constants';
import StarRating from './starRatingRender';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import { carouselDATA } from '../../DATA/carouselDATA';

import { caroselRender } from '../renders/carouselRender';
import { carouselRender } from './carouselVobjRender';
import * as SecureStore from 'expo-secure-store';
import {  STORAGE } from '../../../constants/server';
import { handleSetFavoriteVobj } from '../requests/setVobjFavoriteRequest';
import { CatalogueItem } from './catalogueItemRender';

// Import styles for various components
import { fontColor, washesCardStyle, fontStyle, fontAlignStyle, fontFamilyStyle, fontSizes, fontDecorationStyle, iconStyle} from '../../../styles/style';
import { ButtonsStyle } from '../../../styles/buttons';

const windowWidth = Dimensions.get('window').width;
const ITEMS_PER_ROW = 6; // Define the number of items per row


const WashInfoRender = ({ data, setDataLoaded, setInfoLoaded, optionCatalogue, uLatitude, uLongitude, bottomSheetWashRef }) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [locationName, setLocationName] = useState(null);
    const [bns, setBns] = useState(null);
    const [iconSize] = useState(new Animated.Value(1));
    const [icon, setIcon] = useState((data.is_favorite && data.is_favorite === 1) ? 'to_favourite_fill' : 'to_favourities'); // Initial icon
    const [favorite, setFavorite] = useState(data.is_favorite);
    const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

    const [catalogue, setCatalogue] = useState(null);


    const fetchImage = async () => {
        try {

            const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);
            const tokenData = JSON.parse(tokenDataString);
            const utoken = tokenData.token;

            if (utoken) {
                const imageTemp = [];
                const fileTemp = [];
                const imageURLs = data.gallery_image_urls;

                if (Platform.OS == 'ios') {

                // Function to fetch an image and push it to imageTemp array
                const fetchImage = async (url, utoken) => {
                try {
                    const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${utoken}`,
                    },
                    });

                    if (response.ok) {
                    const imageData = await response.blob();
                    imageTemp.push({uri: URL.createObjectURL(imageData)});
                    } else {
                    console.error('Failed to fetch image:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
                };

                // Map through each URL and fetch the images
                const fetchImages = async () => {
                const fetchPromises = imageURLs.map(url => fetchImage(url, utoken));
                
                // Wait for all fetch requests to complete
                await Promise.all(fetchPromises);
                
                // All images fetched and stored in imageTemp array
                setImageUrl(imageTemp)
                };

                fetchImages();
            } else {
                // Function to fetch and save images
                const fetchAndSaveImages = async () => {
                    try {
                    // Use Promise.all to execute all fetch operations concurrently
                    await Promise.all(
                        imageURLs.map(async (url) => {
                        const res = await RNFetchBlob.config({ 
                            fileCache: true,   
                            appendExt: "png",
                            session: 'img_tmp'

                        })
                        .fetch('GET', url, { Authorization: `Bearer ${utoken}`})
                
                        // Save the file path and add it to fileTemp array
                        fileTemp.push(res.path());
                        })
                    );
                    const fileNamesOnly = fileTemp.map((filePath) => {
                        return {uri: `file://${RNFS.DocumentDirectoryPath}/${filePath.split('/').pop()}`}; // Extract the file name from the path
                    });
                    
                    setImageUrl(fileNamesOnly); // Assuming setFileUrl is a function to set file URLs
                    } catch (error) {
                    console.error('Error fetching and saving images:', error);
                    }
                };
                
                // Call the function to fetch and save images
                fetchAndSaveImages();

            }
            } else {
                console.error('User token not available.');
            }
        } catch (error) {
            //console.error('Error fetching SVG:', error);
        }


    };

    const getReverseGeocode = async () => {
        let location = { latitude: data.lat, longitude: data.lng };
        let options = { useGoogleMaps: false }; // Example options (you can modify this as needed)

        try {
            let addressDetails = await Location.reverseGeocodeAsync(location, options);
            let addressComponents = [];

            if (addressDetails && addressDetails.length > 0) {
                const { city, region, street, streetNumber } = addressDetails[0] || {};
    
                if (city) {
                    addressComponents.push(`м. ${city}`);
                }
                if (region) {
                    addressComponents.push(region);
                }
                if (street) {
                    addressComponents.push(street);
                }
                if (streetNumber) {
                    addressComponents.push(streetNumber);
                }
            }
    
            const addressName = addressComponents.filter(Boolean).join(', ');
    
            setLocationName(addressName || data.company_name);
        } catch (error) {
          console.error('Error fetching address:', error);
          // Handle error if reverse geocoding fails
        }
    };

    const getBns = async () => {
        const possibleKeys = ["Пост", "Порохотяг", "Чистка килимків", "Питна вода","Диммашина", "LuxCyber", "Продвж серверток"];
    
        let bnsTemp = [];
        const bnsData = data.bns;
    
        if (Object.keys(bnsData).length > 0) {
            Object.keys(bnsData).forEach(key => {
                const value = bnsData[key];
                const index = possibleKeys.indexOf(key);
                if (index === 0) {
                    const stringPost = `Кількість постів самообслуговування`
                    bnsTemp.push({text: stringPost, value: value})
                    // Do whatever else you need with the string here
                } else if (index === 1) {
                    const stringPost = `Кількість порохотягів`
                    bnsTemp.push({text: stringPost, value: value})
                } else if (index === 3) {
                    const stringPost = `Кількість автоматів питної води`
                    bnsTemp.push({text: stringPost, value: value})
                } else if (index === 4) {
                    const stringPost = `Кількість диммашин`
                    bnsTemp.push({text: stringPost, value: value})    
                } else if (index === 5) {
                    const stringPost = `Кількість LuxCyber`
                    bnsTemp.push({text: stringPost, value: value})   
                } else if (index !== -1) {
                    const stringPost = `Кількість послуги "${key}"`;
                    bnsTemp.push({text: stringPost, value: value});
                }
            });
        }
        setBns(bnsTemp);
    }

    const openMaps = () => {
        const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
        const url = Platform.select({
          ios: `googlemaps://app?saddr=${uLatitude}+${uLongitude}&daddr=${data.lat}+${data.lng}`,
          android: `google.navigation:q=${data.lat}+${data.lng}`
        });
        
            
        Linking.openURL(url);
    };

    const handleAddToFavorites = async () => {
        if (isAddingToFavorites) {
            return; // Prevent button press if already adding to favorites
        }

        try {
            setIsAddingToFavorites(true); // Disable the button

            const response = await handleSetFavoriteVobj({
                id_cl: data.id_cl,
                is_favorite: favorite === undefined || 0 ? 1 : 0,
            });

            if (response.result) {
                handlePress();
                setDataLoaded(false);
                setInfoLoaded(false);
            } else {
                // Handle unsuccessful response
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsAddingToFavorites(false); // Enable the button after a 3-second delay
            }, 3000);        
        }
    };

    const handlePress = () => {
        if (favorite === 0 || !favorite) {
            setFavorite(1);
            setIcon('to_favourite_fill');
            Animated.sequence([
                Animated.timing(iconSize, {
                toValue: 1.3,
                duration: 200,
                useNativeDriver: true,
                }),
                Animated.timing(iconSize, {
                toValue: 1.2,
                duration: 100,
                easing: Easing.bounce,
                useNativeDriver: true,
                }),
                Animated.timing(iconSize, {
                toValue: 1,
                duration: 100,
                easing: Easing.bounce,
                useNativeDriver: true,
                }),
            ]).start(() => {
                setIcon('to_favourite_fill');
            });
        } else {
            setFavorite(0);
            setIcon('to_favourities');
        }
    };

    // Function to filter vobj_option_catalogue based on opts
    const filterCatalogue = (catalogue, options) => {
        const filteredCatalogue = catalogue.map(group => {
            const filteredOpts = group.opts.filter(opt => options.includes(opt.clopt_slug));
            return { ...group, opts: filteredOpts };
        });
        return filteredCatalogue.filter(group => group.opts.length > 0);
    };

    const renderItemsInRows = (items) => {
        const rows = [];
        for (let i = 0; i < items.length; i += ITEMS_PER_ROW) {
          rows.push(items.slice(i, i + ITEMS_PER_ROW));
        }
        return rows;
    };

    const Propositions = () => {
        return (
            <View>
                <View
                    style={{marginBottom: 20}}
                >
                    <View
                        style={{marginBottom: 5}}
                    >
                        <Text
                            style={[fontFamilyStyle.MSemiBold, fontSizes.size16]}
                        >
                            Діючі пропозиції
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={[fontFamilyStyle.MMedium, fontSizes.size16]}
                        >
                            - Не знайдено діючих пропозицій
                        </Text>
                    </View>
                </View>
                <View>
                    <View
                        style={{marginBottom: 5}}
                    >
                        <Text
                            style={[fontFamilyStyle.MSemiBold, fontSizes.size16]}
                        >
                            Акції
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={[fontFamilyStyle.MMedium, fontSizes.size16]}
                        >
                            - Не знайдено діючих акцій
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    const ContactInfo = () => {
        return (
            <View>
            <View
                style={{backgroundColor: COLOR.white, paddingHorizontal: 16, paddingVertical: 22, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 18}}
            >
                <View
                    style={{marginRight: 15}}
                >
                    <ICONS.local_phone />
                </View>
                <Text
                    style={[fontFamilyStyle.MMedium, fontSizes.size18]}
                >
                    0671111111    
                </Text>
            </View>
            <View
                style={{backgroundColor: COLOR.white, paddingHorizontal: 16, paddingVertical: 22, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 18}}
            >
                <View
                    style={{marginRight: 15}}
                >
                    <ICONS.instagram />
                </View>
                <Text
                    style={[fontFamilyStyle.MMedium, fontSizes.size18]}
                >
                    @luxwashinstalink
                </Text>
            </View>
            <View
                style={{backgroundColor: COLOR.white, paddingHorizontal: 16, paddingVertical: 22, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 18}}
            >
                <View
                    style={{marginRight: 15}}
                >
                    <ICONS.youtube />
                </View>
                <Text
                    style={[fontFamilyStyle.MMedium, fontSizes.size18]}
                >
                    youtube.com/youtubelink
                </Text>
            </View>
        </View>
        )
    }

    useEffect(() => {
        getReverseGeocode();
        getBns();
        const filteredCatalogue = filterCatalogue(optionCatalogue, data.opts);
        setCatalogue(filteredCatalogue);

    }, []);

    return (  
        <View style={{marginTop: 15, marginHorizontal: 16}}>
            { data ? (
                <>
                    <View style={{marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}> 
                        <Text style={[fontStyle.title, fontAlignStyle.leftAlign]}>{data.company_name}</Text>
                        <TouchableOpacity
                            onPress={() => {bottomSheetWashRef.current?.dismiss();}}
                        >
                            <ICONS.close />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <StarRating rating={data.rating} />
                        <Text
                            style={[washesCardStyle.starText, washesCardStyle.rowThree]}
                        >
                            {data.rating} ({data.n_comments})
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={[fontFamilyStyle.MMedium, fontSizes.size14, fontColor.friendlyText, fontDecorationStyle.underlined]}
                            >
                                Усі відгуки
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{alignItems: 'center', justifyContent: 'center', marginVertical: 38}}
                    >
                  
                                
                      
                            <Carousel
                                pagination={PaginationLight}
                                renderItem={caroselRender}
                                data={carouselDATA}
                                loop
                                autoplay
                            />    
                    </View>
                    <View
                        style={{flexDirection: 'row', justifyContent: 'space-between'}}
                    >
                        <View style={{ flex: 0.9 }}>
                            <Text
                                style={[fontColor.darkgreyText, fontFamilyStyle.MMedium, fontSizes.size16, {lineHeight: 22}]}
                            >
                                {locationName}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={[fontFamilyStyle.MSemiBold, fontSizes.size16]}
                            >
                                {data.distance} км    
                            </Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 38}}>
                        
                        <TouchableOpacity
                            style={[ButtonsStyle.greenLinedButton, { flex: 1 }]}
                            onPress={handleAddToFavorites}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Animated.View
                                    style={{
                                    transform: [{ scale: iconSize }],
                                    marginRight: 15,
                                    }}
                                >
                                    {icon === 'to_favourities' ? (
                                        <ICONS.to_favourities />
                                    ) : (
                                        <ICONS.to_favourite_fill />
                                    )}
                                </Animated.View>
                                {(favorite && favorite === 1) ? (
                                    <Text style={fontStyle.greenLinedButtonText}>
                                        Видалити з улюблених
                                    </Text>
                                ) : (
                                    <Text style={fontStyle.greenLinedButtonText}>
                                        Додати до улюблених
                                    </Text>
                                )}

                            </View>
                        </TouchableOpacity>
                               
                        <TouchableOpacity
                            style={{marginLeft: 12}}
                            onPress={() => openMaps()}
                        >
                            <View 
                            style={ {backgroundColor: COLOR.accent, borderRadius: 15, paddingHorizontal: 18, paddingVertical: 18, marginLeft: 12} }>

                                <ICONS.direction_white width={24} height={24} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {bns && (
                        <View
                            style={{marginTop: 38}}
                        >
                            {bns.map((item, index) => (
                                <View
                                    style={{flexDirection: 'row', marginBottom: 12, justifyContent: 'space-between'}}
                                    key={index}
                                >
                                    <Text 
                                        style={[fontFamilyStyle.MMedium, fontSizes.size16, {lineHeight: 22}]}
                                    >
                                        {item.text}
                                    </Text>
                                    <Text
                                        style={[fontFamilyStyle.MMedium, fontSizes.size22]}
                                    >
                                        {item.value}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View
                        style={{ backgroundColor: COLOR.white, borderRadius: 12, paddingVertical: 22, paddingHorizontal: 16, marginVertical: 38}}
                    >
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,}}
                        >
                            <Text 
                                style={[fontFamilyStyle.MSemiBold, fontSizes.size20, fontColor.friendlyText]}
                            >
                                Доступний бонус
                            </Text>
                            <Text
                                style={[fontFamilyStyle.MSemiBold, fontSizes.size20, fontColor.friendlyText]}
                            >
                                {data.bal ? data.bal : 0}₴
                            </Text>
                        </View>
                        <Propositions />
                    </View>
                    <View>
                        {catalogue && (
                            catalogue.map((group) => (
                            <View 
                                key={group.id_clopt_gr}
                                style={{marginBottom: 30}}
                            >
                                <View
                                    style={{marginBottom: 20}}
                                >
                                    <Text
                                        style={[fontFamilyStyle.MSemiBold, fontSizes.size20]}
                                    >
                                        {group.clopt_gr_name}
                                    </Text>
                                </View>
                                {renderItemsInRows(group.opts).map((row, rowIndex) => (
                                    <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>
                                        {row.map((item) => (
                                            <CatalogueItem key={item.id_clopt} data={item}/>
                                        ))}
                                    </View>
                                ))}
                            </View>
                            ))
                        )}
                    </View>
                    <ContactInfo />
                </>
            ) : (
                <>
                    <View>
                        <ActivityIndicator size={'large'} color={COLOR.accent} />
                    </View>
                </>
            )}   
     </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain', // Adjust this based on how you want the image to be displayed
    },
  });
  

export { WashInfoRender }