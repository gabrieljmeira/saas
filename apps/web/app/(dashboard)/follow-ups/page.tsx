import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Clock } from "lucide-react";

export default async function FollowUpsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tabs = [
    { id: "hoje", label: "Hoje", emptyMessage: "Nenhum follow-up agendado para hoje." },
    { id: "atrasados", label: "Atrasados", emptyMessage: "Nenhum follow-up atrasado. Continue assim!", emptyColor: "text-green-400" },
    { id: "proximos", label: "Próximos", emptyMessage: "Nenhum follow-up agendado." }
  ];

  return (
    <div className="p-4 pt-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Follow-ups</h1>
        <p className="text-text-muted mt-1">Acompanhe quem você precisa contatar novamente.</p>
      </div>

      <div className="space-y-6">
        {tabs.map((tab) => (
          <div key={tab.id} className="space-y-3">
            <h2 className="text-lg font-semibold text-text-primary">{tab.label}</h2>
            <div className="border border-border-default bg-surface rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3">
              <Clock className="w-5 h-5 text-slate-500" />
              <p className={`text-sm ${tab.emptyColor || "text-text-muted"}`}>
                {tab.emptyMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
