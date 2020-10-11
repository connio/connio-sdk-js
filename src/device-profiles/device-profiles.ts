import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IDeviceProfile } from '../entities';

export interface IDeviceProfiles extends IAbstractEntityApi<IDeviceProfile> {}
export interface IDeviceProfilesOptions extends IAbstractEntityOptions {}

export class DeviceProfiles
  extends AbstractEntityApi<IDeviceProfile>
  implements IDeviceProfiles {
  protected BASE_URL = '/deviceprofiles';

  constructor(options: IDeviceProfilesOptions) {
    super(options);
  }
}
