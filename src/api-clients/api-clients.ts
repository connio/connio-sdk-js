import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IApiClient } from '../entities';
import { IApiClientKey } from '../entities/api-client-key';

interface INewApiClient
  extends Partial<
      Pick<IApiClient, 'name' | 'friendlyName' | 'description' | 'tags'>
    >,
    Required<Pick<IApiClientKey, 'context' | 'scope'>> {}

interface IApiClientsOptions extends IAbstractEntityOptions {}
export interface IApiClients
  extends IAbstractEntityApi<IApiClient, INewApiClient> {
  create(entity: INewApiClient): Promise<IApiClient>;

  /**
   * @param id Api client's id
   */
  regenerate(id: string): Promise<IApiClientKey>;
}

export class ApiClients extends AbstractEntityApi<IApiClient, INewApiClient> {
  protected BASE_URL = '/apiclients';

  constructor(options: IApiClientsOptions) {
    super(options);
  }

  public async regenerate(id: string): Promise<IApiClientKey> {
    console.log('asd')
    return await this.client.post<IApiClientKey>(`/${id}/apikey`, { id });
  }
}
