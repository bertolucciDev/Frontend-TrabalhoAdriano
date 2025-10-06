export interface TaskDTO {
  title: string;
  description?: string;
  priority?: number;
  dueDate?: string; // ou Date, mas pelo código é string
  isCompleted?: boolean;
  completedAt?: string; // opcional
}