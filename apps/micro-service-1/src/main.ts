import { NestFactory } from '@nestjs/core';
import { RabbitModule } from './rabbit.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitModule,
    {
      options: { port: process.env.MS1_PORT },
    },
  );
  await app.listen();
}
bootstrap();
