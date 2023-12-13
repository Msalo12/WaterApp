import { StyleSheet, Platform  } from 'react-native';
import {COLOR, FONT} from '../constants'

const ButtonsStyle = StyleSheet.create({
    blueButton: {
        backgroundColor: "#82B8D9",
        borderRadius: 8,
        height: 54,
        paddingVertical: Platform.OS === 'android' ? 8 : 10,
        marginTop: 50,
        color: COLOR.black,
        
        justifyContent: 'center',

        //shadowing
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 5,
    },
    greenReverseButton: {
        backgroundColor: "#82B8D9",
        borderRadius: 8,
        height: 52,
        paddingVertical: Platform.OS === 'android' ? 8 : 10,
        marginTop: 8,
        color: "#82B8D9",
        
        justifyContent: 'center',
    },
    redReverseButton: {
        backgroundColor: "#82B8D9",
        borderRadius: 8,
        height: 52,
        paddingVertical: Platform.OS === 'android' ? 8 : 10,
        marginTop: 8,
        color: COLOR.red,
        
        justifyContent: 'center',
    },
    greyReverseButton: {
        backgroundColor: "#82B8D9",
        borderRadius: 8,
        height: 52,
        paddingVertical: Platform.OS === 'android' ? 8 : 10,
        marginTop: 8,
        color: COLOR.darkgrey,
        
        justifyContent: 'center',
    },
    greyButton: {
        backgroundColor: "#A6A5A4",
        borderRadius: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 24,
        marginTop: 8,
        color: "#82B8D9",
        
        justifyContent: 'center',
    },
    slideGreenButton: {
        flex: 1,
        backgroundColor: "#82B8D9",
        borderRadius: 8,
        height: 40,
        paddingVertical: Platform.OS === 'android' ? 8 : 10,
        marginTop: 50,        
        justifyContent: 'center',
    },
    slideGreyButton: {
        flex: 1,
        backgroundColor: COLOR.lightgrey,
        borderRadius: 8,
        height: 40,
        paddingVertical: Platform.OS === 'android' ? 8 : 10,
        marginTop: 50,        
        justifyContent: 'center',
    },
    activeTumbButoon: {
        zIndex: 1,
    },
    nonActiveTumbButoon: {
        zIndex: 0,
    },
    backButton: {
        position: 'absolute', 
        left: 0,
        paddingVertical: 10
    },
    infoButton: {
        position: 'absolute', 
        right: 0,
    },
    greySizedButton: {
        backgroundColor: COLOR.darkgrey,
        borderRadius: 12,
        paddingVertical: 10,
        fontSize: 24,
        marginTop: 8,
        height: 56,
        
        justifyContent: 'center',
    },
    greenLinedButton: {
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderWidth: 1.5,
        borderColor: "#82B8D9",
        backgroundColor: "#82B8D9",
        borderRadius: 12
    },
    greenSizedButton: {
        backgroundColor: "#82B8D9",
        borderRadius: 12,
        height: 54,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: COLOR.white,
        
        justifyContent: 'center',
    }
});

export { ButtonsStyle };