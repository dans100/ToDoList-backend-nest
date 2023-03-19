import { Injectable } from '@nestjs/common';
import { TodosItem } from './todos-item.entity';
import { DeleteResult, Like } from 'typeorm';
import {
  EditTaskEntity,
  GetOneTaskResponse,
  GetTodosListResponse,
} from '../interfaces/task';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TodosService {
  async createTask(task: CreateTaskDto): Promise<TodosItem> {
    const { description, deadline } = task;

    const newTask = new TodosItem();
    newTask.description = description;
    newTask.deadline = deadline;

    await newTask.save();
    return newTask;
  }

  async getTodosList(name: string): Promise<GetTodosListResponse> {
    return await TodosItem.find({
      where: {
        description: Like(`%${name}%`),
      },
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
