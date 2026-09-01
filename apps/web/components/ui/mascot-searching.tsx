"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import mascotLoadingImg from "@/public/mascot-loading.jpg";

interface MascotSearchingProps {
  className?: string;
}

export function MascotSearching({ className }: MascotSearchingProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image
        src={mascotLoadingImg}
        alt="Buscando oportunidades"
        className="object-contain w-full h-full relative z-10"
        priority
      />
      {/* Decorative scan pulse effect matching the neon green of the image */}
      <div className="absolute bottom-0 w-3/4 h-1 bg-[#25D366] blur-sm animate-pulse rounded-full opacity-60 mix-blend-screen" />
    </div>
  );
}
