import { IBaseEntity } from './base';

export interface IUser extends IBaseEntity {
  accountId: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}
