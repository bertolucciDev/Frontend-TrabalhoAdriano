// src/components/ui/CustomNavBarMobile.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, CheckSquare, BarChart2, LogOut, Menu } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";

export default function CustomNavBarMobile() {
  const [open, setOpen] = useState(false); // menu colapsável
  const handleLogout = useLogout();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-blue-900 text-white shadow-lg z-50">
      {/* Botão do menu */}
      <div className="flex justify-between items-center p-2 border-t border-blue-700">
        <Button
          variant="ghost"
          onClick={() => setOpen(!open)}
          className="text-white"
        >
          <Menu size={28} />
        </Button>
        <span className="font-bold text-lg">OrganizationTech</span>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-red-400"
        >
          <LogOut size={28} />
        </Button>
      </div>

      {/* Menu expandido */}
      {open && (
        <nav className="bg-blue-800 p-4 flex flex-col space-y-2">
          <Button variant="ghost" className="flex items-center justify-start w-full text-white">
            <Home className="mr-2" size={20} /> Início
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full text-white">
            <CheckSquare className="mr-2" size={20} /> Tarefas
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full text-white">
            <BarChart2 className="mr-2" size={20} /> Relatórios
          </Button>
        </nav>
      )}
    </div>
  );
}
