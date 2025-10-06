import api from "@/services/api";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface RegisterProps {
  data: RegisterData;
}

interface RegisterReturn {
  message: string;
}

export const register = async ({ data: registerData }: RegisterProps): Promise<RegisterReturn> => {
  const { data } = await api.post("/auth/register", { ...registerData });
  return data;
};
