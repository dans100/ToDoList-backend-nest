import { HttpException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcrypt';
import { RegisterUserResponse } from '../interfaces/user';

@Injectable()
export class UserService {
  async getUser(email: string): Promise<User> {
    return await User.findOne(email);
  }

  async register(user: CreateUserDto): Promise<RegisterUserResponse> {
    const { password, username, email } = user;

    const existUser = await User.findOne({ email });

    if (existUser) {
      throw new HttpException(`User ${username} is already`, 409);
    }

    const newUser = await new User();

    const hashedPassword = await hash(password, 10);
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.username = username;

    await newUser.save();

    return {
      message: `User ${username} has been registered`,
    };
  }
}
