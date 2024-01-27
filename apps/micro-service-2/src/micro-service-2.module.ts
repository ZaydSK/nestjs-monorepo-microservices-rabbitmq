import { Module } from '@nestjs/common';
import { MicroService2Service } from './micro-service-2.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '@app/rabbitmq/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModule } from './messages/message.module';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
    MessageModule,
  ],
  providers: [MicroService2Service],
})
export class MicroService2Module {}
