import { Task, TaskStatus } from '@/types/task';
import { api } from './api';
import { User, LoginData } from '@/types/user';
import { PregnancyWeek } from '@/types/week';

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<User>>('/users/current');
  return response.data.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.patch<ApiResponse<User>>(
    '/users/update',
    userData,
  );
  return response.data.data;
};

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await api.patch<ApiResponse<User>>(
    '/users/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data.data;
};

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
