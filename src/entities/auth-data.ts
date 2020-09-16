import { IAccountEntity, IApiKey, IUser } from '../entities';

export interface IAuthData {
  account: IAccountEntity;
  apiKey: IApiKey;
  user: IUser;
}
