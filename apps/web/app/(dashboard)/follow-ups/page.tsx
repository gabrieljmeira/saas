import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Clock, CheckCircle2, AlertCircle, Calendar, MessageSquare, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSurface } from "@/components/ui/dashboard-surface";

export default async function FollowUpsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Realistic mock data to show design
  const delayed = [
    { id: 1, name: "Consultoria Apex", action: "Enviar proposta revisada", date: "Ontem", overdue: true }
  ];
  
  const today = [
    { id: 2, name: "Escritório Mendonça", action: "Confirmar recebimento do email", date: "Hoje, 14:00" },
    { id: 3, name: "Clínica Vida", action: "Ligar para agendar reunião", date: "Hoje, 16:30" }
  ];

  return (
    <div className="flex-1 p-6 md:p-8 max-w-[1000px] mx-auto w-full flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight mb-1">
            Follow-ups
          </h2>
          <p className="text-sm text-text-muted">Acompanhe quem você precisa contatar novamente para fechar o negócio.</p>
        </div>
        <Button className="h-9 shadow-sm">
          <Clock className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        {/* Atrasados Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <h3 className="text-sm font-bold text-[#EF4444] uppercase tracking-wider">Atrasados</h3>
            <span className="ml-2 w-5 h-5 rounded-full bg-[#EF4444]/10 text-[#EF4444] text-[10px] font-bold flex items-center justify-center">{delayed.length}</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {delayed.map(item => (
              <DashboardSurface key={item.id} className="p-0 overflow-hidden border-[#EF4444]/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 bg-[#EF4444]/5">
                  <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-default flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary text-base line-clamp-1 mb-0.5">{item.name}</h4>
                    <p className="text-sm font-medium text-text-secondary line-clamp-1">{item.action}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border-subtle">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="h-8">Concluir</Button>
                    </div>
                  </div>
                </div>
              </DashboardSurface>
            ))}
          </div>
        </section>

        {/* Hoje Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Para Hoje</h3>
            <span className="ml-2 w-5 h-5 rounded-full bg-surface-elevated border border-border-strong text-text-primary text-[10px] font-bold flex items-center justify-center">{today.length}</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {today.map(item => (
              <DashboardSurface key={item.id} className="p-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 hover:bg-surface-hover transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-default flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-text-primary text-base line-clamp-1 mb-0.5">{item.name}</h4>
                    <p className="text-sm font-medium text-text-secondary line-clamp-1">{item.action}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border-subtle">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-text-muted hover:text-text-primary">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 border border-border-strong">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Feito
                      </Button>
                    </div>
                  </div>
                </div>
              </DashboardSurface>
            ))}
          </div>
        </section>

        {/* Próximos Section */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-text-muted" />
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider">Próximos</h3>
          </div>
          
          <DashboardSurface>
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-12 h-12 bg-surface-elevated border border-border-subtle rounded-xl flex items-center justify-center text-text-muted mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Nenhum agendamento futuro</h4>
              <p className="text-xs text-text-muted">Mantenha seu pipeline em movimento agendando contatos.</p>
            </div>
          </DashboardSurface>
        </section>
      </div>
    </div>
  );
}
