import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'routing-key',
  })
  public async handler(msg: any) {
    console.log('ms3', msg);
  }
}
