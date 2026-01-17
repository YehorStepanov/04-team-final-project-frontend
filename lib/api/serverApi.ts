import { api } from '@/app/api/api';
import { Task } from '@/types/task';
import { PregnancyWeek, Week } from '@/types/week';

export async function fetchWeekServer(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`);
  return data;
}

export async function fetchWeekDashboardServer(): Promise<Week | null> {
  try {
    const { data } = await api.get<Week>('/weeks');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchCurrentWeekDashboardServer(): Promise<Week | null> {
  try {
    const { data } = await api.get<Week>('/weeks/current');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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
