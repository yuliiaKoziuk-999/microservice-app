import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  getHello(): string {
    return 'Hello';
  }

  async simulateUserRegistration(email: string) {
    await lastValueFrom(
      this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
        email,
        timestamp: new Date().toISOString(),
      }),
    );

    return { message: `User registered: ${email}` };
  }
}
