import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserResponse } from 'src/interfaces/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/')
  registerUser(
    @Body() createUser: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    return this.userService.register(createUser);
  }
}
