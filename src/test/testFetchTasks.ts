import { fetchTasksUser } from "@/services/user/task-create-user";

export async function testToken() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDNiNzhjOS0wODdlLTQxNWMtOWUxZC1hZmMwZmE4YzhhODEiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc1OTc3NTM0OSwiZXhwIjoxNzU5Nzc2MjQ5fQ.a22xUjASlN32ctWYKJltKd3JQskiX4WjxzFbwVIGLHg";

  try {
    const tasks = await fetchTasksUser(token);
    console.log("Tarefas recebidas:", tasks);
  } catch (err) {
    console.error("Erro ao buscar tarefas:", err);
  }
}
