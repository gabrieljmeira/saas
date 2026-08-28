import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Sparkles, Clock, Target } from 'lucide-react'
import { Lead } from './mock-data'

interface SummaryCardsProps {
  leads: Lead[]
}

export function SummaryCards({ leads }: SummaryCardsProps) {
  const followUps = leads.filter(l => l.status === 'follow_up').length
  const enriched = leads.filter(l => l.opportunityScore > 70).length // Simulando leads enriquecidos
  const totalLeads = leads.length
  
  const dailyGoal = 50
  const currentGoalProgress = Math.min(100, Math.round((totalLeads / dailyGoal) * 100))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Card: Leads Encontrados */}
      <Card className="shadow-none border-gray-800 bg-slate-900/50 backdrop-blur transition-all duration-300 hover:border-orange-500/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-xs font-medium text-gray-400">
            Leads Encontrados
          </CardTitle>
          <Users className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold text-white">{totalLeads}</div>
        </CardContent>
      </Card>

      {/* Card: Enriquecidos pela IA */}
      <Card className="shadow-none border-gray-800 bg-slate-900/50 backdrop-blur transition-all duration-300 hover:border-purple-500/50 relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-600/10 blur-2xl rounded-full"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 relative z-10">
          <CardTitle className="text-xs font-medium text-gray-400">
            Enriquecidos pela IA
          </CardTitle>
          <Sparkles className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent className="p-4 pt-0 relative z-10">
          <div className="text-2xl font-bold text-white">{enriched}</div>
        </CardContent>
      </Card>

      {/* Card: Follow-ups */}
      <Card className="shadow-none border-gray-800 bg-slate-900/50 backdrop-blur transition-all duration-300 hover:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-xs font-medium text-gray-400">
            Follow-ups Pendentes
          </CardTitle>
          <Clock className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-2xl font-bold text-white">{followUps}</div>
        </CardContent>
      </Card>

      {/* Card: Meta Diária */}
      <Card className="shadow-none border-gray-800 bg-slate-900/50 backdrop-blur transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-xs font-medium text-gray-400">
            Meta Diária (Leads)
          </CardTitle>
          <Target className={`h-4 w-4 ${currentGoalProgress >= 100 ? 'text-emerald-400' : 'text-orange-500'}`} />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-white">{totalLeads} / {dailyGoal}</span>
            <span className="text-xs font-medium text-gray-400">{currentGoalProgress}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full transition-all duration-1000 ${currentGoalProgress >= 100 ? 'bg-emerald-500' : 'bg-orange-500'}`}
              style={{ width: `${currentGoalProgress}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
