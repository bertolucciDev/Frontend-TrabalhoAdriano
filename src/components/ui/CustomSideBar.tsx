import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart2, CheckSquare, Home, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLogout } from "@/hooks/useLogout";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const handleLogout = useLogout();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen bg-blue-900 text-white shadow-lg transition-all duration-300",
        open ? "w-64" : "w-20"
      )}
    >
      {/* Header com botão de expandir/recolher */}
      <div className="flex items-center justify-between p-3 border-b border-blue-700">
        <Button
          variant="ghost"
          className="text-white hover:bg-blue-800 h-12 w-12"
          onClick={() => setOpen(!open)}
        >
          {!open ? <Menu size={24} /> : <X size={24} />}
        </Button>
        {open && <span className="font-bold text-lg">OrganizationTech</span>}
      </div>

      {/* Navegação */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {[
            { icon: <Home size={24} />, label: "Início" },
            { icon: <CheckSquare size={24} />, label: "Tarefas" },
            { icon: <BarChart2 size={24} />, label: "Relatórios" },
          ].map(({ icon, label }, idx) => (
            <li key={idx}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-12 hover:bg-blue-800",
                  open ? "justify-start pl-4" : "justify-center"
                )}
              >
                <span className="text-blue-300 mr-2">{icon}</span>
                {open && label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Rodapé */}
      <div className="p-3 border-t border-blue-700">
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
            className={cn(open ? "mr-2" : "", "text-red-400")}
            size={24}
          />
          {open && "Sair"}
        </Button>
      </div>
    </aside>
  );
}
