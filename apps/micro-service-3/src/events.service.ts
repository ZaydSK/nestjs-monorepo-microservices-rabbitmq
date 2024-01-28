import {
  MessageInterface,
  rabbitRPCOptions,
  rabbitSubscribeOptions,
} from '@app/rabbitmq';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  @RabbitSubscribe(rabbitSubscribeOptions)
  public async handler(msg: MessageInterface) {
    console.log('ms3', msg);
  }

  async getLast10Events(): Promise<MessageInterface[]> {
    const response = await this.amqpConnection.request<{
      result: MessageInterface[];
    }>(rabbitRPCOptions);
    return response.result;
  }
}
