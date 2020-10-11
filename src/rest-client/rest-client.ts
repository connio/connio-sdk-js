import { Base64, TBase64String } from '../base-64';
import { ICredentialsStore } from '../credentials';
import { ICredentials } from '../entities';
import {
  ContentType,
  ICustomHeaderds,
  IQueryParams,
  IRequestConfig,
  RequestHeader,
  RequestMethod,
} from './definitions';

/**
 * @todo
 * - Move to utils
 */
export function identity<T = any>(value: T) {
  return value;
}

export interface IRestClient {
  get<T>(url: string, queryParams?: IQueryParams): Promise<T>;
  post<T>(url: string, payload: TPostRequestPayload): Promise<T>;
  delete<T>(url: string): Promise<T>;
  put<T>(url: string, payload: TPutRequestPayload): Promise<T>;
}

interface IRestClientOptions {
  baseUrl: string;
  credentialsStore: ICredentialsStore;
  headers?: ICustomHeaderds;
}

type TPostRequestPayload = Record<string, any>;
type TPutRequestPayload = Record<string, any>;

export class RestClient implements IRestClient {
  private readonly _baseUrl: string;
  private readonly _credentialsStore: ICredentialsStore;
  private readonly _customHeaders: ICustomHeaderds = {};

  constructor({ baseUrl, credentialsStore, headers }: IRestClientOptions) {
    this._baseUrl = baseUrl;
    this._credentialsStore = credentialsStore;
    this._customHeaders = headers || {};
  }

  private _makeRequestConfig(method: RequestMethod): IRequestConfig {
    let headers = new Headers({
      [RequestHeader.ContentType]: ContentType.Json,
      ...this._customHeaders,
    });

    if (
      !this._credentialsStore.isEmpty &&
      !this._customHeaders[RequestHeader.Authorization]
    ) {
      let credentials = this._credentialsStore.get();
      let authHeader = this._makeAuthorizationHeader(credentials);

      headers.append(RequestHeader.Authorization, authHeader);
    }

    return {
      method,
      headers,
    };
  }

  private _makeGetRequestConfig(): IRequestConfig {
    return this._makeRequestConfig(RequestMethod.Get);
  }

  private _makePostRequestConfig(): IRequestConfig {
    return this._makeRequestConfig(RequestMethod.Post);
  }

  private _makeAuthorizationHeader(credentials: ICredentials): TBase64String {
    let token = Base64.to(`${credentials.username}:${credentials.password}`);

    return `Basic ${token}`;
  }

  private _makeUrlWithQueryString(
    url: string = '',
    queryParams?: IQueryParams,
  ): string {
    let queryString = '';

    if (queryParams) {
      let queryParamList = Object.entries(queryParams)
        .map(([key, value]) => {
          if (value === undefined) {
            return undefined;
          }

          return `${key}=${value}`;
        })
        .filter(identity);

      queryString = `?${queryParamList.join('&')}`;
    }

    return `${url}${queryString}`;
  }

  private _addBodyToRequestConfig<T extends Record<string, any>>(
    body: T,
    baseConfig: IRequestConfig,
  ): IRequestConfig {
    return {
      ...baseConfig,
      body: JSON.stringify(body),
    };
  }

  private async _request(url: string, config: IRequestConfig): Promise<any> {
    try {
      let response;
      let rawResponse = await fetch(`${this._baseUrl}${url}`, config);

      if (!rawResponse.ok) {
        let error = await rawResponse.json();

        throw error;
      }

      let contentType = rawResponse.headers.get(RequestHeader.ContentType);

      if (contentType?.includes(ContentType.Text)) {
        response = await rawResponse.text();
      } else {
        response = await rawResponse.json();
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(url: string, payload: TPostRequestPayload): Promise<T> {
    return await this._request(
      url,
      this._addBodyToRequestConfig<TPostRequestPayload>(
        payload,
        this._makePostRequestConfig(),
      ),
    );
  }

  public async get<T>(url: string, queryParams?: IQueryParams): Promise<T> {
    let urlWithQueryString = this._makeUrlWithQueryString(url, queryParams);

    return await this._request(
      urlWithQueryString,
      this._makeGetRequestConfig(),
    );
  }

  public async delete<T>(url: string): Promise<T> {
    return await this._request(
      url,
      this._makeRequestConfig(RequestMethod.Delete),
    );
  }

  public async put<T>(url: string, payload: TPutRequestPayload): Promise<T> {
    return await this._request(
      url,
      this._addBodyToRequestConfig<TPutRequestPayload>(
        payload,
        this._makeRequestConfig(RequestMethod.Put),
      ),
    );
  }
}
