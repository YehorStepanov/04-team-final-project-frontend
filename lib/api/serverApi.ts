import { api } from '@/app/api/api';
import { Task } from '@/types/task';
import { PregnancyWeek } from '@/types/week';
import { cookies } from 'next/headers';
import { Diary } from '@/types/diary';
import { ApiResponse } from '@/types/axios';

export async function fetchWeekServer(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`);
  return data;
}

export const fetchServerDiaries = async () => {
  const cookieStore = await cookies();
  const { data } = await api.get<ApiResponse<Diary[]>>('/api/diaries', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.data;
};

export const fetchServerDiaryById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await api.get<ApiResponse<Diary>>(`/api/diaries/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.data;
};

//* Tasks =================================================
export interface FetchTasksResponse {
  tasks: Task[];
}

export const fetchTasks = async (): Promise<FetchTasksResponse> => {
  const cookieStore = await cookies();
  const response = await api.get<FetchTasksResponse>('/tasks', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
