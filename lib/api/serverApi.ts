import { PregnancyWeek } from '@/types/week';
import { api } from './api';

export async function fetchDataByWeekNumber(
  weekNumber: number,
): Promise<PregnancyWeek> {
  // noteId: string,
  // cookie: string,
  const { data } = await api.get(`/weeks`, {
    params: { week: weekNumber },
    withCredentials: true,
  });

  return data;
}
