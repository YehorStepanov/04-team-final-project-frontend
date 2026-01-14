import { PregnancyWeek } from '@/types/week';
import { api } from './api';
import { LoginData, RegistrationData, User } from '@/types/user';

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

export const register = async (registrationData: RegistrationData) => {
  const { data } = await api.post<User>('/auth/register', registrationData);
  return data;
};

import type {
  OnboardingFormValues,
  OnboardingResponse,
} from '@/types/onboarding';
import { setTheme, getThemeFromGender } from '@/lib/utils/theme';

export const uploadAvatar = async (avatarFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('avatar', avatarFile);

  const response = await api.post<{ avatar: string }>(
    '/users/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data.avatar;
};

export const updateOnboarding = async (data: {
  dueDate: string;
  gender: string | null;
  avatar?: string;
}): Promise<User> => {
  const themeMap: Record<string, string> = {
    girl: 'pink',
    boy: 'blue',
    unknown: 'neutral',
    null: 'neutral',
  };

  // Конвертуємо 'unknown' в null для API (згідно з вимогами: boy, girl, null)
  const genderForApi = data.gender === 'unknown' ? null : data.gender;

  const response = await api.put<OnboardingResponse>('/users/profile', {
    dueDate: data.dueDate,
    gender: genderForApi,
    theme: themeMap[data.gender || 'null'] || 'neutral',
    ...(data.avatar && { avatar: data.avatar }),
  });

  return response.data.user;
};

export const completeOnboarding = async (
  formData: OnboardingFormValues,
): Promise<User> => {
  let avatarUrl = '';

  if (formData.avatar) {
    avatarUrl = await uploadAvatar(formData.avatar);
  }

  const user = await updateOnboarding({
    dueDate: formData.dueDate,
    gender: formData.gender, // 'unknown' буде конвертовано в null в updateOnboarding
    avatar: avatarUrl,
  });

  setTheme(getThemeFromGender(user.gender));

  return user;
};
