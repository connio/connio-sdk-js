import {
  IDeleteResponse,
  IPaginatedResponse,
  IQueryParams,
  IRestClient,
} from '../rest-client';

export interface IAbstractEntityOptions {
  client: IRestClient;
}

export interface IAbstractEntityApi<
  TEntity,
  TNewEntityPayload = Partial<TEntity>
> {
  paginatedList(
    queryParams?: IQueryParams,
  ): Promise<IPaginatedResponse<TEntity>>;
  list(queryParams?: IQueryParams): Promise<TEntity[]>;
  delete(entityRef: string): Promise<IDeleteResponse>;
  read(entityRef: string): Promise<TEntity>;
  create(entity: TNewEntityPayload): Promise<TEntity>;
  update(entityRef: string, entity: Partial<TEntity>): Promise<TEntity>;
}

export abstract class AbstractEntityApi<
  TEntity,
  TNewEntityPayload = Partial<TEntity>
> implements IAbstractEntityApi<TEntity, TNewEntityPayload> {
  protected readonly client: IRestClient;

  protected abstract BASE_URL: string;

  constructor(options: IAbstractEntityOptions) {
    this.client = options.client;
  }

  public async paginatedList(
    queryParams?: IQueryParams,
  ): Promise<IPaginatedResponse<TEntity>> {
    return await this.client.get<IPaginatedResponse<TEntity>>(
      this.BASE_URL,
      queryParams,
    );
  }

  public async list(queryParams?: IQueryParams): Promise<TEntity[]> {
    let response = await this.paginatedList(queryParams);

    return response.results;
  }

  /**
   * @param entityRef Entity’s name or id
   */
  public async delete(entityRef: string): Promise<IDeleteResponse> {
    let response: IDeleteResponse = await this.client.delete(
      `${this.BASE_URL}/${entityRef}`,
    );

    if (response.nrOfItems === 0) {
      return Promise.reject(response);
    }

    return response;
  }

  /**
   * @param entityRef Entity’s name or id
   */
  public async read(entityRef: string): Promise<TEntity> {
    return await this.client.get<TEntity>(`${this.BASE_URL}/${entityRef}`);
  }

  public async create(entity: TNewEntityPayload): Promise<TEntity> {
    return await this.client.post<TEntity>(this.BASE_URL, entity);
  }

  public async update(
    entityRef: string,
    entity: Partial<TEntity>,
  ): Promise<TEntity> {
    return await this.client.put<TEntity>(
      `${this.BASE_URL}/${entityRef}`,
      entity,
    );
  }
}
