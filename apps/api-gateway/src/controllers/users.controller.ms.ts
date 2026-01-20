import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersGatewayController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  @Get('findAll')
  findAll() {
    return this.usersClient.send('findAllUsers', {});
  }

  @Get('findUser')
  findOne(@Query('id') id: string) {
    return this.usersClient.send('findOneUser', id);
  }
}
