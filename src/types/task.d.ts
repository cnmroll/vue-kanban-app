export interface Task {
  id: string;
  title: string;
  description: string;
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
  tasks: Array<Task>;
  userId: string;
  order: number;
}
