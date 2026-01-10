import { api } from './api';
import { User } from '@/types/user';

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
