import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";
import { Search, Users, PhoneForwarded, Target, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileResult = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  const profile = profileResult[0];
  const firstName = profile?.name ? profile.name.split(" ")[0] : "Empreendedor";

  // Using real icons but zeroed numbers for the first-use empty state
  const metrics = [
    { name: "Leads encontrados", value: "0", icon: Search, color: "text-slate-400" },
    { name: "Contatos realizados", value: "0", icon: PhoneForwarded, color: "text-slate-400" },
    { name: "Respostas", value: "0", icon: MessageSquare, color: "text-slate-400" },
    { name: "Vendas", value: "0", icon: Target, color: "text-slate-400" },
  ];

  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Bom dia, {firstName}.
          </h2>
          <p className="text-slate-400 mt-1">
            Acompanhe sua prospecção e veja o que merece sua atenção hoje.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Action button disabled visually because it's not implemented yet */}
          <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-not-allowed opacity-80" aria-disabled="true" title="Em breve">
            <Search className="w-4 h-4 mr-2" />
            Buscar leads
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-400">{metric.name}</p>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">{metric.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-sm flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-110 duration-700" />
          
          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-300 mb-4">
              Primeiros passos
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Comece sua primeira prospecção
            </h3>
            <p className="text-slate-400 mb-6 text-sm md:text-base">
              Encontre empresas da sua região que precisam do seu serviço e monte seu pipeline de oportunidades reais de venda.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-not-allowed opacity-80" aria-disabled="true" title="Em breve">
              Buscar primeira oportunidade <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700/50">
                <Users className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-white">A Matilha</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Veja resultados e estratégias de outros usuários que estão fechando vendas todos os dias na comunidade oficial do FetchLeads.
            </p>
          </div>
          <Link href="/community">
            <Button variant="outline" className="w-full bg-slate-900/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              Abrir comunidade
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
