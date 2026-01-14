import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '@app/common/dto/register.dto';
import { SignInDto } from './dto/signIn.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  register(@Body() body: RegisterDto) {
    return this.authService.registerUser(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
