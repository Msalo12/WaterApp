import { StyleSheet, Platform } from 'react-native';
import {COLOR, FONT} from '../constants'


const isAndroid = () => {
    const plat = Platform.OS;
    if (Platform.OS === 'android') {
        return true;
    } else {
        return false;
    }
}


const loginCardStyle = StyleSheet.create({
    loginCard: {
        backgroundColor: COLOR.background,
        borderRadius: 8,
        marginTop: isAndroid() ? 100 : 130,
        marginBottom: 52,
        marginHorizontal: 16,
    },
    titleBox: {
        marginBottom: 50,
        alignSelf: 'center'
     },
    smallMessageBox: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const signUpCardStyle = StyleSheet.create({
    signUpCard: {
        backgroundColor: COLOR.background,
        borderRadius: 8,
        marginTop: isAndroid() ? 100 : 120,
        marginBottom: 50,
        marginHorizontal: 16,
    },
    titleBox: {
        marginBottom: 40,
        alignSelf: 'center'
     },
    smallMessageBox: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const codeCardStyle = StyleSheet.create({
    codeCard: {
        backgroundColor: COLOR.background,
        borderRadius: 8,
        marginTop: isAndroid() ? 80 : 110,
        marginBottom: 52,
        marginHorizontal: 16,
    },
    titleBox: {
        marginBottom: 12,
        alignSelf: 'center'
     },    
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      codeInput: {
        borderWidth: 1,
        borderColor: COLOR.black,
        borderRadius: 12,
        fontSize: 24,
        width: 50,
        height: 72,
        textAlign: 'center',
        marginVertical: 40,
        marginHorizontal: 15,
        fontFamily: 'MSemiBold',
        fontSize: 35,
      },
    smallMessageBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    buttonsBox: {
        marginTop: isAndroid() ? 10 : -10
    },
    timeButtonBox: {
        marginTop: isAndroid() ? 0 : -5
    }
});

const passwordCardStyle = StyleSheet.create({
    passwordCard: {
        position: 'absolute',
        backgroundColor: COLOR.background,
        borderRadius: 8,
        top: 80,
        bottom: 52,
        left: 16,
        right: 16,
    },
    titleBox: {
        marginBottom: 12,
        alignSelf: 'center'
     },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      codeInput: {
        borderWidth: 1,
        borderColor: COLOR.black,
        borderRadius: 12,
        fontSize: 24,
        width: 50,
        height: 72,
        textAlign: 'center',
        marginVertical: 52,
        marginHorizontal: 15,
        fontFamily: 'MSemiBold',
        fontSize: 35,
      },
    smallMessageBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 52,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    }
});

const homeCardStyle = StyleSheet.create({
    backgroundBox: {
    },
    contentBox: {
        marginTop: -30,
        marginBottom: 52,
        paddingHorizontal: 16,
    },
    carouselBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    letterBox: {
        position: 'absolute', 
        top: 60,
    },
    letterLBox: {
        position: 'absolute', 
        right: -10,
    },
    letterWBox: {
        position: 'absolute', 
        left: -50,
    },
    welcomeBonusBox: {
        position: 'absolute', 
        top: isAndroid() ? 84 : 105,
    },
    seeBonusButtonBox: {
        position: 'absolute', 
        top: isAndroid() ? 206 : 225
    },
    insidePayButtonBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    mapBox: {
        //shadowing
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 5,
    },
    map: {
        marginTop: 19,
    },
    mapTextBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FFFFFF', 
        height: 40, 
        borderBottomLeftRadius: 12, 
        borderBottomRightRadius: 12,
    }
    
});

const bonusCardStyle = StyleSheet.create({
    bonusCard: {
        marginHorizontal: 16, 
        marginBottom: 52,
    },
    upMenuBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 65,
    },
    titleBox: {
        flex: 1, 
        alignItems: 'center',
    },
    buttonTumbBox : {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10,
    },
    rightButton: {
        marginLeft: -5
    },
    leftButton: {
        marginRight: -5
    },
    contentBox: {
        marginTop: 40, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    bonusSumBox: {
        marginTop: 16,
    },
    searchBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 38,
    },
    searchInputBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: COLOR.white, 
        borderRadius: 8, 
        paddingLeft: 12, 
        height: 42
    },
    washesCardBox: {
        flex: 1, 
        width: '100%', 
        marginTop: 24,
    },
    cardBox: {
        backgroundColor: COLOR.white, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 40, 
        paddingHorizontal: 16, 
        marginTop: 32, 
        borderRadius: 12
    },
    cardTitleBox: {
        marginTop: 40,
    },
    cardTextBox: {
        marginTop: 16,
    },
    greyButtonBox: {
        flex: 1, 
        width: '100%', 
        marginTop: 35
    },
    shareButtonBox: {
        marginTop: 15
    },
    progressBox: {
        flex: 1, 
        width: '100%', 
        marginTop: 40
    },
    
});

const informationCardStyle = StyleSheet.create({
    bonusCard: {
        marginHorizontal: 16, 
        marginBottom: 52,
    },
    textBox: {
        marginBottom: 20
    },
    upMenuBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 65,
        marginBottom: 18
    },
    titleBox: {
        flex: 1, 
        alignItems: 'center',
    },
    cardBox: {
        backgroundColor: COLOR.white, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 40, 
        paddingHorizontal: 16, 
        marginTop: 32, 
        borderRadius: 12
    },
    cardTitleBox: {
        marginTop: 40,
    },
    cardTextBox: {
        marginTop: 16,
    },
});

const favouriteCardStyle = StyleSheet.create({
    bonusCard: {
        marginHorizontal: 16, 
        marginBottom: 127,
    },
    upMenuBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 65,
    },
    titleBox: {
        flex: 1, 
        alignItems: 'center',
    },
    findFavouriteButtonBox: {
        marginTop: 40
    },
    cardBox: {
        backgroundColor: COLOR.white, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 40, 
        paddingHorizontal: 16, 
        marginTop: 14, 
        borderRadius: 12,
        paddingBottom: 60
    },
    cardTitleImageBox: {
        marginTop: 40,
    },
    cardTitleBox: {
        marginTop: 20,
    },
    cardTextBox: {
        marginTop: 16,
    },
});

const notificationCardStyle = StyleSheet.create({
    contentBox: {
        marginTop: 45,
    },
    dateBox: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    washTextBox: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: COLOR.white, 
        paddingVertical: 40, 
        paddingHorizontal: 16, 
        marginTop: 12, 
        borderRadius: 12,
    },
    textDistance: {
        marginTop: 24,
    },
    buttonsBox: {
        marginTop: 50,  
        flex: 1, 
        flexDirection: 'row',
    },
    distanceCard: {
        marginTop: 22,
    }

});

const scanCardStyle = StyleSheet.create({
    manualBackround: {
        flex:1, 
        backgroundColor: 'black'
    },
    manualCard: {
        flex:1, 
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: -20,
        marginHorizontal: 16,
    },
    codeInputBox: {
        width: '35%',
        marginLeft: 15
    },
    buttonOnBox: {
        flex: 1, 
        width: '100%', 
        marginTop: isAndroid() ? 40 : 35
    },
    buttonOffBox: {
        flex: 1, 
        width: '100%', 
        marginTop: isAndroid() ? 210 : 240
    }, 
    secondButtonBox: {
        marginTop: 20
    },
});

const paymentCardStyle = StyleSheet.create({
    upPart: {
        flex:11, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    downPart: {
        flex:9, 
        width: '100%', 
        backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center', 
        paddingBottom: 40, 
        paddingHorizontal: 16, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20
    }, 
    recommendTextBox: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    sumFullBox: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    sumTextBox: {
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    downInfoBox: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    smallInfoBox: {
        flexDirection: 'row'
    },
    textInfoBox: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    buttonBox: {
        width: '100%'
    },
    cardButton: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});


const cardCardStyle = StyleSheet.create({
    contentBox: {
        flex: 1, 
        paddingHorizontal: 16
    },
    cardFormBox: {
        flex: 7, 
        marginTop: 40, 
        flexDirection: 'row'
    },
    secondButtonBox: {
        marginTop: 10,
    }
});

const afterPayCardStyle = StyleSheet.create({
    afterPayCard: {
        flex: 1, 
        paddingBottom: 52, 
        paddingHorizontal: 16
    },
    loaderBox: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',

    },
    oneButtonBox: {
        flex:0.3, 
        width: '100%'
    },
    twoButtonsBox: {
        flex:1, 
        width: '100%'
    },

});

const alternativePaymentCardStyle = StyleSheet.create({
    upPart: {
        flex: 12, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100%',
        marginTop: 36
    },
    downPart: {
        flex:8, 
        width: '100%', 
        backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center', 
        paddingBottom: 40, 
        paddingHorizontal: 16, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        paddingTop: 20
    }, 
})


export { loginCardStyle, signUpCardStyle, codeCardStyle, passwordCardStyle, homeCardStyle, bonusCardStyle, informationCardStyle, favouriteCardStyle, notificationCardStyle, scanCardStyle, paymentCardStyle, cardCardStyle, afterPayCardStyle, alternativePaymentCardStyle };