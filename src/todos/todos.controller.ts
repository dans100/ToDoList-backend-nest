import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  EditTaskEntity,
  GetOneTaskResponse,
  GetTodosListResponse,
} from '../interfaces/task';
import { TodosService } from './todos.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { DeleteResult } from 'typeorm';
import { TodosItem } from './todos-item.entity';

@Controller('/list')
export class TodosController {
  constructor(@Inject(TodosService) private todoService: TodosService) {}

  @Get('/:name?')
  getTodosList(@Param('name') name: string): Promise<GetTodosListResponse> {
    return this.todoService.getTodosList(name ?? '');
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<GetOneTaskResponse> {
    return this.todoService.getOne(id);
  }

  @Delete('/')
  removeAllTask(): Promise<void> {
    return this.todoService.removeAllTask();
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): Promise<DeleteResult> {
    return id === 'complete'
      ? this.todoService.removeCompleteTask()
      : this.todoService.removeTask(id);
  }

  @Post('/')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<TodosItem> {
    return this.todoService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTask(@Body() description: EditTaskEntity, @Param('id') id: string) {
    return this.todoService.update(id, description);
  }
}
