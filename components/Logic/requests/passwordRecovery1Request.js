import { Alert } from 'react-native';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

//login to server handling
export const handleRecovery1 = async (user) => {

    //constants for posting to server
    const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.passwordRecovery1,
        params: {
          user: user,
          lang: SERVER_CONSTANTS.lang,
          app: {
            key: SERVER_CONSTANTS.appKey,
            fv: SERVER_CONSTANTS.appVersion
          },
          id: 1
        }
    };

    console.log(JSON.stringify(requestBody))
    
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

            await SecureStore.setItemAsync(STORAGE.utn, utoken);

            return {
                result: {
                    sms_ack_timeout: smsAckTimeout,
                    ack_code: ack_code,
                    utoken: utoken, 
                }

            }
        } else if ( response.data.error ) {
            const errorRes = response.data.error;
            const code = errorRes.code;
            const message = errorRes.message ? errorRes.message : ''

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