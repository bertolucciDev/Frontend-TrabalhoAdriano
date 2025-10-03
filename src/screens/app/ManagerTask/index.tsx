import Sidebar from "@/components/ui/CustomSideBar";
import CustomNavBarMobile from "@/components/ui/CustomNavBarMobile";

export default function TasksManager() {
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

      </main>
    </div>
  );
}
