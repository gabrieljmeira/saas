import Link from "next/link";
import Image from "next/image";
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
  ExternalLink,
  ShieldCheck,
  FileText,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-purple-500/30 font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold">
            <Image 
              src="/logonavbar.avif" 
              alt="FetchLeads Logo" 
              width={28} 
              height={28} 
              className="rounded-md object-contain"
              priority
            />
            <span className="text-white tracking-tight">FetchLeads</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <Link href="#produto" className="hover:text-white transition-colors">Produto</Link>
            <Link href="#como-funciona" className="hover:text-white transition-colors">Como funciona</Link>
            <Link href="#comunidade" className="hover:text-white transition-colors">Comunidade</Link>
            <Link href="#precos" className="hover:text-white transition-colors">Preços</Link>
          </nav>
          <div className="flex items-center gap-5">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden sm:block">
              Entrar
            </Link>
            <Link href="/login">
              <Button className="rounded-full bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-lg shadow-purple-600/20 font-medium px-5">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 text-slate-300 text-xs sm:text-sm font-medium border border-slate-800 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Prospecção inteligente para freelancers e agências</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-white leading-tight">
              Encontre empresas que precisam do seu serviço.<br />
              <span className="block mt-2">
                Aborde pelo <span className="inline-flex items-center text-emerald-500 gap-2">WhatsApp <MessageSquare className="w-8 h-8 md:w-12 md:h-12 hidden sm:inline" /></span>{" "}
                <span className="text-purple-400">em 1 clique.</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed">
              Busque empresas por nicho e região, identifique oportunidades com IA e receba uma abordagem personalizada pronta para iniciar a conversa.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 mb-20 w-full sm:w-auto">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium bg-purple-600 hover:bg-purple-700 text-white border-0 shadow-xl shadow-purple-600/25">
                  Começar grátis
                </Button>
              </Link>
              <Link href="#como-funciona" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium bg-slate-900/50 border-slate-800 text-slate-200 hover:bg-slate-800 hover:text-white backdrop-blur-sm">
                  Ver como funciona
                </Button>
              </Link>
            </div>

            {/* Hero Visual Mockup */}
            <div id="produto" className="w-full max-w-4xl mx-auto rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-5 border-b border-slate-800/80 gap-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 text-sm font-medium">Restaurantes • Porto Alegre</span>
                </div>
                <div className="text-xs text-orange-400 font-medium bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20 w-fit">
                  47 oportunidades encontradas
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Mockup Card */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 rounded-l-xl" />
                  <div className="flex-1 pl-2">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-white">Bistrô Sabor Sul</h3>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/20">
                        Score 91/100
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400 mb-5">
                      <span className="flex items-center gap-1.5"><X className="w-3.5 h-3.5 text-rose-500" /> Sem site próprio</span>
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Instagram ativo</span>
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp</span>
                      <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> 382 avaliações</span>
                    </div>
                    
                    <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-500/20 rounded-lg p-3.5">
                      <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-purple-200/90 leading-relaxed">
                        <strong className="text-purple-300 font-medium mr-1">Insight IA:</strong> 
                        Boa oportunidade para oferecer uma landing page focada em pedidos e melhorar a presença digital.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 shrink-0 w-full sm:w-40">
                    <Button variant="outline" className="w-full bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200">
                      Ver análise
                    </Button>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg shadow-emerald-900/20 font-medium">
                      WhatsApp <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-16 border-y border-slate-800/50 bg-slate-900/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs font-semibold text-slate-400 mb-8 uppercase tracking-widest">
              Feito para profissionais que vendem serviços para negócios locais
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">Desenvolvedores Freelancers</span>
              <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">Web Designers</span>
              <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">Pequenas Agências</span>
              <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">Gestores de Tráfego</span>
              <span className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium">Prestadores de Serviços</span>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="py-24 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-white">
                Como funciona
              </h2>
              <p className="text-lg text-slate-400">
                O fluxo mais rápido entre descobrir um negócio local e enviar a primeira mensagem de vendas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-slate-800 z-0" />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg mb-6 group-hover:border-purple-500 group-hover:text-purple-400 transition-colors">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Encontre oportunidades</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  Escolha uma cidade, região ou nicho e encontre empresas que podem precisar do seu serviço.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg mb-6 group-hover:border-purple-500 group-hover:text-purple-400 transition-colors">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Entenda o lead</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  O FetchLeads analisa sinais digitais do negócio e destaca onde pode existir uma oportunidade.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg mb-6 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Comece a conversa</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  Receba uma abordagem personalizada e abra o WhatsApp sem perder tempo copiando dados.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recursos Principais */}
        <section className="py-24 bg-slate-900/50 border-y border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Recursos para otimizar sua prospecção
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Feature 1 */}
              <div className="flex flex-col gap-4 p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                    <Search className="w-5 h-5 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Busca inteligente</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Encontre potenciais clientes por nicho, cidade e outros critérios.
                </p>
                <div className="mt-auto bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-500 mb-1">Exemplo de filtro</div>
                  <div className="text-sm text-slate-300">Clínicas • Sem site • São Paulo</div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-4 p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Target className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Lead Score</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Priorize quem parece ter maior potencial em vez de abordar aleatoriamente.
                </p>
                <div className="mt-auto bg-slate-900/50 border border-slate-800 rounded-lg p-3 flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Score Calculado</div>
                  <div className="text-xs font-bold bg-purple-500/20 text-purple-400 px-2 py-1 rounded">91 / 100</div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-4 p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <BrainCircuit className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Análise com IA</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Entenda rapidamente os pontos da presença digital que podem virar argumentos.
                </p>
                <div className="mt-auto bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-rose-400"><X className="w-3 h-3" /> Sem presença web</div>
                  <div className="flex items-center gap-2 text-emerald-400"><Check className="w-3 h-3" /> Google Meu Negócio ativo</div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col gap-4 p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Abordagem gerada</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Gere uma primeira mensagem contextualizada para cada oportunidade.
                </p>
                <div className="mt-auto bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-400 italic">"Vi que vocês têm ótimas avaliações, mas..."</div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col gap-4 p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">WhatsApp 1 clique</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Saia da análise para a conversa sem copiar telefone manualmente.
                </p>
                <div className="mt-auto">
                  <div className="w-full bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded-lg p-2 text-center text-xs font-medium flex items-center justify-center gap-2">
                    Abrir WhatsApp <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="flex flex-col gap-4 p-7 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                    <BarChart3 className="w-5 h-5 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Mini CRM</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Acompanhe quem foi contatado, envie follow-ups e feche vendas.
                </p>
                <div className="mt-auto flex items-center gap-1.5 text-xs">
                  <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded">Lead</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded">Contato</span>
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded">Venda</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Comunidade */}
        <section id="comunidade" className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-purple-400 text-xs font-medium border border-purple-500/20 mb-6">
                <Users className="w-4 h-4" />
                <span>Feature da Plataforma</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
                Comunidade
              </h2>
              <p className="text-xl text-slate-300 mb-6 font-medium">
                Aprenda com quem também está prospectando.
              </p>
              <ul className="space-y-4 text-slate-400 mb-8">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Troque estratégias e templates de abordagem.</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Veja resultados de prospecção compartilhados.</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-purple-400" /> Descubra os nichos com maior taxa de resposta.</li>
              </ul>
              <Link href="/login">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700">
                  Conhecer a comunidade
                </Button>
              </Link>
            </div>
            
            <div className="flex-1 w-full max-w-lg">
              <div className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-3 pl-2">Exemplo do feed da comunidade</div>
              
              <div className="flex flex-col gap-4">
                {/* Feed Item 1 */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg relative backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20 w-fit">
                      <BadgeCheck className="w-3.5 h-3.5" /> Resultado verificado
                    </div>
                    <div className="text-xs text-slate-500">Há 2 horas</div>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Venda: Landing Page Institucional</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Fechei um contrato de R$ 850 filtrando por "Restaurantes" sem site próprio. Usei a abordagem focada em cardápio digital.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 24 curtidas</span>
                  </div>
                </div>

                {/* Feed Item 2 */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg relative backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-medium bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-md border border-purple-500/20 w-fit">
                      <FileText className="w-3.5 h-3.5" /> Template
                    </div>
                    <div className="text-xs text-slate-500">Há 5 horas</div>
                  </div>
                  <h4 className="font-semibold text-white mb-2">Abordagem para Clínicas no WhatsApp</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Template focado em mostrar como o Google Meu Negócio desatualizado está fazendo eles perderem pacientes.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 17 salvamentos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-800/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white max-w-2xl mx-auto">
              Pare de procurar clientes no escuro.
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Encontre oportunidades, saiba quem abordar e comece a conversa sem sair do FetchLeads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium bg-purple-600 text-white hover:bg-purple-700 border-0 shadow-lg shadow-purple-600/20">
                  Começar grátis
                </Button>
              </Link>
              <Link href="#como-funciona" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white">
                  Ver como funciona
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-3 text-xl font-bold mb-4">
                <Image 
                  src="/logonavbar.avif" 
                  alt="FetchLeads Logo" 
                  width={24} 
                  height={24} 
                  className="rounded-sm object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-slate-200">FetchLeads</span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Prospecção inteligente para quem vende serviços para negócios locais.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Produto</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#produto" className="hover:text-purple-400 transition-colors">Recursos</Link></li>
                <li><Link href="#como-funciona" className="hover:text-purple-400 transition-colors">Como funciona</Link></li>
                <li><Link href="#precos" className="hover:text-purple-400 transition-colors">Preços</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Empresa</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#comunidade" className="hover:text-purple-400 transition-colors">Comunidade</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="/termos" className="hover:text-purple-400 transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-purple-400 transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              © {new Date().getFullYear()} FetchLeads. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
