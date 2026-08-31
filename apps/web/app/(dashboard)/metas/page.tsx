import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Target,
  Search,
  PhoneCall,
  TrendingUp,
  Plus,
  Calendar,
} from "lucide-react";
import { DashboardSurface } from "@/components/ui/dashboard-surface";

export default async function MetasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const activeGoals = [
    {
      title: "Contatos Semanais",
      target: 50,
      current: 32,
      metric: "empresas",
      icon: PhoneCall,
      deadline: "Encerra em 2 dias",
      color: "primary",
    },
    {
      title: "Receita (Mês atual)",
      target: 15000,
      current: 4500,
      metric: "R$",
      icon: TrendingUp,
      deadline: "Encerra em 12 dias",
      color: "accent",
    },
    {
      title: "Leads Qualificados",
      target: 100,
      current: 100,
      metric: "leads",
      icon: Search,
      deadline: "Concluído",
      color: "success",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Acompanhamento de Metas
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Monitore seu desempenho e volume de prospecção.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9">
            <Calendar className="w-4 h-4 mr-2" />
            Novembro
          </Button>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground h-9 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Meta
          </Button>
        </div>
      </div>

      {/* ACTIVE GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeGoals.map((goal, i) => {
          const progress = Math.min(
            Math.round((goal.current / goal.target) * 100),
            100,
          );
          const isCompleted = progress === 100;

          return (
            <DashboardSurface
              key={i}
              className="p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        goal.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : goal.color === "accent"
                            ? "bg-accent/10 text-accent"
                            : "bg-success/10 text-success"
                      }`}
                    >
                      <goal.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary text-sm">
                        {goal.title}
                      </h3>
                      <p className="text-xs text-text-muted font-medium">
                        {goal.deadline}
                      </p>
                    </div>
                  </div>
                  {isCompleted && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success/10 border border-success/20 text-success uppercase tracking-wider">
                      Batida
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold text-text-primary">
                    {goal.metric === "R$"
                      ? `R$ ${goal.current.toLocaleString("pt-BR")}`
                      : goal.current}
                  </span>
                  <span className="text-sm text-text-muted font-medium">
                    /{" "}
                    {goal.metric === "R$"
                      ? `R$ ${goal.target.toLocaleString("pt-BR")}`
                      : goal.target}{" "}
                    {goal.metric !== "R$" && goal.metric}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-text-secondary">Progresso</span>
                  <span
                    className={
                      isCompleted ? "text-success" : "text-text-primary"
                    }
                  >
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden border border-border-subtle">
                  <div
                    className={`h-full rounded-full ${
                      isCompleted
                        ? "bg-success"
                        : goal.color === "primary"
                          ? "bg-primary"
                          : "bg-accent"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </DashboardSurface>
          );
        })}

        {/* ADD GOAL CARD */}
        <DashboardSurface className="flex flex-col items-center justify-center p-6 border-dashed border-border-strong bg-transparent hover:bg-surface-hover/50 hover:border-primary/50 transition-colors cursor-pointer group min-h-[200px]">
          <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-default flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-primary/50 transition-all text-text-muted group-hover:text-primary">
            <Plus className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-medium text-text-primary mb-1">
            Definir nova meta
          </h4>
          <p className="text-xs text-text-muted text-center max-w-[200px]">
            Crie objetivos para volume de abordagens ou fechamentos.
          </p>
        </DashboardSurface>
      </div>
    </div>
  );
}
