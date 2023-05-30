import ICryptographyManager from './interfaces/cryptography-manager.interface';
import IEncryptionKeyManager from './interfaces/encryption-key-manager.interface';
import IEncryptionPayload from './interfaces/encryption-payload.interface';
export default class CryptographyService<T extends AesKeyGenParams | HmacKeyGenParams | Pbkdf2Params = AesKeyGenParams> implements IEncryptionKeyManager, ICryptographyManager {
    readonly algorithm: T;
    readonly keyUsages: KeyUsage[];
    constructor(algorithm: T, keyUsages?: KeyUsage[]);
    parseKey(key: ArrayBuffer): Promise<CryptoKey>;
    encrypt(data: string): Promise<IEncryptionPayload>;
    decrypt(cipher: ArrayBuffer, key: CryptoKey, initialVector: Uint8Array): Promise<String>;
    generateInitialVector(): Uint8Array;
    readKey(key: CryptoKey): Promise<ArrayBuffer>;
    generateKey(): Promise<CryptoKey>;
}
