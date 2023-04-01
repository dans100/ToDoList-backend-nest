import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { MailService } from '../mail/mail.service';
import { registerUserInfoEmailTemplate } from '../templates/mail/register-user-info';
import { hashPwd } from '../utils/hash-pwd';

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
    const { pwd, username, email } = user;

    const existUser = await User.findOne({ email });

    if (existUser) {
      throw new HttpException(`User ${username} is already`, 409);
    }

    const newUser = await new User();

    newUser.email = email;
    newUser.pwdHash = hashPwd(pwd);
    newUser.username = username;

    await newUser.save();
    // await this.mailService.sendMail(
    //   email,
    //   'Registration Confirmation',
    //   registerUserInfoEmailTemplate(username),
    // );

    return {
      message: `User ${username} has been registered`,
    };
  }
}
