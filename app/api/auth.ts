import { QueryClient } from "@tanstack/react-query";
import { api } from "./api"
import { TokenManager } from "./tokenmanager";

export interface User {
  id: number;
  email: string;
  name: string;
  phone_number: string | null;
}

interface LoginProps {
  email: string;
  password: string;
}

export const login = async (data: LoginProps) => {
  const res = await api.post<{token: string}>('/login', data);
  return res.data.token;
}

interface SignupProps {
  email: string;
  password: string;
  name: string;
  phone_number?: string;
}

export const signup = async (data: SignupProps) => {
  const res = await api.post<{token: string}>('/register', {
    ...data,
    phone_number: data.phone_number || null,
  });
  return res.data.token;
}

export const getUser = async () => {
  TokenManager.init();
  const token = TokenManager.getToken();
  if (!token) {
    return null;
  }

  const res = await api.post<User>('/auth', { token });
  return res.data;
}

export const logout = (qc: QueryClient) => {
    qc.invalidateQueries({ queryKey: ["user"] });
    qc.clear();
    TokenManager.clearToken();
}