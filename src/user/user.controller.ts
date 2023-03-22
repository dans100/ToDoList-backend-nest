import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/register')
  registerUser(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
    return '';
  }
}
