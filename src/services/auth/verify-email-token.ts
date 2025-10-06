import api from "../api";

interface VerifyEmailPayload {
  token: string;
}

export async function verifyEmailToken(data: VerifyEmailPayload) {
  const response = await api.post("/auth/verify-email-token", { ...data });
  return response.data;
}
