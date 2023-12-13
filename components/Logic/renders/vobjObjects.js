// Import necessary modules from React and React Native
import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Dimensions} from 'react-native';

import { washesDATA } from '../../DATA/washesDATA';
import {
    ScrollView,
    FlatList
} from 'react-native-gesture-handler';


// Import constants containing images and icons
import { ICONS, COLOR, IMAGES } from '../../../constants';
import { bonusCardStyle } from '../../../styles/cards';
import { fontFamilyStyle, fontSizes, iconStyle, inputStyle } from '../../../styles/style';

import { WashesRender } from './washesRender';

import {  BottomSheetScrollView,
    BottomSheetTouchable,
    BottomSheetModal,
    useBottomSheet, BottomSheetModalProvider, Botto, BottomSheetFlatList} from '@gorhom/bottom-sheet';

// Import styles for various components
import { fontColor, washesCardStyle } from '../../../styles/style';

const windowWidth = Dimensions.get('window').width;



const VobjRender = ({data, handleWashPress}) => {
    const [searchText, setSearchText] = useState('');
    const [textFilterInfo, setTextFilterInfo] = useState(data);

    useEffect(() => {
        const filteredData = data.filter(d =>
            d.company_name.toLowerCase().includes(searchText.toLowerCase())
        );
        setTextFilterInfo(filteredData)
    }, [searchText])



    const initialVisibleRows = 10;
    const [visibleRows, setVisibleRows] = useState(initialVisibleRows);
  
    const loadMoreData = () => {
      // Calculate how many more rows to load (e.g., load 20 more items)
        const additionalRows = 10;
    
        // Ensure that there are more items to load
        if (visibleRows < data.length) {
            // Calculate the new range of visible rows after loading more data
            const newVisibleRows = Math.min(visibleRows + additionalRows, data.length);
      
            // Update the state to render the newly loaded rows
            setVisibleRows(newVisibleRows);
        }
    };

    return (
        <View style={styles.content}>
            <View style={ bonusCardStyle.searchBox }>
                <View style={{ flex: 1 }}>
                    <View style={ bonusCardStyle.searchInputBox }>
                        {/* Icon on the left side */}
                        <ICONS.search width={24} height={24} style={ iconStyle.searchIcon } />
                        <TextInput
                            placeholder="Пошук"
                            placeholderTextColor={COLOR.darkgrey}
                            style={inputStyle.searchInput}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                </View>
                <TouchableOpacity>
                    {/* Filter icon on the right side */}
                    <ICONS.filter width={24} height={24}  style={ iconStyle.filterIcon } />
                </TouchableOpacity>
            </View>
            <View 
                style={{paddingVertical: 32, }}
            >
                {(textFilterInfo.length > 0) ? (
                 <FlatList
                 data={textFilterInfo.slice(0, visibleRows)}
                 keyExtractor={(item, index) => index.toString()}
                 renderItem={({ item }) => (
                     <View style={(item.dTo_recommended && new Date(item.dTo_recommended) >= new Date()) ? {marginTop: 10} : {}}>
                         <TouchableOpacity onPress={()=>{
                             handleWashPress(item, false)}}>
                             <WashesRender 
                                 data={item}
                             />
                         </TouchableOpacity>
                     </View>
                 )}
                 onEndReached={loadMoreData}
                 onEndReachedThreshold={0.1}
             />
                ) : (
                    <View
                        style={{justifyContent: 'center', alignItems: 'center'}}
                    >
                        <IMAGES.not_found width={windowWidth/1.1} height={windowWidth/2}/>
                        <Text
                            style={[fontFamilyStyle.OSRegular, fontColor.darkgreyText, fontSizes.size18, {marginTop: 16}]}
                        >За вашим запитом нічого не знайдено</Text>
                    </View>
                )}

            </View>
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
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontFamily: 'MSemiBold'
    },
});

export { VobjRender }