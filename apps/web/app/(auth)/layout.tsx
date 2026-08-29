import Image from "next/image";
import Link from "next/link";
import { Users, Target, Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950 text-slate-100">
      {/* BRANDING SIDE - Hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 border-r border-slate-800 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <Image 
              src="/logonavbar.avif" 
              alt="FetchLeads Logo" 
              width={140} 
              height={32} 
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
            Encontre oportunidades.<br />Comece conversas.
          </h1>
          <p className="text-lg text-slate-400 mb-12">
            A plataforma B2B que centraliza prospecção, CRM e follow-ups em um único fluxo de trabalho ágil.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">Prospecção Assertiva</h3>
                <p className="text-slate-400 text-sm mt-1">Dados enriquecidos de empresas e tomadores de decisão em segundos.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">CRM Integrado</h3>
                <p className="text-slate-400 text-sm mt-1">Organize seus leads com um kanban veloz feito para quem vende.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-purple-500/10 p-2 rounded-lg text-purple-400 border border-purple-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">WhatsApp 1-Clique</h3>
                <p className="text-slate-400 text-sm mt-1">Não perca tempo salvando contatos. Aborde diretamente com seus templates.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500 font-medium">
          © {new Date().getFullYear()} FetchLeads. Todos os direitos reservados.
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/">
              <Image 
                src="/logonavbar.avif" 
                alt="FetchLeads Logo" 
                width={140} 
                height={32} 
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}
