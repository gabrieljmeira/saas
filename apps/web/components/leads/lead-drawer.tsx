import { useEffect, useState, useTransition } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
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
  XCircle,
  Copy,
  Loader2,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { generateWhatsappUrl } from "@/lib/leads/whatsapp";
import { generateApproachAction } from "@/lib/leads/actions";

interface LeadDrawerProps {
  leadId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadDrawer({ leadId, open, onOpenChange }: LeadDrawerProps) {
  const [lead, setLead] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [approachMessage, setApproachMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // Fetch full details
  useEffect(() => {
    if (!open) {
      const resetTimer = setTimeout(() => {
        setLead(null);
        setApproachMessage("");
      }, 0);
      return () => clearTimeout(resetTimer);
    }

    setLoading(true);
    // Normally we'd use a Server Action to fetch details, let's create a quick fetch inside a Server Action or Route
    // Since I can't put db calls in Client Components, I will assume a server action `getLeadDetailsAction` exists.
    import("@/lib/leads/server-queries").then(mod => {
      mod.getLeadDetailsAction(leadId).then(data => {
        setLead(data as Record<string, unknown>);
        setLoading(false);
      });
    });
  }, [leadId, open]);

  const handleGenerateApproach = () => {
    startTransition(async () => {
      const res = await generateApproachAction(leadId);
      if (res.success && res.approach) {
        setApproachMessage(res.approach);
      }
    });
  };

  const normalizedPhone = lead?.normalizedPhone as string | undefined;
  const hasWhatsapp = lead?.hasWhatsapp as boolean | undefined;
  const whatsappUrl = normalizedPhone ? generateWhatsappUrl(normalizedPhone, approachMessage) : null;
  const leadScoreReasons = lead?.leadScoreReasons as unknown[];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto bg-background border-l border-border-default p-0 sm:p-0">
        {loading || !lead ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Header / Info */}
            <div className="p-6 md:p-8 bg-surface border-b border-border-default">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <SheetTitle className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                    {lead.name as string}
                    {(lead.rating as number) && (lead.rating as number) >= 4.5 && (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    )}
                  </SheetTitle>
                  <SheetDescription className="flex items-center gap-3 mt-2 text-text-muted">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {(lead.niche as string) || "Nicho desconhecido"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {(lead.city as string) || "Local não informado"}
                    </span>
                  </SheetDescription>
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Score</div>
                  <Badge variant="outline" className={`text-lg px-3 py-1 ${
                    (lead.leadScore as number) >= 70 ? 'border-primary/30 text-primary bg-primary/5' : 
                    (lead.leadScore as number) >= 40 ? 'border-orange-500/30 text-orange-500 bg-orange-500/5' : ''
                  }`}>
                    {(lead.leadScore as number) || 0}/100
                  </Badge>
                </div>
              </div>

              {/* Signals Row */}
              <div className="flex flex-wrap gap-2 mt-6">
                {lead.website ? (
                  <Badge variant="secondary" className="bg-surface-elevated font-normal gap-1 text-text-secondary">
                    <Globe className="w-3 h-3" /> Website
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive border-transparent font-normal gap-1">
                    <XCircle className="w-3 h-3" /> Sem Site
                  </Badge>
                )}
                {hasWhatsapp && (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-transparent font-normal gap-1">
                    <Smartphone className="w-3 h-3" /> WhatsApp
                  </Badge>
                )}
                {Boolean(lead.instagram) && (
                  <Badge variant="secondary" className="bg-pink-500/10 text-pink-500 border-transparent font-normal gap-1">
                    <Star className="w-3 h-3" /> Instagram
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 p-6 md:p-8 space-y-8">
              
              {/* Score Reasons */}
              {leadScoreReasons && Array.isArray(leadScoreReasons) && leadScoreReasons.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Análise do Score</h4>
                  <ul className="space-y-2">
                    {leadScoreReasons.map((r: unknown, i: number) => {
                      const reason = r as { label: string; impact: number };
                      return (
                      <li key={i} className="flex items-start justify-between text-sm text-text-muted bg-surface p-2 rounded border border-border-subtle">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          {reason.label}
                        </div>
                        <Badge variant="outline" className="text-xs bg-surface-elevated">
                          {reason.impact > 0 ? '+' : ''}{reason.impact}
                        </Badge>
                      </li>
                    )})}
                  </ul>
                </div>
              )}

              <Separator className="bg-border-default" />

              {/* Approach Generation */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Abordagem</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleGenerateApproach}
                    disabled={isPending}
                    className="h-8 text-xs bg-surface-elevated hover:bg-surface-hover hover:text-primary"
                  >
                    {isPending ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Sparkles className="w-3 h-3 mr-2 text-primary" />}
                    Gerar Mensagem com IA
                  </Button>
                </div>

                {approachMessage ? (
                  <div className="bg-surface-elevated border border-border-default rounded-lg p-4 relative group">
                    <p className="text-sm text-text-primary whitespace-pre-wrap">{approachMessage}</p>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                      onClick={() => navigator.clipboard.writeText(approachMessage)}
                    >
                      <Copy className="w-3 h-3 text-text-muted" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-text-muted p-4 bg-surface rounded-lg border border-border-dashed text-center">
                    Gere uma mensagem personalizada para iniciar o contato.
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-6 bg-surface border-t border-border-default flex gap-3">
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="outline" disabled={!normalizedPhone} className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {hasWhatsapp ? 'Abrir WhatsApp' : 'Testar WhatsApp'}
                  </Button>
                </a>
              ) : (
                <div className="flex-1" title="Telefone indisponível">
                  <Button variant="outline" disabled className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Sem Telefone
                  </Button>
                </div>
              )}
              <Button className="flex-1">
                Adicionar ao Pipeline
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
