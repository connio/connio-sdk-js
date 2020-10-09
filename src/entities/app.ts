import { IBaseEntity } from '../entities/base';
import { EntityStatus } from './entity-status';

export interface IApp extends IBaseEntity {
  friendlyName?: string;
  description?: string;
  status: EntityStatus;
}
