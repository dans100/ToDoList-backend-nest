import { Inject, Injectable } from '@nestjs/common';
import { TodosItem } from './todos-item.entity';
import { DeleteResult, Like } from 'typeorm';
import {
  EditTaskEntity,
  GetTodosListResponse,
  TaskEntity,
} from '../interfaces/task';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class TodosService {
  filter(task: TodosItem): TaskEntity {
    const { id, description, isCompleted, deadline } = task;
    return { id, description, isCompleted, deadline };
  }

  constructor(@Inject(UserService) private userService: UserService) {}

  async createTask(task: CreateTaskDto, user: User): Promise<TaskEntity> {
    const { description, deadline } = task;

    const newTask = new TodosItem();
    newTask.description = description;
    newTask.deadline = deadline;
    newTask.user = user;
    await newTask.save();
    return this.filter(newTask);
  }

  async getTodosList(name: string, user: User): Promise<GetTodosListResponse> {
    return (
      await TodosItem.find({
        where: {
          description: Like(`%${name}%`),
          user,
        },
      })
    ).map(this.filter);
  }

  async removeTask(id: string, user): Promise<DeleteResult> {
    return await TodosItem.delete({
      id,
      user,
    });
  }

  async removeAllTask(user: User): Promise<DeleteResult> {
    return await TodosItem.delete({
      user,
    });
  }

  async removeCompleteTask(user): Promise<DeleteResult> {
    return await TodosItem.delete({
      isCompleted: 1,
      user,
    });
  }

  async update(id: string, description: EditTaskEntity): Promise<TaskEntity> {
    const task = await TodosItem.findOne(id);
    task.description = description.editTaskValue;
    await task.save();
    return this.filter(task);
  }

  async updateStatus(id: string, isCompleted: number): Promise<TaskEntity> {
    const task = await TodosItem.findOne(id);
    task.isCompleted = isCompleted;
    await task.save();
    return this.filter(task);
  }
}
