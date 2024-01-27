import { NestFactory } from '@nestjs/core';
import { DBModule } from './db.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DBModule,
    {
      options: { port: process.env.MS2_PORT },
    },
  );
  await app.listen();
}
bootstrap();
