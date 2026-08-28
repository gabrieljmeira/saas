import Link from "next/link";
import { 
  ArrowRight, 
  Search, 
  Sparkles, 
  MessageSquare, 
  Target, 
  BrainCircuit, 
  Users, 
  BarChart3, 
  Check, 
  X,
  Dog,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-orange-500/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Dog className="w-5 h-5 text-white" />
            </div>
            <span className="text-white">FetchLeads</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
            <Link href="#produto" className="hover:text-white transition-colors">Produto</Link>
            <Link href="#como-funciona" className="hover:text-white transition-colors">Como funciona</Link>
            <Link href="#comunidade" className="hover:text-white transition-colors">Comunidade</Link>
            <Link href="#precos" className="hover:text-white transition-colors">Preços</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
              Entrar
            </Link>
            <Link href="/login">
              <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-500/20">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Target className="w-4 h-4 text-orange-500" />
              <span>Prospecção inteligente para freelancers e agências</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-white">
              Encontre empresas que precisam do seu serviço.<br />
              <span className="text-orange-500">Aborde pelo WhatsApp em 1 clique.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Busque empresas por nicho e região, identifique oportunidades com IA e receba uma abordagem personalizada pronta para iniciar a conversa.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 mb-20">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 h-12 text-base bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-xl shadow-orange-500/25">
                  Começar grátis
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-slate-900 border-slate-700 text-white hover:bg-slate-800 hover:text-white">
                  Ver como funciona
                </Button>
              </Link>
            </div>

            {/* Hero Visual Mockup */}
            <div id="produto" className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300 font-medium">Restaurantes • Porto Alegre</span>
                </div>
                <div className="text-sm text-orange-500 font-medium bg-orange-500/10 px-3 py-1 rounded-full">
                  47 oportunidades encontradas
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Mockup Card */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Bistrô Sabor Sul</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/20">
                        Score 91/100
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                      <span className="flex items-center gap-1"><X className="w-4 h-4 text-rose-500" /> Sem site próprio</span>
                      <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> Instagram ativo</span>
                      <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> 382 avaliações</span>
                    </div>
                    <div className="flex items-start gap-2 bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-purple-200">
                        <strong className="text-purple-300">Insight IA:</strong> Boa oportunidade para oferecer uma landing page focada em pedidos e melhorar a presença no Google Meu Negócio.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Button variant="outline" className="bg-slate-900 border-slate-700 hover:bg-slate-800 text-white">
                      Ver análise
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg shadow-emerald-900/20">
                      WhatsApp <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 border-y border-slate-800/50 bg-slate-900/30">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">
              Feito para quem vende serviços para negócios locais
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-slate-500 font-medium">
              <span>Desenvolvedores Freelancers</span>
              <span>Web Designers</span>
              <span>Pequenas Agências</span>
              <span>Gestores de Tráfego</span>
              <span>Social Media</span>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="py-24 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Como o FetchLeads funciona
              </h2>
              <p className="text-lg text-slate-400">
                O fluxo mais rápido entre descobrir um negócio local e enviar a primeira mensagem de vendas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-slate-800 -translate-y-1/2 z-0" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-lg mb-6">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Encontre oportunidades</h3>
                <p className="text-slate-400">
                  Escolha uma cidade, região ou nicho e encontre empresas que podem precisar do seu serviço.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-lg mb-6">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Entenda o lead</h3>
                <p className="text-slate-400">
                  O FetchLeads analisa os sinais digitais do negócio e destaca onde existe oportunidade (ex: sem site, Instagram inativo).
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-lg mb-6">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Comece a conversa</h3>
                <p className="text-slate-400">
                  Receba uma abordagem personalizada e abra o WhatsApp sem perder tempo copiando dados entre ferramentas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos Principais */}
        <section className="py-24 bg-slate-900 border-y border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Os recursos que você precisa para vender mais
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                <Search className="w-6 h-6 text-orange-500 mb-2" />
                <h3 className="text-lg font-semibold text-white">Busca inteligente de empresas</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Encontre potenciais clientes por nicho, cidade e outros critérios disponíveis no produto.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                <Target className="w-6 h-6 text-orange-500 mb-2" />
                <h3 className="text-lg font-semibold text-white">Lead Score</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Priorize quem parece ter maior potencial em vez de abordar empresas aleatoriamente.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-colors">
                <BrainCircuit className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="text-lg font-semibold text-white">Análise com IA</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Entenda rapidamente os pontos da presença digital que podem virar argumentos comerciais.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 transition-colors">
                <Sparkles className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="text-lg font-semibold text-white">Abordagem personalizada</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Gere uma primeira mensagem contextualizada para cada oportunidade baseada na análise.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-colors">
                <MessageSquare className="w-6 h-6 text-emerald-500 mb-2" />
                <h3 className="text-lg font-semibold text-white">WhatsApp em 1 clique</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Saia da análise para a conversa sem precisar copiar telefone e mensagem manualmente.
                </p>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                <BarChart3 className="w-6 h-6 text-orange-500 mb-2" />
                <h3 className="text-lg font-semibold text-white">Mini CRM</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Acompanhe quem foi contatado, quem respondeu, envie follow-ups e feche mais vendas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comunidade */}
        <section id="comunidade" className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-orange-400 text-sm font-medium border border-orange-500/20 mb-6">
                <Users className="w-4 h-4" />
                <span>Feature de Retenção</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                A Matilha
              </h2>
              <p className="text-xl text-orange-400 mb-6">
                Aprenda com quem também está prospectando.
              </p>
              <ul className="space-y-4 text-slate-400 mb-8">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500" /> Troque estratégias e templates de abordagem.</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500" /> Veja resultados de prospecção compartilhados.</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-emerald-500" /> Converse com outros freelancers e donos de agência.</li>
              </ul>
              <Link href="/login">
                <Button className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">
                  Fazer parte
                </Button>
              </Link>
            </div>
            <div className="flex-1 w-full max-w-lg">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">GS</div>
                  <div>
                    <h4 className="font-semibold text-white">Gabriel Silva <span className="text-xs text-emerald-500 ml-2">✓ Fechou venda</span></h4>
                    <p className="text-sm text-slate-400">Web Designer</p>
                  </div>
                </div>
                <p className="text-slate-300 italic mb-4">
                  "Usei o filtro de 'Restaurantes sem site' e mandei a mensagem gerada pela IA sugerindo um cardápio digital. Fechei um contrato de R$ 1.500 no mesmo dia!"
                </p>
                <div className="text-xs text-slate-500">Há 2 horas • A Matilha</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-32 bg-orange-500 relative overflow-hidden">
          {/* Subtle pattern or glow */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white max-w-3xl mx-auto">
              Pare de procurar clientes no escuro.
            </h2>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-10">
              Encontre oportunidades, saiba quem abordar e comece a conversa sem sair do FetchLeads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 h-12 text-base bg-slate-950 text-white hover:bg-slate-900 border-0 shadow-xl shadow-slate-950/20">
                  Começar grátis
                </Button>
              </Link>
              <Link href="#como-funciona">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-transparent border-white/30 text-white hover:bg-white/10">
                  Ver como funciona
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
                <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
                  <Dog className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white">FetchLeads</span>
              </Link>
              <p className="text-slate-400 text-sm">
                Prospecção inteligente para quem vende serviços.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#recursos" className="hover:text-orange-500 transition-colors">Recursos</Link></li>
                <li><Link href="#como-funciona" className="hover:text-orange-500 transition-colors">Como funciona</Link></li>
                <li><Link href="#precos" className="hover:text-orange-500 transition-colors">Preços</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#comunidade" className="hover:text-orange-500 transition-colors">Comunidade</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="/termos" className="hover:text-orange-500 transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-orange-500 transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2026 FetchLeads. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
