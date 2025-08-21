import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
type SidebarItem = {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface SidebarProps {
  items: SidebarItem[]
  footer?: React.ReactNode
  children?: React.ReactNode
}

export function Sidebar({ items, footer, children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "h-screen border-r border-gray-200 bg-white p-4 flex flex-col justify-between transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <div className="text-xl font-bold">Organizador</div>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <Separator className="mb-4" />

        <nav className="flex flex-col gap-2">
          {items.map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={item.onClick}
            >
              <div className="w-5">{item.icon}</div>
              {!collapsed && item.label}
            </Button>
          ))}
        </nav>

        {children && !collapsed && (
          <div className="mt-6">
            <Separator className="mb-4" />
            {children}
          </div>
        )}
      </div>

      {footer && !collapsed && (
        <div className="pt-4 border-t mt-4">
          {footer}
        </div>
      )}
    </aside>
  )
}
