import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { opportunities, leads } from "@saas/db/schema";
import { eq, desc, and, notInArray } from "drizzle-orm";
import {
  KanbanSquare,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadScore } from "@/components/ui/lead-score";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { PageHeader } from "@/components/ui/page-header";
import { MascotSearching } from "@/components/ui/mascot-searching";

export default async function PipelinePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch real opportunities from DB
  const rawOpportunities = await db
    .select({
      id: opportunities.id,
      status: opportunities.status,
      expectedValueCents: opportunities.expectedValueCents,
      notes: opportunities.notes,
      updatedAt: opportunities.updatedAt,
      leadId: opportunities.leadId,
      leadName: leads.name,
      leadScore: leads.leadScore,
      hasWhatsapp: leads.hasWhatsapp,
    })
    .from(opportunities)
    .innerJoin(leads, eq(opportunities.leadId, leads.id))
    .where(
      and(
        eq(opportunities.userId, user.id),
        notInArray(opportunities.status, ["won", "lost"]),
      ),
    )
    .orderBy(desc(opportunities.updatedAt));

  const formatCurrency = (cents: number | null) => {
    if (!cents) return "R$ --";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Agora";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `Há ${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Há ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Ontem";
    if (diffInDays < 30) return `Há ${diffInDays}d`;

    return date.toLocaleDateString("pt-BR", { month: "short", day: "numeric" });
  };

  // Group by status
  const columnsDef = [
    { id: "new", title: "Novo", color: "border-text-muted/20 bg-text-muted/5" },
    {
      id: "qualified",
      title: "Qualificado",
      color: "border-primary/20 bg-primary/5",
    },
    {
      id: "contacted",
      title: "Contatado",
      color: "border-accent/20 bg-accent/5",
    },
    {
      id: "replied",
      title: "Respondeu",
      color: "border-orange-500/20 bg-orange-500/5",
    },
    {
      id: "proposal",
      title: "Proposta",
      color: "border-purple-500/20 bg-purple-500/5",
    },
  ];

  const pipelineData = columnsDef.map((col) => {
    const colOpps = rawOpportunities.filter((o) => o.status === col.id);
    return {
      ...col,
      cards: colOpps,
    };
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-12 animate-in fade-in duration-500 h-[calc(100vh-64px)] flex flex-col">
      <div className="shrink-0 mb-6">
        <PageHeader
          title="Pipeline"
          description="Acompanhe e movimente suas oportunidades ativas."
        />
        <div className="flex items-center gap-3 mt-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              placeholder="Pesquisar negócio..."
              className="pl-9 h-9 bg-surface-elevated w-64 border-border-default text-sm"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm" className="h-9 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Oportunidade
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-6 snap-x min-h-0 custom-scrollbar">
        {pipelineData.map((col, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[280px] md:w-[320px] flex flex-col gap-3 snap-start"
          >
            {/* Column Header */}
            <div
              className={`px-3 py-2.5 rounded-lg border ${col.color} flex items-center justify-between shadow-sm shrink-0`}
            >
              <h3 className="font-bold text-sm text-text-primary tracking-wide">
                {col.title}
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-background/50 border border-border-subtle text-text-secondary">
                {col.cards.length}
              </span>
            </div>

            {/* Column Body / Cards */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 pb-4 custom-scrollbar">
              {col.cards.length === 0 ? (
                <div className="h-32 rounded-xl border border-dashed border-border-strong flex flex-col items-center justify-center text-xs text-text-muted bg-surface/50">
                  <KanbanSquare className="w-6 h-6 mb-2 opacity-20" />
                  Nenhuma oportunidade
                </div>
              ) : (
                col.cards.map((card) => (
                  <DashboardSurface
                    key={card.id}
                    className="p-4 group hover:border-primary/40 transition-colors cursor-grab active:cursor-grabbing flex flex-col gap-3 shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-[13px] text-text-primary leading-tight line-clamp-1">
                        {card.leadName}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="h-5 w-5 -mr-1 -mt-1 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-sm font-bold text-text-primary">
                      {formatCurrency(card.expectedValueCents)}
                    </div>

                    {card.notes && (
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-[11px] font-medium text-text-secondary line-clamp-2 leading-relaxed">
                          {card.notes}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-border-subtle mt-1">
                      <LeadScore score={card.leadScore || 0} size="sm" />

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-text-muted font-medium">
                          {getTimeAgo(card.updatedAt)}
                        </span>
                        {card.hasWhatsapp && (
                          <div className="w-6 h-6 rounded bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20">
                            <MessageSquare className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  </DashboardSurface>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
