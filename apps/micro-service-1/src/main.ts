import { NestFactory } from '@nestjs/core';
import { RabbitModule } from './rabbit.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitModule,
    {
      options: { port: 3001 },
    },
  );
  await app.listen();
}
bootstrap();
