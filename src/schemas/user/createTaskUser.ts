import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Título deve ter ao menos 3 caracteres"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "FINISHED", "CANCELLED"]),
  priority: z.number().min(1).max(5),
  dueDate: z.string().datetime().optional(),
  completedAt: z.string().datetime(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
