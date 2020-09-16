import { IBaseEntity } from './base';

export interface IApiClient extends IBaseEntity {
  accountId: string;
  friendlyName?: string;
  description?: string;
  tags?: string[];
}
