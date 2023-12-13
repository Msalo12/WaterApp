// Import necessary modules from React and React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-root-toast'


// Import constants containing images and icons
import { ICONS } from '../../constants';

// Import styles for various components
import { paymentCardStyle } from '../../styles/cards';
import { fontStyle, upMenuStyle, fontFamilyStyle, fontSizes } from '../../styles/style';
import { ButtonsStyle } from '../../styles/buttons';
 

import { getCards } from '../../components/Logic/utilities/db_utils/CardService';
import { PayBlock } from '../Logic/renders/payBlockRender';
import { CardChoice } from '../Logic/renders/modalCardChoiceRender';
import { Opacity } from '../Logic/renders/backgroundOpacity';

const isAndroid = () => {
    if (Platform.OS === 'android') {
        return true;
    } else {
        return false;
    }
}

// Create the LoginScreen component
const PaymentScreen = ({ route }) => {

    const { term_code, max_sum, bal, gift_bal} = route.params;
    // Get access to navigation functions
    const navigation = useNavigation();

    const getIcon = (mask) => {
        if (mask.startsWith('4')) {
            return <ICONS.visa />;
          } else if (mask.startsWith('5')) {
            return <ICONS.master_card />;
          }
          // You can add more conditions for other types of cards here
          // For example, for American Express, if (mask.startsWith('3'))
          return <ICONS.my_cards />; // Return null for unknown cards
    }

    const defaultCard =  {"icon": <ICONS.my_cards />, "id": -1, "name": "Default", "number": "", "token": ""}
    /* START: CARD TO PAY CONTROL */
    const [cards, setCards] = useState([]);
    const [useCard, setUseCard] = useState(defaultCard);
    /* END: CARD TO PAY CONTROL */
    const [modalVisible, setModalVisible] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [bonus, setBonus] = useState(0);
    const [sumPay, setSumPay] = useState(80);
    const [toPay, setToPay] = useState(sumPay);
    const [changeValue, setChangeValue] = useState(10);
    const [textInputValue, setTextInputValue] = useState('80'); // Initialize with the default value
    const textInputRef = useRef(null); // Ref for the text input
    const [isKeyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        setBonus(bal + gift_bal);
    },[])

    const handleInputValue = (text) => {
        let newSumPay;
        
        if (parseInt(text) < 10 || text === "") {
            setTextInputValue('10');
            newSumPay = 10;
        } else if (parseInt(text) > max_sum) {
            setTextInputValue(`${max_sum}`);
            newSumPay = max_sum;
        } else {
            setTextInputValue(text);
            newSumPay = parseInt(text);
        }
        setSumPay(newSumPay);
        if (isEnabled) {
            if ((newSumPay - bonus) <= 0)
            setToPay(0);
        } else {
            setToPay(newSumPay);
        }
    }

    // Define a function to fetch and set cards data
    const fetchCards = () => {
        getCards()
            .then((data) => {
                const formattedData = data.map((item) => ({
                    id: item.id,
                    name: item.name,
                    token: item.token,
                    number: item.mask,
                    icon: getIcon(item.mask),
                }));

                // Set the cards state with the result of getCards
                setCards(formattedData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Use useFocusEffect to run fetchCards when the screen gains focus
    useFocusEffect(
        React.useCallback(() => {
            fetchCards();
        }, [])
    );

    const openModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };

    const handleBonusUsage = () => {
        if (!isEnabled) {
            setToPay(0);
          } else {
            setToPay(sumPay);
          }
    }

    const handleSumChange = (operator) => {

        let newSumPay;
        
        if (operator === '-') {
            newSumPay = ((sumPay > 10) && (sumPay - changeValue >= 10)) ? sumPay - changeValue : 1;
            if (newSumPay <= 10) {
                Toast.show('Ви досягли мінімальної можливої суми оплати!', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });            
            }
        } else if (operator === '+') {
            if (sumPay === 1) {
                newSumPay = changeValue;
            }
            else {
                newSumPay = (sumPay + changeValue) <= max_sum ? sumPay + changeValue : sumPay;
                if ((sumPay + changeValue) >= max_sum ) {
                    Toast.show(`Ви досягли максимальної можливої суми оплати! Максимальна сума: ${max_sum}`, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.TOP,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });  
                }
            }
        } else {
            newSumPay = sumPay;
        }
    
        setSumPay(newSumPay);
        setTextInputValue(`${newSumPay}`)
    
        // Calculate new toPay value based on bonus and newSumPay
        if (isEnabled) {
            if ((newSumPay - bonus) <= 0)
            setToPay(0);
        } else {
            setToPay(newSumPay);
        }
    
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardOpen(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardOpen(false);
        });
      
        // Clean up the event listeners when the component unmounts
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
      

    // Return the login form
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        
        }}>

        <View style={{ flex: 1 }}>
            <View style={upMenuStyle.upMenuBox}>
                <View style={ upMenuStyle.titleBox }>
                    <TouchableOpacity
                        style={ ButtonsStyle.backButton }
                        onPress={() => { navigation.navigate('TabNavigator', {screen: "Сканувати"}) }}
                    >
                        <View>
                            <ICONS.back width={24} height={24} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={ fontStyle.pageTitle }>
                            Оплата {term_code}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={paymentCardStyle.upPart}>
                <View style={paymentCardStyle.recommendTextBox}>
                    <Text style={[fontStyle.inputHint, fontFamilyStyle.MSemiBold]}>Рекомендована сума 80 грн</Text>
                </View>
                <View style={paymentCardStyle.sumFullBox}>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{handleSumChange('-')}}
                            disabled={isKeyboardOpen}    
                        >
                            <ICONS.minus />
                        </TouchableOpacity>
                    </View>
                    <View style={paymentCardStyle.sumTextBox}>
                        <TextInput
                        ref={textInputRef}
                        style={[fontStyle.bonusSum]}
                        value={textInputValue}
                        onChangeText={(text) => setTextInputValue(text)} // Use state to update the input value
                        keyboardType="numeric" // Allow only numeric input
                        onSubmitEditing={() => {
                            // Handle the input value when the user submits
                            handleInputValue(textInputValue);
                        }}
                        onBlur={(data)=>{handleInputValue(data._dispatchInstances.memoizedProps.text)}}
                        maxLength={3}

                    />
                        <Text style={[fontStyle.uahSign, fontFamilyStyle.MMedium, fontSizes.size22]}>₴</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={()=>{handleSumChange('+')}}  
                            disabled={isKeyboardOpen}  
                        >
                            <ICONS.plus />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <PayBlock
                term_code={term_code}
                sumPay={sumPay}
                toPay={toPay} // Pass the toPay prop
                bonus={bonus}
                isEnabled={isEnabled}
                handleBonusUsage={handleBonusUsage}
                setIsEnabled={setIsEnabled} // Pass the setIsEnabled prop
                openModal={openModal}
                useCard={useCard}
                path={'Payment'}
            />


            {isAndroid() ? (
                <>
                    <Opacity 
                        visible={modalVisible} 
                        onClose={closeModal} 
                    />

                    <CardChoice 
                        visible={modalVisible} 
                        onClose={closeModal} 
                        cards={cards} 
                        setUseCard={setUseCard} 
                        term_code={term_code} 
                        path={'Payment'}
                    />
                </>
            ) : (
                <>
                    <IosCardChoice 
                        visible={modalVisible} 
                        onClose={closeModal} 
                        cards={cards} 
                        setUseCard={setUseCard} 
                        term_code={term_code} 
                        path={'Payment'}
                    />
                </>
            )}

        </View>
        </TouchableWithoutFeedback>

    );
};

export default PaymentScreen;