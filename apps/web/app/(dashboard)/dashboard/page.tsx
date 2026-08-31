import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles, leads, opportunities } from "@saas/db/schema";
import { eq, sql } from "drizzle-orm";
import { 
  Search, 
  ArrowRight,
  TrendingUp,
  MapPin,
  MessageSquare,
  Clock,
  KanbanSquare,
  Activity,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { LeadScore } from "@/components/ui/lead-score";

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
  const firstName = profile?.name ? profile.name.split(" ")[0] : "Operador";

  const [{ count: totalLeads }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(leads)
    .where(eq(leads.userId, user.id));

  const [{ count: activeOpportunities }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(opportunities)
    .where(eq(opportunities.userId, user.id));

  const hasData = totalLeads > 0;

  return (
    <div className="flex-1 p-6 md:p-8 max-w-[1400px] mx-auto w-full flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* 1. OPERATIONAL HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-default pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">Estação de Trabalho</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">
            Painel de Operações
          </h2>
          <p className="text-text-secondary mt-1 text-sm">
            Bem-vindo de volta, {firstName}. {hasData ? `Sua operação possui ${activeOpportunities} oportunidades ativas hoje.` : "Sua operação está pronta para iniciar."}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Integrated Metrics Ribbon (Compact) */}
          <div className="hidden lg:flex items-center gap-6 px-4 py-2 bg-surface border border-border-default rounded-lg mr-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Pipeline</span>
              <span className="text-sm font-bold text-text-primary">R$ 0,00</span>
            </div>
            <div className="w-px h-6 bg-border-default" />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">Leads Ativos</span>
              <span className="text-sm font-bold text-text-primary">{totalLeads}</span>
            </div>
          </div>

          <Link href="/leads">
            <Button className="w-full md:w-auto h-10 px-5 shadow-sm">
              <Search className="w-4 h-4 mr-2" />
              Nova Busca
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
        
        {/* LEFT COLUMN: Main Workflow */}
        <div className="flex flex-col gap-8">
          
          {/* 2. THE ACTION BOARD (Replaces generic hero) */}
          <section>
            <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Fluxo Prioritário
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/leads" className="group">
                <DashboardSurface className="p-5 h-full transition-all hover:border-primary/50 hover:bg-surface-hover hover:shadow-md cursor-pointer flex flex-col justify-between gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm mb-1">Prospectar</h4>
                    <p className="text-xs text-text-muted">Encontre novas empresas e qualifique oportunidades locais.</p>
                  </div>
                </DashboardSurface>
              </Link>

              <Link href="/follow-ups" className="group">
                <DashboardSurface className="p-5 h-full transition-all hover:border-accent/50 hover:bg-surface-hover hover:shadow-md cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm mb-1">Follow-ups</h4>
                    <p className="text-xs text-text-muted">Retome o contato com leads que esfriaram.</p>
                  </div>
                  {/* Notification dot */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent" />
                </DashboardSurface>
              </Link>

              <Link href="/pipeline" className="group">
                <DashboardSurface className="p-5 h-full transition-all hover:border-success/50 hover:bg-surface-hover hover:shadow-md cursor-pointer flex flex-col justify-between gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                    <KanbanSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm mb-1">Avançar Pipeline</h4>
                    <p className="text-xs text-text-muted">Atualize o status das negociações em andamento.</p>
                  </div>
                </DashboardSurface>
              </Link>
            </div>
          </section>

          {/* 3. OPPORTUNITIES / LEADS LIST */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary">Oportunidades Quentes</h3>
              <Link href="/leads" className="text-xs font-medium text-primary hover:underline">Ver todas</Link>
            </div>
            
            <DashboardSurface className="overflow-hidden">
              {!hasData ? (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border-strong flex items-center justify-center mb-4">
                    <Search className="w-5 h-5 text-text-muted" />
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2">Nenhum lead qualificado ainda</h4>
                  <p className="text-xs text-text-muted max-w-sm mb-6">
                    Seu motor de vendas precisa de combustível. Comece mapeando uma região para encontrar empresas.
                  </p>
                  <Link href="/leads">
                    <Button variant="outline" size="sm" className="h-8">
                      Iniciar Busca
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border-subtle">
                  {/* Empty state disguised as placeholder for when hasData is true but no 'hot' opportunities exist yet */}
                  <div className="p-4 flex items-center gap-4 hover:bg-surface-hover transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-text-primary">Clínica Odontológica Exemplo</h4>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-surface-elevated border border-border-strong text-text-secondary">
                          Novo
                        </span>
                      </div>
                      <p className="text-xs text-text-muted flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> São Paulo, SP
                      </p>
                    </div>
                    
                    <LeadScore score={85} size="sm" showLabel />
                    
                    <div className="pl-4 border-l border-border-default">
                      <Button size="icon-sm" variant="ghost" className="text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center gap-4 hover:bg-surface-hover transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-text-primary">Escritório de Advocacia Demo</h4>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 border border-primary/20 text-primary">
                          Contatado
                        </span>
                      </div>
                      <p className="text-xs text-text-muted flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Rio de Janeiro, RJ
                      </p>
                    </div>
                    
                    <LeadScore score={62} size="sm" showLabel />
                    
                    <div className="pl-4 border-l border-border-default">
                      <Button size="icon-sm" variant="ghost" className="text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DashboardSurface>
          </section>

        </div>

        {/* RIGHT COLUMN: Secondary Widgets */}
        <div className="flex flex-col gap-8">
          
          <DashboardSurface variant="accent" className="p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-1">Desempenho Semanal</h3>
            <p className="text-xs text-text-muted mb-4">Suas metas e métricas ativas.</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-text-secondary">Leads Contatados</span>
                  <span className="font-bold text-text-primary">0 / 50</span>
                </div>
                <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-border-subtle">
                  <div className="h-full bg-primary w-[0%]" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-text-secondary">Propostas Enviadas</span>
                  <span className="font-bold text-text-primary">0 / 10</span>
                </div>
                <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-border-subtle">
                  <div className="h-full bg-accent w-[0%]" />
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-6 h-8 text-xs">
              Configurar Metas
            </Button>
          </DashboardSurface>

          <section>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Atividade Recente</h3>
            <DashboardSurface>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4 text-text-muted" />
                </div>
                <p className="text-xs text-text-muted">Nenhuma atividade registrada hoje.</p>
              </div>
            </DashboardSurface>
          </section>

        </div>
      </div>
    </div>
  );
}
