import { useState, useMemo, useEffect, useContext, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, CheckCircle, Circle, Trash2, Calendar, ListChecks } from "lucide-react";
import MainLayout from "@/components/ui/sidebarLayout";
import { AuthContext } from "@/contexts/AuthContext";
import {
  fetchTasksUser,
  createTaskUser,
  updateTaskUser,
  deleteTaskUser,
  type TaskUserData,
} from "@/services/user/task-create-user";

// ---------- FUNÇÕES AUXILIARES ----------
const getPriorityColor = (priority: 1 | 2 | 3) => {
  switch (priority) {
    case 1: return "bg-red-100 text-red-800";
    case 2: return "bg-amber-100 text-amber-800";
    case 3: return "bg-sky-100 text-sky-800";
  }
};
const getPriorityLabel = (priority: 1 | 2 | 3) => {
  switch (priority) {
    case 1: return "Alta";
    case 2: return "Média";
    case 3: return "Baixa";
  }
};

// ---------- TOAST ----------
const Toast = ({ show, message, onClose }: { show: boolean; message: string; onClose: () => void }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom fade-in-90">
      <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

// ---------- MODAL DE CONFIRMAÇÃO ----------
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: { isOpen: boolean; onClose: () => void; onConfirm: () => void; taskTitle?: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirmar exclusão</h2>
        <p className="text-sm text-gray-600 mb-6">
          Deseja realmente excluir a tarefa <strong>{taskTitle}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- MODAL DE CRIAÇÃO ----------
const CreateTaskModal = ({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<TaskUserData, "id" | "status">) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<1 | 2 | 3>(3);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    onCreate({ title, description, priority, dueDate });
    setTitle("");
    setDescription("");
    setPriority(3);
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-96 shadow-lg space-y-4">
        <h2 className="text-lg font-bold">Nova Tarefa</h2>
        <input
          type="text"
          placeholder="Título"
          className="w-full border p-2 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          className="w-full border p-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <select
            className="border p-2 rounded-lg flex-1"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) as 1 | 2 | 3)}
          >
            <option value={1}>Alta</option>
            <option value={2}>Média</option>
            <option value={3}>Baixa</option>
          </select>
          <input type="date" className="border p-2 rounded-lg" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Criar
          </button>
        </div>
      </form>
    </div>
  );
};

// ---------- COMPONENTE PRINCIPAL ----------
export default function TaskManager() {
  const { accessToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState<TaskUserData[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskUserData | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [progressValue, setProgressValue] = useState(0);


  console.log(accessToken)
  // --- Carregar tarefas ---
  useEffect(() => {
    const loadTasks = async () => {
      if (!accessToken) return; // ✅ só retorna se não houver token
      try {
        const data = await fetchTasksUser(accessToken); // passe o token
        setTasks(data);
      } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
      }
    };
    loadTasks();
  }, [accessToken]);

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  useEffect(() => {
    const completed = tasks.filter(t => t.status === "COMPLETED").length;
    const progressCalc = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);

    // Atualiza estado local
    setProgressValue(progressCalc);

    // Atualiza localStorage
    localStorage.setItem("progress", progressCalc.toString());
  }, [tasks]);

  const toggleTask = (task: TaskUserData) => {
    if (!task.id || !accessToken) return;

    // Garante que o tipo seja compatível com TaskUserData
    const newStatus: "PENDING" | "COMPLETED" = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    updateTaskUser(
      task.id.toString(),
      {
        status: newStatus,
        completedAt: newStatus === "COMPLETED" ? new Date().toISOString() : undefined
      },
      accessToken
    )
      .then(() => {
        setTasks(prev => {
          const updatedTasks = prev.map(t =>
            t.id === task.id
              ? {
                ...t,
                status: newStatus,
                completedAt: newStatus === "COMPLETED" ? new Date().toISOString() : undefined
              }
              : t
          );

          // Atualiza localStorage
          const completedCount = updatedTasks.filter(t => t.status === "COMPLETED").length;
          localStorage.setItem("completedCount", completedCount.toString());

          return updatedTasks;
        });
      })
      .catch(err => console.error(err));
  };

  const confirmDelete = async () => {
    if (taskToDelete?.id && accessToken) {
      try {
        await deleteTaskUser(taskToDelete.id, accessToken); // 🔥 token aqui também
        setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
        setToastMessage("Tarefa excluída com sucesso!");
        setShowToast(true);
      } catch (err) {
        console.error(err);
      }
    }
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleCreateTask = async (taskData: Omit<TaskUserData, "id" | "status">) => {
    if (!accessToken) return;
    try {
      const savedTask = await createTaskUser(taskData, accessToken); // 🔥 token aqui também
      setTasks((prev) => [savedTask, ...prev]);
      setToastMessage("Tarefa criada com sucesso!");
      setShowToast(true);
    } catch (err) {
      console.error(err);
    }
  };

  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full bg-gray-50">
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Cabeçalho */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-6 h-6 text-blue-700 flex-shrink-0" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Minhas Tarefas</h1>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nova Tarefa
                  </button>
                </div>
                {/* Estatísticas */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-xs text-blue-700">Total</div>
                    <div className="text-lg font-bold text-gray-800">{tasks.length}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-xs text-green-700">Concluídas</div>
                    <div className="text-lg font-bold text-gray-800">{completedCount}</div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg text-center">
                    <div className="text-xs text-amber-700">Pendentes</div>
                    <div className="text-lg font-bold text-gray-800">{tasks.length - completedCount}</div>
                  </div>
                </div>
                {/* Progresso */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-700">Progresso</span>
                    <span className="font-bold text-blue-700">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Lista de tarefas */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <ListChecks className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Nenhuma tarefa encontrada</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div key={task.id} className={`p-3 rounded-lg border ${task.status === "COMPLETED"
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200"}`}>
                        <div className="flex items-start gap-3">
                          <button onClick={() => toggleTask(task)} className="mt-0.5 flex-shrink-0">
                            {task.status === "COMPLETED" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(task.priority as 1 | 2 | 3)}`}>
                                {getPriorityLabel(task.priority as 1 | 2 | 3)}
                              </span>
                              <span
                                className={`text-sm font-medium ${task.status === "COMPLETED"
                                  ? "line-through text-gray-500"
                                  : "text-gray-800"
                                  }`}>
                                {task.title}
                              </span>
                            </div>
                            {task.description && <p className="text-xs text-gray-600 mb-1">{task.description}</p>}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{new Date(task.dueDate!).toLocaleDateString("pt-BR")}</span>
                              {task.status === "COMPLETED" && (
                                <span className="text-green-600 flex items-center gap-1">
                                  <CheckCircle className="w-3 h-3" />
                                  Concluída
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setTaskToDelete(task);
                              setShowDeleteModal(true);
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Modais e Toast */}
        <CreateTaskModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onCreate={handleCreateTask} />
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          taskTitle={taskToDelete?.title}
        />
        <Toast show={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
      </div>
    </MainLayout>
  );
}
