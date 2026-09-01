import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { opportunities, leads } from "@saas/db/schema";
import { eq, and, desc, isNotNull } from "drizzle-orm";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Trophy,
  Download,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { MascotSearching } from "@/components/ui/mascot-searching";

export default async function FinanceiroPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch real won opportunities
  const wonOpps = await db
    .select({
      id: opportunities.id,
      actualValueCents: opportunities.actualValueCents,
      expectedValueCents: opportunities.expectedValueCents,
      closedAt: opportunities.closedAt,
      leadName: leads.name,
    })
    .from(opportunities)
    .leftJoin(leads, eq(opportunities.leadId, leads.id))
    .where(
      and(eq(opportunities.userId, user.id), eq(opportunities.status, "won")),
    )
    .orderBy(desc(opportunities.closedAt));

  const totalWon = wonOpps.length;
  const totalRevenue = wonOpps.reduce(
    (acc, curr) =>
      acc + (curr.actualValueCents || curr.expectedValueCents || 0),
    0,
  );
  const averageTicket = totalWon > 0 ? totalRevenue / totalWon : 0;

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const metrics = [
    {
      title: "Vendas Fechadas",
      value: totalWon.toString(),
      sub: "Oportunidades ganhas",
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      title: "Receita Total",
      value: formatCurrency(totalRevenue),
      sub: "Baseado no valor fechado",
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
    },
    {
      title: "Ticket Médio",
      value: formatCurrency(averageTicket),
      sub: "Média por oportunidade",
      icon: CreditCard,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20",
    },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end mb-8">
        <PageHeader
          title="Financeiro e Resultados"
          description="Acompanhe a conversão do seu pipeline em receita real."
        />
        <Button variant="outline" size="sm" className="h-9">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((m, i) => (
          <DashboardSurface
            key={i}
            className={`p-6 flex items-start gap-4 hover:border-border-strong transition-colors`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${m.bg} ${m.color} ${m.border}`}
            >
              <m.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-muted mb-1">
                {m.title}
              </p>
              <h3 className="text-2xl font-bold text-text-primary tracking-tight">
                {m.value}
              </h3>
              <p className="text-xs font-medium text-text-secondary mt-1">
                {m.sub}
              </p>
            </div>
          </DashboardSurface>
        ))}
      </div>

      {/* Recents */}
      <h3 className="text-sm font-bold uppercase tracking-wider text-text-secondary mb-4">
        Últimos Fechamentos
      </h3>

      {wonOpps.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-elevated border border-border-default rounded-xl border-dashed">
          <MascotSearching className="w-24 h-24 opacity-80 mb-6" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Ainda não há fechamentos
          </h3>
          <p className="text-sm text-text-muted max-w-md mb-6">
            Movimente leads para a etapa "Ganho" no seu Pipeline para que a
            receita apareça aqui e seja contabilizada.
          </p>
          <Button variant="outline">Ir para Pipeline</Button>
        </div>
      ) : (
        <DashboardSurface className="p-0 overflow-hidden">
          <div className="divide-y divide-border-subtle">
            {wonOpps.map((deal) => {
              const val = deal.actualValueCents || deal.expectedValueCents || 0;
              return (
                <div
                  key={deal.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-surface-hover transition-colors"
                >
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center border border-success/20 shrink-0">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-primary text-[15px]">
                        {deal.leadName || "Lead desconhecido"}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-text-muted font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {deal.closedAt
                          ? new Date(deal.closedAt).toLocaleDateString("pt-BR")
                          : "Data não registrada"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:text-right ml-14 sm:ml-0 border-t sm:border-0 border-border-subtle pt-3 sm:pt-0">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-success/10 text-success text-[10px] font-bold rounded uppercase tracking-wide border border-success/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Fechado
                    </div>
                    <div className="text-lg font-bold text-text-primary tracking-tight">
                      {formatCurrency(val)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardSurface>
      )}
    </div>
  );
}
