import { IAuthData, IUserCredentials } from '../entities';
import { IRestClient } from '../rest-client';
import { IdentityPath } from './definitions';

export interface IAuth {
  login(user: IUserCredentials): Promise<IAuthData>;
}

interface IAuthOptions {
  client: IRestClient;
}

export class Auth {
  private readonly _client: IRestClient;

  constructor({ client }: IAuthOptions) {
    this._client = client;
  }

  async login(user: IUserCredentials): Promise<IAuthData> {
    return await this._client.post<IAuthData>(IdentityPath.LogIn, user);
  }
}
