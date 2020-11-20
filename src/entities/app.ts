import { IBaseEntity } from '../entities/base';
import { Nullable } from '../utility-types';
import { EntityStatus } from './entity-status';

export interface IApp extends IBaseEntity {
  readonly profileId: string;
  friendlyName?: Nullable<string>;
  description?: string;
  status: EntityStatus;
}
