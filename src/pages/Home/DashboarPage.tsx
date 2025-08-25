import Sidebar from "@/components/ui/CustomSideBar";
import InfoCard from "./Cards/InfoCard";
import GraphPerformancelCard from "./Cards/PerformanceGraph";
import ProgressCard from "./Cards/ProgressBarCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-200 p-6">
        <div className="bg-blue-100 w-full rounded-2xl shadow p-6 mb-6">
          <InfoCard email="luis@gmail.com" rank="Ouro" tasksCompleted={25} />
        </div>
        <div className="flex flex-col mt-20 lg:flex-row gap-6 mb-6">
          <div className="bg-blue-100 rounded-2xl shadow p-6 w-[55%]">
            <GraphPerformancelCard />
          </div>
          <div className="bg-blue-100 rounded-2xl shadow p-6 w-[45%]">
            <ProgressCard ProgressPerf={66} />
          </div>
        </div>
      </main>
    </div>
  );
}
