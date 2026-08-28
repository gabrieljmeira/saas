import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { legalConfig } from "@/lib/legal/legal-config";

export function LegalLayout({ 
  children, 
  title 
}: { 
  children: React.ReactNode; 
  title: string;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-purple-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold">
            <Image 
              src="/logonavbar.avif" 
              alt={`${legalConfig.brandName} Logo`}
              width={24} 
              height={24} 
              className="rounded-md object-contain"
            />
            <span className="text-white tracking-tight">{legalConfig.brandName}</span>
          </Link>
          <Link href="/" className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o site
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <div className="mb-10 border-b border-slate-800 pb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
          <p className="text-sm text-slate-500">Última atualização: {legalConfig.lastUpdated}</p>
        </div>
        
        <div className="prose prose-invert prose-slate max-w-none prose-headings:text-white prose-a:text-purple-400 hover:prose-a:text-purple-300 prose-strong:text-slate-200">
          {children}
        </div>
      </main>

      <footer className="py-8 border-t border-slate-800/80 bg-slate-950 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {legalConfig.brandName}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
