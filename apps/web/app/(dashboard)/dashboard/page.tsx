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
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { LeadScore } from "@/components/ui/lead-score";
import { MascotSearching } from "@/components/ui/mascot-searching";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
            Visão Geral
          </h1>
          <p className="text-sm text-text-muted">
            Acompanhe sua prospecção e resultados do dia.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/leads">
            <Button size="sm" className="h-9 font-medium shadow-sm">
              <Search className="w-4 h-4 mr-2" />
              Buscar empresas
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Main Operational Focus */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* 2. NEXT ACTION CARDS */}
          <section>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              O que precisa da sua atenção
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/follow-ups" className="group">
                <DashboardSurface className="p-5 h-full transition-all hover:border-accent/50 hover:bg-surface-hover hover:shadow-md cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm mb-1">
                      Follow-ups
                    </h4>
                    <p className="text-xs text-text-muted">
                      Retome o contato com leads que esfriaram.
                    </p>
                  </div>
                </DashboardSurface>
              </Link>

              <Link href="/pipeline" className="group">
                <DashboardSurface className="p-5 h-full transition-all hover:border-success/50 hover:bg-surface-hover hover:shadow-md cursor-pointer flex flex-col justify-between gap-4">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                    <KanbanSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm mb-1">
                      Avançar Pipeline
                    </h4>
                    <p className="text-xs text-text-muted">
                      Atualize o status das negociações em andamento.
                    </p>
                  </div>
                </DashboardSurface>
              </Link>
            </div>
          </section>

          {/* 3. OPPORTUNITIES / LEADS LIST */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-text-primary">
                Oportunidades Prioritárias
              </h3>
              <Link
                href="/leads"
                className="text-xs font-medium text-primary hover:underline"
              >
                Ver todas
              </Link>
            </div>

            <DashboardSurface className="overflow-hidden">
              {!hasData ? (
                <div className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <MascotSearching className="w-24 h-24 opacity-90" />
                  </div>
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    Nenhum lead qualificado ainda
                  </h4>
                  <p className="text-xs text-text-muted max-w-sm mb-6 leading-relaxed">
                    Seu motor de vendas precisa de combustível. Comece buscando
                    por empresas para encontrar oportunidades reais.
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
                  {/* Later this will map real opportunities. Let's keep a placeholder row for now, or just empty */}
                  <div className="p-12 flex flex-col items-center justify-center text-center">
                    <p className="text-sm text-text-muted">
                      Nenhuma oportunidade quente no momento.
                    </p>
                    <Link
                      href="/pipeline"
                      className="text-xs text-primary mt-2 hover:underline"
                    >
                      Ir para Pipeline
                    </Link>
                  </div>
                </div>
              )}
            </DashboardSurface>
          </section>
        </div>

        {/* RIGHT COLUMN: Secondary Widgets */}
        <div className="flex flex-col gap-8">
          <DashboardSurface variant="accent" className="p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-1">
              Resumo de Metas
            </h3>
            <p className="text-xs text-text-muted mb-4">
              Acompanhe seus objetivos.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded border border-border-subtle bg-surface/50 text-center">
                <p className="text-xs text-text-muted">
                  Nenhuma meta configurada ainda.
                </p>
              </div>
            </div>

            <Link href="/metas">
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-6 h-8 text-xs"
              >
                Configurar Metas
              </Button>
            </Link>
          </DashboardSurface>

          <section>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Atividade Recente
            </h3>
            <DashboardSurface>
              <div className="p-6 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4 text-text-muted" />
                </div>
                <p className="text-xs text-text-muted">
                  Nenhuma atividade registrada.
                </p>
              </div>
            </DashboardSurface>
          </section>
        </div>
      </div>
    </div>
  );
}
