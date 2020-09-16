import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IAppProfile } from '../entities';

export interface IAppProfiles extends IAbstractEntityApi<IAppProfile> {}
export interface IAppProfilesOptions extends IAbstractEntityOptions {}

export class AppProfiles
  extends AbstractEntityApi<IAppProfile>
  implements IAppProfiles {
  protected BASE_URL = '/appprofiles';

  constructor(options: IAppProfilesOptions) {
    super(options);
  }
}
