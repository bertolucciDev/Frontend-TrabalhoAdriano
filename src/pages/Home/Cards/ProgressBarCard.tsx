import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type ProgressCardProps } from "@/@types/Dashboard/Content/Dash.card";

export default function ProgressCard({ ProgressPerf }: ProgressCardProps) {
  return (
    <Card className="w-full h-full shadow-lg rounded-2xl">
      <CardHeader>
        <h2 className="text-xl sm:text-2xl font-bold">Progresso Geral</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-gray-700 text-sm sm:text-base">
          Você concluiu <span className="font-semibold">{ProgressPerf}%</span> das suas metas
        </p>

        {/* Barra de progresso responsiva */}
        <div className="w-full">
          <Progress
            value={ProgressPerf}
            className="h-4 sm:h-5 rounded-lg transition-all duration-300"
          />
        </div>
      </CardContent>
    </Card>
  );
}
