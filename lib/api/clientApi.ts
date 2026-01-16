import { Task, TaskStatus } from '@/types/task';
import { api } from './api';
import { PregnancyWeek, Week } from '@/types/week';
import { LoginData, RegistrationData, User } from '@/types/user';
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

export async function fetchWeekDashboardClient(): Promise<Week | null> {
  try {
    const { data } = await api.get<Week>('/weeks');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchCurrentWeekDashboardClient(): Promise<Week | null> {
  try {
    const { data } = await api.get<Week>('/weeks/current');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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

export const register = async (
  registrationData: RegistrationData,
): Promise<User> => {
  // вот это убрать и перенести в clientApi
  try {
    const { data } = await api.post<User>('/auth/register', registrationData);
    return data;
  } catch (error) {
    let message = 'Щось пішло не так. Спробуйте пізніше.';

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? message;
    }
    throw new Error(message);
  }
};

import type {
  OnboardingFormValues,
  OnboardingResponse,
} from '@/types/onboarding';
import { setTheme, getThemeFromGender } from '@/lib/utils/theme';
import axios from 'axios';

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
