import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email користувача',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Пароль користувача (мінімум 8 символів)',
    minLength: 8,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'Іван Петренко',
    description: "Ім'я користувача",
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  name: string;
}
