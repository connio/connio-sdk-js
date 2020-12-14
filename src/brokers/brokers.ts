import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IBroker } from '../entities';

export interface IBrokers extends IAbstractEntityApi<IBroker> {}
export interface IBrokersOptions extends IAbstractEntityOptions {}

export class Brokers extends AbstractEntityApi<IBroker> implements IBrokers {
  protected BASE_URL = '/brokers';

  constructor(options: IBrokersOptions) {
    super(options);
  }
}
