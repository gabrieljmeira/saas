import { cn } from "@/lib/utils";

interface DashboardSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "accent";
}

export function DashboardSurface({
  children,
  variant = "default",
  className,
  ...props
}: DashboardSurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-lg border relative overflow-hidden",
        variant === "default" && "bg-surface border-border-default shadow-sm",
        variant === "elevated" &&
          "bg-surface-elevated border-border-subtle shadow-md",
        variant === "accent" && "bg-surface border-primary/20 shadow-sm",
        className,
      )}
      {...props}
    >
      {variant === "accent" && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/50" />
      )}
      {children}
    </div>
  );
}
