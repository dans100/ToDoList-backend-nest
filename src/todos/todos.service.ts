import { Inject, Injectable } from '@nestjs/common';
import { TodosItem } from './todos-item.entity';
import { DeleteResult, Like } from 'typeorm';
import {
  EditTaskEntity,
  GetOneTaskResponse,
  GetTodosListResponse,
} from '../interfaces/task';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TodosService {
  constructor(@Inject(UserService) private userService: UserService) {}

  async createTask(task: CreateTaskDto): Promise<TodosItem> {
    const { description, deadline, userId } = task;
    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!description || description.length > 55 || description.length < 3) {
      throw new Error(
        'Description cannot be shorter than 3 characters and later than 55 characters',
      );
    }
    const newTask = new TodosItem();
    newTask.description = description;
    newTask.deadline = deadline;
    newTask.user = user;
    await newTask.save();
    return newTask;
  }

  async getTodosList(name: string): Promise<GetTodosListResponse> {
    return await TodosItem.find({
      where: {
        description: Like(`%${name}%`),
      },
      relations: ['user'],
    });
  }

  async getOne(id: string): Promise<GetOneTaskResponse> {
    return await TodosItem.findOneOrFail(id);
  }

  async removeTask(id: string): Promise<DeleteResult> {
    return await TodosItem.delete(id);
  }

  async removeAllTask(): Promise<void> {
    return await TodosItem.clear();
  }

  async removeCompleteTask(): Promise<DeleteResult> {
    return await TodosItem.delete({
      isCompleted: 1,
    });
  }

  async update(id: string, description: EditTaskEntity): Promise<void> {
    const task = await TodosItem.findOne(id);
    task.description = description.editTaskValue;
    await task.save();
  }
}
