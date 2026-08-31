"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

import { FetchLeadsLogo } from "@/components/ui/fetchleads-logo";

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
    label: "Gestão",
    items: [
      { name: "Metas", href: "/metas", icon: Target },
      { name: "Financeiro", href: "/financeiro", icon: DollarSign },
      { name: "Comunidade", href: "/community", icon: Users },
      { name: "Configurações", href: "/configuracoes", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[240px] shrink-0 flex-col bg-surface border-r border-border-default h-screen sticky top-0">
      <div className="h-16 px-6 flex items-center gap-3 border-b border-border-subtle shrink-0">
        <FetchLeadsLogo
          variant="default"
          href="/"
          className="hover:opacity-100"
        />
      </div>

      <nav className="flex-1 px-3 py-6 flex flex-col gap-6 overflow-y-auto">
        {navigationGroups.map((group, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            {group.label && (
              <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-1 px-3">
                {group.label}
              </h4>
            )}
            {group.items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                    isActive
                      ? "text-primary font-medium bg-surface-hover"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 transition-colors ${isActive ? "text-primary" : "text-text-muted group-hover:text-text-primary"}`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border-subtle shrink-0">
        <Link
          href="/configuracoes"
          className={`group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
            pathname.startsWith("/configuracoes")
              ? "text-primary font-medium bg-surface-hover"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
          }`}
        >
          <Settings
            className={`w-4 h-4 transition-colors ${pathname.startsWith("/configuracoes") ? "text-primary" : "text-text-muted group-hover:text-text-primary"}`}
          />
          Configurações
        </Link>
      </div>
    </aside>
  );
}
