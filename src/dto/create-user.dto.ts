import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 60)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 55)
  username: string;
}
