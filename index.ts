import CryptographyService from './src/cryptography/cryptography.service';
import Base64Util from './src/utilities/base64.util';

const AES_CGM_ALGORITHM: AesKeyGenParams = { name: "AES-GCM", length: 256 };

const cryptographyService = new CryptographyService(AES_CGM_ALGORITHM);

const base64 = 'base64-string';

const { cipher, encryptionKey, initialVector } = await cryptographyService.encrypt(base64);

const cipherText = Base64Util.convertStreamToBase64(cipher);

console.log('Cipher: ', cipherText);
console.log('Encryption key: ', encryptionKey);
console.log('IV: ', initialVector);
