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
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LeadDrawer } from "./lead-drawer";

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

export function LeadsClient({ initialLeads, currentQuery, currentStatus, page, hasMore }: LeadsClientProps) {
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
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <form onSubmit={handleSearch} className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <Input 
            placeholder="Buscar empresas, nichos ou cidades..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-surface border-border-default h-10 w-full"
          />
        </form>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10">Filtros Avançados</Button>
          <Button className="h-10 shrink-0">Buscar Oportunidades</Button>
        </div>
      </div>

      <div className="border border-border-default bg-surface rounded-xl overflow-hidden flex-1 flex flex-col">
        {initialLeads.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-12 h-12 bg-surface-elevated border border-border-subtle rounded-xl flex items-center justify-center text-text-muted mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-1">
              {currentQuery ? 'Nenhum lead encontrado para a busca' : 'Nenhuma oportunidade encontrada ainda'}
            </h3>
            <p className="text-text-muted text-sm max-w-sm mb-6">
              {currentQuery 
                ? 'Tente remover alguns filtros ou buscar com termos mais amplos.' 
                : 'Busque empresas por nicho e região para começar sua prospecção.'}
            </p>
            {!currentQuery && <Button>Buscar oportunidades</Button>}
          </div>
        ) : (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-text-muted uppercase bg-surface-elevated border-b border-border-default">
                <tr>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Local</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Sinais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {initialLeads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    onClick={() => setSelectedLeadId(lead.id)}
                    className="hover:bg-surface-hover cursor-pointer transition-colors group"
                  >
                    <td className="px-4 py-3 min-w-[200px]">
                      <div className="font-medium text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                        {lead.name}
                      </div>
                      <div className="text-text-muted text-xs mt-0.5 flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3" />
                        <span className="line-clamp-1">{lead.niche || "Não informado"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="outline" className={`font-medium ${
                        (lead.score || 0) >= 70 ? 'border-primary/30 text-primary bg-primary/5' : 
                        (lead.score || 0) >= 40 ? 'border-orange-500/30 text-orange-500 bg-orange-500/5' : ''
                      }`}>
                        {lead.score || 0}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-text-secondary flex items-center gap-1.5 mt-2 whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 text-text-muted" />
                      {lead.city || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant="secondary" className="bg-surface-elevated text-text-secondary border-border-subtle font-normal capitalize">
                        {lead.status === 'new' ? 'Novo' : lead.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 text-text-muted">
                        {lead.rating && (
                          <div className="flex items-center gap-1 bg-surface-elevated px-1.5 py-0.5 rounded text-xs border border-border-subtle">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            {lead.rating}
                          </div>
                        )}
                        {lead.hasWhatsapp && <Smartphone className="w-4 h-4 text-green-500" />}
                        {lead.website && <Globe className="w-4 h-4" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination Footer */}
        {initialLeads.length > 0 && (
          <div className="p-4 border-t border-border-default flex items-center justify-between text-sm text-text-muted">
            <div>Página {page}</div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
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
      </div>

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
