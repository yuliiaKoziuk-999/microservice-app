import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth-service.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // Вказуємо, що замість "username" ми шукаємо поле "email"
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // Тепер перший аргумент буде значенням з поля "email"
    const user = await this.authService.validateUser(email, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('--');
    }
    return user;
  }
}
