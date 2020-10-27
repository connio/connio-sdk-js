import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IMethod } from '../entities';

export interface IMethods extends IAbstractEntityApi<IMethod> {
  makeQualifiedName(methodName: string, profileName: string): string;
}
export interface IMethodsOptions extends IAbstractEntityOptions {}

export class Methods extends AbstractEntityApi<IMethod> implements IMethods {
  private readonly QUALIFIED_NAME_SEPARATOR = '$';

  protected BASE_URL = '/methods';

  constructor(options: IMethodsOptions) {
    super(options);
  }

  public async list({ ownerId }: { ownerId: string }): Promise<IMethod[]> {
    return await super.list({ ownerId });
  }

  public makeQualifiedName(methodName: string, profileName: string): string {
    return `${profileName}${this.QUALIFIED_NAME_SEPARATOR}${methodName}`;
  }
}
