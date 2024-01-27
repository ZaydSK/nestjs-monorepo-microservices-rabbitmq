import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { config } from 'dotenv';

config();
export const rabbitMQConfig: RabbitMQConfig = {
  exchanges: [
    {
      name: process.env.RABBITMQ_EXCHANGE_NAME,
      type: process.env.RABBITMQ_EXCHANGE_TYPE,
    },
  ],
  uri: process.env.RABBITMQ_CONNECTION_STRING,
  connectionInitOptions: { wait: false },
};

export const rabbitSubscribeOptions = {
  exchange: process.env.RABBITMQ_EXCHANGE_NAME,
  routingKey: process.env.RABBITMQ_PUBLISH_ROUTING_KEY,
};

export const rabbitRPCOptions = {
  exchange: process.env.RABBITMQ_EXCHANGE_NAME,
  routingKey: process.env.RABBITMQ_RPC_ROUTING_KEY,
};

export interface MessageInterface {
  name: string;
  description: string;
}
