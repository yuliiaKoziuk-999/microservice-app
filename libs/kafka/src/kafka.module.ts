// eslint-disable-next-line @typescript-eslint/no-unused-expressions
// KAFKA_CONSUMER_GROUP;
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_BROKER, KAFKA_CLIENT_ID } from './constants/kafka.constants';

export const KAFKA_SERVICE = 'KAFKA_SERVICE';

@Module({})
export class KafkaModule {
  static register(consumerGroup?: string): DynamicModule {
    return {
      module: KafkaModule,
      imports: [
        ClientsModule.register([
          {
            name: KAFKA_SERVICE,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: KAFKA_CLIENT_ID,
                brokers: [KAFKA_BROKER],
              },
              consumer: {
                // Використовуємо передану групу або дефолтну
                groupId: consumerGroup ?? `${KAFKA_CLIENT_ID}-group`,
              },
            },
          },
        ]),
      ],
      // Обов'язково додаємо в exports, щоб інші модулі бачили цей сервіс
      exports: [ClientsModule],
    };
  }
}
