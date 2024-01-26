import { NestFactory } from '@nestjs/core';
import { MicroService2Module } from './micro-service-2.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MicroService2Module,
    {
      options: { port: 3002 },
    },
  );
  await app.listen();
}
bootstrap();
