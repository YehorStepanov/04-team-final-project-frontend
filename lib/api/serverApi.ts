import { api } from '@/app/api/api';
import { Task } from '@/types/task';
import { PregnancyWeek } from '@/types/week';

export async function fetchWeekServer(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`);
  return data;
}

//* Tasks =================================================
export interface FetchTasksResponse {
  tasks: Task[];
}

export const fetchTasks = async (): Promise<FetchTasksResponse> => {
  const response = await api.get<FetchTasksResponse>('/tasks', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
