import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '@app/rabbitmq/config';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig)],
  providers: [RabbitService],
})
export class RabbitModule {}
