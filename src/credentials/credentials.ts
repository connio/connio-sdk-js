import { ICredentials } from '../entities';

export interface ICredentialsStore {
  isEmpty: boolean;
  set(credentials?: ICredentials): this;
  get(): ICredentials;
}

export class CredentialsStore {
  private _credentials: ICredentials;

  public isEmpty = true;

  constructor(credentials?: ICredentials) {
    this._credentials = this._makeCredentials(credentials);
  }

  private _setIsEmpty(credentials: ICredentials): this {
    this.isEmpty = !(
      credentials.id &&
      credentials.username &&
      credentials.password
    );

    return this;
  }

  private _makeCredentials(crendentials?: ICredentials): ICredentials {
    return Object.freeze({
      id: crendentials?.id || '',
      username: crendentials?.username || '',
      password: crendentials?.password || '',
    });
  }

  public set(crendentials: ICredentials): this {
    this._credentials = this._makeCredentials(crendentials);

    this._setIsEmpty(this._credentials);

    return this;
  }

  public get(): ICredentials {
    return this._credentials;
  }
}
