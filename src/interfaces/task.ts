export interface TaskEntity {
  id: string;
  description: string;
  user_id: string;
  isCompleted: number;
  deadline: Date | null;
}

export type GetTodosListResponse = TaskEntity[];
export type GetOneTaskResponse = TaskEntity;

export interface EditTaskEntity {
  editTaskValue: string;
}
