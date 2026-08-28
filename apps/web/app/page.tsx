import Link from "next/link";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">P</span>
            </div>
            <span>Prospecção.ai</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="#recursos"
              className="hover:text-foreground transition-colors"
            >
              Recursos
            </Link>
            <Link
              href="#como-funciona"
              className="hover:text-foreground transition-colors"
            >
              Como funciona
            </Link>
            <Link
              href="#precos"
              className="hover:text-foreground transition-colors"
            >
              Preços
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Entrar
            </Link>
            <Link href="/design-system">
              <Button className="rounded-full shadow-lg shadow-primary/20">
                Acessar Painel <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai/10 text-ai text-sm font-medium border border-ai/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Sparkles className="w-4 h-4" />
              <span>Inteligência Artificial para Vendas</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Transforme leads frios em <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                clientes fiéis com IA.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Automatize sua captação, enriqueça dados em tempo real e deixe
              nossa inteligência artificial sugerir a melhor abordagem para cada
              contato.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link href="/design-system">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-12 text-base shadow-xl shadow-primary/25"
                >
                  Ver demonstração
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base bg-background/50 backdrop-blur-sm"
                >
                  Criar conta grátis
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="recursos"
          className="py-24 bg-muted/30 border-y border-border/50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Tudo o que você precisa para prospectar
              </h2>
              <p className="text-muted-foreground">
                Diga adeus às planilhas bagunçadas. Nosso CRM foi desenhado para
                maximizar a conversão.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Captação Precisa</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Encontre empresas por nicho, cidade ou tecnologia usada no
                  site em questão de segundos.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-ai/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-ai/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-ai" />
                </div>
                <h3 className="text-xl font-semibold">Análise Inteligente</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A IA analisa a presença digital do lead e cria mensagens de
                  abordagem personalizadas e de alta conversão.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-success/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-success-muted flex items-center justify-center">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold">Ação Rápida</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Integração direta com WhatsApp para acionar o lead no momento
                  perfeito sem trocar de tela.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 bg-card">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xl font-bold opacity-80">
            <div className="w-6 h-6 rounded bg-muted-foreground flex items-center justify-center">
              <span className="text-background text-xs">P</span>
            </div>
            <span>Prospecção.ai</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prospecção SaaS. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Termos
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
