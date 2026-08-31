const fs = require('fs');
const path = 'apps/web/app/page.tsx';
const content = fs.readFileSync(path, 'utf8');

const comoFuncionaIdx = content.indexOf('        {/* Como Funciona Section */}');

if (comoFuncionaIdx === -1) {
  console.log('Could not find Como Funciona section');
  process.exit(1);
}

const topContent = `import Link from 'next/link';
import {
  ArrowRight,
  Search,
  MessageSquare,
  Target,
  Users,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  BrainCircuit,
  BarChart3,
  Check,
  X,
  ExternalLink,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FetchLeadsLogo } from '@/components/ui/fetchleads-logo';

export default function Home() {
  return (
    <div className="dark min-h-screen flex flex-col bg-background text-text-primary selection:bg-primary/30 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border-default bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <FetchLeadsLogo />
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-text-secondary">
            <Link href="#produto" className="hover:text-text-primary transition-colors">
              Produto
            </Link>
            <Link href="#como-funciona" className="hover:text-text-primary transition-colors">
              Como funciona
            </Link>
            <Link href="#precos" className="hover:text-text-primary transition-colors">
              Preços
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Entrar
            </Link>
            <Link href="/signup">
              <Button className="h-9 px-4 text-sm font-medium shadow-sm">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 lg:pt-24 lg:pb-32 overflow-hidden border-b border-border-default">
          {/* Subtle tech background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Copy & CTAs */}
              <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border-default text-xs font-medium text-primary mb-6">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Prospecção para freelancers e agências
                </div>
                
                <h1 className="text-[40px] sm:text-[48px] lg:text-[64px] font-bold tracking-tight text-text-primary leading-[1.1] mb-6">
                  Encontre oportunidades.<br className="hidden sm:block" />
                  <span className="text-text-secondary">Comece conversas.</span>
                </h1>
                
                <p className="text-base sm:text-lg text-text-muted mb-8 leading-relaxed max-w-[540px]">
                  Busque empresas por nicho e região, identifique as melhores oportunidades e inicie uma abordagem via <span className="text-[#25D366] font-medium">WhatsApp</span> sem perder tempo pesquisando.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-medium shadow-lg shadow-primary/20">
                      Começar grátis
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="#produto" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-medium bg-surface/50 backdrop-blur-sm">
                      Ver como funciona
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center gap-6 text-sm text-text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Sem cartão de crédito
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Setup em 1 minuto
                  </div>
                </div>
              </div>

              {/* Right Column: Product Preview */}
              <div id="produto" className="relative mx-auto w-full max-w-[600px] lg:max-w-none animate-in fade-in zoom-in-95 duration-1000 delay-150 mt-4 lg:mt-0">
                {/* Decorative Elements */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-primary/20 via-border-default to-transparent rounded-2xl blur-lg opacity-50" />
                
                {/* Product UI Mock */}
                <div className="relative rounded-xl border border-border-default bg-background shadow-2xl overflow-hidden flex flex-col">
                  {/* Mock Window Header */}
                  <div className="h-10 border-b border-border-default bg-surface flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-border-strong" />
                      <div className="w-3 h-3 rounded-full bg-border-strong" />
                      <div className="w-3 h-3 rounded-full bg-border-strong" />
                    </div>
                    <div className="mx-auto bg-background border border-border-default rounded-md px-3 py-1 text-[10px] text-text-muted font-mono flex items-center gap-2">
                      <Search className="w-3 h-3" />
                      Restaurantes em São Paulo
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="p-4 sm:p-6 bg-background space-y-4">
                    {/* Search Params */}
                    <div className="flex gap-2 mb-6">
                      <div className="bg-surface border border-border-default rounded text-xs px-2 py-1 text-text-secondary">Nicho: Restaurantes</div>
                      <div className="bg-surface border border-border-default rounded text-xs px-2 py-1 text-text-secondary">Local: São Paulo, SP</div>
                    </div>

                    {/* Result Card */}
                    <div className="border border-primary/20 rounded-lg p-4 bg-surface-elevated relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-text-primary text-base sm:text-lg">Bistrô Exemplo (Demo)</h3>
                          <p className="text-xs text-text-muted">R. Fictícia, 123 - São Paulo</p>
                        </div>
                        {/* Lead Score */}
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5 bg-success/10 text-success px-2 py-1 rounded border border-success/20">
                            <Zap className="w-3.5 h-3.5 fill-success" />
                            <span className="text-xs font-bold">Score 87</span>
                          </div>
                          <span className="text-[10px] text-text-muted mt-1">Alta oportunidade</span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <Target className="w-3.5 h-3.5 text-success" />
                            <span>Sem site próprio detectado</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <MessageSquare className="w-3.5 h-3.5 text-success" />
                            <span>WhatsApp comercial ativo</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <Users className="w-3.5 h-3.5 text-primary" />
                            <span>Boa presença local (Google)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-border-default">
                        <Button size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs gap-1.5 h-8 w-full sm:w-auto">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Abordar no WhatsApp
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs h-8 hidden sm:flex">
                          Ver análise
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating tooltips/decorators */}
                <div className="absolute -right-4 top-16 bg-surface border border-border-strong rounded-lg p-3 shadow-xl hidden sm:block animate-in fade-in slide-in-from-right-8 duration-700 delay-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-medium text-text-primary">12 novos leads na região</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

`;

const bottomContent = content.substring(comoFuncionaIdx);
fs.writeFileSync(path, topContent + bottomContent);
console.log('Successfully updated page.tsx');
