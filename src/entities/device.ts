import { IBaseEntity } from '../entities/base';
import { EntityStatus } from './entity-status';

export interface IDevice extends IBaseEntity {
  readonly profileId: string;
  friendlyName?: string;
  description?: string;
  apps?: string[];
  status: EntityStatus;
  tags?: string[];
}
