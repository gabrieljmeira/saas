import {
  LayoutDashboard,
  Search,
  KanbanSquare,
  MessageSquare,
  Clock,
  Target,
  DollarSign,
  Users,
} from "lucide-react";
import { FetchLeadsLogo } from "@/components/ui/fetchleads-logo";
import { MobileDrawer } from "./mobile-drawer";
import { AccountMenu } from "./account-menu";

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

interface AppTopbarProps {
  profile: {
    name: string | null;
    email: string;
    role: "USER" | "STAFF" | "OWNER";
    avatarUrl?: string | null;
  };
}

export function AppTopbar({ profile }: AppTopbarProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-16 bg-surface border-b border-border-subtle sticky top-0 z-40 shrink-0">
      {/* Left Side (Desktop: Empty or Contextual Breadcrumb / Mobile: Hamburger + Logo) */}
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-3">
          <MobileDrawer navigationGroups={navigationGroups} />
          
          <FetchLeadsLogo
            state="default"
            href="/"
            className="hover:opacity-90 max-w-[120px]"
          />
        </div>

        <div className="hidden md:flex items-center">
          {/* O Header começa depois da sidebar em Desktop, branding não se repete aqui. */}
        </div>
      </div>

      {/* Flex space */}
      <div className="flex-1" />

      {/* Right Actions: User Profile Dropdown */}
      <div className="flex items-center gap-3 ml-auto">
        <AccountMenu profile={profile} />
      </div>
    </header>
  );
}
