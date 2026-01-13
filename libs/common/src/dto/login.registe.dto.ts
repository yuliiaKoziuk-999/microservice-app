import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  password: string;
}
