import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Globe, AlertCircle, Clock } from "lucide-react";

interface FiltersProps {
  activeFilters: string[];
  onToggleFilter: (name: string) => void;
  onClear: () => void;
  resultsCount: number;
}

export function Filters({
  activeFilters,
  onToggleFilter,
  onClear,
  resultsCount,
}: FiltersProps) {
  const filterOptions = [
    { name: "Gravataí", icon: MapPin },
    { name: "Novo", icon: Briefcase },
    { name: "Sem site", icon: Globe },
    { name: "Alta Prioridade", icon: AlertCircle },
    { name: "Follow-up", icon: Clock },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-400 mr-2 font-medium shrink-0">
          Filtros Sugeridos:
        </span>
        {filterOptions.map((filter) => {
          const isActive = activeFilters.includes(filter.name);
          return (
            <Button
              key={filter.name}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleFilter(filter.name)}
              className={`rounded-full h-8 px-3 text-xs transition-colors duration-300 border-gray-700 ${
                isActive
                  ? "bg-orange-500 text-white hover:bg-orange-600 border-transparent shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                  : "bg-slate-900/50 hover:bg-slate-800 text-gray-300 hover:text-white"
              }`}
            >
              <filter.icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-white' : 'text-orange-500'}`} />
              {filter.name}
            </Button>
          );
        })}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 text-xs text-gray-400 hover:text-white shrink-0 hover:bg-slate-800"
          >
            Limpar todos
          </Button>
        )}
      </div>

      <div className="text-sm text-gray-400 whitespace-nowrap shrink-0">
        <strong className="text-white">{resultsCount}</strong> {resultsCount === 1 ? "lead farejado" : "leads farejados"}
      </div>
    </div>
  );
}
