export interface TaskEntity {
  id: string;
  description: string;
  isCompleted: number;
  deadline: Date | null;
}

export type GetTodosListResponse = TaskEntity[];

export interface EditTaskEntity {
  editTaskValue: string;
}
