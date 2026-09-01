"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Briefcase,
  Star,
  Globe,
  Smartphone,
  Loader2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { cn } from "@/lib/utils";
import { LeadScore } from "@/components/ui/lead-score";
import { LeadDrawer } from "./lead-drawer";
import { MascotSearching } from "@/components/ui/mascot-searching";

export type LeadRow = {
  id: string;
  name: string;
  niche: string | null;
  city: string | null;
  score: number | null;
  status: string | null;
  rating: number | null;
  hasWhatsapp: boolean | null;
  website: string | null;
  updatedAt: Date | null;
};

export function LeadsClient({
  initialLeads,
  currentQuery,
  currentStatus,
  page,
  hasMore,
}: {
  initialLeads: LeadRow[];
  currentQuery: string;
  currentStatus: string;
  page: number;
  hasMore: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);

  const startIntelligentSearch = () => {
    setIsSearching(true);
    setSearchStep(0);
    setTimeout(() => setSearchStep(1), 1500);
    setTimeout(() => setSearchStep(2), 3000);
    setTimeout(() => {
      setIsSearching(false);
    }, 4500);
  };

  return (
    <div className="flex flex-col h-full relative">
      {isSearching && (
        <div className="absolute inset-0 z-50 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl animate-in fade-in duration-300">
          <MascotSearching className="w-32 h-32 mb-8 opacity-90" />
          <div className="text-center space-y-2 max-w-sm">
            <h3 className="text-xl font-bold text-text-primary">
              Buscando empresas
            </h3>
            <div className="flex flex-col items-center gap-1 mt-4">
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  searchStep >= 0
                    ? "text-primary font-medium"
                    : "text-text-muted",
                )}
              >
                Preparando os parâmetros da região...
              </span>
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  searchStep >= 1
                    ? "text-primary font-medium"
                    : "text-text-muted",
                )}
              >
                Inspecionando dados públicos e redes sociais...
              </span>
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  searchStep >= 2
                    ? "text-primary font-medium"
                    : "text-text-muted",
                )}
              >
                Calculando o Lead Score das oportunidades...
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-[320px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Search className="w-4 h-4" />
          </div>
          <Input
            placeholder="Buscar por nome, nicho ou cidade..."
            className="w-full pl-10 pr-10 h-10 bg-surface border-border-default focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
            defaultValue={currentQuery}
            onChange={(e) => {
              const val = e.target.value;
              const p = new URLSearchParams(window.location.search);
              if (val) p.set("q", val);
              else p.delete("q");
              p.delete("page");
              startTransition(() => {
                router.push("/leads?" + p.toString());
              });
            }}
          />
          {isPending && (
            <Loader2 className="w-4 h-4 animate-spin text-text-muted absolute right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>

        <Button
          className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm h-10"
          onClick={startIntelligentSearch}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Busca
        </Button>
      </div>

      <DashboardSurface className="flex-1 flex flex-col min-h-0 border-border-default overflow-hidden">
        <div className="px-2 pt-2 border-b border-border-subtle bg-surface-elevated/30 shrink-0">
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
              Todas Oportunidades
            </button>
            <button className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-text-muted hover:text-text-primary transition-colors">
              Recém Descobertos
            </button>
          </div>
        </div>

        {initialLeads.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-surface">
            <div className="relative mb-6">
              <MascotSearching className="w-24 h-24 opacity-80" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1">
              {currentQuery ? "Nenhum lead encontrado" : "Sua lista está vazia"}
            </h3>
            <p className="text-text-muted text-sm max-w-xs mb-6 leading-relaxed">
              {currentQuery
                ? "Tente ajustar seus termos de busca ou filtros."
                : "Você ainda não mapeou nenhuma empresa. Inicie uma nova busca."}
            </p>
            {!currentQuery && (
              <Button size="sm" onClick={startIntelligentSearch}>
                Buscar empresas
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 bg-surface">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-text-muted uppercase tracking-wider bg-surface-elevated/50 border-b border-border-subtle sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold">Empresa</th>
                  <th className="px-6 py-3 font-semibold">Local</th>
                  <th className="px-6 py-3 font-semibold w-[120px]">Score</th>
                  <th className="px-6 py-3 font-semibold w-[100px]">Status</th>
                  <th className="px-6 py-3 font-semibold text-right w-[160px]">
                    Sinais
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {initialLeads.map((lead) => {
                  const isSelected = selectedLeadId === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={cn(
                        "cursor-pointer transition-colors group",
                        isSelected ? "bg-primary/5" : "hover:bg-surface-hover",
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-8 h-8 rounded border flex items-center justify-center font-bold text-[10px] shrink-0 transition-colors",
                              isSelected
                                ? "bg-primary border-primary text-white"
                                : "bg-surface-elevated border-border-default text-text-secondary group-hover:border-primary/30 group-hover:text-primary",
                            )}
                          >
                            {lead.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div
                              className={cn(
                                "font-semibold text-[13px] transition-colors line-clamp-1",
                                isSelected
                                  ? "text-primary"
                                  : "text-text-primary",
                              )}
                            >
                              {lead.name}
                            </div>
                            <div className="text-text-muted text-[11px] mt-0.5 flex items-center gap-1.5 uppercase tracking-wide font-medium">
                              <Briefcase className="w-3 h-3" />
                              <span className="line-clamp-1">
                                {lead.niche || "Não informado"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-text-secondary flex items-center gap-1.5 whitespace-nowrap text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 text-text-muted" />
                          {lead.city || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <LeadScore score={lead.score || 0} size="sm" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-surface-elevated border border-border-strong text-text-secondary">
                          {lead.status === "new" ? "Novo" : lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {!lead.website && (
                            <div
                              className="flex items-center gap-1 bg-surface-elevated text-text-muted px-1.5 py-0.5 rounded text-[10px] font-medium border border-border-subtle"
                              title="Sem site próprio"
                            >
                              <Globe className="w-3 h-3" />
                              Sem site
                            </div>
                          )}
                          {lead.rating && lead.rating >= 4.5 && (
                            <div
                              className="flex items-center gap-1 bg-surface text-text-primary px-1.5 py-0.5 rounded text-[10px] font-bold border border-border-default"
                              title="Alta avaliação"
                            >
                              <Star className="w-3 h-3 fill-accent text-accent" />
                              {lead.rating}
                            </div>
                          )}
                          {lead.hasWhatsapp && (
                            <div className="w-6 h-6 rounded flex items-center justify-center text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 ml-1">
                              <Smartphone className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {initialLeads.length > 0 && (
          <div className="p-4 border-t border-border-default bg-surface-elevated/30 flex items-center justify-between text-xs font-medium text-text-muted shrink-0">
            <div>Página {page}</div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                disabled={page <= 1}
                onClick={() => {
                  const p = new URLSearchParams(window.location.search);
                  p.set("page", String(page - 1));
                  router.push("/leads?" + p.toString());
                }}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                disabled={!hasMore}
                onClick={() => {
                  const p = new URLSearchParams(window.location.search);
                  p.set("page", String(page + 1));
                  router.push("/leads?" + p.toString());
                }}
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </DashboardSurface>

      {selectedLeadId && (
        <LeadDrawer
          leadId={selectedLeadId}
          open={!!selectedLeadId}
          onOpenChange={(open) => !open && setSelectedLeadId(null)}
        />
      )}
    </div>
  );
}
