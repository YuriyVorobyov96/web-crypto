import TextOperationsUtil from '../utilities/text-operations.util';
import defaultKeyUsages from './constants/default-key-usages.const';
import ICryptographyManager from './interfaces/cryptography-manager.interface';
import IEncryptionKeyManager from './interfaces/encryption-key-manager.interface';
import IEncryptionPayload from './interfaces/encryption-payload.interface';

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

  public parseKey(key: ArrayBuffer): Promise<CryptoKey> {
    return window.crypto.subtle.importKey('raw', key, this.algorithm, true, this.keyUsages);
  }

  public async encrypt(data: string): Promise<IEncryptionPayload> {
    const initialVector = this.generateInitialVector();
    const algorithm = { ...this.algorithm, iv: initialVector };
    const cryptoKey = await this.generateKey();

    const encoded = TextOperationsUtil.encode(data);

    const cipher = await window.crypto.subtle.encrypt(algorithm, cryptoKey, encoded);
    const encryptionKey = await this.readKey(cryptoKey);

    return { initialVector, encryptionKey, cipher };
  }

  public async decrypt(cipher: ArrayBuffer, key: CryptoKey, initialVector: Uint8Array): Promise<String> {
    const algorithm = { ...this.algorithm, iv: initialVector };

    const encoded = await window.crypto.subtle.decrypt(algorithm, key, cipher);

    return TextOperationsUtil.decode(encoded);
  }

  public generateInitialVector(): Uint8Array {
    return window.crypto.getRandomValues(new Uint8Array(12));
  }

  public readKey(key: CryptoKey): Promise<ArrayBuffer> {
    return window.crypto.subtle.exportKey('raw', key);
  }

  public generateKey(): Promise<CryptoKey> {
    return window.crypto.subtle.generateKey(this.algorithm, true, this.keyUsages);
  }
}