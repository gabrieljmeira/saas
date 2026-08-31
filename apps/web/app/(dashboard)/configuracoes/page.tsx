import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import {
  User,
  KeyRound,
  Building,
  AtSign,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default async function ConfiguracoesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  return (
    <div className="flex-1 p-6 md:p-8 max-w-[900px] mx-auto w-full flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="border-b border-border-default pb-6">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight mb-1">
          Configurações
        </h1>
        <p className="text-sm text-text-muted">
          Gerencie as preferências da sua conta e do seu perfil público.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Perfil Profissional
            </h3>
          </div>
          <DashboardSurface className="p-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Nome Completo
                </label>
                <Input
                  disabled
                  value={profile?.name || ""}
                  className="bg-surface border-border-default cursor-not-allowed opacity-70"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Empresa
                </label>
                <Input
                  disabled
                  value={profile?.companyName || ""}
                  className="bg-surface border-border-default cursor-not-allowed opacity-70"
                />
              </div>
            </div>
          </DashboardSurface>
        </section>

        {/* Community Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AtSign className="w-4 h-4 text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Identidade na Comunidade
            </h3>
          </div>
          <DashboardSurface className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                    @
                  </div>
                  <Input
                    disabled
                    value={profile?.username || ""}
                    className="pl-8 bg-surface border-border-default cursor-not-allowed opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Mini Biografia
                </label>
                <textarea
                  disabled
                  value={profile?.bio || ""}
                  rows={3}
                  className="w-full bg-surface border border-border-default rounded-lg px-3 py-2 text-sm text-text-secondary cursor-not-allowed opacity-70 resize-none focus:outline-none"
                />
              </div>
            </div>
          </DashboardSurface>
        </section>

        {/* Security Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-text-muted" />
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Segurança e Acesso
            </h3>
          </div>
          <DashboardSurface className="p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="space-y-2 flex-1 w-full">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  E-mail de Acesso
                </label>
                <Input
                  disabled
                  value={user.email || ""}
                  className="bg-surface border-border-default cursor-not-allowed opacity-70 max-w-sm"
                />
              </div>

              <Button
                variant="outline"
                className="h-10 mt-6 sm:mt-0 shadow-sm whitespace-nowrap"
              >
                <KeyRound className="w-4 h-4 mr-2" />
                Redefinir Senha
              </Button>
            </div>
          </DashboardSurface>
        </section>
      </div>
    </div>
  );
}
