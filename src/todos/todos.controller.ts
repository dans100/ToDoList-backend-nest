import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EditTaskEntity, GetTodosListResponse } from '../interfaces/task';
import { TodosService } from './todos.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';

@Controller('/list')
export class TodosController {
  constructor(@Inject(TodosService) private todoService: TodosService) {}

  @Get('/:name?')
  @UseGuards(AuthGuard('jwt'))
  getTodosList(
    @Param('name') name: string,
    @UserObj() user: User,
  ): Promise<GetTodosListResponse> {
    return this.todoService.getTodosList(name ?? '', user);
  }

  @Delete('/')
  @UseGuards(AuthGuard('jwt'))
  removeAllTask(@UserObj() user: User) {
    return this.todoService.removeAllTask(user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  removeTask(
    @Param('id') id: string,
    @UserObj() user: User,
  ): Promise<DeleteResult> {
    return id === 'complete'
      ? this.todoService.removeCompleteTask(user)
      : this.todoService.removeTask(id, user);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  createTask(@Body() createTaskDto: CreateTaskDto, @UserObj() user: User) {
    console.log(user);
    return this.todoService.createTask(createTaskDto, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  updateTask(@Body() description: EditTaskEntity, @Param('id') id: string) {
    return this.todoService.update(id, description);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard('jwt'))
  updateStatus(
    @Body() { isCompleted }: { isCompleted: number },
    @Param('id') id: string,
  ) {
    return this.todoService.updateStatus(id, isCompleted);
  }
}
