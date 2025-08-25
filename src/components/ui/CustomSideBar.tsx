import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart2, CheckSquare, Home, LogOut, Menu } from "lucide-react";
import { useState } from "react";

import { useLogout } from "@/hooks/use-logout";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const handleLogout = useLogout()



  return (
    <aside
      className={cn(
        "bg-blue-900 text-white h-screen flex flex-col transition-all duration-300 shadow-lg",
        open ? "w-80" : "w-28" // largura aberta e fechada
      )}
    >
      {/* Header com botão de expandir/recolher */}
      <div className="flex items-center justify-between p-3 border-b border-blue-700">
        <Button
          variant="ghost"
          className="text-white hover:bg-blue-800 h-16"
          onClick={() => setOpen(!open)}
        >
          <Menu size={42} />
        </Button>
        {open && <span className="font-bold">OrganizationTech</span>}
      </div>

      {/* Navegação */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-16 hover:bg-blue-800",
                open ? "justify-start" : "justify-center"
              )}
            >
              <Home className="mr-2 text-blue-300" size={40} />
              {open && "Início"}
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-16 hover:bg-blue-800",
                open ? "justify-start" : "justify-center"
              )}
            >
              <CheckSquare className="mr-2 text-blue-300" size={40} />
              {open && "Tarefas"}
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-16 hover:bg-blue-800",
                open ? "justify-start" : "justify-center"
              )}
            >
              <BarChart2 className="mr-2 text-blue-300" size={40} />
              {open && "Relatórios"}
            </Button>
          </li>
        </ul>
      </nav>

      {/* Rodapé (logout) */}
      <div className="p-3 border-t border-blue-700">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full h-16 hover:bg-red-600",
            open ? "justify-start text-red-400" : "justify-center text-red-400"
          )}
        >
          <LogOut
            className={cn(open ? "mr-2" : "", "text-red-400")}
            size={38}
          />
          {open && "Sair"}
        </Button>
      </div>
    </aside>
  );
}
