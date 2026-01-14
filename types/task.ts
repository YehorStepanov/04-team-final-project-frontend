export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TaskStatus {
  isDone: boolean;
}

export interface TasksGroup {
  past: Task[];
  today: Task[];
  future: Task[];
}
