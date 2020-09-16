import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IApp } from '../entities';

export interface IApps extends IAbstractEntityApi<IApp> {}
export interface IAppsOptions extends IAbstractEntityOptions {}

export class Apps extends AbstractEntityApi<IApp> implements IApps {
  protected BASE_URL = '/apps';

  constructor(options: IAppsOptions) {
    super(options);
  }
}
