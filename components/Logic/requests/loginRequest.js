import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';

//login to server handling
export const handleLoginNew = async (USER, hPWD) => {

        //constants for posting to server
    const requestBody = {
            jsonrpc: SERVER_CONSTANTS.JSONRPC,
            method: COMMANDS.signIn,
            params: {
              user: USER,
              hpwd: hPWD,
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
        console.log(JSON.stringify(response));
        //collecting response data
        if ("result" in response.data) {
            const result = response.data.result;
            const utoken = result.utoken;
            const rid = response.data.id;

            const expirationTime = new Date();
            expirationTime.setDate(expirationTime.getDate() + 5); // Adjust this value as needed

            const tokenData = {
                token: utoken,
                expiration: expirationTime.toISOString(), // Store the expiration as an ISO string
            };
            
            await SecureStore.setItemAsync(STORAGE.utn, JSON.stringify(tokenData));
            await SecureStore.setItemAsync(STORAGE.ath, 'false');

            return {
                result: true
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
        }
        else {
            return 1;
        }
    } catch (error) { //catching errors while posting to server
        Alert.alert("Неочікувана помилка", error.response);
        return 2;
    }
};