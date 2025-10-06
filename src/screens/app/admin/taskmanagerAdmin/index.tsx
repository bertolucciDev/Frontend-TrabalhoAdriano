import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  CheckCircle,
  Circle,
  Trash2,
  Calendar,
  ListChecks,
  X,
  User,
} from "lucide-react";
import MainLayout from '@/components/ui/sidebarLayout';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  priority: number;
  dueDate: string;
  assignedTo: number | null;
}

const mockUsers: User[] = [
  { id: 1, name: "João Silva", email: "joao@email.com", avatar: "https://placehold.co/40x40/3b82f6/ffffff?text=JS" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", avatar: "https://placehold.co/40x40/ef4444/ffffff?text=MS" },
  { id: 3, name: "Pedro Oliveira", email: "pedro@email.com", avatar: "https://placehold.co/40x40/10b981/ffffff?text=PO" },
  { id: 4, name: "Ana Costa", email: "ana@email.com", avatar: "https://placehold.co/40x40/f59e0b/ffffff?text=AC" },
  { id: 5, name: "Carlos Mendes", email: "carlos@email.com", avatar: "https://placehold.co/40x40/8b5cf6/ffffff?text=CM" },
];

const getPriorityColor = (priority: number): string => {
  switch (priority) {
    case 1: return "bg-red-100 text-red-800";
    case 2: return "bg-amber-100 text-amber-800";
    case 3: return "bg-sky-100 text-sky-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityLabel = (priority: number): string => {
  switch (priority) {
    case 1: return "Alta";
    case 2: return "Média";
    case 3: return "Baixa";
    default: return "Normal";
  }
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Revisar e aprovar Proposta V.2",
    description: "Verificar todos os dados do cliente.",
    isComplete: false,
    priority: 1,
    dueDate: "2025-10-15",
    assignedTo: 1,
  },
  {
    id: 2,
    title: "Reunião de alinhamento com a equipe",
    description: "Pauta: Próximos 3 sprints.",
    isComplete: true,
    priority: 3,
    dueDate: "2025-09-30",
    assignedTo: 2,
  },
  {
    id: 3,
    title: "Desenvolver nova funcionalidade",
    description: "Implementar o módulo de relatórios.",
    isComplete: false,
    priority: 2,
    dueDate: "2025-11-05",
    assignedTo: 3,
  },
];

// Modal de Confirmação
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "bg-blue-700 hover:bg-blue-800"
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter') handleConfirm();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-in fade-in-90 slide-in-from-bottom-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`${confirmColor} text-white px-4 py-2 font-medium rounded-lg hover:opacity-90 transition-opacity`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal de Criação de Tarefa
interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id' | 'isComplete'>) => void;
  users: User[];
}

const CreateTaskModal = ({ isOpen, onClose, onCreate, users }: CreateTaskModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<number>(2);
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setPriority(2);
      setDueDate('');
      setAssignedTo(null);
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'O título da tarefa é obrigatório';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'A data de vencimento é obrigatória';
    } else {
      const selectedDate = new Date(dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'A data de vencimento não pode ser no passado';
      }
    }
    
    if (assignedTo === null) {
      newErrors.assignedTo = 'Selecione um usuário para atribuir a tarefa';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onCreate({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
        assignedTo
      });
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-150 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Criar Nova Tarefa</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título da tarefa *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite o título da tarefa"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-vertical transition-colors"
              placeholder="Adicione uma descrição (opcional)"
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Prioridade *
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer transition-colors"
            >
              <option value={1}>Alta - Urgente</option>
              <option value={2}>Média - Importante</option>
              <option value={3}>Baixa - Normal</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Data de vencimento *
            </label>
            <input
              id="dueDate"
              type="date"
              min={today}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
          </div>
          
          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
              Atribuir para *
            </label>
            <select
              id="assignedTo"
              value={assignedTo || ''}
              onChange={(e) => setAssignedTo(e.target.value ? Number(e.target.value) : null)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer transition-colors ${
                errors.assignedTo ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione um usuário</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.assignedTo && <p className="text-red-500 text-sm mt-1">{errors.assignedTo}</p>}
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Toast de sucesso
interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Toast = ({ show, message, onClose }: ToastProps) => {
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

export default function TaskManagerAdmin() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: number; title: string } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.isComplete).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    ));
  };

  const handleDeleteTask = (id: number, title: string) => {
    setTaskToDelete({ id, title });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== taskToDelete.id));
      setToastMessage('Tarefa excluída com sucesso!');
      setShowToast(true);
    }
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'isComplete'>) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      isComplete: false,
    };
    setTasks([newTask, ...tasks]);
    setToastMessage('Tarefa criada com sucesso!');
    setShowToast(true);
  };

  const completedCount = tasks.filter(t => t.isComplete).length;

  const getUserById = (userId: number | null) => {
    return mockUsers.find(user => user.id === userId);
  };

  return (
    <MainLayout>
      <div className="flex min-h-screen w-full bg-gray-50">
        {/* Conteúdo principal */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Header com Progresso */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-6 h-6 text-blue-700 flex-shrink-0" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Gerenciamento de Tarefas com Atribuição</h1>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nova Tarefa
                  </button>
                </div>

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

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-700">Progresso</span>
                    <span className="font-bold text-blue-700">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Lista de Tarefas */}
            <Card className="border-0 shadow-sm rounded-xl">
              <CardContent className="p-4">
                {tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <ListChecks className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Nenhuma tarefa encontrada</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {tasks.map((task) => {
                      const assignedUser = getUserById(task.assignedTo);
                      return (
                        <div
                          key={task.id}
                          className={`p-3 rounded-lg border ${task.isComplete
                              ? "bg-green-50 border-green-200"
                              : "bg-white border-gray-200"
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className="mt-0.5 flex-shrink-0"
                              aria-label={task.isComplete ? "Desfazer" : "Concluir"}
                            >
                              {task.isComplete ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 text-xs font-medium rounded ${getPriorityColor(task.priority)}`}>
                                  {getPriorityLabel(task.priority)}
                                </span>
                                <span className={`text-sm font-medium ${task.isComplete ? "line-through text-gray-500" : "text-gray-800"}`}>
                                  {task.title}
                                </span>
                              </div>
                              {task.description && (
                                <p className="text-xs text-gray-600 mb-1">{task.description}</p>
                              )}
                              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                                {assignedUser && (
                                  <div className="flex items-center gap-1">
                                    <User className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span className="text-gray-700">{assignedUser.name}</span>
                                  </div>
                                )}
                                {task.isComplete && (
                                  <span className="text-green-600 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Concluída
                                  </span>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteTask(task.id, task.title)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                              aria-label="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Modais */}
        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          title="Confirmar exclusão"
          message={`Você realmente deseja excluir a tarefa "${taskToDelete?.title}"? Esta ação não pode ser desfeita.`}
          confirmText="Sim, excluir!"
          confirmColor="bg-red-600 hover:bg-red-700"
        />

        <CreateTaskModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTask}
          users={mockUsers}
        />

        <Toast
          show={showToast}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      </div>
    </MainLayout>
  );
}