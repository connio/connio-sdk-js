import { IApiKey } from './api-key';

export enum ApiClientKeyAccountScope {
  Read = 'account:read',
}

export enum ApiClientKeyApiClientScope {
  Read = 'apiclient:read',
}

export enum ApiClientKeySubAccountScope {
  Read = 'subaccount:read',
}

export enum ApiClientKeyDeviceScope {
  Execute = 'device:execute',
  Modify = 'device:modify',
  Read = 'device:read',
  ReadData = 'device:read-data',
  WriteData = 'device:write-data',
}

export enum ApiClientKeyDeviceProfileScope {
  Modify = 'deviceprofile:modify',
  Read = 'deviceprofile:read',
}

export enum ApiClientKeyAppScope {
  Modify = 'app:modify',
  Read = 'app:read',
  ReadData = 'app:read-data',
}

export enum ApiClientKeyAppProfileScope {
  Modify = 'appprofile:modify',
  Read = 'appprofile:read',
}

export type TApiClientKeyScope =
  | ApiClientKeyDeviceScope
  | ApiClientKeyDeviceProfileScope
  | ApiClientKeyAppScope
  | ApiClientKeyAppProfileScope
  | ApiClientKeyAccountScope
  | ApiClientKeyApiClientScope
  | ApiClientKeySubAccountScope;

export enum ApiClientKeyContextType {
  Account = 'account',
  App = 'app',
  Device = 'device',
}

export interface IApiClientKeyContext {
  type: ApiClientKeyContextType;
  ids: string[];
}

export interface IApiClientKey extends IApiKey {
  ownerId: string;
  accountId: string;
  context: IApiClientKeyContext;
  scope: TApiClientKeyScope[];
  rateLimit: number;
}
