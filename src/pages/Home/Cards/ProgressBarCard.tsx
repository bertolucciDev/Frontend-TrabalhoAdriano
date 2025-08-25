import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

import { type ProgressCardProps } from "@/@types/Dashboard/Content/Dash.card";

export default function ProgressCard({ ProgressPerf }: ProgressCardProps) {
    return(
        <Card className="w-full h-full shadow-lg rounded-2xl">
            <CardHeader>
                <h2 className="text-2xl font-bold">Progresso Geral</h2>
            </CardHeader>
            <CardContent>
                <p className="mb-4">Você concluiu {ProgressPerf}% das suas metas</p>
                <Progress value={ProgressPerf}/>
            </CardContent>
        </Card>
    )
}