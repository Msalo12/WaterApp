// Import necessary modules from React and React Native
import React, { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';



// Import constants containing images and icons
import { IMAGES, ICONS } from '../../constants';

import { washesDATA } from '../DATA/washesDATA';
import { WashesRender } from '../Logic/renders/washesRender';
// Import styles for various components
import { bonusCardStyle } from '../../styles/cards';
import { generalStyle, iconStyle, inputStyle, fontColor, progressBarStyle, fontAlignStyle, fontFamilyStyle, fontSizes, fontStyle} from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';


// Create the LoginScreen component
const BonusScreen = () => {

    // Get access to navigation functions
    const navigation = useNavigation();

    const [page, setPage] = useState('washes');

    const togglePage = (pageName) => {
        setPage(pageName);
    }   

    const WashesPage = () => {
        const [searchText, setSearchText] = useState('');

        // Filter the dataArray based on the search text
        const filteredData = washesDATA.filter(data =>
            data.address.toLowerCase().includes(searchText.toLowerCase())
        );

        return (
            <View>
                <View style={ bonusCardStyle.buttonTumbBox }>
                    <TouchableOpacity 
                        style={[ButtonsStyle.slideGreenButton, ButtonsStyle.activeTumbButoon, bonusCardStyle.leftButton ]}
                        onPress = {() => togglePage('washes')}
                    >
                        <Text style={[fontStyle.greenButtonText, fontSizes.size13, fontFamilyStyle.MSemiBold]}>
                            Термінали
                        </Text>
                    </TouchableOpacity>                  
                    <TouchableOpacity 
                        style={[ButtonsStyle.slideGreyButton, ButtonsStyle.nonActiveTumbButoon, bonusCardStyle.rightButton]}
                        onPress={() => togglePage('referProg')}                            
                    >
                        <Text style={[fontAlignStyle.centerAlign, fontSizes.size13, fontFamilyStyle.MSemiBold, fontColor.blackText]}>
                            Реферальна програма
                        </Text>
                    </TouchableOpacity>
                </View>
            
                <View style = { bonusCardStyle.contentBox }>
                    <View>
                        <View>
                            <Text style = { fontStyle.title }>
                                Бонуси використовуються на кожному терміналі
                            </Text>
                        </View>
                        <View style = { bonusCardStyle.bonusSumBox }>
                            <Text style={[fontStyle.bonusSum, fontColor.blackText]}>
                                10
                                <Text style={fontStyle.uahSign}>
                                    ₴
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={ bonusCardStyle.searchBox }>
                        <View style={{ flex: 1 }}>
                            <View style={ bonusCardStyle.searchInputBox }>
                                {/* Icon on the left side */}
                                <ICONS.search width={24} height={24} style={ iconStyle.searchIcon } />
                                <TextInput
                                    placeholder="Пошук"
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
                    <View style= { bonusCardStyle.washesCardBox }>
                        {filteredData.map((data, index) => (
                            <WashesRender key={index} data={data} />
                        ))}
                    </View>
                </View>
            </View>
        );
    };


    const ReferProgramPage = React.forwardRef((props, ref) => {

        const linkText = 'https://yourwater.ua/r/BKr2';
        const percentage = 46; // Replace with your percentage value


        const copyToClipboard = async (value) => {
            await Clipboard.setStringAsync(value);
            showCopyNotification();
        };
    
        const showCopyNotification = () => {
            Toast.show({
                type: 'success',
                text1: 'Скопійовано!',
                position: 'bottom',
                visibilityTime: 2000, // The duration the toast will be shown
                autoHide: true,
            });
        };
    

        return (
            <View>
                <View style={ bonusCardStyle.buttonTumbBox }>
                    <TouchableOpacity 
                        style={[ButtonsStyle.slideGreyButton, ButtonsStyle.nonActiveTumbButoon, bonusCardStyle.leftButton]}
                        onPress = {() => togglePage('washes')}
                    >
                        <Text style={[fontAlignStyle.centerAlign, fontSizes.size13, fontFamilyStyle.MSemiBold, fontColor.blackText]}>
                            Термінали
                        </Text>
                    </TouchableOpacity>                  
                    <TouchableOpacity 
                        style={[ButtonsStyle.slideGreenButton, ButtonsStyle.activeTumbButoon, bonusCardStyle.rightButton]}
                        onPress={() => togglePage('referProg')}                            
                    >
                        <Text style={[fontStyle.greenButtonText, fontSizes.size13, fontFamilyStyle.MSemiBold]}>
                            Реферальна програма
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = { bonusCardStyle.contentBox }>
                    <View>
                        <View>
                            <Text style = { [fontColor.blackText, fontFamilyStyle.MSemiBold, fontSizes.size20, fontAlignStyle.centerAlign] }>
                                Щоб активувати бонус – зроби першу оплату
                            </Text>
                        </View>
                        <View style = { bonusCardStyle.bonusSumBox }>
                            <Text style={[fontStyle.bonusSum, fontColor.greyText]}>
                                10
                                <Text style={fontStyle.uahSign}>
                                    ₴
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={ bonusCardStyle.cardBox }>
                    <View>
                        <IMAGES.friends_invite width={295} height={160}/>
                    </View>
                    <View style = { bonusCardStyle.cardTitleBox }>
                        <View>
                            <Text style={fontStyle.title}>
                                Запроси друга та отримай 10 грн на бонусний рахунок
                            </Text>
                        </View>
                        <View style = { bonusCardStyle.cardTextBox }>
                            <Text style={ fontStyle.text }>
                                Ти отримаєш бонусні кошти за кожну людину, яка встановить додаток за твоїм посиланням, зареєструється в додатку, та здійснить першу оплату.
                            </Text>
                        </View>
                    </View>
                    <View style={ bonusCardStyle.greyButtonBox }>
                        <View>
                            <TouchableOpacity 
                                style={ButtonsStyle.greySizedButton}
                                onPress={() => copyToClipboard(linkText)}
                            >
                                <View style={generalStyle.insideButtonBox}>
                                    <View style={iconStyle.copyContainer}>
                                        <ICONS.copy width={24} height={24} />
                                    </View>
                                    <Text style={fontStyle.greyButtonText}>
                                        {linkText}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={ bonusCardStyle.shareButtonBox }>
                            <TouchableOpacity 
                                style={ButtonsStyle.greySizedButton}
                            >
                                <View style={generalStyle.insideButtonBox}>
                                    <View style={iconStyle.shareContainer}>
                                        <ICONS.share width={24} height={24} />
                                    </View>
                                    <Text style={fontStyle.greyButtonText}>
                                        Поділитись посиланням
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Toast ref={ref} />
                </View>


                <View style={ bonusCardStyle.cardBox }>
                    <View>
                        <IMAGES.pers_info_bonus width={183} height={200}/>
                    </View>
                    <View style = { bonusCardStyle.cardTitleBox }>
                        <View>
                            <Text style={fontStyle.title}>
                                Отримай бонус 5 грн за заповнення інформації про себе
                            </Text>
                        </View>
                        <View style = { bonusCardStyle.cardTextBox }>
                            <Text style={ fontStyle.text }>
                                Вказана вами інформація буде використовуватись виключно для організації рекламних кампаній.
                            </Text>
                        </View>
                    </View>
                    <View style={ bonusCardStyle.progressBox }>
                        <Text style={ [fontFamilyStyle.MMedium, fontSizes.size14] }>
                            Для отримання бонусу залишилось заповнити 46%
                        </Text>
                        <View style={progressBarStyle.progressContainer}>
                            <View style={[progressBarStyle.progressBar, { width: `${percentage}%` }]} />
                            <View style={[progressBarStyle.greyProgressBar, { width: `${100 - percentage}%` }]} />
                        </View>
                    </View>
                    <View style={ bonusCardStyle.progressBox }>
                        <TouchableOpacity 
                            style={ButtonsStyle.greySizedButton}
                        >
                            <View style={generalStyle.insideButtonBox}>
                                <View style={iconStyle.editContainer}>
                                    <ICONS.edit width={24} height={24} />
                                </View>
                                <Text style={fontStyle.greyButtonText}>
                                    Заповнити інформацію
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    });

    // Return the login form
    return (
        <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets={true}>
            <View style={ bonusCardStyle.bonusCard }>
                <View style={bonusCardStyle.upMenuBox  }>
                    <TouchableOpacity
                        style={ ButtonsStyle.backButton }
                        onPress={() => { navigation.navigate('TabNavigator', {screen: "Головна"}) }}
                    >
                        <View>
                            <ICONS.back width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                    <View style={ bonusCardStyle.titleBox }>
                        <Text style={ fontStyle.pageTitle }>
                            Мої бонуси
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={ ButtonsStyle.infoButton }
                        onPress={() => {navigation.navigate('AppNavigator',{ screen: "Information"})}}
                    >
                        <View>
                            <ICONS.info width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    {page === 'washes' ? <WashesPage /> : <ReferProgramPage />}
                </View>
            </View>
        </ScrollView>
    );
};

export default BonusScreen;