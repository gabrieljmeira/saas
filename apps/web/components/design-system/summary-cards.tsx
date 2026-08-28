import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, PhoneCall, Clock, CheckCircle2 } from 'lucide-react'
import { Lead } from './mock-data'

interface SummaryCardsProps {
  leads: Lead[]
}

export function SummaryCards({ leads }: SummaryCardsProps) {
  const contacted = leads.filter(l => l.status !== 'novo' && l.status !== 'perdido').length
  const followUps = leads.filter(l => l.status === 'follow_up').length
  const closed = leads.filter(l => l.status === 'fechado').length

  const cards = [
    { title: 'Leads encontrados', value: leads.length, icon: Users, color: 'text-primary' },
    { title: 'Contatos realizados', value: contacted, icon: PhoneCall, color: 'text-foreground' },
    { title: 'Follow-ups pendentes', value: followUps, icon: Clock, color: 'text-warning' },
    { title: 'Vendas fechadas', value: closed, icon: CheckCircle2, color: 'text-success' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <Card key={idx} className="shadow-none border-border/60 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
