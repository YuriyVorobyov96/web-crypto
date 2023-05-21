import defaultKeyUsages from './constants/default-key-usages.const';
import ICryptographyManager from './interfaces/cryptography-manager.interface';
import IEncryptionKeyManager from './interfaces/encryption-key-manager.interface';

export default class CryptographyService<
  T extends AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params = AesKeyGenParams,
> implements IEncryptionKeyManager, ICryptographyManager {
  public readonly algorithm: T;
  public readonly keyUsages: KeyUsage[];

  constructor(algorithm: T, keyUsages: KeyUsage[] = defaultKeyUsages as KeyUsage[]) {
    if (window.isSecureContext) {
      this.algorithm = algorithm;
      this.keyUsages = keyUsages;
    } else {
      throw new Error('Switch to a secure context to use Web Crypto functions');
    }
  }

  public generateInitialVector(): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(12));
  }

  public parseKey(key: ArrayBuffer): Promise<CryptoKey> {
    return window.crypto.subtle.importKey('raw', key, this.algorithm, true, this.keyUsages);
  }

  private readKey(key: CryptoKey): Promise<ArrayBuffer> {
    return window.crypto.subtle.exportKey('raw', key);
  }

  private generateKey(): Promise<CryptoKey> {
    return window.crypto.subtle.generateKey(this.algorithm, true, this.keyUsages);
  }
}