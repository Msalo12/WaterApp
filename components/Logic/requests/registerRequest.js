import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//login to server handling
export const handleRegistration = async (user, hPWD, EMAIL) => {

    //constants for posting to server
    const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.signUp,
        params: {
          user: user,
          hpwd: hPWD,
          email: EMAIL,
          lang: SERVER_CONSTANTS.lang,
          app: {
            key: SERVER_CONSTANTS.appKey,
            fv: SERVER_CONSTANTS.appVersion
          },
          id: 1
        }
    };

    console.log(JSON.stringify(requestBody))
    //const stringar = '{"jsonrpc":"2.0","method":"SignUp","params":{"user":"380508742124","hpwd":"c33bbece56ad2d999e9ceb1807bcaac2eae99d8c49adc3400f622cbab2233cf3","email":"maryna.nyzova.04@gmail.com","lang":"uk","app":{"key":"Lw85fFgq63d3AZgteY9Kfc21Sd63Weaq","fv":"0.1.3"},"id":1}'
    //try/catch block for posting to server
     try {  
        //post to server with needed values
        const response = await axios.post(SERVER_CONSTANTS.link, requestBody);
        console.log(JSON.stringify(response))
        //collecting response data
        if (response.data.result ) {
            const result = response.data.result;
            const smsAckTimeout = result.sms_ack_timeout;
            const utoken = result.utoken;
            const ack_code = response.data.result.ack_code ? response.data.result.ack_code : '';
            
            return {
                result: {
                    sms_ack_timeout: smsAckTimeout,
                    ack_code: ack_code,
                    utoken: utoken
                }
            }
        } else if ( response.data.error ) {
            const errorRes = response.data.error;
            const code = errorRes.code;
            const message = errorRes.message
            const rid = response.data.id;
            return {
                error: {
                    code: code,
                    message: message
                }
            }
        }
        else {
            return 1;

        }
    } catch (error) { //catching errors while posting to server
      Alert.alert("Неочікувана помилка під час запиту", error.response);

      return null;
    }
};