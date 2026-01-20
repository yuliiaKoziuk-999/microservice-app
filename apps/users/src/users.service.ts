import { UpdateUserDto } from '@app/common/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'; // Prisma згенерувала 'User', а не 'Users'
import { PrismaService } from 'apps/prisma/prisma.service';
import { Result } from 'pg';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateDto,
    });
    return user;
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findOneById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    const { password, ...result } = user;
    return result;
  }
}
