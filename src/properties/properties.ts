import {
  AbstractEntityApi,
  IAbstractEntityApi,
  IAbstractEntityOptions,
} from '../abstract-entity-api';
import { IProperty } from '../entities';
import { IDeleteResponse } from '../rest-client';

export interface IProperties extends IAbstractEntityApi<IProperty> {
  makeQualifiedName(propertyName: string, profileName: string): string;
}
export interface IPropertiesOptions extends IAbstractEntityOptions {}

export class Properties
  extends AbstractEntityApi<IProperty>
  implements IProperties {
  private readonly QUALIFIED_NAME_SEPARATOR = '$';

  protected BASE_URL = '/properties';

  constructor(options: IPropertiesOptions) {
    super(options);
  }

  public async list({ ownerId }: { ownerId: string }): Promise<IProperty[]> {
    return await super.list({ ownerId });
  }

  /**
   * @param id Property’s id
   */
  public async delete(id: string): Promise<IDeleteResponse> {
    return await super.delete(id);
  }

  public makeQualifiedName(propertyName: string, profileName: string): string {
    return `${profileName}${this.QUALIFIED_NAME_SEPARATOR}${propertyName}`;
  }
}
