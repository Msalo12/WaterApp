import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';


//login to server handling
export const handleDeleteAccount = async () => {

    const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);

    const tokenData = JSON.parse(tokenDataString);
    const currentDatetime = new Date();
    
    const utoken = tokenData.token;


    const headers = {
            'Authorization': `Bearer ${utoken}`
    };
    
    const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.delete,
        params: {
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
                    await SecureStore.deleteItemAsync(STORAGE.utn);
                    return true;
                } else {
                    return 1;
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