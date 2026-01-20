import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('findAll')
  async findAll(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const users = await this.usersService.findAll();
    channel.ack(originalMsg);
    return users;
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const user = await this.usersService.findOneById(id);

      channel.ack(originalMsg);

      return user;
    } catch (error) {
      channel.nack(originalMsg, false, false);
      throw error;
    }
  }
}
