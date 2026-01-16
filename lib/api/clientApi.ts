import { Task, TaskStatus } from '@/types/task';
import { api } from './api';
import { PregnancyWeek } from '@/types/week';
import { LoginData, User } from '@/types/user';

//* Tasks =================================================
export interface FetchTasksResponse {
  data: Task[];
}

export interface UpdateTaskStateRequest {
  id: string;
  checked: boolean;
}

export interface CreateTaskRequest {
  title: string;
  date: string;
}

export const fetchTasks = async (): Promise<FetchTasksResponse> => {
  const response = await api.get<FetchTasksResponse>('/tasks');
  return response.data;
};

export const updateTaskStatus = async ({
  checked,
  id,
}: UpdateTaskStateRequest) => {
  const response = await api.patch<TaskStatus>(`/tasks/${id}`, {
    isDone: checked,
  });
  return response.data;
};

export async function fetchWeekClient(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`, {
    withCredentials: true,
  });
  return data;
}

// Create POST function, a request to save a task note
export const createTask = async (
  task: CreateTaskRequest,
): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks', task);
  return data;
};

export const login = async (loginData: LoginData) => {
  const { data } = await api.post<User>(`/auth/login`, loginData);
  return data;
};
