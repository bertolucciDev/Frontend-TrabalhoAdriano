import api from "../api";

export interface TaskUserData {
  id?: number;
  title: string;
  description?: string;
  priority: 1 | 2 | 3;
  dueDate: string;
  status?: "PENDING" | "COMPLETED";
}

/**
 * Busca todas as tarefas do usuário autenticado
 */
export async function fetchTasksUser(accessToken: string): Promise<TaskUserData[]> {
  try {
    const response = await api.get("/user/task", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar tarefas:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao buscar tarefas");
  }
}

/**
 * Cria uma nova tarefa para o usuário autenticado
 */
export async function createTaskUser(
  taskData: TaskUserData,
  token: string
): Promise<TaskUserData> {
  try {
    const response = await api.post("/user/task", taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro ao criar tarefa:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao criar tarefa");
  }
}

/**
 * Atualiza uma tarefa existente
 */
export async function updateTaskUser(
  taskId: string,
  updates: Partial<TaskUserData & { completedAt?: string }>,
  token: string
): Promise<{ message: string }> {
  try {
    const response = await api.patch(`/user/task/${taskId}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { message: "Task updated successfully" }
  } catch (error: any) {
    console.error("Erro ao atualizar tarefa:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao atualizar tarefa");
  }
}

/**
 * Exclui uma tarefa existente
 */
export async function deleteTaskUser(id: number, token: string): Promise<void> {
  try {
    await api.delete(`/user/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Erro ao excluir tarefa:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erro ao excluir tarefa");
  }
}
