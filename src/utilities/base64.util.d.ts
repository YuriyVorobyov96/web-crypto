export default class Base64Util {
    static convertStreamToBase64(buffer: ArrayBuffer | Uint8Array): string;
    static convertBase64ToStream<T extends ArrayBuffer | Uint8Array>(base64: string, mimeType?: string): T;
}
