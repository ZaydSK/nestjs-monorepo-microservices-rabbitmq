import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  MessageInterface,
  rabbitRPCOptions,
  rabbitSubscribeOptions,
} from '@app/rabbitmq';
import { MessageService } from './messages/message.service';

@Injectable()
export class DBService {
  constructor(private readonly messageService: MessageService) {}
  private events: MessageInterface[] = [];
  @RabbitSubscribe({
    ...rabbitSubscribeOptions,
    queue: process.env.RABBITMQ_PUBLISH_QUEUE,
  })
  public async handler(message: MessageInterface) {
    this.messageService.create(message);
  }

  @RabbitRPC(rabbitRPCOptions)
  async rpcHandler(): Promise<{ result: MessageInterface[] }> {
    const messages = await this.messageService.findLast10();
    return { result: messages };
  }
}
