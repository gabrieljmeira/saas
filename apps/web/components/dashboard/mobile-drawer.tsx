"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FetchLeadsLogo } from "@/components/ui/fetchleads-logo";

interface MobileDrawerProps {
  navigationGroups: any[];
}

export function MobileDrawer({ navigationGroups }: MobileDrawerProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setIsOpen(true)}
        className="text-text-muted hover:text-text-primary md:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="w-[280px] bg-surface h-full flex flex-col relative z-50 animate-in slide-in-from-left duration-200 shadow-xl">
            <div className="h-16 px-6 flex items-center justify-between border-b border-border-subtle shrink-0">
              <div className="flex items-center gap-3">
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
                  {group.items.map((item: any) => {
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
