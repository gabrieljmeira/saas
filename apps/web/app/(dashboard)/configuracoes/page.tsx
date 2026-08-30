import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { User, KeyRound, Building, AtSign } from "lucide-react";

export default async function ConfiguracoesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id)
  });

  return (
    <div className="p-4 pt-6 md:p-8 space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Configurações</h1>
        <p className="text-text-muted mt-1">Gerencie sua conta e preferências.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <section className="bg-surface border border-border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Perfil</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-1.5">
                <User className="w-4 h-4" /> Nome
              </label>
              <input 
                type="text" 
                disabled 
                value={profile?.name || ""} 
                className="w-full bg-background border border-border-default rounded-md px-3 py-2 text-text-secondary cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-1.5">
                <Building className="w-4 h-4" /> Empresa
              </label>
              <input 
                type="text" 
                disabled 
                value={profile?.companyName || ""} 
                className="w-full bg-background border border-border-default rounded-md px-3 py-2 text-text-secondary cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="bg-surface border border-border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Comunidade</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-1.5">
                <AtSign className="w-4 h-4" /> Username
              </label>
              <input 
                type="text" 
                disabled 
                value={profile?.username || ""} 
                className="w-full bg-background border border-border-default rounded-md px-3 py-2 text-text-secondary cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-muted flex items-center gap-2 mb-1.5">
                Bio
              </label>
              <textarea 
                disabled 
                value={profile?.bio || ""} 
                rows={3}
                className="w-full bg-background border border-border-default rounded-md px-3 py-2 text-text-secondary cursor-not-allowed resize-none"
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-surface border border-border-default rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Segurança</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-muted mb-1.5 block">
                E-mail
              </label>
              <input 
                type="text" 
                disabled 
                value={user.email || ""} 
                className="w-full bg-background border border-border-default rounded-md px-3 py-2 text-text-secondary cursor-not-allowed"
              />
            </div>
            <div className="pt-2">
              <Button variant="outline" className="border-slate-700 text-text-secondary hover:bg-surface-elevated hover:text-text-primary flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                Alterar senha
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
