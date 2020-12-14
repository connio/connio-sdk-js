import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IClient } from '../entities';

export interface IClients extends IAbstractEntityApi<IClient> {}
export interface IClientsOptions extends IAbstractEntityOptions {}

export class Clients extends AbstractEntityApi<IClient> implements IClients {
  protected BASE_URL = '/clients';

  constructor(options: IClientsOptions) {
    super(options);
  }
}
