import { LoginData, User } from "@/types/user";
import { api } from "./api";


export const login = async (loginData: LoginData) => {
  const { data } = await api.post<User>(`/auth/login`, loginData);
  return data;
};