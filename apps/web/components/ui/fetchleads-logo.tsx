import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const brandAssets = {
  default: "/logonavbar.avif",
  searching: "/logoloading.telavazia.avif",
  loading: "/logoloading.telavazia.avif",
  processing: "/logoloading.telavazia.avif",
};

export type BrandState = "default" | "searching" | "loading" | "processing";

interface FetchLeadsLogoProps {
  className?: string;
  variant?: "default" | "icon" | "text-only";
  href?: string;
  state?: BrandState;
  href?: string | null; // Use null to disable link
}

export function FetchLeadsLogo({
  className,
  variant = "default",
  state = "default",
  href = "/",
}: FetchLeadsLogoProps) {
  const isAnimated = state !== "default";
  const src = brandAssets[state];
  
  // Adjusted sizes based on typical navbar logo dimensions vs loading states
  const width = state === "default" ? 140 : 180;
  const height = state === "default" ? 36 : 180;

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
    <div className={cn("relative flex items-center shrink-0", className)}>
      <Image
        src={src}
        alt={state === "default" ? "FetchLeads" : `FetchLeads ${state}...`}
        width={width}
        height={height}
        className={cn(
          "object-contain",
          isAnimated && "animate-pulse",
          state === "default" ? "h-6 sm:h-7 w-auto" : "h-32 w-auto" 
        )}
        priority
      />
    </div>
  );

  if (!href) {
    return (
      <div className={cn("flex items-center gap-2.5", className)}>
        {content}
      </div>
    );
    return content;
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
        className,
        "flex items-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md shrink-0",
      )}
    >
      {content}
    </Link>
  );
}
