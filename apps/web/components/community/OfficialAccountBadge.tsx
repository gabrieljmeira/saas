import { BadgeCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type OfficialAccountBadgeVariant = "icon" | "compact" | "full";

interface OfficialAccountBadgeProps {
  variant?: OfficialAccountBadgeVariant;
  className?: string;
}

export function OfficialAccountBadge({
  variant = "icon",
  className = "",
}: OfficialAccountBadgeProps) {
  const icon = <BadgeCheck className="w-[1.1em] h-[1.1em] text-violet-400 fill-violet-900/50" />;

  const content = (
    <div
      className={`inline-flex items-center gap-1.5 align-middle ${
        variant !== "icon" 
          ? "px-2 py-0.5 bg-violet-500/10 border border-violet-400/20 rounded-full text-violet-300 text-xs font-medium" 
          : ""
      } ${className}`}
      aria-label="Conta oficial da equipe FetchLeads"
    >
      {icon}
      {variant === "full" && <span>Equipe FetchLeads</span>}
    </div>
  );

  return (
    <TooltipProvider delay={200}>
      <Tooltip>
        <TooltipTrigger>
          {variant === "icon" ? (
            <span className="inline-flex cursor-default">{content}</span>
          ) : (
            content
          )}
        </TooltipTrigger>
        <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200 text-xs">
          Conta oficial da equipe FetchLeads
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
