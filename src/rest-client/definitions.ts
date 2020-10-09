export interface IRequestHeaders extends Headers {}

export interface ICustomHeaderds {
  [header: string]: string;
}

export interface IRequestConfig extends RequestInit {
  method: RequestMethod;
  headers: IRequestHeaders;
}

export enum RequestMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
}

export enum ContentType {
  Json = 'application/json',
  Text = 'text/plain',
}

export enum RequestHeader {
  ContentType = 'Content-Type',
  Authorization = 'Authorization',
}

export interface IPaginatedResponse<T> {
  itemCount: number;
  numOfPages: number;
  pageNo: number;
  skip: number;
  total: number;
  results: T[];
}

export interface IDeleteResponse {
  nrOfItems: number;
}

export interface IQueryParams {
  [key: string]: string;
}
