import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthService } from './auth-service.service';
import { KafkaModule } from '@app/kafka';

@Module({
  imports: [KafkaModule.register('auth-service-group')],
  controllers: [AuthServiceController],
  providers: [AuthService],
})
export class AuthServiceModule {}
