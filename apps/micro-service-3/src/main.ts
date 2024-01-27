import { NestFactory } from '@nestjs/core';
import { MicroService3Module } from './events.module';

async function bootstrap() {
  const app = await NestFactory.create(MicroService3Module);
  await app.listen(process.env.MS3_PORT);
}
bootstrap();
