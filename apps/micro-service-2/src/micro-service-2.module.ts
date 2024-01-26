import { Module } from '@nestjs/common';
import { MicroService2Service } from './micro-service-2.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [MicroService2Service],
})
export class MicroService2Module {}
