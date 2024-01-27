import { MessageInterface, rabbitSubscribeOptions } from '@app/rabbitmq';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  @RabbitSubscribe(rabbitSubscribeOptions)
  public async handler(msg: MessageInterface) {
    console.log('ms3', msg);
  }
}
