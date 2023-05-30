import CryptographyService from './src/cryptography/cryptography.service';
import Base64Util from './src/utilities/base64.util';

const AES_CGM_ALGORITHM: AesKeyGenParams = { name: "AES-GCM", length: 256 };

const cryptographyService = new CryptographyService(AES_CGM_ALGORITHM);

const base64 = 'base64-string';

/*
 * Encryption
 */
const { cipher, encryptionKey, initialVector } = await cryptographyService.encrypt(base64);

const cipherBase64 = Base64Util.convertStreamToBase64(cipher);
const encryptionKeyBase64 = Base64Util.convertStreamToBase64(encryptionKey);
const initialVectorBase64 = Base64Util.convertStreamToBase64(initialVector);

console.log('Cipher: ', cipherBase64);
console.log('Encryption key: ', encryptionKeyBase64);
console.log('IV: ', initialVectorBase64);

/*
 * Decryption
 */
const encryptionKeyBuffer = Base64Util.convertBase64ToStream(encryptionKeyBase64);

const cryptoKey = await cryptographyService.parseKey(encryptionKeyBuffer);

const cipherBuffer = Base64Util.convertBase64ToStream(cipherBase64);
const initialVectorBuffer = Base64Util.convertBase64ToStream<Uint8Array>(initialVectorBase64);

const message = await cryptographyService.decrypt(cipherBuffer, cryptoKey, initialVectorBuffer);

console.log('Message: ', message);
