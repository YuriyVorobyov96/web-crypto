export default interface IEncryptionKeyManager {
  readonly parseKey: (key: ArrayBuffer) => Promise<CryptoKey>;
  readonly readKey: (key: CryptoKey) => Promise<ArrayBuffer>;
  readonly generateKey: (key: CryptoKey) => Promise<CryptoKey>;
}
