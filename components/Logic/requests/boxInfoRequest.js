import React, { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';


//login to server handling
export const handleBoxInfo = async (params) => {

    const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);

    const tokenData = JSON.parse(tokenDataString);
    const currentDatetime = new Date();
    
    const utoken = tokenData.token;
    
    console.log(`TOKEN: ${JSON.stringify(utoken)}`)

    const headers = {
        'Authorization': `Bearer ${utoken}`
    }; 

    
    const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.getBoxSrv,
        params: {
            ...(params.qr ? { qr_code: params.qr } : {}),
            ...(params.box_num ? { box_num: params.box_num } : {}),
          lang: SERVER_CONSTANTS.lang,
        },
        id: 2
    };
    
    console.log(JSON.stringify(requestBody));

    //try/catch block for posting to server
    try {
        const response = await axios.post(SERVER_CONSTANTS.link, requestBody, {headers: headers});
        
        console.log(JSON.stringify(response));
        if ( response.data.result ) {  

            return {
                result: response.data.result
            }

        } else if ( response.data.error ) {
            return {
                error: {
                    code: response.data.error.code,
                    message: response.data.error.message
                }
            }
        } else {
            return 1;
        }
    }
    catch (error) { 
        //catching errors while posting to server
        Alert.alert("Неочікувана помилка під час запиту", error.response);
        return 2
    }
};