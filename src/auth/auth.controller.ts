import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { UserObj } from '../decorators/user-obj.decorator';
import { Response } from 'express';

@Controller('/')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Get('/login')
  @UseGuards(AuthGuard('jwt'))
  async login(@Res() res: Response) {
    return res.json({ ok: true });
  }

  @Post('/login')
  async phoneRegister(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.login(req, res);
  }

  @Delete('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    return this.authService.logout(user, res);
  }
}
