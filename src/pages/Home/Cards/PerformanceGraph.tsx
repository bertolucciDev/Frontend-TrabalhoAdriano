// src/components/dashboard/OvalCard.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { mes: "Jan", tarefas: 6 },
  { mes: "Fev", tarefas: 25 },
  { mes: "Mar", tarefas: 66 },
  { mes: "Abr", tarefas: 10 },
  { mes: "Mai", tarefas: 12 },
  { mes: "Jun", tarefas: 10 },
  { mes: "Jul", tarefas: 10 },
  { mes: "Ago", tarefas: 10 },
  { mes: "Set", tarefas: 10 },
  { mes: "Out", tarefas: 10 },
  { mes: "Nov", tarefas: 10 },
  { mes: "Dez", tarefas: 20 },
];

export default function GraphPerformancelCard() {
  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-xl font-bold">Desempenho Mensal</h2>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTarefas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="tarefas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTarefas)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
