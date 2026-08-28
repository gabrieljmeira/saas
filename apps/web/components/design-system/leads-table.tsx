'use client'

import { useState } from 'react'
import { Lead, LeadStatus } from './mock-data'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react'
import { LeadDetails } from './lead-details'

interface LeadsTableProps {
  leads: Lead[]
  onUpdateLead: (lead: Lead) => void
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const map: Record<string, { label: string, classes: string }> = {
    novo: { label: 'Novo', classes: 'bg-primary/10 text-primary border border-primary/20' },
    contatado: { label: 'Contatado', classes: 'bg-muted text-foreground border border-border/50' },
    aguardando: { label: 'Aguardando', classes: 'bg-muted text-muted-foreground border border-border/50' },
    follow_up: { label: 'Follow-up', classes: 'bg-warning-muted text-warning border border-warning/20' },
    proposta: { label: 'Proposta', classes: 'bg-primary/20 text-primary border border-primary/30' },
    fechado: { label: 'Fechado', classes: 'bg-success-muted text-success border border-success/30' },
    perdido: { label: 'Perdido', classes: 'bg-destructive/10 text-destructive border border-destructive/20' },
  }
  
  const config = map[status] || map.novo
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  )
}

function ScoreBadge({ score }: { score: number }) {
  let color = 'text-muted-foreground border-border/50'
  if (score >= 80) color = 'text-success border-success/30 bg-success-muted'
  else if (score >= 60) color = 'text-warning border-warning/30 bg-warning-muted'
  
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-8 h-8 rounded-full border flex items-center justify-center ${color}`}>
        <span className="text-xs font-bold">{score}</span>
      </div>
    </div>
  )
}

export function LeadsTable({ leads, onUpdateLead }: LeadsTableProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setMenuOpenId(prev => prev === id ? null : id)
  }

  const handleMarkContacted = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation()
    onUpdateLead({ ...lead, status: 'contatado' })
    setMenuOpenId(null)
  }

  const handleStatusChange = (e: React.MouseEvent, lead: Lead, status: LeadStatus) => {
    e.stopPropagation()
    onUpdateLead({ ...lead, status })
    setMenuOpenId(null)
  }

  return (
    <>
      <div className="rounded-lg border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-muted/30 uppercase border-b border-border/50">
              <tr>
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Oportunidade</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Próxima Ação</th>
                <th className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {leads.map(lead => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{lead.company}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5 whitespace-nowrap"><MapPin className="w-3 h-3" /> {lead.city}</span>
                      <span className="text-border hidden sm:inline">•</span>
                      <span className="hidden sm:inline">{lead.niche}</span>
                      <span className="text-border">•</span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        ⭐ {lead.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <ScoreBadge score={lead.opportunityScore} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-xs">
                    {lead.nextAction}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1 relative">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-success"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert('Demonstração: Abriria o WhatsApp neste momento.')
                        }}
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
                        onClick={(e) => toggleMenu(e, lead.id)}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>

                      {/* Dropdown Menu (Local Implementation) */}
                      {menuOpenId === lead.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setMenuOpenId(null); }} />
                          <div className="absolute right-0 top-10 mt-1 w-48 rounded-md shadow-lg bg-popover border border-border z-20 py-1 text-left animate-in fade-in zoom-in-95 duration-100">
                            {lead.status !== 'contatado' && (
                              <button 
                                className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-foreground flex items-center gap-2"
                                onClick={(e) => handleMarkContacted(e, lead)}
                              >
                                <CheckCircle2 className="w-4 h-4 text-success" />
                                Marcar contatado
                              </button>
                            )}
                            <button 
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-warning"
                              onClick={(e) => handleStatusChange(e, lead, 'follow_up')}
                            >
                              Mover p/ Follow-up
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2 text-sm hover:bg-muted text-destructive"
                              onClick={(e) => handleStatusChange(e, lead, 'perdido')}
                            >
                              Marcar como Perdido
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {selectedLead && (
        <LeadDetails 
          lead={selectedLead} 
          onClose={() => setSelectedLead(null)} 
          onUpdateLead={(l) => {
            onUpdateLead(l)
            setSelectedLead(l)
          }}
        />
      )}
    </>
  )
}
