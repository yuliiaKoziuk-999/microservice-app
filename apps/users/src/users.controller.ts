import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from '@app/common/decorators/public.decorator';
import { UpdateUserDto } from '@app/common/dto/update-user.dto';

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

  @Put('updateUser')
  updateUser(@Query('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.usersService.update(id, updateDto);
  }

  @Delete('deleteUser')
  @Public()
  deleteUser(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
