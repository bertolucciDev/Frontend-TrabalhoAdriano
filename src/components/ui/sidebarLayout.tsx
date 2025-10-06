// src/components/layout/MainLayout.tsx
import { useState } from 'react';
import Sidebar from "@/components/ui/CustomSideBar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Conteúdo principal - ajusta margem conforme sidebar */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}
      >
        {children}
      </main>
    </div>
  );
}