import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  onModuleInit() {
    this.publish();
  }
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish() {
    setInterval(() => {
      this.amqpConnection.publish('exchange1', 'routing-key', {
        name: `Zayd`,
        description: `test`,
      });
    }, 3000);
  }
}
