// src/screens/app/Dashboard/index.tsx
import { useContext } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, CheckCircle, TrendingUp, User } from "lucide-react";
import MainLayout from "@/components/ui/sidebarLayout";
import { AuthContext } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const completedCount = Number(localStorage.getItem("completedCount") || 0)
  const progressBar = Number(localStorage.getItem("progress") || 0)

  const userData = {
    name: user?.name,
    email: user?.email,
    tasksCompleted: completedCount,
    progressPercent: progressBar,
  };

  const performanceData = [
    { label: "Meta Mensal", value: 75 },
    { label: "Engajamento", value: 62 },
    { label: "Consistência", value: 80 },
  ];

  return (
    <MainLayout>
      <div className="p-4 sm:p-5 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">

          {/* Card de Informações do Usuário */}
          <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden mb-6 md:mb-8">
            <CardContent className="p-4 sm:p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-800">Olá, {userData.name}!</h2>
                    <div className="mt-1.5 space-y-1 text-xs sm:text-sm text-gray-600">
                      <p><span className="font-medium">Email:</span> {userData.email}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-center border border-green-200 min-w-[120px] sm:min-w-[140px]">
                  <div className="text-[10px] sm:text-xs font-medium text-green-700">Tarefas Concluídas</div>
                  <div className="text-lg sm:text-xl font-bold text-green-800 mt-0.5">{userData.tasksCompleted}</div>
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mx-auto mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grid de Cards: 1 coluna em mobile/tablet, 2 colunas em desktop grande (xl+) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {/* Card: Desempenho */}
            <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl">
              <CardHeader className="pb-3 px-4 sm:px-5 md:px-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">Desempenho</h3>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-5 md:px-6 pb-5 space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-700">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2 sm:h-2.5" />
                  </div>
                ))}
                <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
                  Seu desempenho está acima da média este mês.
                </p>
              </CardContent>
            </Card>

            {/* Card: Progresso Geral */}
            <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl">
              <CardHeader className="pb-3 px-4 sm:px-5 md:px-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">Progresso Geral</h3>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-5 md:px-6 pb-6 flex flex-col items-center gap-4">
                <p className="text-xs sm:text-sm text-gray-600 text-center max-w-prose">
                  Você concluiu{" "}
                  <span className="font-bold text-blue-700">{userData.progressPercent}%</span>{" "}
                  das suas metas
                </p>

                <div className="w-full max-w-xs sm:max-w-sm">
                  <Progress value={userData.progressPercent} className="h-2.5" />
                </div>

                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">{userData.progressPercent}%</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">da meta mensal</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}