import { Module } from '@nestjs/common';
import { MicroService2Service } from './micro-service-2.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '@app/rabbitmq/config';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig)],
  providers: [MicroService2Service],
})
export class MicroService2Module {}
