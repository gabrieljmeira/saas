import Image from "next/image";
import Link from "next/link";
import { Users, Target, Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-text-primary">
      {/* BRANDING SIDE - Hidden on mobile */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface-elevated border-r border-border-default relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

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
            Encontre oportunidades.
            <br />
            Comece conversas.
          </h1>
          <p className="text-lg text-text-secondary mb-12 leading-relaxed">
            A plataforma B2B que centraliza prospecção, CRM e follow-ups em um
            único fluxo de trabalho ágil.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2.5 rounded-lg text-primary border border-primary/20">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  Prospecção Assertiva
                </h3>
                <p className="text-text-muted text-sm mt-1.5 leading-relaxed">
                  Dados de empresas locais capturados e organizados em segundos com ajuda de IA.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2.5 rounded-lg text-primary border border-primary/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">CRM Integrado</h3>
                <p className="text-text-muted text-sm mt-1.5 leading-relaxed">
                  Organize seus leads com um pipeline veloz feito para fechar vendas B2B.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-primary/10 p-2.5 rounded-lg text-primary border border-primary/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">
                  Ação 1-Clique
                </h3>
                <p className="text-text-muted text-sm mt-1.5 leading-relaxed">
                  Não perca tempo copiando contatos. Aborde diretamente pelo WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-text-muted font-medium">
          © {new Date().getFullYear()} FetchLeads. Todos os direitos reservados.
        </div>
      </div>

      {/* FORM SIDE */}
      <div className="flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-sm relative z-10">
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
