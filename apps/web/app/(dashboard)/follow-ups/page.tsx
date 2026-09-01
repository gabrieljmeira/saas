import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { followUps, leads, opportunities } from "@saas/db/schema";
import { eq, and, isNull, asc } from "drizzle-orm";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MessageSquare,
  Briefcase,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { PageHeader } from "@/components/ui/page-header";
import { MascotSearching } from "@/components/ui/mascot-searching";

export default async function FollowUpsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch follow-ups that are not completed
  const rawFollowUps = await db
    .select({
      id: followUps.id,
      title: followUps.title,
      notes: followUps.notes,
      dueDate: followUps.dueDate,
      leadName: leads.name,
      leadWhatsapp: leads.hasWhatsapp,
      oppStatus: opportunities.status,
    })
    .from(followUps)
    .leftJoin(leads, eq(followUps.leadId, leads.id))
    .leftJoin(opportunities, eq(followUps.opportunityId, opportunities.id))
    .where(and(eq(followUps.userId, user.id), isNull(followUps.completedAt)))
    .orderBy(asc(followUps.dueDate));

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );

  const delayed = rawFollowUps.filter((f) => {
    const d = new Date(f.dueDate);
    return d < startOfToday;
  });

  const today = rawFollowUps.filter((f) => {
    const d = new Date(f.dueDate);
    return d >= startOfToday && d <= endOfToday;
  });

  const upcoming = rawFollowUps.filter((f) => {
    const d = new Date(f.dueDate);
    return d > endOfToday;
  });

  const isEmpty = rawFollowUps.length === 0;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto pb-12 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end mb-8">
        <PageHeader
          title="Follow-ups"
          description="Acompanhe quem você precisa contatar novamente para avançar negociações."
        />
        <Button size="sm" className="h-9 shadow-sm shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {isEmpty ? (
        <div className="mt-12 flex flex-col items-center justify-center p-12 text-center bg-surface-elevated border border-border-default rounded-xl border-dashed">
          <MascotSearching className="w-24 h-24 opacity-80 mb-6" />
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Sua agenda está limpa
          </h3>
          <p className="text-sm text-text-muted max-w-md">
            Você não possui nenhum follow-up pendente. Volte para a lista de
            Leads ou para o Pipeline e agende seus próximos passos.
          </p>
          <Button variant="outline" className="mt-6">
            Ir para Pipeline
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {/* Atrasados */}
          {delayed.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                <h3 className="text-xs font-bold text-[#EF4444] uppercase tracking-wider">
                  Atrasados
                </h3>
                <span className="ml-2 w-5 h-5 rounded bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-bold flex items-center justify-center border border-[#EF4444]/20">
                  {delayed.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {delayed.map((item) => (
                  <DashboardSurface
                    key={item.id}
                    className="p-0 overflow-hidden border-[#EF4444]/30 hover:border-[#EF4444]/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 bg-[#EF4444]/5">
                      <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-[#EF4444]/20 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-[#EF4444]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-text-primary text-sm line-clamp-1 mb-0.5">
                          {item.leadName || "Lead desconhecido"}
                        </h4>
                        <p className="text-[13px] font-medium text-text-secondary line-clamp-1">
                          {item.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border-subtle">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 px-2.5 py-1 rounded border border-[#EF4444]/20">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(new Date(item.dueDate))}
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          {item.leadWhatsapp && (
                            <Button
                              variant="outline"
                              size="icon-sm"
                              className="h-8 w-8 text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 border-[#25D366]/20"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 bg-surface-elevated hover:bg-background border-border-strong text-text-primary"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                            Concluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DashboardSurface>
                ))}
              </div>
            </section>
          )}

          {/* Hoje */}
          {today.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Para Hoje
                </h3>
                <span className="ml-2 w-5 h-5 rounded bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center border border-primary/20">
                  {today.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {today.map((item) => (
                  <DashboardSurface
                    key={item.id}
                    className="p-0 overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface border border-border-default flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-text-primary text-sm line-clamp-1 mb-0.5">
                          {item.leadName || "Lead desconhecido"}
                        </h4>
                        <p className="text-[13px] font-medium text-text-secondary line-clamp-1">
                          {item.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border-subtle">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(new Date(item.dueDate))}
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                          {item.leadWhatsapp && (
                            <Button
                              variant="outline"
                              size="icon-sm"
                              className="h-8 w-8 text-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 border-[#25D366]/20"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 bg-surface-elevated hover:bg-background border-border-strong text-text-primary"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1.5" />
                            Concluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DashboardSurface>
                ))}
              </div>
            </section>
          )}

          {/* Próximos */}
          {upcoming.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight className="w-4 h-4 text-text-muted" />
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Próximos
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {upcoming.map((item) => (
                  <DashboardSurface
                    key={item.id}
                    className="p-0 overflow-hidden opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 gap-4">
                      <div className="w-8 h-8 rounded-lg bg-surface border border-border-default flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-text-muted" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-text-primary text-[13px] line-clamp-1">
                            {item.leadName || "Lead desconhecido"}
                          </h4>
                          <span className="text-text-muted/30">•</span>
                          <span className="text-[11px] font-medium text-text-muted line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted bg-surface-elevated px-2 py-1 rounded border border-border-default ml-auto sm:ml-0">
                          <Calendar className="w-3 h-3" />
                          {formatDate(new Date(item.dueDate))}
                        </div>
                      </div>
                    </div>
                  </DashboardSurface>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
