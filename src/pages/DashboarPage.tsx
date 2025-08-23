import { Sidebar } from "@/components/SideBar";
import { Home, UserCog } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar
        items={[{ icon: <Home size={15} />, label: "Início" }]}
        footer={
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black">
            <UserCog size={16} />, Configurações do Usuario
          </button>
        }
      ></Sidebar>
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </main>
    </div>
  );
}
