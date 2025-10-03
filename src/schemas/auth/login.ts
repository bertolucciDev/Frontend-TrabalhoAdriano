import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, insira seu email.")
    .email("Digite um email válido."),

  password: z
    .string()
    .min(1, "Por favor, insira sua senha.")
    .min(6, "A senha deve ter pelo menos 6 caracteres.")
    .max(100, "A senha não pode ultrapassar 100 caracteres."),
});

export type LoginSchema = z.infer<typeof loginSchema>;