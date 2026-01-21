import { RegisterDto } from '@app/common';
import { Public } from '@app/common/decorators/public.decorator';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { LocalAuthGuard } from 'apps/auth-service/src/guard/local-auth.guard';
import { firstValueFrom } from 'rxjs';
import { SignInDto } from 'apps/auth-service/src/dto/signIn.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthGatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  @Public()
  register(@Body() body: RegisterDto) {
    return this.authClient.send('auth_register', body);
  }

  @Public()
  @Post('login')
  signIn(@Body() body: SignInDto) {
    return firstValueFrom(this.authClient.send('auth_login', body));
  }
}
