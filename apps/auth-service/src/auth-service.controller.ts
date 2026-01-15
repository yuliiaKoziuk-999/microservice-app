import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from '@app/common/dto/register.dto';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './guard/auth.guard';
import { Public } from '@app/common/decorators/public.decorator';

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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('test')
  @Public()
  test() {
    return `test`;
  }
}
