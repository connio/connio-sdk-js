import { IAuthData, IUserCredentials } from '../entities';
import { IRestClient } from '../rest-client';
import { IdentityPath } from './definitions';

export interface IAuth {
  login(user: IUserCredentials): Promise<IAuthData>;
  requestPasswordReset(email: string): Promise<{}>;
  resetPassword({ password, token }: { password: string, token: string }): Promise<any>;
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

  async requestPasswordReset(email: string): Promise<{}> {
    return await this._client.post(IdentityPath.PasswordResetRequest, {
      email,
    });
  }

  public async resetPassword({ password, token }: { password: string, token: string }): Promise<any> {
    return await this._client.post(IdentityPath.PasswordReset, {
      password,
      token,
    })
  }
}
