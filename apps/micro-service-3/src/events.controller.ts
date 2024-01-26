import { Controller, Get } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('events')
export class EventsController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('last10')
  async getLast10Events() {
    const response = await this.amqpConnection.request<{ result: string }>({
      exchange: 'exchange1',
      routingKey: 'request',
    });
    return response.result;
  }
}
