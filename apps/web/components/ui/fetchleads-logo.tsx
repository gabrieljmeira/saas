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
  state?: BrandState;
  href?: string | null; // Use null to disable link
}

export function FetchLeadsLogo({
  className,
  state = "default",
  href = "/",
}: FetchLeadsLogoProps) {
  const isAnimated = state !== "default";
  const src = brandAssets[state];
  
  // Adjusted sizes based on typical navbar logo dimensions vs loading states
  const width = state === "default" ? 140 : 180;
  const height = state === "default" ? 36 : 180;

  const content = (
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
    return content;
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md shrink-0",
      )}
    >
      {content}
    </Link>
  );
}
