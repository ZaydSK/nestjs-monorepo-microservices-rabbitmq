import { MessageInterface } from '@app/rabbitmq';
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
      this.amqpConnection.publish<MessageInterface>(
        process.env.RABBITMQ_EXCHANGE_NAME,
        process.env.RABBITMQ_PUBLISH_ROUTING_KEY,
        {
          name: `Zayd`,
          description: `test`,
        },
      );
    }, 1000);
  }
}
