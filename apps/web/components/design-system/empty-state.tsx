import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface EmptyStateProps {
  onClear: () => void
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-800 rounded-lg bg-slate-900/30">
      <div className="relative w-32 h-32 mb-6">
        <Image 
          src="/mascot-loading.jpg" 
          alt="Mascote Farejando"
          fill
          className="object-contain rounded-lg opacity-80 mix-blend-screen"
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Nenhuma pista por aqui.</h3>
      <p className="text-sm text-gray-400 max-w-sm mb-6">
        Vamos farejar novas oportunidades? Limpe os filtros ou inicie uma nova busca.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-slate-800 hover:text-white" onClick={onClear}>
          Limpar Filtros
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg shadow-orange-500/20">
          <Search className="w-4 h-4 mr-2" />
          Farejar Leads
        </Button>
      </div>
    </div>
  )
}
