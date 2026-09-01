import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { goals, leads, interactions, opportunities } from "@saas/db/schema";
import { eq, and, desc, gte, lte } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import {
  Target,
  Search,
  PhoneCall,
  TrendingUp,
  Plus,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { PageHeader } from "@/components/ui/page-header";
import { MascotSearching } from "@/components/ui/mascot-searching";

export default async function MetasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch all user goals
  const userGoals = await db.query.goals.findMany({
    where: eq(goals.userId, user.id),
    orderBy: [desc(goals.endsAt)],
  });

  const processedGoals = await Promise.all(
    userGoals.map(async (goal) => {
      let current = 0;
      const metric =
        goal.type === "revenue"
          ? "R$"
          : goal.type === "leads_found"
            ? "leads"
            : "contatos";
      let Icon = Target;
      let colorClass = "primary";

      if (goal.type === "leads_found") {
        Icon = Search;
        colorClass = "accent";
        const found = await db.query.leads.findMany({
          where: and(
            eq(leads.userId, user.id),
            gte(leads.createdAt, goal.startsAt),
            lte(leads.createdAt, goal.endsAt),
          ),
        });
        current = found.length;
      } else if (
        goal.type === "contacts_made" ||
        goal.type === "follow_ups_done"
      ) {
        Icon = PhoneCall;
        colorClass = "primary";
        const done = await db.query.interactions.findMany({
          where: and(
            eq(interactions.userId, user.id),
            gte(interactions.occurredAt, goal.startsAt),
            lte(interactions.occurredAt, goal.endsAt),
          ),
        });
        current = done.length;
      } else if (goal.type === "revenue" || goal.type === "sales_closed") {
        Icon = TrendingUp;
        colorClass = "success";
        const won = await db.query.opportunities.findMany({
          where: and(
            eq(opportunities.userId, user.id),
            eq(opportunities.status, "won"),
            gte(opportunities.closedAt, goal.startsAt),
            lte(opportunities.closedAt, goal.endsAt),
          ),
        });
        if (goal.type === "revenue") {
          current = won.reduce((acc, o) => acc + (o.actualValueCents || 0), 0);
        } else {
          current = won.length;
        }
      }

      const isCompleted = current >= goal.targetValue;

      let endsIn = null;
      if (goal.endsAt > new Date()) {
        const diffDays = Math.ceil(
          (goal.endsAt.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        );
        endsIn = diffDays === 1 ? "1 dia" : `${diffDays} dias`;
      }

      const progress = Math.min(
        Math.round((current / goal.targetValue) * 100),
        100,
      );

      const titleMap: Record<string, string> = {
        leads_found: "Leads Encontrados",
        contacts_made: "Contatos Realizados",
        follow_ups_done: "Follow-ups Concluídos",
        proposals_sent: "Propostas Enviadas",
        sales_closed: "Vendas Fechadas",
        revenue: "Receita",
      };

      return {
        ...goal,
        title: titleMap[goal.type] || goal.type,
        current,
        metric,
        icon: Icon,
        colorClass,
        isCompleted,
        endsIn,
        progress,
      };
    }),
  );

  const formatValue = (val: number, isCurrency: boolean) => {
    if (isCurrency) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 0,
      }).format(val / 100);
    }
    return val.toString();
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end mb-8">
        <PageHeader
          title="Acompanhamento de Metas"
          description="Monitore seu desempenho operacional e financeiro em tempo real."
        />
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="h-9">
            <Calendar className="w-4 h-4 mr-2" />
            Este Mês
          </Button>
          <Button className="h-9 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Meta
          </Button>
        </div>
      </div>

      {processedGoals.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-elevated border border-border-default rounded-xl border-dashed">
          <MascotSearching className="w-24 h-24 opacity-80 mb-6" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Nenhuma meta ativa
          </h3>
          <p className="text-sm text-text-muted max-w-md mb-6">
            O sucesso começa com um objetivo claro. Defina sua primeira meta de
            prospecção ou fechamento.
          </p>
          <Button variant="outline">Criar Meta</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedGoals.map((goal) => {
            const isCurrency = goal.metric === "R$";
            const currentFormatted = formatValue(goal.current, isCurrency);
            const targetFormatted = formatValue(goal.targetValue, isCurrency);

            const colorTokens = {
              primary: "bg-primary text-primary-foreground border-primary/20",
              accent: "bg-accent text-accent-foreground border-accent/20",
              success: "bg-success text-success-foreground border-success/20",
            };

            const barColor = {
              primary: "bg-primary",
              accent: "bg-accent",
              success: "bg-success",
            };

            return (
              <DashboardSurface
                key={goal.id}
                className="p-5 flex flex-col hover:border-border-strong transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorTokens[goal.colorClass as keyof typeof colorTokens]}`}
                    >
                      <goal.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-[15px]">
                        {goal.title}
                      </h3>
                      <p className="text-xs text-text-muted capitalize">
                        Meta {goal.period}
                      </p>
                    </div>
                  </div>
                  {goal.isCompleted && (
                    <div className="bg-success/10 text-success p-1 rounded-full border border-success/20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="mb-4 flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-text-primary">
                      {currentFormatted}
                    </span>
                    <span className="text-sm text-text-muted">
                      / {targetFormatted} {!isCurrency && goal.metric}
                    </span>
                  </div>

                  <div className="h-2 w-full bg-surface-elevated rounded-full overflow-hidden mt-3 border border-border-default">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${barColor[goal.colorClass as keyof typeof barColor]}`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between mt-auto">
                  <div className="text-xs font-semibold text-text-secondary">
                    {goal.progress}% Concluído
                  </div>
                  <div className="text-[11px] font-medium text-text-muted bg-surface-elevated px-2 py-1 rounded border border-border-default">
                    {goal.isCompleted
                      ? "Meta atingida 🎉"
                      : goal.endsIn
                        ? `Encerra em ${goal.endsIn}`
                        : "Prazo encerrado"}
                  </div>
                </div>
              </DashboardSurface>
            );
          })}
        </div>
      )}
    </div>
  );
}
