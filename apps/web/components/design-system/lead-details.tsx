import { Lead } from './mock-data'
import { X, MapPin, Star, Globe, Camera, MessageCircle, Check, AlertCircle, Sparkles, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LeadDetailsProps {
  lead: Lead
  onClose: () => void
  onUpdateLead: (lead: Lead) => void
}

export function LeadDetails({ lead, onClose, onUpdateLead }: LeadDetailsProps) {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(lead.suggestedApproach)
    alert('Mensagem copiada para a área de transferência!')
  }

  const handleMarkContacted = () => {
    onUpdateLead({ ...lead, status: 'contatado' })
  }

  const handleWhatsApp = () => {
    alert(`Redirecionando para WhatsApp com a mensagem: \n\n"${lead.suggestedApproach}"`)
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-card border-l border-border shadow-2xl z-50 flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/95 backdrop-blur shrink-0">
          <h2 className="font-semibold text-lg">Detalhes do Lead</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Cabeçalho do Lead */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">{lead.company}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {lead.city}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-warning" /> {lead.rating} ({lead.reviews})</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${lead.hasWebsite ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground border-border/50'}`}>
                <Globe className="w-3.5 h-3.5" /> Site
              </span>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${lead.hasInstagram ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border/50'}`}>
                <Camera className="w-3.5 h-3.5" /> Instagram
              </span>
            </div>
          </div>
          
          {/* Oportunidade */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TargetScore score={lead.opportunityScore} />
                <div>
                  <div className="font-medium text-sm">Score de Oportunidade</div>
                  <div className="text-xs text-muted-foreground">Avaliação baseada na presença digital</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Motivos:</div>
              <ul className="space-y-1">
                {lead.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sugestão de Abordagem IA */}
          {lead.suggestedApproach && (
            <div className="bg-ai-muted/10 rounded-lg p-4 border border-ai/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ai/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              
              <div className="flex items-center gap-2 mb-3 text-ai font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Abordagem Sugerida</span>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                &quot;{lead.suggestedApproach}&quot;
              </p>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" className="text-ai hover:text-ai-foreground hover:bg-ai/10 h-8 text-xs" onClick={handleCopy}>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copiar mensagem
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Ações Fixas no Rodapé */}
        <div className="p-4 border-t border-border/50 bg-card shrink-0 flex flex-col gap-3">
          <Button className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a]" onClick={handleWhatsApp}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Abrir WhatsApp
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleMarkContacted}
            disabled={lead.status === 'contatado'}
          >
            <Check className="w-4 h-4 mr-2" />
            {lead.status === 'contatado' ? 'Já contatado' : 'Marcar como Contatado'}
          </Button>
        </div>
      </div>
    </>
  )
}

function TargetScore({ score }: { score: number }) {
  let color = 'text-muted-foreground'
  let stroke = 'stroke-muted'
  
  if (score >= 80) { color = 'text-success'; stroke = 'stroke-success' }
  else if (score >= 60) { color = 'text-warning'; stroke = 'stroke-warning' }
  
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="stroke-muted/30"
          strokeWidth="3"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className={`${stroke} transition-all duration-1000 ease-out`}
          strokeWidth="3"
          strokeDasharray={`${score}, 100`}
          fill="none"
          strokeLinecap="round"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span className={`absolute text-xs font-bold ${color}`}>{score}</span>
    </div>
  )
}
