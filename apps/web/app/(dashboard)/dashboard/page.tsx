import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";
import { 
  Search, 
  Users, 
  Target, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileResult = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  const profile = profileResult[0];
  const firstName = profile?.name ? profile.name.split(" ")[0] : "Empreendedor";

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
            Bom dia, {firstName}.
          </h2>
          <p className="text-text-muted mt-1 text-sm md:text-base">
            Seu pipeline está vazio no momento. Vamos encontrar sua próxima venda.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/leads">
            <Button className="w-full md:w-auto">
              <Search className="w-4 h-4" />
              Procurar empresas
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Onboarding Hero */}
      <div className="rounded-2xl border border-border-subtle bg-surface-elevated overflow-hidden shadow-sm relative group">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="p-8 md:p-12 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Configuração Inicial
          </div>
          
          <h3 className="text-2xl font-bold text-text-primary mb-3">
            O motor de vendas do seu negócio
          </h3>
          <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
            O FetchLeads encontra empresas da sua região no Google Maps, extrai os contatos públicos e organiza tudo em um CRM completo focado na conversão final.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/leads">
              <Button size="lg" className="w-full sm:w-auto">
                Fazer primeira busca <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/community">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-text-primary">
                Ver o que os outros estão fazendo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Value Props (replaces empty 4 generic cards) */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border-default bg-surface p-6">
          <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h4 className="text-base font-semibold text-text-primary mb-2">Busca Inteligente</h4>
          <p className="text-text-muted text-sm leading-relaxed">
            Mapeie regiões inteiras e encontre milhares de negócios locais classificados por avaliações.
          </p>
        </div>
        
        <div className="rounded-xl border border-border-default bg-surface p-6">
          <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center mb-4">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <h4 className="text-base font-semibold text-text-primary mb-2">CRM Integrado</h4>
          <p className="text-text-muted text-sm leading-relaxed">
            Leve o lead desde o primeiro contato frio até o contrato assinado, com follow-ups garantidos.
          </p>
        </div>
        
        <div className="rounded-xl border border-border-default bg-surface p-6">
          <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <h4 className="text-base font-semibold text-text-primary mb-2">Metas e Financeiro</h4>
          <p className="text-text-muted text-sm leading-relaxed">
            Trabalhe por objetivos mensais e veja seu faturamento potencial e real de forma visual.
          </p>
        </div>
      </div>
      
    </div>
  );
}
