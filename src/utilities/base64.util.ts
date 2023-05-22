export default class Base64Util {
  public static convertStreamToBase64(buffer: ArrayBuffer | Uint8Array): string {
    return window.btoa(
      new Uint8Array(buffer).reduce((str, data) => str + String.fromCharCode(data), '')
    );
  }

  public static convertBase64ToStream<T extends ArrayBuffer | Uint8Array>(base64: string, mimeType?: string): T {
    let sanitized = base64;

    if (mimeType) {
      sanitized = sanitized.replace(`data:${mimeType};base64,`, '');
    };

    const bin = window.atob(sanitized);
    const buffer = new ArrayBuffer(bin.length);
    const bufferView = new Uint8Array(buffer);

    for (let i = 0; i < bin.length; i++) {
      bufferView[i] = bin.charCodeAt(i);
    }

    return buffer as T;
  }
}
