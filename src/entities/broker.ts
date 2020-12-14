export interface IBroker {
  readonly id: string;
  displayName: string;

  authStrategy: IBrokerAuthStrategy[];

  limitedAccess: ITopicAccess[];
  restrictedAccess: ITopicAccess[];

  maxConnections: number;
  maxIncomingQoS2Limit: number;
  maxInflightMsgLimit: number;
  maxPacketSize: number;
  maxPayload: number;
  maxPubTopicsAllowed: number;
  maxSubTopicsAllowed: number;
  maxTopicNameLength: number;

  offlineSessionTTL: string;
  queuedMessageTTL: string;

  rateLimit: number;
  status: boolean;
  supportedProtocols: number;
  tags: string[];
  topicNameCaseSensitive: boolean;
  topicQueueCapacity: number;
}

export enum TopicAccessLevel {
  Full,
  Sub,
  Pub,
}

export interface ITopicAccess {
  topic: string;
  access: TopicAccessLevel;
}

export interface IBrokerAuthStrategy {
  pattern: string;
  username?: string;
  password?: string;
}
