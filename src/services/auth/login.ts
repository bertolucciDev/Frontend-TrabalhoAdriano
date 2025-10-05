import api from "../api";
import type { User } from "@/@types/user";

type LoginData = {
  email: string,
  password: string
};

interface LoginProps {
  data: LoginData
}

interface LoginReturn {
  user: User;
  accessToken: string;
  refreshToken: string
}

export const login = async ({data: loginData}: LoginProps): Promise<LoginReturn> => {
  const { data } = await api.post('/auth/login', {...loginData});

  return data
}