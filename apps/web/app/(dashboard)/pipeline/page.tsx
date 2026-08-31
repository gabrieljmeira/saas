import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { KanbanSquare, Search, Plus, Filter, MoreHorizontal, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadScore } from "@/components/ui/lead-score";
import { DashboardSurface } from "@/components/ui/dashboard-surface";

export default async function PipelinePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Realistic mock data to show the design of the pipeline
  const pipelineData = [
    {
      title: "Novo",
      color: "border-text-muted/20 bg-text-muted/5",
      cards: [
        { id: 1, name: "Consultoria Apex", value: "R$ 2.400", nextAction: "Qualificar lead", score: 85, time: "Há 2h" },
        { id: 2, name: "Padaria São João", value: "R$ 800", nextAction: "Analisar site", score: 52, time: "Há 1d" }
      ]
    },
    {
      title: "Qualificado",
      color: "border-primary/20 bg-primary/5",
      cards: [
        { id: 3, name: "Escritório Mendonça", value: "R$ 4.500", nextAction: "Primeiro contato", score: 92, time: "Hoje" }
      ]
    },
    {
      title: "Contatado",
      color: "border-accent/20 bg-accent/5",
      cards: [
        { id: 4, name: "Clínica Vida", value: "R$ 1.200", nextAction: "Aguardando resposta", score: 78, time: "Ontem" },
        { id: 5, name: "Petshop Cão & Gato", value: "R$ 1.500", nextAction: "Follow-up", score: 65, time: "Há 3d" }
      ]
    },
    {
      title: "Respondeu",
      color: "border-orange-500/20 bg-orange-500/5",
      cards: []
    },
    {
      title: "Proposta",
      color: "border-purple-500/20 bg-purple-500/5",
      cards: [
        { id: 6, name: "Logística Express", value: "R$ 12.000", nextAction: "Reunião de fechamento", score: 95, time: "Hoje" }
      ]
    }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full flex flex-col gap-6 animate-in fade-in duration-500 h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight mb-1">
            Pipeline
          </h2>
          <p className="text-sm text-text-muted">Acompanhe e movimente suas oportunidades ativas.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input 
              placeholder="Pesquisar negócio..." 
              className="pl-9 h-9 bg-surface-elevated w-64 border-border-default"
            />
          </div>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="w-4 h-4" />
          </Button>
          <Button className="h-9 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Oportunidade
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-4 snap-x">
        {pipelineData.map((col, index) => (
          <div key={index} className="flex-shrink-0 w-[300px] flex flex-col gap-3 snap-start">
            
            {/* Column Header */}
            <div className={`px-3 py-2 rounded-md border ${col.color} flex items-center justify-between`}>
              <h3 className="font-semibold text-sm text-text-primary tracking-wide">
                {col.title}
              </h3>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-surface/50 text-text-secondary">
                {col.cards.length}
              </span>
            </div>

            {/* Column Body / Cards */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
              {col.cards.length === 0 ? (
                <div className="h-24 rounded-lg border border-dashed border-border-subtle flex items-center justify-center text-xs text-text-muted">
                  Nenhum card
                </div>
              ) : (
                col.cards.map(card => (
                  <DashboardSurface key={card.id} className="p-3.5 group hover:border-primary/40 transition-colors cursor-grab active:cursor-grabbing">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-sm text-text-primary leading-tight line-clamp-1">{card.name}</h4>
                      <Button variant="ghost" size="icon-sm" className="h-5 w-5 -mr-1 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="text-sm font-bold text-text-primary mb-3">
                      {card.value}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-xs font-medium text-text-secondary line-clamp-1">{card.nextAction}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                      <LeadScore score={card.score} size="sm" />
                      
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-text-muted font-medium mr-1">{card.time}</span>
                        <div className="w-6 h-6 rounded bg-success/10 text-success flex items-center justify-center hover:bg-success/20 transition-colors">
                          <MessageSquare className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </DashboardSurface>
                ))
              )}
            </div>
          </div>
        ))}

        {/* Create New Column Button */}
        <div className="flex-shrink-0 w-[300px]">
          <button className="w-full px-3 py-2 rounded-md border border-dashed border-border-default text-text-muted text-sm font-medium hover:border-text-primary hover:text-text-primary transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Estágio
          </button>
        </div>
      </div>
    </div>
  );
}
