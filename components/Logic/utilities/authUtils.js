import * as CryptoJS from 'crypto-js';

import { COMMANDS, SERVER_CONSTANTS, STORAGE } from '../../../constants/server';


{/* function generateRandomSalt(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let salt = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      salt += characters.charAt(randomIndex);
    }
    
    return salt;
  } 
  // Usage
  const randomSalt = generateRandomSalt(16); // Generate a 16-character random salt
  console.log('Random Salt:', randomSalt);

*/}

// Function to hash a password
export const hashPassword = (password) => {
  const salt = STORAGE.salt; // This should be unique per user
  const hashedPassword = CryptoJS.SHA256(password + salt).toString(CryptoJS.enc.Hex);
  return hashedPassword;
};