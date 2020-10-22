import { DataConnectorType } from './data-connector-type';

export interface IDataConnector {
  type: DataConnectorType;
  id: string;
  dataProcessingMethod?: string;
  disabled: boolean;
}

export interface IKafkaDataConnector extends IDataConnector {
  server: string;
  port: number;
  ssl: boolean;
  sslConfig?: IDataConnectorSSLConfig;
  topic: string;
}

export interface IDataConnectorSSLConfig {
  server: {
    certificate: string;
  };
  client: {
    certificate: string;
    key: string;
    password?: string;
  };
}
