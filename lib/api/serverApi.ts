import { api } from '@/app/api/api';
import { Task } from '@/types/task';
import { PregnancyWeek, Week } from '@/types/week';
import { cookies } from 'next/headers';
import { Diary } from '@/types/diary';
import { ApiResponse } from '@/types/axios';
import axios, { AxiosResponse } from 'axios';

export async function fetchWeekServer(
  weekNumber: number,
): Promise<PregnancyWeek> {
  const cookieStore = await cookies();

  const { data } = await api.get(`/api/weeks/${weekNumber}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchCurrentWeekJourneyServer(): Promise<Week | null> {
  try {
    const cookieStore = await cookies();
    const { data } = await api.get<Week>('/api/weeks/current', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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
  const response = await api.get<FetchTasksResponse>('/api/tasks', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};



import  api2  from "./api";
export interface SessionResponse {
  success: boolean;
}

export const checkServerSession = async (): Promise<
  AxiosResponse<SessionResponse>
> => {
  const cookieStore = await cookies();
  const res = await api2.post('/auth/session', null,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return res;
};