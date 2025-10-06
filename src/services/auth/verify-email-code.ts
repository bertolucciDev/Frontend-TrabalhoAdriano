import api from "../api";

interface VerifyEmailPayload {
  code: string;
}

export async function verifyEmailCode(data: VerifyEmailPayload) {
  const response = await api.post("/auth/verify-email-code", { ...data });
  return response.data;
}
