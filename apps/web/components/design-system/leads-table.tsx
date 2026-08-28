import { useState } from 'react'
import { MoreHorizontal, MessageCircle, MapPin, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeadDetails } from './lead-details'
import { Lead, LeadStatus } from './mock-data'

interface LeadsTableProps {
  leads: Lead[]
  onUpdateLead: (lead: Lead) => void
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const map: Record<string, { label: string, classes: string }> = {
    novo: { label: 'Novo', classes: 'bg-orange-500/10 text-orange-500 border border-orange-500/20' },
    contatado: { label: 'Contatado', classes: 'bg-slate-800 text-gray-300 border border-gray-700' },
    aguardando: { label: 'Aguardando', classes: 'bg-slate-800 text-gray-400 border border-gray-700' },
    follow_up: { label: 'Follow-up', classes: 'bg-orange-500/10 text-orange-400 border border-orange-500/20' },
    proposta: { label: 'Proposta', classes: 'bg-purple-500/10 text-purple-400 border border-purple-500/30' },
    fechado: { label: 'Fechado', classes: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' },
    perdido: { label: 'Perdido', classes: 'bg-red-500/10 text-red-400 border border-red-500/20' },
  }
  
  const config = map[status] || map.novo
  
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.classes}`}>
      {config.label}
    </span>
  )
}

function ScoreBadge({ score }: { score: number }) {
  let color = 'text-gray-400 border-gray-700 bg-slate-800'
  if (score >= 80) color = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
  else if (score >= 50) color = 'text-orange-500 border-orange-500/30 bg-orange-500/10'
  
  return (
    <div className={`w-9 h-9 rounded-full border flex items-center justify-center ${color}`}>
      <span className="text-xs font-bold">{score}</span>
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
      <div className="rounded-xl border border-gray-800 bg-slate-900/50 backdrop-blur overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 bg-slate-900 uppercase border-b border-gray-800 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Empresa</th>
                <th className="px-6 py-4 hidden sm:table-cell text-center">Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 hidden md:table-cell">IA Insight ✨</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {leads.map(lead => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer group"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-white group-hover:text-orange-500 transition-colors">{lead.company}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-400">
                      <span className="flex items-center gap-1 whitespace-nowrap"><MapPin className="w-3.5 h-3.5 text-gray-500" /> {lead.city}</span>
                      <span className="text-gray-700 hidden sm:inline">•</span>
                      <span className="hidden sm:inline bg-slate-800 px-2 py-0.5 rounded-md text-[10px] uppercase font-semibold tracking-wider">{lead.niche}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-center">
                    <div className="flex justify-center">
                      <ScoreBadge score={lead.opportunityScore} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {/* Exibe um insight fictício se não tiver site, senão exibe um texto padrão */}
                    {!lead.hasWebsite ? (
                      <div className="flex items-start gap-2 max-w-[200px]">
                        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-purple-300 leading-tight">Sem site. Oferecer Catálogo Digital.</span>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">Nenhum alerta.</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative">
                      <Button 
                        size="sm" 
                        className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white font-medium shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                          alert('Disparando WhatsApp (Demo)...')
                        }}
                      >
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        <span className="hidden xl:inline">WhatsApp</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:bg-slate-800 hover:text-white transition-colors"
                        onClick={(e) => toggleMenu(e, lead.id)}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>

                      {/* Dropdown Menu (Local Implementation) */}
                      {menuOpenId === lead.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setMenuOpenId(null); }} />
                          <div className="absolute right-0 top-10 mt-1 w-48 rounded-lg shadow-xl bg-slate-800 border border-gray-700 z-20 py-1.5 text-left animate-in fade-in zoom-in-95 duration-200">
                            {lead.status !== 'contatado' && (
                              <button 
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 text-white flex items-center gap-2 transition-colors"
                                onClick={(e) => handleMarkContacted(e, lead)}
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                Marcar contatado
                              </button>
                            )}
                            <button 
                              className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 text-orange-400 transition-colors"
                              onClick={(e) => handleStatusChange(e, lead, 'follow_up')}
                            >
                              Mover p/ Follow-up
                            </button>
                            <button 
                              className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-700 text-red-400 transition-colors"
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
