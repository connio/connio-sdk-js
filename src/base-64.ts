export type TBase64String = string;

export class Base64 {
  static to(value: string): TBase64String {
    return window.btoa(value);
  }

  static from(value: TBase64String): string {
    return window.atob(value);
  }
}
