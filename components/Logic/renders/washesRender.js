// Import necessary modules from React and React Native
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Dimensions} from 'react-native';
import * as Location from 'expo-location';


// Import constants containing images and icons
import { COLOR, ICONS } from '../../../constants';

// Import styles for various components
import { fontColor, washesCardStyle } from '../../../styles/style';

const windowWidth = Dimensions.get('window').width;

const WashesRender = ({ data }) => {

    const [bnsText, setBnsText] = useState(null);

    const bnsFormString = async() => {
        // Get an array of keys from data.bns
        const keysArray = Object.keys(data.bns);

        // Form arrays of strings
        const arraysOfString = keysArray.map((key, index, array) => {
            const stringArray = array.slice(0, index + 1); // Slice the array to get the elements up to the current index
            return stringArray.join(', '); // Join the elements with commas
        });

        // Log the arrays of strings
        arraysOfString.forEach((arr) => {
            setBnsText(arr)
        });
    }

    useEffect(() => {
        bnsFormString();
    }, [])


    const RecommendTitle = () => {
        return (
            <View style={{position: 'absolute', top: -10, left: 0, right: 0, bottom: 0,  alignItems: 'center'}}>
                <View style={{ backgroundColor: COLOR.secondary, borderRadius: 8, paddingVertical: 2, paddingHorizontal: 10,  }}>
                    <Text>рекомендуємо</Text>
                </View>
            </View>
        )
    }
    return (
        <View >
            <View 
                style={[
                    washesCardStyle.cardContainer,
                    (data.dTo_recommended && new Date(data.dTo_recommended) >= new Date()) ? { borderWidth: 2, borderColor: COLOR.secondary } : null
                ]}
            >
                {(data.dTo_recommended && new Date(data.dTo_recommended) >= new Date()) ? (
                    <RecommendTitle />
                ) : (
                    <></>
                )}
                <View style={[washesCardStyle.column, washesCardStyle.firstColumn]}>
                    <Text 
                        style={[washesCardStyle.row, washesCardStyle.rowOne]} 
                        numberOfLines={1} 
                        ellipsizeMode="tail"
                    >
                        {data.company_name}
                    </Text>
                    <View 
                        style={[
                            washesCardStyle.row,
                            { flexDirection: 'row', justifyContent: 'flex-start' }
                        ]}
                    >
                        <Text
                            style={[washesCardStyle.rowTwo, fontColor.greyText]}
                            numberOfLines={1}  // Set the maximum number of lines
                            ellipsizeMode="tail"  // Truncate with ellipsis at the end
                        >
                            {bnsText && (bnsText)}
                        </Text>
                    </View>

                    <View style={washesCardStyle.starRow}>
                        {data.n_comments > '0' ? (
                                <ICONS.star 
                                    width={16} 
                                    height={16} 
                                    style={washesCardStyle.starIcon} 
                                />
                            ) : (
                                <ICONS.grey_star 
                                    width={16} 
                                    height={16} 
                                    style={washesCardStyle.starIcon} 
                                />
                            )}
                        <Text 
                            style={[washesCardStyle.starText, washesCardStyle.rowThree]}
                        >
                            {data.rating} ({data.n_comments})
                        </Text>
                    </View>
                </View>
                {(data.distance && data.distance != '') ? (
                    (data.bal && data.bal != '') ? (
                        <>
                        <View style={[washesCardStyle.column, washesCardStyle.centerColumn]}>
                            <Text 
                                style={[washesCardStyle.centerText, washesCardStyle.greenPrice, fontColor.friendlyText]}
                            >
                                {data.bal}₴
                            </Text>
                        </View>
                        <View style={[washesCardStyle.column, washesCardStyle.rightColumn]}>
                            <Text  
                                style={[washesCardStyle.rightText, washesCardStyle.distanceText]}
                            >
                                {data.distance}
                                <Text style={{ flexDirection: 'row' }}> км</Text>

                            </Text>
                        </View>
                        </>
                    ) : (
                        <>
                        <View style={[washesCardStyle.column, washesCardStyle.centerColumn]}>
                        </View>
                        <View style={[washesCardStyle.column, washesCardStyle.rightColumn]}>
                            <Text  
                                style={[washesCardStyle.rightText, washesCardStyle.distanceText]}
                            >
                                {data.distance}
                                <Text style={{ flexDirection: 'row' }}> км</Text>
                            </Text>
                        </View>
                        </>
                    ) 
                ) : (
                    (data.bal && data.bal != '') ? (
                        <>
                        <View style={[washesCardStyle.column, washesCardStyle.centerColumn]}>

                        </View>
                        <View style={[washesCardStyle.column, washesCardStyle.rightColumn]}>
                            <Text 
                                style={[washesCardStyle.centerText, washesCardStyle.greenPrice, fontColor.friendlyText]}
                            >
                                {data.bal}₴
                            </Text>
                        </View>
                        </>
                    ) : (
                        <>
                        <View style={[washesCardStyle.column, washesCardStyle.centerColumn]}>
                        </View>
                        <View style={[washesCardStyle.column, washesCardStyle.rightColumn]}>
                        </View>
                        </>
                    )
                )}
            </View>
        </View>
    );
};

export {WashesRender}