import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'; // Prisma згенерувала 'User', а не 'Users'
import { PrismaService } from 'apps/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
