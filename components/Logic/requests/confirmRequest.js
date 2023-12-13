import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';


//login to server handling
export const handleConfirmation = async (ackcode, utoken) => {

    const headers = {
            'Authorization': `Bearer ${utoken}`
        };
    
      const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.signUpAck,
        params: {
          ack_code: parseInt(ackcode),
          lang: SERVER_CONSTANTS.lang,
        },
        id: 2
    };
    

    //try/catch block for posting to server
    try {
        const response = await axios.post(SERVER_CONSTANTS.link, requestBody, {headers: headers});
        
        console.log(JSON.stringify(response));
            if ("result" in response.data) {
                if (response.data.result === true) {

                    const expirationTime = new Date();
                    expirationTime.setDate(expirationTime.getDate() + 5); // Adjust this value as needed
        
                    const tokenData = {
                        token: utoken,
                        expiration: expirationTime.toISOString(), // Store the expiration as an ISO string
                    };
                    
                    await SecureStore.setItemAsync(STORAGE.utn, JSON.stringify(tokenData));
                    await SecureStore.setItemAsync(STORAGE.ath, 'false');

                                        
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