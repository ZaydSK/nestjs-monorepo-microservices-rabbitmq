import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroService2Service {
  private events = [];
  @RabbitSubscribe({
    exchange: 'exchange1',
    routingKey: 'routing-key',
    queue: 'rpc-queue',
  })
  public async handler(msg: any) {
    this.events.push(msg);
  }

  @RabbitRPC({
    exchange: 'exchange1',
    routingKey: 'request',
  })
  async rpcHandler(msg: any) {
    return { result: this.events.slice(-10) };
  }
}
