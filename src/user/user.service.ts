import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { hash } from 'bcrypt';
import { RegisterUserResponse } from '../interfaces/user';
import { MailService } from '../mail/mail.service';
import { registerUserInfoEmailTemplate } from '../templates/mail/register-user-info';

@Injectable()
export class UserService {
  constructor(@Inject(MailService) private mailService: MailService) {}

  async getUser(email: string): Promise<User> {
    const user = await User.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
    await this.mailService.sendMail(
      email,
      'Registration Confirmation',
      registerUserInfoEmailTemplate(username),
    );

    return {
      message: `User ${username} has been registered`,
    };
  }
}
