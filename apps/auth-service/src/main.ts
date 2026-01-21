import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { AuthServiceModule } from './auth-service.module';

dotenv.config({ path: join(process.cwd(), 'apps/auth-service/.env') });

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'auth_queue',
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
}
bootstrap().catch((err) => console.error(err));
