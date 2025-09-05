import Sidebar from "@/components/ui/CustomSideBar";
import CustomNavBarMobile from "@/components/ui/CustomNavBarMobile";
import InfoCard from "./Cards/Info";
import GraphPerformancelCard from "./Cards/Performance";
import ProgressCard from "./Cards/Progress";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Navbar mobile */}
      <div className="block lg:hidden w-full">
        <CustomNavBarMobile />
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-200 p-4 sm:p-6 md:p-8 transition-all duration-300">
        {/* InfoCard */}
        <div className="bg-blue-900 w-full rounded-2xl shadow p-6 mb-8">
          <InfoCard email="luis@gmail.com" rank="Ouro" tasksCompleted={25} />
        </div>

        {/* Grid responsivo para gráficos e progresso */}
        <div className="flex flex-col lg:flex-row mb-14 gap-6">
          {/* GraphPerformancelCard */}
          <div className="bg-blue-900 rounded-2xl shadow p-6 flex-1">
            <GraphPerformancelCard />
          </div>

          {/* ProgressCard */}
          <div className="bg-blue-900 rounded-2xl shadow p-6 flex-1">
            <ProgressCard ProgressPerf={66} />
          </div>
        </div>
      </main>
    </div>
  );
}
