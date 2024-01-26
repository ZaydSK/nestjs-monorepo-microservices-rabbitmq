import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'exchange1',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [RabbitMQService],
})
export class RabbitModule {}
