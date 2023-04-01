import { IsDate, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(3, 55)
  description: string;

  @IsDate()
  deadline: Date | null;
}
