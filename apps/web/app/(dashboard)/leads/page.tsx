import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight">Leads</h1>
        <p className="text-text-muted mt-1 text-sm md:text-base">Encontre e gerencie suas oportunidades de negócio.</p>
      </div>

      <div className="border border-border-default bg-surface rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-12 h-12 bg-surface-elevated border border-border-subtle rounded-xl flex items-center justify-center text-text-muted">
          <Search className="w-6 h-6" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-lg font-medium text-text-primary">Nenhum lead encontrado</h3>
          <p className="text-text-muted text-sm leading-relaxed">
            Comece sua primeira busca para encontrar oportunidades na sua região.
          </p>
        </div>
        <Button disabled className="mt-2">
          Buscar empresas
        </Button>
      </div>
    </div>
  );
}
