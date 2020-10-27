import { AccessType } from './access-type';
import { IBaseEntity } from './base';

export enum MethodLanguage {
  JavaScript = 'javascript',
}

export interface IMethodImplementation {
  funcBody: string;
  script: MethodLanguage;
}

export interface IMethod extends IBaseEntity {
  readonly accountId: string;
  readonly ownerId: string;
  /** @deprecated */
  friendlyName: string;
  qualifiedName: string;
  access: AccessType;
  methodImpl: IMethodImplementation;
}
