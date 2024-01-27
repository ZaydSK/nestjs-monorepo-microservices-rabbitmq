import { Controller, Get } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { MessageInterface, rabbitRPCOptions } from '@app/rabbitmq';

@Controller('events')
export class EventsController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('last10')
  async getLast10Events(): Promise<MessageInterface[]> {
    const response = await this.amqpConnection.request<{
      result: MessageInterface[];
    }>(rabbitRPCOptions);
    return response.result;
  }
}
