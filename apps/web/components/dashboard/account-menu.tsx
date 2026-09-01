"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Settings,
  User as UserIcon,
  BadgeCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Profile {
  name: string | null;
  email: string;
  role: "USER" | "STAFF" | "OWNER";
  avatarUrl?: string | null;
}

interface AccountMenuProps {
  profile: Profile;
}

export function AccountMenu({ profile }: AccountMenuProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getInitials = (name: string | null, email: string) => {
    const str = name || email.split("@")[0] || "U";
    return str.substring(0, 1).toUpperCase();
  };

  const showBadge = profile.role === "STAFF" || profile.role === "OWNER";
  const badgeText =
    profile.role === "STAFF" ? "Equipe FetchLeads" : "Conta oficial";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 group px-2 py-1.5 hover:bg-surface-hover rounded-md transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50 cursor-pointer">
        <div className="flex-col items-end hidden sm:flex">
          <span className="text-sm font-medium text-text-primary leading-tight group-hover:text-primary transition-colors">
            {profile.name || profile.email.split("@")[0]}
          </span>
          {showBadge && (
            <span className="text-[11px] text-primary font-medium flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" />
              {badgeText}
            </span>
          )}
        </div>

        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.name || "Avatar"}
            className="w-9 h-9 rounded-full object-cover border border-border-subtle group-hover:border-primary/30 transition-colors"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary/20 transition-colors">
            {getInitials(profile.name, profile.email)}
          </div>
        )}

        <ChevronDown className="w-3.5 h-3.5 text-text-muted group-hover:text-text-primary transition-transform duration-200 group-data-[state=open]:rotate-180 hidden sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-text-primary leading-none">
              {profile.name || "Usuário"}
            </p>
            <p className="text-xs text-text-muted leading-none">
              {profile.email}
            </p>
            {showBadge && (
              <div className="flex items-center gap-1.5 mt-2 text-primary">
                <BadgeCheck className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">
                  {badgeText} FetchLeads
                </span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/configuracoes")}
            className="cursor-pointer"
          >
            <UserIcon className="w-4 h-4 mr-2" />
            <span>Minha conta</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/configuracoes")}
            className="cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            <span>Configurações</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/configuracoes/billing")}
            className="cursor-pointer"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            <span>Plano e cobrança</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-red-500 focus:text-red-500 focus:bg-red-500/10 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
