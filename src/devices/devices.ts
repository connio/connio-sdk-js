import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IDevice } from '../entities';

export interface IDevices extends IAbstractEntityApi<IDevice> {
  associateWithApps(deviceId: string, appId: string): Promise<IDevice>;
}
export interface IDevicesOptions extends IAbstractEntityOptions {}

export class Devices extends AbstractEntityApi<IDevice> implements IDevices {
  protected BASE_URL = '/devices';

  constructor(options: IDevicesOptions) {
    super(options);
  }

  public async associateWithApps(deviceId: string, ...appRef: string[]) {
    return await this.update(deviceId, {
      apps: appRef,
    });
  }
}
