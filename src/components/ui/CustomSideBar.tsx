// src/components/ui/CustomSideBar.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckSquare, Home, LogOut, Menu, X } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const handleLogout = useLogout();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-blue-900 text-white shadow-lg transition-all duration-300 flex flex-col",
        open ? "w-64" : "w-20"
      )}
    >
      {/* Header com botão de expandir/recolher */}
      <div className="flex items-center justify-between p-3 border-b border-blue-700">
        {open && <span className="font-bold text-lg">OrganizationTech</span>}
        <Button
          variant="ghost"
          className="text-white hover:bg-blue-800 h-12 w-12"
          onClick={() => setOpen(!open)}
        >
          {!open ? <Menu size={24} /> : <X size={24} />}
        </Button>
      </div>

      {/* Navegação - flex-1 empurra o conteúdo para cima */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-12 hover:bg-blue-800",
                open ? "justify-start pl-4" : "justify-center"
              )}
              onClick={() => navigate("/dashboard")}
            >
              <span className="text-blue-300">
                <Home size={24} />
              </span>
              {open && <span className="ml-3">Início</span>}
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className={cn(
                "w-full h-12 hover:bg-blue-800",
                open ? "justify-start pl-4" : "justify-center"
              )}
              onClick={() => navigate("/taskmanager")}
            >
              <span className="text-blue-300">
                <CheckSquare size={24} />
              </span>
              {open && <span className="ml-3">Tarefas</span>}
            </Button>
          </li>
          {user?.role === "ADMIN" && (
            < li >
            <Button
              variant="ghost"
              className={cn(
                "w-full h-12 hover:bg-blue-800",
                open ? "justify-start pl-4" : "justify-center"
              )}
              onClick={() => navigate("/taskmanageradmin")}
            >
              <span className="text-blue-300">
                <CheckSquare size={24} />
              </span>
              {open && <span className="ml-3">Tarefas(Admin)</span>}
            </Button>
          </li>
          )}
      </ul>
    </nav>

      {/* Rodapé com botão de sair - agora ficará no final absoluto */ }
  <div className="mt-auto p-3 border-t border-blue-700">
    <Button
      variant="ghost"
      onClick={handleLogout}
      className={cn(
        "w-full h-12 hover:bg-red-600",
        open
          ? "justify-start text-red-400 pl-4"
          : "justify-center text-red-400"
      )}
    >
      <LogOut
        className="text-red-400"
        size={24}
      />
      {open && <span className="ml-3">Sair</span>}
    </Button>
  </div>
    </aside >
  );
}