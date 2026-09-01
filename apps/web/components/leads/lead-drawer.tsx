"use client";

import { useEffect, useState, useTransition } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Globe,
  Smartphone,
  Star,
  CheckCircle2,
  Copy,
  Loader2,
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { generateWhatsappUrl } from "@/lib/leads/whatsapp";
import { generateApproachAction } from "@/lib/leads/actions";
import { cn } from "@/lib/utils";
import { LeadScore } from "@/components/ui/lead-score";
import { MascotSearching } from "@/components/ui/mascot-searching";

interface LeadDrawerProps {
  leadId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TabType = "visao_geral" | "empresa" | "sinais" | "contatos";

export function LeadDrawer({ leadId, open, onOpenChange }: LeadDrawerProps) {
  const [lead, setLead] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("visao_geral");
  const [approachMessage, setApproachMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (open && leadId) {
      setLoading(true);
      import("@/lib/leads/server-queries").then((mod) => {
        mod
          .getLeadDetailsAction(leadId)
          .then((data) => {
            setLead(data as Record<string, unknown>);
            setLoading(false);
            setActiveTab("visao_geral");
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      });
    }
  }, [leadId, open]);

  const handleGenerateApproach = () => {
    if (!lead?.id) return;
    startTransition(async () => {
      const res = await generateApproachAction(lead.id as string);
      if (res.success && res.approach) {
        setApproachMessage(res.approach);
      }
    });
  };

  const hasWhatsapp = lead?.hasWhatsapp as boolean;
  const rawPhone = lead?.phone as string;
  const normalizedPhone = rawPhone ? rawPhone.replace(/\D/g, "") : null;
  const whatsappUrl = normalizedPhone
    ? generateWhatsappUrl(normalizedPhone, approachMessage || undefined)
    : null;

  const leadScoreReasons = lead?.leadScoreReasons as unknown[];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[600px] p-0 flex flex-col bg-background border-l border-border-default shadow-2xl">
        {loading || !lead ? (
          <div className="flex flex-col items-center justify-center h-full">
            <MascotSearching className="w-24 h-24 mb-4 opacity-80" />
            <p className="text-sm font-medium text-text-muted">
              Carregando perfil...
            </p>
          </div>
        ) : (
          <>
            {/* 1. Header (Sticky) */}
            <div className="p-6 md:p-8 bg-surface border-b border-border-default shrink-0">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide bg-surface-elevated border border-border-strong text-text-secondary uppercase">
                      {(lead.status as string) === "new"
                        ? "Novo Lead"
                        : (lead.status as string)}
                    </span>
                    {typeof lead.rating === "number" && lead.rating >= 4.5 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-accent bg-accent/10 px-1.5 py-0.5 rounded border border-accent/20">
                        <Star className="w-3 h-3 fill-accent" /> Em Alta
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                    {lead.name as string}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-muted font-medium">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      {(lead.niche as string) || "Nicho desconhecido"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {(lead.city as string) || "Local não informado"}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-end">
                  <div className="text-[10px] text-text-muted uppercase tracking-widest font-semibold mb-1.5">
                    Lead Score
                  </div>
                  <LeadScore
                    score={(lead.leadScore as number) || 0}
                    size="md"
                  />
                </div>
              </div>
            </div>

            {/* 2. Navigation Tabs */}
            <div className="px-6 md:px-8 border-b border-border-default flex gap-6 shrink-0 bg-surface">
              {[
                { id: "visao_geral", label: "Visão Geral" },
                { id: "sinais", label: "Sinais de Compra" },
                { id: "empresa", label: "Perfil Corporativo" },
                { id: "contatos", label: "Contatos" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    "py-4 text-sm font-medium transition-colors border-b-2 relative -mb-px",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-muted hover:text-text-primary",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 3. Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {activeTab === "visao_geral" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Approach Generation */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Smart Approach
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateApproach}
                        disabled={isPending}
                        className="h-7 text-xs font-medium bg-surface-elevated hover:bg-surface-hover hover:text-primary transition-colors border-border-strong"
                      >
                        {isPending ? (
                          <Loader2 className="w-3 h-3 mr-2 animate-spin text-text-muted" />
                        ) : null}
                        {approachMessage ? "Gerar Outra" : "Gerar com IA"}
                      </Button>
                    </div>

                    {isPending ? (
                      <div className="bg-surface-elevated border border-border-default rounded-xl p-8 flex flex-col items-center justify-center text-center">
                        <MascotSearching className="w-16 h-16 opacity-80 mb-4" />
                        <p className="text-sm font-semibold text-text-primary">
                          Analisando perfil...
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          Construindo uma abordagem impossível de ignorar.
                        </p>
                      </div>
                    ) : approachMessage ? (
                      <div className="bg-surface-elevated border border-border-strong rounded-xl p-5 relative group">
                        <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                          {approachMessage}
                        </p>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 border-border-strong"
                          onClick={() =>
                            navigator.clipboard.writeText(approachMessage)
                          }
                        >
                          <Copy className="w-3 h-3 text-text-muted" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-sm text-text-muted p-8 bg-surface-elevated rounded-xl border border-border-dashed border-border-strong text-center flex flex-col items-center">
                        <MessageSquare className="w-6 h-6 mb-3 text-text-muted/50" />
                        <p>Nenhuma abordagem gerada ainda.</p>
                        <p className="text-xs mt-1 max-w-xs">
                          A inteligência artificial vai cruzar os dados da
                          empresa e gerar um quebra-gelo ideal.
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-border-subtle" />

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                      Detalhes do Lead Score
                    </h4>
                    {leadScoreReasons &&
                    Array.isArray(leadScoreReasons) &&
                    leadScoreReasons.length > 0 ? (
                      <ul className="grid grid-cols-1 gap-2">
                        {leadScoreReasons.map((r: unknown, i: number) => {
                          const reason = r as { label: string; impact: number };
                          return (
                            <li
                              key={i}
                              className="flex items-center justify-between text-sm text-text-muted bg-surface-elevated p-3 rounded-lg border border-border-subtle"
                            >
                              <div className="flex items-center gap-2.5">
                                <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                                <span className="font-medium">
                                  {reason.label}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-text-primary bg-background px-2 py-1 rounded border border-border-strong">
                                {reason.impact > 0 ? "+" : ""}
                                {reason.impact}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="text-sm text-text-muted">
                        Nenhum detalhe de score disponível.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "sinais" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">
                    Opportunity Signals
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Sem Site Proprio */}
                    {!lead.website ? (
                      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                          <AlertCircle className="w-4 h-4" />
                          Sem Site Próprio
                        </div>
                        <p className="text-xs text-text-muted">
                          Empresa não possui domínio registrado. Oportunidade
                          para vender presença digital, landing page ou
                          infraestrutura web.
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border border-border-subtle bg-surface-elevated flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-text-secondary font-semibold text-sm">
                          <Globe className="w-4 h-4" />
                          Possui Site
                        </div>
                        <p className="text-xs text-text-muted">
                          Empresa já está digitalizada. Oportunidade para SEO,
                          tráfego pago ou integrações avançadas.
                        </p>
                      </div>
                    )}

                    {/* Alta Avaliação */}
                    {typeof lead.rating === "number" ? (
                      <div
                        className={cn(
                          "p-4 rounded-xl border flex flex-col gap-2",
                          lead.rating >= 4.5
                            ? "border-accent/20 bg-accent/5"
                            : "border-border-subtle bg-surface-elevated",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-2 font-semibold text-sm",
                            lead.rating >= 4.5
                              ? "text-accent"
                              : "text-text-secondary",
                          )}
                        >
                          <Star className="w-4 h-4" />
                          Avaliação: {lead.rating}
                        </div>
                        <p className="text-xs text-text-muted">
                          {(lead.rating as number) >= 4.5
                            ? "Cliente com ótima reputação local. Oportunidade para escalar o alcance com anúncios ou fidelização."
                            : "Reputação mediana/baixa. Pode haver espaço para consultoria de imagem e melhoria de qualidade."}
                        </p>
                      </div>
                    ) : null}

                    {/* WhatsApp */}
                    <div
                      className={cn(
                        "p-4 rounded-xl border flex flex-col gap-2",
                        hasWhatsapp
                          ? "border-[#25D366]/20 bg-[#25D366]/5"
                          : "border-border-subtle bg-surface-elevated",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2 font-semibold text-sm",
                          hasWhatsapp
                            ? "text-[#25D366]"
                            : "text-text-secondary",
                        )}
                      >
                        <Smartphone className="w-4 h-4" />
                        {hasWhatsapp ? "WhatsApp Disponível" : "Sem WhatsApp"}
                      </div>
                      <p className="text-xs text-text-muted">
                        {hasWhatsapp
                          ? "Canal de conversão rápida e altíssima taxa de abertura aberto."
                          : "Apenas telefone fixo detectado. Abordagem via cold call necessária."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "empresa" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">
                      Dados Públicos
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-surface-elevated border border-border-default rounded-lg">
                        <div className="text-[10px] text-text-muted uppercase tracking-wide mb-1">
                          Website
                        </div>
                        <div className="text-sm font-medium text-text-primary">
                          {lead.website ? (
                            <a
                              href={`https://${lead.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {lead.website as string}
                            </a>
                          ) : (
                            "Não possui"
                          )}
                        </div>
                      </div>
                      <div className="p-3 bg-surface-elevated border border-border-default rounded-lg">
                        <div className="text-[10px] text-text-muted uppercase tracking-wide mb-1">
                          Nicho
                        </div>
                        <div className="text-sm font-medium text-text-primary">
                          {(lead.niche as string) || "Desconhecido"}
                        </div>
                      </div>
                      <div className="p-3 bg-surface-elevated border border-border-default rounded-lg col-span-2">
                        <div className="text-[10px] text-text-muted uppercase tracking-wide mb-1">
                          Endereço
                        </div>
                        <div className="text-sm font-medium text-text-primary">
                          {(lead.address as string) ||
                            (lead.city as string) ||
                            "Não informado"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contatos" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4">
                    Lista de Contatos
                  </h4>

                  <div className="flex items-center gap-4 p-4 border border-border-default bg-surface-elevated rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-surface border border-border-strong flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-text-muted" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-text-primary mb-0.5">
                        {(lead.phone as string) || "Não encontrado"}
                      </div>
                      <div className="text-xs text-text-muted font-medium">
                        Telefone Principal
                      </div>
                    </div>
                    {hasWhatsapp && (
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
                        WhatsApp
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-border-default bg-surface-elevated rounded-xl opacity-50">
                    <div className="w-10 h-10 rounded-full bg-surface border border-border-strong flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-text-muted" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-text-primary mb-0.5">
                        E-mail não detectado
                      </div>
                      <div className="text-xs text-text-muted font-medium">
                        Caixa de entrada
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Sticky Actions Footer */}
            <div className="p-6 bg-surface border-t border-border-default flex gap-3 shrink-0">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white border-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Iniciar Conversa
                  </Button>
                </a>
              ) : (
                <div className="flex-1" title="Telefone indisponível">
                  <Button variant="outline" disabled className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Sem Número
                  </Button>
                </div>
              )}
              <Button variant="default" className="flex-1">
                Avançar Pipeline
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
