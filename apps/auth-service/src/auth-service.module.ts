import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';
import { KafkaModule } from '@app/kafka';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'apps/users/src/users.module';
import { PrismaService } from 'apps/prisma/prisma.service';

@Module({
  imports: [
    KafkaModule.register('auth-service-group'),
    PassportModule,
    JwtModule,
    UsersModule,
  ],
  controllers: [AuthServiceController],
  providers: [AuthService, JwtService, PrismaService],
})
export class AuthServiceModule {}
