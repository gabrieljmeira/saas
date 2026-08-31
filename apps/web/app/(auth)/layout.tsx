import Image from "next/image";
import Link from "next/link";
import { Target, Users, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] grid lg:grid-cols-[1.1fr_0.9fr] bg-background text-text-primary dark">
      {/* BRANDING SIDE - Hidden on small mobile, simplified on tablet */}
      <div className="hidden md:flex flex-col justify-between p-8 lg:p-12 xl:p-16 bg-surface-elevated border-r border-border-default relative overflow-hidden">
        {/* Deep, modern background glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
            <Image
              src="/logonavbar.avif"
              alt="FetchLeads"
              width={160}
              height={36}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </Link>
        </div>

        <div className="relative z-10 mt-auto mb-auto max-w-xl pr-8">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
            Encontre oportunidades.<br />
            <span className="text-text-secondary">Comece conversas.</span>
          </h1>
          <p className="text-base lg:text-lg text-text-muted mb-12 max-w-md leading-relaxed">
            Da descoberta ao fechamento, organize sua prospecção em um único fluxo de trabalho inteligente.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border-default text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary text-sm lg:text-base">Prospecção inteligente</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border-default text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary text-sm lg:text-base">CRM integrado</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border-default text-primary group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary text-sm lg:text-base">WhatsApp em 1 clique</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs lg:text-sm text-text-muted/60 mt-8 flex justify-between items-center">
          <span>&copy; {new Date().getFullYear()} FetchLeads</span>
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex flex-col relative w-full h-[100dvh] overflow-y-auto">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-border-default bg-surface/50 backdrop-blur-md sticky top-0 z-20">
          <Link href="/">
            <Image
              src="/logonavbar.avif"
              alt="FetchLeads"
              width={140}
              height={32}
              className="h-6 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 w-full max-w-[480px] mx-auto z-10">
          {children}
        </div>
        
        {/* Mobile footer for legal */}
        <div className="md:hidden p-6 text-center text-xs text-text-muted mt-auto">
          &copy; {new Date().getFullYear()} FetchLeads
        </div>
      </div>
    </div>
  );
}
