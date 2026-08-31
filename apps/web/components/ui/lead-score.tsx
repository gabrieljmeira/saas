import { cn } from "@/lib/utils";
import { Zap, Flame, ShieldAlert, CheckCircle2 } from "lucide-react";

interface LeadScoreProps {
  score: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function LeadScore({ score, className, size = "md", showLabel = false }: LeadScoreProps) {
  // Score logic
  const isHigh = score >= 80;
  const isMedium = score >= 50 && score < 80;
  const isLow = score < 50;

  const getColors = () => {
    if (isHigh) return "bg-success/10 text-success border-success/20";
    if (isMedium) return "bg-accent/10 text-accent border-accent/20";
    return "bg-text-muted/10 text-text-muted border-border-default";
  };

  const getIcon = () => {
    if (isHigh) return <Flame className="w-full h-full fill-current" />;
    if (isMedium) return <Zap className="w-full h-full" />;
    return <ShieldAlert className="w-full h-full" />;
  };

  const getLabel = () => {
    if (isHigh) return "Alta Oportunidade";
    if (isMedium) return "Oportunidade Média";
    return "Baixa Prioridade";
  };

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px] gap-1",
    md: "px-2 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      <div 
        className={cn(
          "inline-flex items-center font-bold rounded-md border",
          getColors(),
          sizeClasses[size]
        )}
      >
        <div className={iconSizes[size]}>
          {getIcon()}
        </div>
        <span>{score}</span>
      </div>
      {showLabel && (
        <span className={cn(
          "text-text-muted font-medium",
          size === "sm" ? "text-[9px]" : size === "md" ? "text-[10px]" : "text-xs"
        )}>
          {getLabel()}
        </span>
      )}
    </div>
  );
}
