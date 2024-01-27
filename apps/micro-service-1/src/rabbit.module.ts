import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbit.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQConfig } from '@app/rabbitmq/config';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rabbitMQConfig)],
  providers: [RabbitMQService],
})
export class RabbitModule {}
