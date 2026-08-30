import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Target, Search, PhoneCall, Trophy } from "lucide-react";

export default async function MetasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const conceptCards = [
    { title: "Leads analisados", icon: Search, color: "text-blue-400" },
    { title: "Contatos realizados", icon: PhoneCall, color: "text-orange-400" },
    { title: "Vendas fechadas", icon: Trophy, color: "text-green-400" }
  ];

  return (
    <div className="p-4 pt-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Metas</h1>
          <p className="text-text-muted mt-1">Defina objetivos e acompanhe seu progresso.</p>
        </div>
        <Button disabled className="bg-primary hover:bg-primary-hover text-text-primary cursor-not-allowed">
          Criar meta
        </Button>
      </div>

      <div className="border border-border-default bg-surface rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-3 bg-surface-elevated rounded-full text-text-muted">
          <Target className="w-6 h-6" />
        </div>
        <p className="text-text-muted text-sm max-w-sm">
          Defina sua primeira meta para começar a acompanhar seu desempenho.
        </p>
      </div>

      <div className="pt-4 border-t border-border-default">
        <h3 className="text-lg font-medium text-slate-200 mb-4">Exemplos de Metas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conceptCards.map((card) => (
            <div key={card.title} className="p-4 rounded-lg bg-surface border border-border-default flex items-center gap-3">
              <card.icon className={`w-5 h-5 ${card.color}`} />
              <span className="text-text-secondary font-medium">{card.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
