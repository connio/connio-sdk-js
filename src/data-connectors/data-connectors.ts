import { IDataConnector } from '../entities';
import {
  IDeleteResponse,
  IPaginatedResponse,
  IRestClient,
} from '../rest-client';
import type { AtLeast } from '../utility-types';

export interface IDataConnectors {
  list<T extends IDataConnector>(appRef: string): Promise<T[]>;
  delete(connectorId: string, appRef: string): Promise<IDeleteResponse>;
  read<T extends IDataConnector>(
    connectorId: string,
    appRef: string,
  ): Promise<T>;
  create<T extends IDataConnector>(
    newConnector: Partial<T>,
    appRef: string,
  ): Promise<T>;
  update<T extends IDataConnector>(
    entity: AtLeast<T, 'id'>,
    appRef: string,
  ): Promise<T>;
}
export interface IDataConnectorsOptions {
  client: IRestClient;
}

export class DataConnectors implements IDataConnectors {
  private readonly _client: IRestClient;

  private readonly APPS_URL = '/apps';
  private readonly DATA_CONNECTORS_URL = '/dataconnectors';

  constructor(options: IDataConnectorsOptions) {
    this._client = options.client;
  }

  private _makeBaseUrl(appRef: string) {
    return `${this.APPS_URL}/${appRef}${this.DATA_CONNECTORS_URL}`;
  }

  private _makeEntityUrl(connectorId: string, appRef: string) {
    return `${this._makeBaseUrl(appRef)}/${connectorId}`;
  }

  public async create<T extends IDataConnector>(
    newConnector: Partial<T>,
    appRef: string,
  ): Promise<T> {
    return await this._client.post(this._makeBaseUrl(appRef), newConnector);
  }

  public async read<T extends IDataConnector>(
    connectorId: string,
    appRef: string,
  ): Promise<T> {
    return await this._client.get<T>(this._makeEntityUrl(connectorId, appRef));
  }

  public async list<T extends IDataConnector>(appRef: string): Promise<T[]> {
    let response = await this._client.get<IPaginatedResponse<T>>(
      this._makeBaseUrl(appRef),
    );

    return response.results;
  }

  public async update<T extends IDataConnector>(
    payload: AtLeast<T, 'id'>,
    appRef: string,
  ): Promise<T> {
    return await this._client.put(
      this._makeEntityUrl(payload.id, appRef),
      payload,
    );
  }

  public async delete(
    connectorId: string,
    appRef: string,
  ): Promise<IDeleteResponse> {
    let response: IDeleteResponse = await this._client.delete(
      this._makeEntityUrl(connectorId, appRef),
    );

    if (response.nrOfItems === 0) {
      return Promise.reject(response);
    }

    return response;
  }
}
