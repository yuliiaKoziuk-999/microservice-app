import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInDto {
  @ApiProperty({
    example: 'user1@example.com',
    description: 'Електронна пошта користувача',
  })
  @IsEmail({}, { message: 'Некоректний формат email' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    typeof value === 'string' ? value.toLowerCase().trim() : value,
  )
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль (від 6 до 40 символів)',
  })
  @IsString()
  @Length(6, 40, { message: 'Пароль має бути від 6 до 40 символів' })
  password: string;
}
