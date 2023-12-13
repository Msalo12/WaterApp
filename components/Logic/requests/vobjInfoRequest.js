import React, { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';


//login to server handling
export const handleAllVendInfo = async (params) => {

    const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);

    const tokenData = JSON.parse(tokenDataString);
    const currentDatetime = new Date();
    
    const utoken = tokenData.token;
    
    const headers = {
        'Authorization': `Bearer ${utoken}`
    }; 

    
    const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.getVobjInfo,
        params: {
          lang: SERVER_CONSTANTS.lang,
        },
        id: 2
    };
    
    //try/catch block for posting to server
    try {

        const response = await axios.post(SERVER_CONSTANTS.link, requestBody, {headers: headers});
  
        if(response.data.result.vobj_info) {
            //console.log(JSON.stringify(response.data.result.vobj_info));
        }

        if ( response.data.result ) {  
            return {
                result: {
                    option_catalogue: response.data.result.vobj_option_catalogue,
                    info: response.data.result.vobj_info,
                    u_info: response.data.result.uv_info,
                }
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