"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Globe,
  Smartphone,
  Star,
  MoreVertical,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LeadScore } from "@/components/ui/lead-score";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { LeadDrawer } from "./lead-drawer";
import { cn } from "@/lib/utils";

export type LeadRow = {
  id: string;
  name: string;
  niche: string | null;
  city: string | null;
  score: number | null;
  status: string;
  rating: number | null;
  hasWhatsapp: boolean | null;
  website: string | null;
  updatedAt: Date;
};

interface LeadsClientProps {
  initialLeads: LeadRow[];
  currentQuery: string;
  currentStatus: string;
  page: number;
  hasMore: boolean;
}

export function LeadsClient({
  initialLeads,
  currentQuery,
  currentStatus,
  page,
  hasMore,
}: LeadsClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentQuery);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (currentStatus) params.set("status", currentStatus);
    router.push(`/leads?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full space-y-6 max-w-[1400px] mx-auto animate-in fade-in duration-500 w-full">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
        <div className="w-full sm:w-auto">
          <h2 className="text-2xl font-semibold text-text-primary tracking-tight mb-1">
            Prospecção
          </h2>
          <p className="text-sm text-text-muted">
            Encontre, analise e aborde novos clientes em potencial.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" className="h-9">
            Filtros Avançados
          </Button>
          <Button className="h-9 shrink-0 shadow-sm">Buscar Empresas</Button>
        </div>
      </div>

      <DashboardSurface className="flex-1 flex flex-col min-h-[500px]">
        {/* Table Header Controls */}
        <div className="p-4 border-b border-border-default bg-surface flex flex-col sm:flex-row gap-4 justify-between">
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-sm group"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Pesquisar leads ou cidades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-surface-elevated/50 hover:bg-surface-elevated focus:bg-surface-elevated transition-colors border-transparent hover:border-border-subtle focus:border-primary/30"
            />
          </form>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-muted uppercase tracking-wider mr-2">
              Status
            </span>
            <div className="flex items-center bg-surface-elevated p-1 rounded-lg border border-border-subtle">
              <button className="px-3 py-1 text-xs font-medium bg-surface rounded shadow-sm border border-border-default text-text-primary">
                Todos
              </button>
              <button className="px-3 py-1 text-xs font-medium text-text-secondary hover:text-text-primary">
                Novos
              </button>
              <button className="px-3 py-1 text-xs font-medium text-text-secondary hover:text-text-primary">
                Contatados
              </button>
            </div>
          </div>
        </div>

        {initialLeads.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-surface">
            <div className="w-16 h-16 bg-surface-elevated border border-border-default rounded-2xl flex items-center justify-center text-text-muted mb-4 shadow-sm">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-1">
              {currentQuery ? "Nenhum lead encontrado" : "Sua lista está vazia"}
            </h3>
            <p className="text-text-muted text-sm max-w-xs mb-6 leading-relaxed">
              {currentQuery
                ? "Tente ajustar seus termos de busca ou filtros."
                : "Você ainda não mapeou nenhuma empresa. Inicie uma nova busca."}
            </p>
            {!currentQuery && <Button size="sm">Mapear Região</Button>}
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 bg-surface">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-text-muted uppercase tracking-wider bg-surface-elevated/50 border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-3 font-semibold">Lead</th>
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
                              "w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                              isSelected
                                ? "bg-primary text-white"
                                : "bg-surface-elevated border border-border-default text-text-secondary group-hover:border-primary/30 group-hover:text-primary",
                            )}
                          >
                            {lead.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div
                              className={cn(
                                "font-semibold text-sm transition-colors line-clamp-1",
                                isSelected
                                  ? "text-primary"
                                  : "text-text-primary",
                              )}
                            >
                              {lead.name}
                            </div>
                            <div className="text-text-muted text-xs mt-0.5 flex items-center gap-1.5">
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
                        <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-surface-elevated border border-border-subtle text-text-secondary">
                          {lead.status === "new" ? "Novo" : lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.rating && (
                            <div className="flex items-center gap-1 bg-[#F59E0B]/10 text-[#F59E0B] px-1.5 py-0.5 rounded text-[10px] font-bold border border-[#F59E0B]/20">
                              <Star className="w-3 h-3 fill-current" />
                              {lead.rating}
                            </div>
                          )}
                          {lead.website && (
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-surface-elevated border border-border-subtle text-text-muted">
                              <Globe className="w-3 h-3" />
                            </div>
                          )}
                          {lead.hasWhatsapp && (
                            <div className="w-6 h-6 rounded flex items-center justify-center bg-success/10 text-success border border-success/20">
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

        {/* Pagination Footer */}
        {initialLeads.length > 0 && (
          <div className="p-4 border-t border-border-default bg-surface-elevated/30 flex items-center justify-between text-xs font-medium text-text-muted">
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
                  router.push(`/leads?${p.toString()}`);
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
                  router.push(`/leads?${p.toString()}`);
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
