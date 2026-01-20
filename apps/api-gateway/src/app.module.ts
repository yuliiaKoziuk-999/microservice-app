import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersGatewayController } from './controllers/users.controller.ms';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersGatewayController],
})
export class AppModule {}
