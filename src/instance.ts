import { ApiClients, IApiClients } from './api-clients';
import { AppProfiles, IAppProfiles } from './app-profiles';
import { Apps, IApps } from './apps';
import { Auth, IAuth } from './auth';
import { Brokers, IBrokers } from './brokers';
import { Clients, IClients } from './clients';
import { CredentialsStore, ICredentialsStore } from './credentials';
import { DataConnectors, IDataConnectors } from './data-connectors';
import { DeviceProfiles, IDeviceProfiles } from './device-profiles';
import { Devices, IDevices } from './devices';
import { IEnvConfig } from './entities';
import { IMethods, Methods } from './methods';
import { IProperties, Properties } from './properties';
import { IRestClient, RestClient } from './rest-client';

export interface IPlatform {
  env: IEnvConfig;
  restClient: IRestClient;
  auth: IAuth;
  credentialsStore: ICredentialsStore;
  properties: IProperties;
  devices: IDevices;
  deviceProfiles: IDeviceProfiles;
  apps: IApps;
  appProfiles: IAppProfiles;
  apiClients: IApiClients;
  dataConnectors: IDataConnectors;
  methods: IMethods;
  brokers: IBrokers;
  clients: IClients;
}

let platform: IPlatform;

export async function bootstrap(env: IEnvConfig): Promise<IPlatform> {
  console.log('@platform :: bootstrap :: env', env);

  let credentialsStore = new CredentialsStore();
  let restClient = new RestClient({
    baseUrl: env.API_URL,
    credentialsStore,
  });

  platform = {
    env,
    restClient,
    auth: new Auth({
      client: new RestClient({
        baseUrl: env.API_AUTH_URL,
        credentialsStore: new CredentialsStore(),
      }),
    }),
    credentialsStore,
    properties: new Properties({
      client: restClient,
    }),
    devices: new Devices({
      client: restClient,
    }),
    deviceProfiles: new DeviceProfiles({
      client: restClient,
    }),
    apps: new Apps({
      client: restClient,
    }),
    appProfiles: new AppProfiles({
      client: restClient,
    }),
    apiClients: new ApiClients({
      client: restClient,
    }),
    dataConnectors: new DataConnectors({
      client: restClient,
    }),
    methods: new Methods({
      client: restClient,
    }),
    brokers: new Brokers({
      client: restClient,
    }),
    clients: new Clients({
      client: restClient,
    }),
  };

  return platform;
}

export default function Platform(): IPlatform {
  console.log('@platform :: Platform');

  if (!platform) {
    console.log('@platform :: Not initialized');

    throw new Error('Platform not initialized');
  }

  return platform;
}
