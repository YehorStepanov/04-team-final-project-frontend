import { ApiResponse } from '@/types/axios';
import { Diary } from '@/types/diary';
import { Task, TaskStatus } from '@/types/task';
import { LoginData, User } from '@/types/user';
import { PregnancyWeek } from '@/types/week';
import { api } from './api';

//* Tasks =================================================
export interface FetchTasksResponse {
  data: Task[];
}

export interface UpdateTaskStateRequest {
  id: string;
  checked: boolean;
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

export const login = async (loginData: LoginData) => {
  const { data } = await api.post<ApiResponse<User>>(`/auth/login`, loginData);
  return data.data;
};

export const fetchDiaries = async () => {
  const { data } = await api.get<ApiResponse<Diary[]>>(`/diaries`);
  return data.data;
};

export const fetchDiaryById = async (id: string) => {
  const { data } = await api.get<ApiResponse<Diary>>(`/diaries/${id}`);
  return data.data;
};
