import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(process.cwd(), 'apps/users/.env') });

console.log('DATABASE_URL:', process.env.DATABASE_URL);
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'users_queue',
        noAck: false,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen();
  console.log('Users microservice is listening via RabbitMQ...');
}
bootstrap();
