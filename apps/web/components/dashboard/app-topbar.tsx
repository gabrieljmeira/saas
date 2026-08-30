"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Search, 
  KanbanSquare, 
  MessageSquare, 
  Clock, 
  Target, 
  DollarSign, 
  Users, 
  Settings,
  Menu,
  X,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigationGroups = [
  {
    label: null,
    items: [
      { name: "Visão geral", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Prospecção",
    items: [
      { name: "Leads", href: "/leads", icon: Search },
      { name: "Pipeline", href: "/pipeline", icon: KanbanSquare },
      { name: "Mensagens", href: "/mensagens", icon: MessageSquare },
      { name: "Follow-ups", href: "/follow-ups", icon: Clock },
    ],
  },
  {
    label: "Desempenho",
    items: [
      { name: "Metas", href: "/metas", icon: Target },
      { name: "Financeiro", href: "/financeiro", icon: DollarSign },
    ],
  },
  {
    label: "Social",
    items: [
      { name: "Comunidade", href: "/community", icon: Users },
    ],
  },
];

export function AppTopbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-surface border-b border-border-subtle sticky top-0 z-40 shrink-0">
        
        {/* Mobile Left: Logo & Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => setIsOpen(true)} className="text-text-muted hover:text-text-primary">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center font-bold text-white text-xs">
            FL
          </div>
        </div>

        {/* Desktop Left: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Buscar leads, contatos, tarefas..." 
              className="w-full pl-9 h-9 bg-surface-elevated border-border-subtle focus-visible:ring-primary rounded-md text-sm"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-border-subtle bg-surface px-1.5 font-mono text-[10px] font-medium text-text-muted">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          <Button variant="ghost" size="icon-sm" className="text-text-muted hover:text-text-primary relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full border border-surface"></span>
          </Button>
          
          <div className="h-4 w-px bg-border-subtle hidden md:block"></div>
          
          <Link href="/configuracoes" className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-medium text-sm">
               US
             </div>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <aside className="w-[280px] bg-surface h-full flex flex-col relative z-50 animate-in slide-in-from-left duration-200 shadow-xl">
            <div className="h-16 px-6 flex items-center justify-between border-b border-border-subtle shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  FL
                </div>
                <span className="text-lg font-bold text-text-primary tracking-tight">FetchLeads</span>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 px-4 py-6 flex flex-col gap-6 overflow-y-auto">
              {navigationGroups.map((group, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  {group.label && (
                    <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-1 px-3">
                      {group.label}
                    </h4>
                  )}
                  {group.items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${
                          isActive 
                            ? "text-primary font-medium bg-surface-hover" 
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-text-muted group-hover:text-text-primary"}`} />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-border-subtle shrink-0">
              <Link
                href="/configuracoes"
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${
                  pathname.startsWith("/configuracoes")
                    ? "text-primary font-medium bg-surface-hover" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                }`}
              >
                <Settings className={`w-4 h-4 ${pathname.startsWith("/configuracoes") ? "text-primary" : "text-text-muted group-hover:text-text-primary"}`} />
                Configurações
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
