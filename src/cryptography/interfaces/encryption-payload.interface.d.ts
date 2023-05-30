export default interface IEncryptionPayload {
    readonly initialVector: Uint8Array;
    readonly encryptionKey: ArrayBuffer;
    readonly cipher: ArrayBuffer;
}
