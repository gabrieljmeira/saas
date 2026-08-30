import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default async function MensagensPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tabs = ["Todas", "Primeira abordagem", "Follow-up", "Proposta", "Reativação"];

  return (
    <div className="p-4 pt-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Mensagens</h1>
          <p className="text-text-muted mt-1">Sua biblioteca de abordagens e templates para WhatsApp.</p>
        </div>
        <Button disabled className="bg-primary hover:bg-primary-hover text-text-primary cursor-not-allowed">
          Criar template
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border-default">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              i === 0 
                ? "border-purple-500 text-purple-400" 
                : "border-transparent text-text-muted hover:text-text-secondary hover:border-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border border-border-default bg-surface rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 mt-8">
        <div className="p-3 bg-surface-elevated rounded-full text-text-muted">
          <MessageSquare className="w-6 h-6" />
        </div>
        <p className="text-text-muted text-sm max-w-sm">
          Crie sua primeira abordagem para começar a prospectar com eficiência.
        </p>
      </div>
    </div>
  );
}
