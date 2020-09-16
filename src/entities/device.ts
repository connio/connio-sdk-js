import { IBaseEntity } from '../entities/base';

export interface IDevice extends IBaseEntity {
  apps?: string[];
}
