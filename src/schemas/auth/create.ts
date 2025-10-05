import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "O nome precisa ter pelo menos 2 caracteres." })
      .max(50, { message: "O nome precisa ter no máximo 50 caracteres." }),

    email: z
      .string()
      .nonempty({ message: "O campo email é obrigatório!" })
      .email({ message: "Email inválido!" }),

    password: z
      .string()
      .nonempty({ message: "O Campo senha é obrigatório!" })
      .min(6, { message: "É necessário ter pelo menos 6 caracteres" }),

    confirmPassword: z
      .string()
      .nonempty({ message: "O Campo confirmar senha é obrigatório!" })
      .min(6, { message: "É necessário ter pelo menos 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"], 
  });

export type CreateUserData = z.infer<typeof createUserSchema>;
