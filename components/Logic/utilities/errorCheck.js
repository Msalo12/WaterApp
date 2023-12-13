import { Alert } from 'react-native';


export const errorCheck = ({vendResponse}) => {
    if (vendResponse.error.code === -3) {
        Alert.alert('Помилка', `${vendResponse.error.message}: такого терміналу не існує`);
    } else if (vendResponse.error.code === -23) {
        Alert.alert('Помилка', `Ви заблоковані!`);
    } else if (vendResponse.error.code === -24) {
        Alert.alert('Помилка', `Ви заблоковані на даному терміналі`);
    } else {
        Alert.alert('Помилка', `${vendResponse.error.message}`);
    }
}