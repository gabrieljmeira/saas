import { cn } from "@/lib/utils";
import { Zap, Flame, ShieldAlert, CheckCircle2 } from "lucide-react";

interface LeadScoreProps {
  score: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function LeadScore({
  score,
  className,
  size = "md",
  showLabel = false,
}: LeadScoreProps) {
  // Score logic (0-29: baixo, 30-59: moderado, 60-79: alta, 80-100: qualificado)
  const isQualified = score >= 80;
  const isHigh = score >= 60 && score < 80;
  const isMedium = score >= 30 && score < 60;
  const isLow = score < 30;

  const getColors = () => {
    if (isQualified) return "bg-primary/10 text-primary border-primary/20";
    if (isHigh) return "bg-accent/10 text-accent border-accent/20";
    if (isMedium) return "bg-warning/10 text-warning border-warning/20";
    return "bg-text-muted/10 text-text-muted border-border-default";
  };

  const getIcon = () => {
    if (isQualified)
      return <CheckCircle2 className="w-full h-full fill-current/20" />;
    if (isHigh) return <Flame className="w-full h-full fill-current/20" />;
    if (isMedium) return <Zap className="w-full h-full" />;
    return <ShieldAlert className="w-full h-full" />;
  };

  const getLabel = () => {
    if (isQualified) return "Qualificado";
    if (isHigh) return "Alta Oportunidade";
    if (isMedium) return "Potencial Moderado";
    return "Baixo Potencial";
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
          "inline-flex items-center font-bold rounded-md border uppercase tracking-wide",
          getColors(),
          sizeClasses[size],
        )}
      >
        <div className={iconSizes[size]}>{getIcon()}</div>
        <span>{score}</span>
      </div>
      {showLabel && (
        <span
          className={cn(
            "text-text-muted font-medium",
            size === "sm"
              ? "text-[9px]"
              : size === "md"
                ? "text-[10px]"
                : "text-xs",
          )}
        >
          {getLabel()}
        </span>
      )}
    </div>
  );
}
