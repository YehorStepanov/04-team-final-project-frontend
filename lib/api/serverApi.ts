import { api } from '@/app/api/api';
import { PregnancyWeek } from '@/types/week';

export async function fetchWeekServer(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`);
  return data;
}
