"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { PLAN_CONFIG, CREDIT_PACKAGES } from "@saas/core/billing/plans";
import { PaddleCheckoutProvider } from "@/components/billing/paddle-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LandingPricingProps {
  isAuthenticated: boolean;
}

export function LandingPricing({ isAuthenticated }: LandingPricingProps) {
  return (
    <PaddleCheckoutProvider>
      {(openCheckout) => (
        <PricingContent
          isAuthenticated={isAuthenticated}
          openCheckout={openCheckout}
        />
      )}
    </PaddleCheckoutProvider>
  );
}

function PricingContent({
  isAuthenticated,
  openCheckout,
}: LandingPricingProps & { openCheckout: (priceId: string) => void }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      const checkoutIntent = searchParams.get("checkout");
      if (!checkoutIntent) return;

      let targetPriceId: string | undefined;

      switch (checkoutIntent) {
        case "freelancer-monthly":
          targetPriceId = PLAN_CONFIG.FREELANCER.priceId.monthly as
            | string
            | undefined;
          break;
        case "freelancer-annual":
          targetPriceId = PLAN_CONFIG.FREELANCER.priceId.annual as
            | string
            | undefined;
          break;
        case "agency-monthly":
          targetPriceId = PLAN_CONFIG.AGENCY.priceId.monthly as
            | string
            | undefined;
          break;
        case "agency-annual":
          targetPriceId = PLAN_CONFIG.AGENCY.priceId.annual as
            | string
            | undefined;
          break;
        case "credits-8":
          targetPriceId =
            CREDIT_PACKAGES.find((c) => c.credits === 8)?.priceId || undefined;
          break;
        case "credits-20":
          targetPriceId =
            CREDIT_PACKAGES.find((c) => c.credits === 20)?.priceId || undefined;
          break;
        case "credits-40":
          targetPriceId =
            CREDIT_PACKAGES.find((c) => c.credits === 40)?.priceId || undefined;
          break;
      }

      if (targetPriceId) {
        // Clear search params cleanly
        router.replace("/#precos", { scroll: false });
        openCheckout(targetPriceId);
      }
    }
  }, [isAuthenticated, searchParams, openCheckout, router]);

  const handleCheckout = (priceId: string, intent: string) => {
    if (!isAuthenticated) {
      router.push(`/login?next=/?checkout=${intent}`);
      return;
    }
    openCheckout(priceId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Toggle */}
      <div className="flex justify-center mb-16 relative z-10">
        <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-full inline-flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              !isAnnual
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all relative ${
              isAnnual
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Anual
            <span className="absolute -top-3 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
              2 meses grátis
            </span>
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative z-10 items-stretch mb-24">
        {/* FREE CARD */}
        <div className="flex flex-col p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-300 relative overflow-hidden transition-colors hover:border-slate-700">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Grátis</h3>
            <p className="text-sm text-slate-400">
              Para testar o FetchLeads antes de assinar.
            </p>
          </div>
          <div className="mb-8">
            <span className="text-5xl font-bold text-white">R$0</span>
          </div>
          <ul className="flex flex-col gap-4 flex-1 mb-8 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> 1 busca
              por dia
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Até 5
              leads por busca
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Instagram
              disponível
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" />{" "}
              Experiência básica de prospecção
            </li>
          </ul>
          <Button
            onClick={() => {
              if (!isAuthenticated) router.push("/signup");
              else router.push("/dashboard");
            }}
            variant="outline"
            className="w-full rounded-xl h-12 border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-white mt-auto"
          >
            Começar grátis
          </Button>
        </div>

        {/* FREELANCER CARD */}
        <div className="flex flex-col p-8 rounded-3xl border border-purple-500/50 bg-slate-900/80 backdrop-blur-md text-slate-300 relative overflow-hidden shadow-2xl shadow-purple-900/20 transform md:-translate-y-4">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
          <div className="absolute -top-4 right-8 bg-purple-600 text-white text-[11px] font-bold px-3 py-1 rounded-b-lg uppercase tracking-wider shadow-sm">
            Mais popular
          </div>

          <div className="mb-6 mt-2">
            <h3 className="text-2xl font-bold text-white mb-2">Freelancer</h3>
            <p className="text-sm text-slate-400">
              Para freelancers e profissionais que prospectam clientes
              regularmente.
            </p>
          </div>
          <div className="mb-8 flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white">
                {isAnnual ? "R$199,90" : "R$19,99"}
              </span>
              <span className="text-slate-400 font-medium">
                {isAnnual ? "/ano" : "/mês"}
              </span>
            </div>
            {isAnnual && (
              <span className="text-sm text-emerald-400 font-medium mt-2">
                Economize R$39,98
              </span>
            )}
          </div>
          <ul className="flex flex-col gap-4 flex-1 mb-8 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-purple-400 shrink-0" /> 10 buscas
              por dia
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-purple-400 shrink-0" /> Dezenas de
              oportunidades por busca
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-purple-400 shrink-0" /> Todos os
              resultados encontrados
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-purple-400 shrink-0" /> WhatsApp,
              Instagram, Telefone e Site
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-purple-400 shrink-0" /> Filtro
              inteligente por serviço
            </li>
          </ul>
          <Button
            onClick={() => {
              const intent = isAnnual
                ? "freelancer-annual"
                : "freelancer-monthly";
              const priceId = isAnnual
                ? PLAN_CONFIG.FREELANCER.priceId.annual
                : PLAN_CONFIG.FREELANCER.priceId.monthly;
              handleCheckout(priceId as string, intent);
            }}
            className="w-full rounded-xl h-12 bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/25 border-0 text-base font-medium mt-auto"
          >
            Assinar Freelancer
          </Button>
        </div>

        {/* AGENCY CARD */}
        <div className="flex flex-col p-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-300 relative overflow-hidden transition-colors hover:border-slate-700">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Agência</h3>
            <p className="text-sm text-slate-400">
              Para agências e equipes com maior volume de prospecção.
            </p>
          </div>
          <div className="mb-8 flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white">
                {isAnnual ? "R$599,00" : "R$59,90"}
              </span>
              <span className="text-slate-400 font-medium">
                {isAnnual ? "/ano" : "/mês"}
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-4 flex-1 mb-8 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Buscas
              ilimitadas
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Resultados
              ilimitados
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Todos os
              contatos disponíveis
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Exportação
              de leads para Excel
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" /> Acesso
              prioritário a novos recursos
            </li>
          </ul>
          <Button
            onClick={() => {
              const intent = isAnnual ? "agency-annual" : "agency-monthly";
              const priceId = isAnnual
                ? PLAN_CONFIG.AGENCY.priceId.annual
                : PLAN_CONFIG.AGENCY.priceId.monthly;
              handleCheckout(priceId as string, intent);
            }}
            variant="outline"
            className="w-full rounded-xl h-12 border-slate-700 bg-slate-800 text-white hover:bg-slate-700 hover:text-white mt-auto"
          >
            Assinar Agência
          </Button>
        </div>
      </div>

      {/* CREDITS SECTION */}
      <div className="pt-16 border-t border-slate-800/50 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 mb-4 uppercase tracking-wider">
            Créditos Avulsos
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Precisa de mais buscas?
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            Adicione créditos sem mudar de plano. 1 crédito = 1 busca extra.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CREDIT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col p-6 rounded-2xl border relative transition-colors ${
                pkg.isPopular
                  ? "border-purple-500/30 bg-purple-900/10 shadow-lg shadow-purple-900/5"
                  : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              }`}
            >
              {pkg.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                  {pkg.label}
                </div>
              )}
              {pkg.isPopular && !pkg.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
                  Mais escolhido
                </div>
              )}
              <h4 className="text-lg font-bold text-white mb-2">
                {pkg.credits} buscas extras
              </h4>
              <span className="text-3xl font-extrabold text-white mb-6">
                R${pkg.price.toFixed(2).replace(".", ",")}
              </span>
              <Button
                onClick={() =>
                  pkg.priceId &&
                  handleCheckout(pkg.priceId, `credits-${pkg.credits}`)
                }
                variant={pkg.isPopular ? "default" : "outline"}
                className={`mt-auto w-full rounded-xl h-10 font-medium ${
                  pkg.isPopular
                    ? "bg-purple-600 text-white hover:bg-purple-700 border-0"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                Comprar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
