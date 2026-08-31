import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FetchLeadsLogoProps {
  className?: string;
  variant?: "default" | "icon" | "text-only";
  href?: string;
}

export function FetchLeadsLogo({ className, variant = "default", href = "/" }: FetchLeadsLogoProps) {
  const content = (
    <>
      {(variant === "default" || variant === "icon") && (
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm shrink-0">
          <span className="font-bold text-primary-foreground text-sm leading-none tracking-tight">
            FL
          </span>
        </div>
      )}
      {(variant === "default" || variant === "text-only") && (
        <span className="text-lg sm:text-xl font-bold text-text-primary tracking-tight">
          FetchLeads
        </span>
      )}
    </>
  );

  if (!href) {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        {content}
      </div>
    );
  }

  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-2.5 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
        className
      )}
    >
      {content}
    </Link>
  );
}
