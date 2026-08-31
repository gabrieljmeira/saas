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
  Bell,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FetchLeadsLogo } from "@/components/ui/fetchleads-logo";
import { Input } from "@/components/ui/input";

const navigationGroups = [
  {
    label: null,
    items: [{ name: "Visão geral", href: "/dashboard", icon: LayoutDashboard }],
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
    items: [{ name: "Comunidade", href: "/community", icon: Users }],
    items: [{ name: "Comunidade", href: "/community", icon: Users },
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
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsOpen(true)}
            className="text-text-muted hover:text-text-primary"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <FetchLeadsLogo
            variant="icon"
            href="/"
            className="w-7 h-7 hover:opacity-90"
          />
        </div>

        {/* Desktop Left: Global Search */}
        <div className="hidden md:flex items-center flex-1 max-w-lg">
          <div className="relative w-full group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-text-muted group-focus-within:text-primary transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <Input
              placeholder="Pesquisar empresas, leads, e configurações..."
              className="w-full pl-10 pr-14 h-10 bg-surface-elevated/50 hover:bg-surface-elevated focus:bg-surface-elevated border-transparent hover:border-border-subtle focus:border-primary/30 rounded-lg text-sm shadow-none transition-all"
        
        {/* Left Side (Desktop: Empty or Contextual Breadcrumb / Mobile: Hamburger + Logo) */}
        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsOpen(true)}
              className="text-text-muted hover:text-text-primary"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <FetchLeadsLogo
              state="default"
              href="/"
              className="hover:opacity-90 max-w-[120px]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded-md border border-border-strong bg-surface px-2 py-0.5 font-mono text-[10px] font-semibold text-text-muted">
                ⌘K
              </kbd>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            {/* Context/Breadcrumbs could go here if needed in the future */}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-muted hover:text-text-primary relative rounded-full h-9 w-9"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-surface animate-pulse" />
          </Button>

          <div className="h-5 w-px bg-border-subtle hidden md:block" />

          <Link href="/configuracoes" className="flex items-center gap-3 group">
        {/* Right Actions: User Profile */}
        <div className="flex items-center gap-3 ml-auto">
          <Link href="/configuracoes" className="flex items-center gap-3 group px-2 py-1.5 hover:bg-surface-hover rounded-md transition-colors cursor-pointer">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-semibold text-text-primary leading-tight">Gabriel</span>
              <span className="text-[10px] text-text-muted font-medium uppercase tracking-widest">Admin</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary/20 transition-colors">
              FL
              G
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-colors hidden sm:block" />
          </Link>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="w-[280px] bg-surface h-full flex flex-col relative z-50 animate-in slide-in-from-left duration-200 shadow-xl">
            <div className="h-16 px-6 flex items-center justify-between border-b border-border-subtle shrink-0">
              <div className="flex items-center gap-3">
                <FetchLeadsLogo variant="default" href="/" />
                <FetchLeadsLogo state="default" href="/" />
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsOpen(false)}
                className="text-text-muted hover:text-text-primary"
              >
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
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm ${
                          isActive
                            ? "text-text-primary font-medium bg-primary/10"
                            : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                        }`}
                      >
                        <item.icon
                          className={`w-4 h-4 ${isActive ? "text-primary" : "text-text-muted group-hover:text-text-primary"}`}
                        />
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
                    ? "text-text-primary font-medium bg-primary/10"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                }`}
              >
                <Settings
                  className={`w-4 h-4 ${pathname.startsWith("/configuracoes") ? "text-primary" : "text-text-muted group-hover:text-text-primary"}`}
                />
                Configurações
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
