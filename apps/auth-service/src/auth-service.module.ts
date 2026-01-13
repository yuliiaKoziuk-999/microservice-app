import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';
import { KafkaModule } from '@app/kafka';
import { DatabaseModule } from '@app/database';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    KafkaModule.register('auth-service-group'),
    DatabaseModule,
    PassportModule,
    JwtModule,
  ],
  controllers: [AuthServiceController],
  providers: [AuthService, JwtService],
})
export class AuthServiceModule {}
