import { Alert } from 'react-native';
import axios from 'axios';
import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';
import * as SecureStore from 'expo-secure-store';


//login to server handling
export const handlePayPmVend = async ({box_num, kop, amount, shop_order_number, pm_sid, shop_bill_id, auth_code, card_mask, gate_type, receipt_url}) => {
    
    const tokenDataString = await SecureStore.getItemAsync(STORAGE.utn);

    const tokenData = JSON.parse(tokenDataString);
    const currentDatetime = new Date();
    
    const utoken = tokenData.token;

    const headers = {
        'Authorization': `Bearer ${utoken}`
    };
    
    const requestBody = {
        jsonrpc: SERVER_CONSTANTS.JSONRPC,
        method: COMMANDS.pmVend,
        params: {
          box_num: parseInt(box_num),
          ...(kop ? { kop: kop } : {}),
          amount: amount,
          shop_order_number: shop_order_number,
          pm_sid: pm_sid,
          shop_bill_id: shop_bill_id,
          auth_code: auth_code,
          card_mask: card_mask,
          gate_type: gate_type,
          receipt_url: receipt_url,
          lang: SERVER_CONSTANTS.lang,
        },
        id: 475
    };
    

    console.log(JSON.stringify(requestBody))

    //try/catch block for posting to server
    try {
        const response = await axios.post(SERVER_CONSTANTS.link, requestBody, {headers: headers});

        console.log(JSON.stringify(response));
        
        const responseData = response.data;
            if (response.data.result) {
                if (response.data.result) {
                    return {
                        bonus_delta: responseData.result.bonus_delta
                    }
                }
            } else if (response.data.error) {
                const errorRes = response.data.error;
                return {
                    error: {
                        code: errorRes.code,
                        message: errorRes.message
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