import Constants from 'expo-constants';

const COMMANDS = {
    signUp: "SignUp",
    signUpAck: "SignUpAck",
    signIn: "SignIn",
    passwordRecovery1: "PasswordRecovery1",
    passwordRecovery2: "PasswordRecovery2",
    passwordRecovery3: "PasswordRecovery3",
    delete: "DeleteAccount",
    getBoxSrv: 'GetBoxSrv',
    pmRegPay: 'PmRegPay',
    bVend: 'BVend',
    pmVend: 'PmVend',
    getVobjInfo: 'GetVobjInfo',
    setVobjFavorite: 'SetVobjFavorite',
    getVobjComments: 'GetVobjComments',
    addVobjComment: 'AddVobjComment'

}

const SERVER_CONSTANTS = {
    appKey: 'Lw85fFgq63d3AZgteY9Kfc21Sd63Weaq',
    appVersion: Constants.expoConfig.version,
    JSONRPC: '2.0',
    lang: 'uk',
    
}

const STORAGE = {
    utn: '7YNdNEnQqTjmoxp',
    salt: 'W8MKel03NEY9luE6',
    str: 'LW_2s9uli31F124iQSZsAxq39T1E.db',
    tblcn: 'z5zdTx8r59',
    ath: '0FNfIRjS48'
}

export { COMMANDS, SERVER_CONSTANTS, STORAGE }