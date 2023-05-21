import IEncryptionPayload from './encryption-payload.interface';

export default interface ICryptographyManager {
  readonly generateInitialVector: () => Uint8Array;
  readonly encrypt: (data: string, key: CryptoKey) => Promise<IEncryptionPayload>;
  readonly decrypt: (cipher: ArrayBuffer, key: CryptoKey, initialVector: Uint8Array) => Promise<String>;
}
