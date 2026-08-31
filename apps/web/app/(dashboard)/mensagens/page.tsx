import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Copy,
  Plus,
  Folder,
  Search,
  CheckCircle2,
} from "lucide-react";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { Input } from "@/components/ui/input";

export default async function MensagensPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const tabs = [
    { name: "Primeira Abordagem", count: 4, active: true },
    { name: "Follow-up", count: 2, active: false },
    { name: "Recuperação", count: 1, active: false },
    { name: "Fechamento", count: 0, active: false },
  ];

  const templates = [
    {
      title: "Abordagem Direta - Sem Site",
      objective: "Gerar interesse",
      content:
        "Olá! Vi que a [Nome da Empresa] tem uma ótima presença local, mas notei que vocês ainda não possuem um site próprio. Sou especialista em digitalização de negócios locais e ajudo clínicas a captarem mais. Podemos falar rapidinho hoje à tarde?",
    },
    {
      title: "Abordagem de Valor - Google Meu Negócio",
      objective: "Criar urgência",
      content:
        "Bom dia! Encontrei vocês no Google, mas reparei que há poucas avaliações recentes. Eu ajudo empresas do seu setor a rankearem melhor e atraírem mais clientes pela busca. Tem 5 minutos para eu mostrar como fazer isso?",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-text-primary tracking-tight">
            Biblioteca de Mensagens
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Sua base de conhecimento para prospecção no WhatsApp.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover text-primary-foreground h-9 shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Novo Template
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SIDEBAR CATEGORIES */}
        <aside className="w-full md:w-[240px] shrink-0 space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              <Search className="w-4 h-4" />
            </div>
            <Input
              placeholder="Buscar..."
              className="w-full pl-9 h-9 bg-surface-elevated/50 border-border-default rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2 px-2">
              Categorias
            </h4>
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  tab.active
                    ? "bg-primary/10 text-primary font-medium border border-primary/20"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Folder
                    className={`w-4 h-4 ${tab.active ? "fill-primary/20" : ""}`}
                  />
                  {tab.name}
                </div>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    tab.active
                      ? "bg-primary/20 text-primary"
                      : "bg-surface-elevated text-text-muted border border-border-subtle"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {templates.map((tpl, i) => (
              <DashboardSurface
                key={i}
                className="flex flex-col justify-between p-5 hover:border-border-strong transition-colors group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-semibold text-text-primary text-sm leading-tight">
                      {tpl.title}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-medium bg-surface-elevated border border-border-strong text-text-secondary">
                      {tpl.objective}
                    </span>
                  </div>
                  <div className="relative">
                    <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                      {tpl.content}
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-surface to-transparent" />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-text-secondary hover:text-text-primary -ml-2"
                  >
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="w-3.5 h-3.5 mr-2" /> Copiar
                  </Button>
                </div>
              </DashboardSurface>
            ))}

            {/* Ghost card for "Add new" to fill grid and encourage creation */}
            <DashboardSurface className="flex flex-col items-center justify-center p-6 border-dashed border-border-strong bg-transparent hover:bg-surface-hover/50 hover:border-primary/50 transition-colors cursor-pointer group min-h-[200px]">
              <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-default flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-primary/50 transition-all text-text-muted group-hover:text-primary">
                <Plus className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-medium text-text-primary mb-1">
                Criar nova abordagem
              </h4>
              <p className="text-xs text-text-muted text-center max-w-[200px]">
                Expanda sua biblioteca para diferentes cenários de vendas.
              </p>
            </DashboardSurface>
          </div>
        </div>
      </div>
    </div>
  );
}
