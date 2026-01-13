import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs'; // Додайте цей імпорт

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Реєструємо відповідь для топіків, якщо це необхідно (subscribeToResponseOf)
    await this.kafkaClient.connect();
  }

  getHello(): string {
    return 'Hello';
  }

  async simulateUserRegistration(email: string) {
    // Використовуємо lastValueFrom, щоб перетворити Observable у Promise
    // Тепер await працюватиме коректно
    await lastValueFrom(
      this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
        email,
        timestamp: new Date().toISOString(), // Викликаємо функцію додаючи ()
      }),
    );

    return { message: `User registered: ${email}` };
  }
}
