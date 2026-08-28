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
        <span className="text-sm text-muted-foreground mr-2 font-medium shrink-0">
          Filtros:
        </span>
        {filterOptions.map((filter) => {
          const isActive = activeFilters.includes(filter.name);
          return (
            <Button
              key={filter.name}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleFilter(filter.name)}
              className={`rounded-full h-8 px-3 text-xs transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-background hover:bg-muted text-muted-foreground"
              }`}
            >
              <filter.icon className="w-3.5 h-3.5 mr-1.5" />
              {filter.name}
            </Button>
          );
        })}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-8 text-xs text-muted-foreground hover:text-foreground shrink-0"
          >
            Limpar todos
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground whitespace-nowrap shrink-0">
        {resultsCount} {resultsCount === 1 ? "lead" : "leads"}
      </div>
    </div>
  );
}
