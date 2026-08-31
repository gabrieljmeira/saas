"use client";

import { cn } from "@/lib/utils";

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
    label: "Desempenho",
    items: [
      { name: "Metas", href: "/metas", icon: Target },
      { name: "Financeiro", href: "/financeiro", icon: DollarSign },
    ],
  },
  {
    label: "Social",
    items: [{ name: "Comunidade", href: "/community", icon: Users }],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[240px] shrink-0 flex-col bg-surface border-r border-border-default h-screen sticky top-0">
      <div className="h-16 px-6 flex items-center gap-3 border-b border-border-subtle shrink-0">
        <FetchLeadsLogo
          variant="default"
          state="default"
          href="/"
          className="hover:opacity-100"
        />
      </div>

      <nav className="flex-1 px-3 py-6 flex flex-col gap-6 overflow-y-auto">
        {navigationGroups.map((group, i) => (
          <div key={i} className="flex flex-col gap-1">
            {group.label && (
              <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 px-3">
                {group.label}
              </h4>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm",
                      isActive
                        ? "text-text-primary font-medium bg-primary/10"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />
                    )}
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-text-muted group-hover:text-text-primary",
                      )}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border-subtle shrink-0">
        <Link
          href="/configuracoes"
          className={cn(
            "group relative flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm",
            pathname.startsWith("/configuracoes")
              ? "text-text-primary font-medium bg-primary/10"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
          )}
        >
          {pathname.startsWith("/configuracoes") && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full" />
          )}
          <Settings
            className={cn(
              "w-4 h-4 transition-colors",
              pathname.startsWith("/configuracoes")
                ? "text-primary"
                : "text-text-muted group-hover:text-text-primary",
            )}
          />
          <span>Configurações</span>
        </Link>
      </div>
    </aside>
  );
}
