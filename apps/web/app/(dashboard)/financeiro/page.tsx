import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DollarSign, TrendingUp, CreditCard, Trophy } from "lucide-react";

export default async function FinanceiroPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const metrics = [
    { title: "Vendas fechadas", value: "0", icon: Trophy },
    { title: "Receita total", value: "R$ 0,00", icon: TrendingUp },
    { title: "Ticket médio", value: "R$ 0,00", icon: CreditCard }
  ];

  return (
    <div className="p-4 pt-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Financeiro</h1>
        <p className="text-text-muted mt-1">Acompanhe seus resultados comerciais.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="p-6 rounded-xl bg-surface border border-border-default">
            <div className="flex items-center gap-3 mb-2">
              <metric.icon className="w-4 h-4 text-text-muted" />
              <h3 className="text-sm font-medium text-text-muted">{metric.title}</h3>
            </div>
            <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="border border-border-default bg-surface rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-3 bg-surface-elevated rounded-full text-text-muted">
          <DollarSign className="w-6 h-6" />
        </div>
        <p className="text-text-muted text-sm max-w-md">
          Ainda não há vendas registradas. Feche sua primeira negociação no pipeline para ver seus resultados aqui.
        </p>
      </div>
    </div>
  );
}
