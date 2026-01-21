import { Controller } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { RegisterDto } from '@app/common/dto/register.dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth_register')
  async register(@Payload() data: RegisterDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const result = await this.authService.registerUser(data);
      channel.ack(originalMsg);
      return result;
    } catch (err) {
      channel.nack(originalMsg, false, false);
      throw err;
    }
  }

  @MessagePattern('auth_login')
  async signIn(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const result = await this.authService.generateJwt(data);
    channel.ack(context.getMessage());
    return result;
  }
}
