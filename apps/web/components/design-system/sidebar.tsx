import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  MessageSquare,
  Clock,
  Target,
  CircleDollarSign,
  Settings,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const items = [
    {
      name: "Visão geral",
      icon: LayoutDashboard,
      active: false,
      disabled: true,
    },
    { name: "Leads", icon: Users, active: true, disabled: false },
    { name: "Pipeline", icon: KanbanSquare, active: false, disabled: true },
    { name: "Mensagens", icon: MessageSquare, active: false, disabled: true },
    { name: "Follow-ups", icon: Clock, active: false, disabled: true },
    { name: "Metas", icon: Target, active: false, disabled: true },
    {
      name: "Financeiro",
      icon: CircleDollarSign,
      active: false,
      disabled: true,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 border-r bg-card/95 px-4 py-6 text-sm transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0 md:bg-card/50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex h-full flex-col">
          <div className="mb-8 px-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs">P</span>
              </div>
              Prospecção
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            {items.map((item) => {
              if (item.disabled) {
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-muted-foreground opacity-60 cursor-not-allowed"
                    title="Em breve"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </div>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted">
                      Em breve
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href="#"
                  className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                    item.active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto">
            <div
              className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-muted-foreground opacity-60 cursor-not-allowed"
              title="Em breve"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                Configurações
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
