import {type InfoCardProps } from "@/@types/Dashboard/Content/Dash.card";
import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";

export default function InfoCard({ email, rank, tasksCompleted}: InfoCardProps) {
    return(
        <Card className="w-full shadow-lg rounded-2xl">
            <CardHeader>
                <h2 className="text-lg font-bold">Informações do Usúario</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <p><span className="font-semibold">Email:</span> {email}</p>
                <p><span className="font-semibold">Rank:</span> {rank}</p>
                <p><span className="font-semibold">Tarefas Concluidas</span> {tasksCompleted}</p>
            </CardContent>
        </Card>
    )
}