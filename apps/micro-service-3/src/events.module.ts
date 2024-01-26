import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { EventsService } from './events.service';

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
  controllers: [EventsController],
  providers: [EventsService],
})
export class MicroService3Module {}
