import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('')
  async getUsers(): Promise<UserDto[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) userId: number): Promise<UserDto> {
    return this.usersService.getUser(userId);
  }
}
