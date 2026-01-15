import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '@app/common/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('findUser')
  findOne(@Query('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Delete('deleteUser')
  @Public()
  deleteUser(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
