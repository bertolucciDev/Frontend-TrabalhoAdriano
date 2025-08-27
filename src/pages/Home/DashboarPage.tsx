import Sidebar from "@/components/ui/CustomSideBar";
import CustomNavBarMobile from "@/components/ui/CustomNavBarMobile";
import InfoCard from "./Cards/InfoCard";
import GraphPerformancelCard from "./Cards/PerformanceGraph";
import ProgressCard from "./Cards/ProgressBarCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar desktop */}
      <Sidebar />

      {/* Navbar mobile */}
      <CustomNavBarMobile />

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-200 p-4 sm:p-6 mb-10 lg:mb-0 transition-all duration-300">
        {/* InfoCard */}
        <div className="bg-blue-100 w-full rounded-2xl shadow p-6 mb-6">
          <InfoCard email="luis@gmail.com" rank="Ouro" tasksCompleted={25} />
        </div>

        {/* Grid responsivo para gráficos e progresso */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="bg-blue-100 rounded-2xl shadow p-6 flex-1">
            <GraphPerformancelCard />
          </div>
          <div className="bg-blue-100 rounded-2xl shadow p-6 flex-1">
            <ProgressCard ProgressPerf={66} />
          </div>
        </div>
      </main>
    </div>
  );
}
