import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthServiceModule } from 'apps/auth-service/src/auth-service.module';
import { PrismaService } from 'apps/prisma/prisma.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from 'apps/auth-service/src/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'apps/users/src/users.module';

@Module({
  imports: [
    AuthServiceModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
