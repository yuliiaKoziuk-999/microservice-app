import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from '@app/common/dto/register.dto';
import { SignInDto } from './dto/signIn.dto';
import { Public } from '@app/common/decorators/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Request } from '@nestjs/common';

@ApiTags('auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiBody({ type: RegisterDto })
  register(@Body() body: RegisterDto) {
    return this.authService.registerUser(body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: SignInDto })
  async signIn(@Request() req) {
    return this.authService.generateJwt(req.user);
  }

  @Get('test')
  @Public()
  test() {
    return `test`;
  }
}
