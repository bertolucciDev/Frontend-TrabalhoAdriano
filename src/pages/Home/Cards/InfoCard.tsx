import { type InfoCardProps } from "@/@types/Dashboard/Content/Dash.card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function InfoCard({ email, rank, tasksCompleted }: InfoCardProps) {
  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-lg font-bold">Informações do Usuário</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Informações */}
          <div className="flex flex-col gap-2">
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {email}</p>
            <p className="text-gray-700"><span className="font-semibold">Rank:</span> {rank}</p>
          </div>

          {/* Tarefas concluídas */}
          <div className="bg-blue-50 rounded-lg p-4 shadow text-center sm:text-left flex-1 sm:flex-none">
            <p className="text-gray-600 font-medium">Tarefas Concluídas</p>
            <span className="text-xl font-bold">{tasksCompleted}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
