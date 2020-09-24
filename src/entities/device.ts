import { IBaseEntity } from '../entities/base';

export interface IDevice extends IBaseEntity {
  friendlyName?: string;
  description?: string;
  apps?: string[];
}
