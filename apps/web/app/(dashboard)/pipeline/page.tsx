import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { KanbanSquare } from "lucide-react";

export default async function PipelinePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const columns = ["Novo", "Qualificado", "Contatado", "Respondeu", "Proposta", "Ganho"];

  return (
    <div className="p-6 md:p-8 h-full flex flex-col gap-6">
      <div className="shrink-0">
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">Pipeline</h1>
        <p className="text-text-muted mt-1 text-sm md:text-base">Acompanhe suas oportunidades do primeiro contato ao fechamento.</p>
      </div>

      <div className="border border-border-default bg-surface rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4 shrink-0">
        <div className="w-12 h-12 bg-surface-elevated border border-border-subtle rounded-xl flex items-center justify-center text-text-muted">
          <KanbanSquare className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-lg font-medium text-text-primary">Pipeline Vazio</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            Adicione leads ao pipeline para acompanhar suas negociações.
          </p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {columns.map((col) => (
          <div key={col} className="w-[300px] shrink-0 flex flex-col gap-3">
            <h3 className="font-semibold text-text-secondary text-xs uppercase tracking-wider px-1">{col}</h3>
            <div className="flex-1 bg-surface-hover rounded-xl border border-border-subtle border-dashed flex flex-col min-h-[150px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
