import { KAFKA_SERVICE, KAFKA_TOPICS } from '@app/kafka';
import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from 'apps/prisma/prisma.service';
import { UsersService } from 'apps/users/src/users.service';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async simulateUserRegistration(email: string) {
    await lastValueFrom(
      this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
        email,
        timestamp: new Date().toISOString(),
      }),
    );

    return { message: `User registered: ${email}` };
  }

  async registerUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);

    const passwordToHash = data.password || 'temporary_password';
    const hashedPassword = await bcrypt.hash(passwordToHash, salt);

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
      },
    });

    await lastValueFrom(
      this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTERED, {
        userId: newUser.id,
        email: newUser.email,
        firsName: newUser.firstName,
        lastName: newUser.lastName,
        timestamp: new Date().toISOString(),
      }),
    );
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Шукаємо юзера з email:', email);
    const user = await this.usersService.findOne(email);
    console.log(user, ` user with email`);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);

      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async generateJwt(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
