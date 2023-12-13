import { StyleSheet, Platform, Dimensions } from 'react-native';
import {COLOR} from '../constants'

const { width } = Dimensions.get('window');

const isAndroid = () => {
    const plat = Platform.OS;
    if (Platform.OS === 'android') {
        return true;
    } else {
        return false;
    }
}

const generalStyle = StyleSheet.create({
    centerAlign: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightAlign: {
        textAlign: 'right',
    },
    leftAlign: {
        textAlign: 'left',
    },
    wrongInput: {
        borderColor: 'red',
        borderWidth: 1
    },
    bubbleContainer: {
        position: 'relative',
        marginBottom: 10,
        marginLeft: 20, // Add a margin to move the form more to the left
        alignItems: 'flex-start', // Align the bubble and triangle to the left
        backgroundColor: 'transparent', // Set a background color to enable shadow on Android
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.3, // For iOS shadow
        shadowRadius: 4, // For iOS shadow
      },
      bubble: {
        backgroundColor: COLOR.tabbarBackground,
        padding: 10,
        borderRadius: 8,
        zIndex: 1,
        elevation: 5, // For Android shadow
        shadowColor: COLOR.darkgrey, // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.3, // For iOS shadow
        shadowRadius: 4, // For iOS shadow
      },
      triangle: {
        position: 'absolute',
        top: -8, // Position the triangle above the bubble
        left: -1, // Position the triangle to the left of the bubble
        width: 24,
        height: 20,
        borderTopWidth: 10,
        borderTopColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: COLOR.tabbarBackground,
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        zIndex: 0,
      },
      insideButtonBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    separator: {
        height: 1, 
        backgroundColor: 'black', 
        width: '100%', 
        marginVertical: 20
    }

});

const iconStyle = StyleSheet.create({
    eyeIconContainer: {
        position: 'absolute',
        top: 40,
        right: 12,
      },
      whiteScanContainer: {
        marginRight: 24,
      },
      searchIcon: {
        marginRight: 8,
      },
      filterIcon: {
        marginLeft: 12,
      },
      copyContainer: {
        marginRight: 24,
      },
      shareContainer: {
        marginRight: 24,
      },
      editContainer: {
        marginRight: 24,
      },
      directionContainer: {
        backgroundColor: COLOR.accent, 
        borderRadius: 12, 
        paddingHorizontal: 15, 
        paddingVertical: 15, 
        marginLeft: 12
      },
      applePay: {
        marginRight: 16
      }, 
      infoIcon: {
        position: 'absolute', 
        top: 15, 
        right: 12
      },
      serviceIcon: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      listDotIconContainer: {
        marginRight: 8
      }
});

const imageStyle = StyleSheet.create({
    Login: {
        alignItems: 'center'
    },
    Rectangle: {
        alignItems: 'center',       
        flex: 1,
    }
});


const marginStyle = StyleSheet.create({
    logInput: {
        marginBottom: 15,
    },
    signInput: {
        marginBottom: 12,
    }
});



const fontColor = StyleSheet.create({
    accentText: {
        color: COLOR.accent,
    },
    darkgreyText: {
        color: COLOR.darkgrey,
    },
    blackText: {
        color: COLOR.black,
    },
    friendlyText: {
        color: COLOR.friendly,
    },
    secondaryText: {
        color: COLOR.secondary,
    },
    whiteText: {
        color: COLOR.white,
    },
    redText: {
        color: COLOR.red,
    },
    lightGreyText: {
        color: COLOR.lightgrey
    },
    greyText:{
        color: COLOR.grey,
    }
})

const carouselStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
      },
      cardWrapper: {
        borderRadius: 8,
        overflow: 'hidden',
      },
      card: {
        width: width * 0.9,
        height: width * 0.5,
      },
      cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
      },
      cornerLabelText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
      },
});

const washesCardStyle= StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginBottom: 14,
    },
    column: {
        flex: 1,
    },
    firstColumn: {
        flex: 4,
    },
    centerColumn: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    rightColumn: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    row: {
        marginBottom: 4,
    },
    rowOne: {
        fontSize: 16,
        fontFamily: 'MMedium'
    },
    rowTwo: {
        fontSize: 13,
        fontFamily: 'MMedium',
    },
    rowThree: {
        fontSize: 13,
        fontFamily: 'MMedium'
    },
    greenPrice: {
        fontSize: 18,
        fontFamily: 'MSemiBold'
    },
    distanceText: {
        fontSize: 13,
        fontFamily: 'MSemiBold'
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 4,
    },
    starText: {
       marginRight: 8
    },
    centerText: {
        color: 'green',
        textAlign: 'center',
    },
    rightText: {
        textAlign: 'right',
    },
});

const progressBarStyle = StyleSheet.create({
    progressContainer: {
        marginTop: 20,
        width: '100%',
        height: 10,
        backgroundColor: COLOR.darkgrey,
        borderRadius: 5,
        flexDirection: 'row',
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: COLOR.friendly,
        zIndex: 1,
    },
    greyProgressBar: {
        height: '100%',
        borderRadius: 5,
        backgroundColor: COLOR.darkgrey,
        zIndex: 0,
    },
})

const switchStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      customSwitchContainer: {
        width: 51,
        height: 31,
        borderRadius: 20,
        justifyContent: 'center',
      },
      customSwitchOn: {
        backgroundColor: COLOR.friendly,
      },
      customSwitchOff: {
        backgroundColor: COLOR.darkgrey,
      },
      customSwitchThumb: {
        width: 26,
        height: 26,
        borderRadius: 20,
        backgroundColor: 'white',
        position: 'absolute',
      },
});



const fontFamilyStyle = StyleSheet.create({
    MRegular: {
        fontFamily: 'MRegular'
    },
    MMedium: {
        fontFamily: 'MMedium'
    },
    MSemiBold: {
        fontFamily: 'MSemiBold'
    },
    SFRegular: {
        fontFamily: 'SFRegular'
    },
    SFMedium: {
        fontFamily: 'SFMedium'
    },
    SFSemiBold: {
        fontFamily: 'SFSemiBold'
    },
    SFBold: {
        fontFamily: 'SFBold'
    },
    OSRegular: {
        fontFamily: 'OSRegular'
    },
});

const fontSizes = StyleSheet.create({
    size13: {
        fontSize: 13,
    },
    size14: {
        fontSize: 14,
    },
    size15: {
        fontSize: 15,
    },
    size16: {
        fontSize: 16,
    },
    size17: {
        fontSize: 17,
    },
    size18: {
        fontSize: 18,
    },
    size20: {
        fontSize: 20,
    },
    size22: {
        fontSize: 22,
    },
    size24: {
        fontSize: 24,
    },
    size26: {
        fontSize: 26,
    },
    size35: {
        fontSize: 35,
    },
    size34: {
        fontSize:34
    },
    size64: {
        fontSize: 64,
    },
});

const fontAlignStyle = StyleSheet.create({
    rightAlign: {
        textAlign: 'right'
    },
    leftAlign: {
        textAlign: 'left'
    },
    centerAlign: {
        textAlign: 'center'
    },
    justifyAlign: {
        textAlign: 'justify'
    }
});

const fontDecorationStyle = StyleSheet.create({
    underlined: {
        textDecorationLine: 'underline'
    }
});

const alertCardStyle = StyleSheet.create({
    congratsCardContainer: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'absolute',
        top: 170,
        left: 16,
        right: 16,
        bottom: 120,
        borderRadius: 12,
        backgroundColor: COLOR.white,
        paddingHorizontal: 16,
        paddingVertical: 40,
        elevation: 5,
        zIndex: 999,
    },
    congratsText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    dismissButton: {
        marginTop: 20,
        backgroundColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    dismissButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
        zIndex: 998, // Place it below the congrats card
    },
});


const fontStyle = StyleSheet.create({
    bigTitle: [
        fontSizes.size35, 
        fontFamilyStyle.SFSemiBold, 
        fontColor.blackText
    ],
    title: [
        fontColor.blackText, 
        fontFamilyStyle.MSemiBold, 
        fontSizes.size20, 
        fontAlignStyle.centerAlign
    ],
    text: [
        fontColor.blackText, 
        fontFamilyStyle.OSRegular, 
        fontSizes.size17, 
        fontAlignStyle.centerAlign
    ],
    pageTitle: [
        fontSizes.size24, 
        fontFamilyStyle.SFSemiBold
    ],
    inputHint: [
        fontSizes.size14, 
        fontColor.darkgreyText, 
        fontFamilyStyle.SFMedium
    ],
    greenButtonText: [
        fontColor.whiteText, 
        fontAlignStyle.centerAlign, 
        fontSizes.size18, 
        fontFamilyStyle.MMedium
    ],
    greyButtonText: [
        fontColor.whiteText, 
        fontAlignStyle.centerAlign, 
        fontSizes.size16, 
        fontFamilyStyle.MMedium
    ],
    RedLinedButtonText: [
        fontFamilyStyle.MMedium, 
        fontSizes.size16, 
        fontColor.redText,
        fontAlignStyle.centerAlign
    ],
    greenLinedButtonText: [
        fontFamilyStyle.MMedium, 
        fontSizes.size16, 
        fontColor.blackText,
        fontAlignStyle.centerAlign
    ],
    whiteButtonText: [
        fontColor.accentText, 
        fontAlignStyle.centerAlign, 
        fontSizes.size18, 
        fontFamilyStyle.MMedium
    ],
    redButtonText: [
        fontColor.redText, 
        fontAlignStyle.centerAlign, 
        fontSizes.size18, 
        fontFamilyStyle.MMedium
    ],
    smallGreyButtonText: [
        fontColor.whiteText, 
        fontAlignStyle.centerAlign, 
        fontSizes.size14,
        fontFamilyStyle.MRegular
    ],
    bonusSum: [
        fontFamilyStyle.MSemiBold, 
        fontSizes.size64, 
        fontAlignStyle.centerAlign
    ],
    uahSign: [
        fontSizes.size26, 
        fontFamilyStyle.MSemiBold
    ],
    infoText: [
        fontAlignStyle.justifyAlign, 
        fontFamilyStyle.SFMedium, 
        fontSizes.size18, 
        {lineHeight: 26}
    ],
    infoBoldText: [
        fontAlignStyle.leftAlign, 
        fontFamilyStyle.SFSemiBold
    ],
    dateText: [
        fontFamilyStyle.MMedium, 
        fontSizes.size14, 
        fontColor.darkgreyText
    ],
    services: [
        fontFamilyStyle.MMedium,
        fontSizes.size16,
    ]
});


const inputStyle = StyleSheet.create({
    userInput: {
        alignSelf: "stretch",
        flexDirection: 'row',
        fontSize: 20,
        backgroundColor: COLOR.cardBackground,
        borderRadius: 12,
        paddingVertical: Platform.OS === 'android' ? 12 : 15,
        paddingHorizontal: 12, 
        fontFamily: 'MMedium'
    },
    searchInput: {
        flex: 1,
        alignSelf: "stretch",
        flexDirection: 'row',
        fontSize: 14,
        backgroundColor: COLOR.white,
        borderRadius: 12,
        paddingVertical: Platform.OS === 'android' ? 12 : 15,
        paddingHorizontal: 12, 
        fontFamily: 'MRegular'
    },
    codeInput: [
        fontColor.whiteText, 
        fontSizes.size34, 
        fontFamilyStyle.MSemiBold,
        fontAlignStyle.centerAlign
    ],
    cardInput: {
        alignSelf: "stretch",
        flexDirection: 'row',
        fontSize: 16,
        backgroundColor: COLOR.cardBackground,
        borderRadius: 12,
        paddingVertical: Platform.OS === 'android' ? 12 : 15,
        paddingHorizontal: 12, 
        fontFamily: 'MMedium'
    }

});

const upMenuStyle = StyleSheet.create({
    upMenuBox: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 65,
        marginHorizontal: 16
    },
    titleBox: {
        flex: 1, 
        alignItems: 'center',
    },
});

const cardFormStyle = StyleSheet.create({
    inputDistance: {
        marginBottom: 12,
    },
    twoInputsBox: {
        flexDirection: 'row',
    },
    dateBox: {
        flex: 1, 
        marginRight: 10
    },
    cvvBox: {
        flex: 1, 
        marginLeft: 10
    }
})

const loaderFormStyle = StyleSheet.create({
    loader: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent', // Circle color
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    overlayIcon: {
        position: 'absolute',
        top: -65,
        left: -65,
    },
});

const serviceCardForm = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'

    },
    focusedCard: {
        transform: [{ scale: 1.1 }],
        opacity: 0.8,
    },
    textContainer: {
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipCard: {
        marginTop: -130
    },
    bottomTextBox: {
        marginTop: 40
    },
    backListBox: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'space-between',
    },
    smallBackListBox: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    itemBox: {
        flexDirection: 'row', 
        alignItems: 'center'
    }
});

const payBlockForm = StyleSheet.create({
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
        paddingTop: isAndroid() ? 20 : 0
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
    cardButton: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonBox: {
        width: '100%'
    },
});

export { generalStyle, iconStyle, inputStyle, marginStyle, fontStyle, fontColor, imageStyle, carouselStyle, washesCardStyle, progressBarStyle, fontFamilyStyle, fontSizes, fontAlignStyle, fontDecorationStyle, alertCardStyle, upMenuStyle, switchStyle, cardFormStyle, loaderFormStyle, serviceCardForm, payBlockForm};