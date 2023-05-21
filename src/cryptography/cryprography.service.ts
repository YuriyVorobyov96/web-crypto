import defaultKeyUsages from './constants/default-key-usages.const';
import ICryptographyManager from './interfaces/cryptography-manager.interface';
import IEncryptionKeyManager from './interfaces/encryption-key-manager.interface';

export default class CryptographyService<
  T extends AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params = AesKeyGenParams,
> implements IEncryptionKeyManager, ICryptographyManager {
  public readonly algorithm: T;
  public readonly keyUsages: Readonly<Array<KeyUsage>>;

  constructor(algorithm: T, keyUsages: Readonly<Array<KeyUsage>> = defaultKeyUsages) {
    if (window.isSecureContext) {
      this.algorithm = algorithm;
      this.keyUsages = keyUsages;
    } else {
      throw new Error('Switch to a secure context to use Web Crypto functions');
    }
  }
}