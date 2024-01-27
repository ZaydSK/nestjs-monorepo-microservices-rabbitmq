import { Module } from '@nestjs/common';
import { DBService } from './db.service';
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
  providers: [DBService],
})
export class DBModule {}
