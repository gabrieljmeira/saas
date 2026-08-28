import { Target } from 'lucide-react'
import { Lead } from './mock-data'

interface DailyGoalProps {
  leads: Lead[]
}

export function DailyGoal({ leads }: DailyGoalProps) {
  const goal = 50
  // Para fins de demonstração, simulamos contatos = base 45 + número de contatos locais
  const contacted = leads.filter(l => l.status !== 'novo').length
  const current = Math.min(40 + contacted, goal)
  const percentage = Math.round((current / goal) * 100)
  
  return (
    <div className="flex flex-col gap-4 p-5 rounded-lg border border-border/50 bg-muted/20 h-full justify-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success-muted flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-medium">Meta Diária</h3>
          <p className="text-sm text-muted-foreground whitespace-normal">
            Faltam {goal - current} contatos para atingir a meta.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex justify-between text-sm items-center">
          <span className="font-medium text-foreground">{current} de {goal}</span>
          <span className="text-success font-medium">{percentage}%</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-success transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
