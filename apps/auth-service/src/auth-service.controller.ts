import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from '@app/common/dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({ summary: 'Привітання' })
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiBody({ type: RegisterDto })
  register(@Body() body: { email: string }) {
    return this.authService.simulateUserRegistration(body.email);
  }
}
