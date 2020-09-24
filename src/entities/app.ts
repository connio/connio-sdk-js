import { IBaseEntity } from '../entities/base';

export interface IApp extends IBaseEntity {
  friendlyName?: string;
  description?: string;
}
