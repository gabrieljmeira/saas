import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Trophy,
  Download,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { Button } from "@/components/ui/button";

export default async function FinanceiroPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const metrics = [
    {
      title: "Vendas Fechadas",
      value: "3",
      sub: "+1 em relação a ontem",
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Receita Total",
      value: "R$ 4.500,00",
      sub: "+R$ 1.500 nesta semana",
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      title: "Ticket Médio",
      value: "R$ 1.500,00",
      sub: "Estável",
      icon: CreditCard,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  const recentDeals = [
    {
      name: "Clínica Odontológica Exemplo",
      value: 1500,
      date: "Hoje, 14:30",
      type: "Setup de CRM",
      status: "Fechado",
    },
    {
      name: "Escritório de Advocacia Demo",
      value: 3000,
      date: "Ontem, 09:15",
      type: "Assessoria de Marketing",
      status: "Fechado",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Financeiro e Resultados
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Acompanhe a conversão do seu pipeline em receita real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9">
            <Calendar className="w-4 h-4 mr-2" />
            Este Mês
          </Button>
          <Button variant="outline" className="h-9 text-text-primary">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <DashboardSurface key={metric.title} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-secondary">
                {metric.title}
              </h3>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${metric.bg} ${metric.color}`}
              >
                <metric.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-text-primary tracking-tight">
                {metric.value}
              </p>
              <p className="text-xs text-text-muted mt-1 font-medium">
                {metric.sub}
              </p>
            </div>
          </DashboardSurface>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT DEALS (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-text-primary px-1">
            Últimas Vendas Fechadas
          </h3>
          <DashboardSurface className="overflow-hidden">
            {recentDeals.length > 0 ? (
              <div className="divide-y divide-border-subtle">
                {recentDeals.map((deal, i) => (
                  <div
                    key={i}
                    className="p-5 flex items-center justify-between hover:bg-surface-hover transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-default flex items-center justify-center text-primary font-bold">
                        {deal.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary">
                          {deal.name}
                        </h4>
                        <p className="text-xs text-text-muted flex items-center gap-2 mt-0.5">
                          {deal.type} • {deal.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <span className="block text-sm font-bold text-success">
                          R$ {deal.value.toLocaleString("pt-BR")}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-success bg-success/10 px-1.5 py-0.5 rounded tracking-wider">
                          {deal.status}
                        </span>
                      </div>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        className="text-text-muted hover:text-text-primary"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border-strong flex items-center justify-center mb-4 text-text-muted">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-text-primary mb-1">
                  Nenhuma venda registrada ainda
                </h4>
                <p className="text-xs text-text-muted max-w-sm">
                  Feche sua primeira negociação no pipeline para ver seus
                  resultados refletidos aqui.
                </p>
              </div>
            )}
          </DashboardSurface>
        </div>

        {/* PERFORMANCE SUMMARY */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-text-primary px-1">
            Resumo de Conversão
          </h3>
          <DashboardSurface className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-text-secondary">
                    Propostas Enviadas
                  </span>
                  <span className="text-text-primary">12</span>
                </div>
                <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-border-subtle">
                  <div className="h-full bg-text-muted w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-text-secondary">Em Negociação</span>
                  <span className="text-text-primary">5</span>
                </div>
                <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-border-subtle">
                  <div className="h-full bg-accent w-[40%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-text-secondary">Vendas Ganhas</span>
                  <span className="text-success">2</span>
                </div>
                <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden border border-border-subtle">
                  <div className="h-full bg-success w-[15%]" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border-subtle">
              <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                Taxa de Conversão
              </h4>
              <p className="text-2xl font-bold text-text-primary">16.6%</p>
              <p className="text-xs text-text-muted mt-1">
                Acima da média do mercado (12%)
              </p>
            </div>
          </DashboardSurface>
        </div>
      </div>
    </div>
  );
}
