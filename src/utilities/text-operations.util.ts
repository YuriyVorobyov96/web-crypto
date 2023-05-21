export default class TextOperationsUtil {
  public static encode(data: string): Uint8Array {
    return new TextEncoder().encode(data);
  }

  public static decode(buffer: ArrayBuffer): string {
    return new TextDecoder().decode(buffer);
  }
}
