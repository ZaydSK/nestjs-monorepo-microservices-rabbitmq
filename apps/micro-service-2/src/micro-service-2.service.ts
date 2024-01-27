import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  MessageInterface,
  rabbitRPCOptions,
  rabbitSubscribeOptions,
} from '@app/rabbitmq';

@Injectable()
export class MicroService2Service {
  private events: MessageInterface[] = [];
  @RabbitSubscribe({
    ...rabbitSubscribeOptions,
    queue: process.env.RABBITMQ_PUBLISH_QUEUE,
  })
  public async handler(msg: MessageInterface) {
    this.events.push(msg);
  }

  @RabbitRPC(rabbitRPCOptions)
  async rpcHandler(): Promise<{ result: MessageInterface[] }> {
    return { result: this.events.slice(-10) };
  }
}
