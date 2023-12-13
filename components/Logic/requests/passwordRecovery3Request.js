import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';


//login to server handling
export const handleRecovery3 = async (ackcode, hpwd, utoken) => {

    const headers = {
            'Authorization': `Bearer ${utoken}`
        };
    
      const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.passwordRecovery3,
        params: {
          ack_code: parseInt(ackcode),
          hpwd: hpwd,
          lang: SERVER_CONSTANTS.lang,
        },
        id: 2
    };
    
    console.log(headers)
    //try/catch block for posting to server
    try {
        const response = await axios.post(SERVER_CONSTANTS.link, requestBody, {headers: headers});
        
        console.log(JSON.stringify(response));
            if ("result" in response.data) {
                if (response.data.result === true) {
                    return true;
                } else {
                    return 1;
                }
            } else if ("error" in response.data) {
                const errorRes = response.data.error;
                const code = errorRes.code;
                const message = errorRes.message;
                return {
                    error: {
                        code: code,
                        message: message
                    }
                }
            } else {
                return 2;
            }
    }
    catch (error) { 
        //catching errors while posting to server
        Alert.alert("Неочікувана помилка під час запиту", error.response);
    }
};