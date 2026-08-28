import { FolderSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onClear: () => void
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border/60 rounded-lg bg-card/20">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <FolderSearch className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-1">Nenhum lead encontrado</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        Não conseguimos encontrar nenhum lead que corresponda aos filtros atuais. Tente ajustar os parâmetros de busca.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onClear}>Limpar Filtros</Button>
      </div>
    </div>
  )
}
