import { PregnancyWeek } from '@/types/week';
import { api } from './api';
import { LoginData, User } from '@/types/user';

export async function fetchWeekClient(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const { data } = await api.get(`/weeks/${weekNumber}`, {
    withCredentials: true,
  });
  return data;
}

export const login = async (loginData: LoginData) => {
  const { data } = await api.post<User>(`/auth/login`, loginData);
  return data;
};
