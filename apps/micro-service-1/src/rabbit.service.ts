import { MessageInterface } from '@app/rabbitmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RabbitService implements OnModuleInit {
  onModuleInit() {
    this.publish();
  }
  constructor(private readonly amqpConnection: AmqpConnection) {}

  publish() {
    const intervalId = setInterval(() => {
      if (this.amqpConnection.connected) {
        this.amqpConnection.publish<MessageInterface>(
          process.env.RABBITMQ_EXCHANGE_NAME,
          process.env.RABBITMQ_PUBLISH_ROUTING_KEY,
          {
            name: `name`,
            description: `description`,
          },
        );
      } else {
        console.error(
          'Please make sure that rabbitmq broker is running and try again',
        );
        clearInterval(intervalId);
      }
    }, 1000);
  }
}
