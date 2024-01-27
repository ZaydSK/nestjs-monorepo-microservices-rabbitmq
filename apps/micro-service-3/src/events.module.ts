import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '@app/rabbitmq/config';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig)],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
