import { AccessType } from './access-type';
import { IBaseEntity } from './base';
import { PropertyType } from './property-type';
import { PublishType } from './publish-type';

export interface IMeasurement {
  type: string;
  unit: {
    label: string;
    symbol: string;
  };
}

export interface IBoundaries {
  min?: number;
  max?: number;
}

export interface IProperty extends IBaseEntity {
  readonly accountId: string;
  readonly ownerId: string;
  friendlyName: string;
  qualifiedName: string;
  access: AccessType;
  type: PropertyType;
  publish: PublishType;
  measurement?: IMeasurement;
  boundaries?: IBoundaries;
}
