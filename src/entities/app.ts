import { IBaseEntity } from '../entities/base';
import { EntityStatus } from './entity-status';

export interface IApp extends IBaseEntity {
  readonly profileId: string;
  friendlyName?: string;
  description?: string;
  status: EntityStatus;
}
