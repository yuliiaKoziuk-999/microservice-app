import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';
import { KafkaModule } from '@app/kafka';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'apps/users/src/users.module';
import { PrismaService } from 'apps/prisma/prisma.service';
import { LocalStrategy } from './startegies/local.strategy';

@Module({
  imports: [
    KafkaModule.register('auth-service-group'),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthServiceController],
  providers: [AuthService, PrismaService, LocalStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthServiceModule {}
