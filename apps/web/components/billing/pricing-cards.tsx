"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PLAN_CONFIG, CREDIT_PACKAGES } from "@saas/core";

interface PricingCardsProps {
  onSelectPrice: (priceId: string) => void;
  currentPlan?: string;
}

export function PricingCards({ onSelectPrice, currentPlan = "FREE" }: PricingCardsProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col gap-12 w-full max-w-6xl mx-auto py-8">
      
      {/* HEADER & TOGGLE */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Planos Simples e Transparentes</h2>
        <p className="text-muted-foreground">Escolha o plano ideal para o tamanho da sua operação.</p>
        
        <div className="flex items-center gap-3 mt-4 bg-muted p-1 rounded-full border">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              !isAnnual ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              isAnnual ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Anual <span className="ml-1 text-xs text-primary font-bold">(2 meses grátis)</span>
          </button>
        </div>
      </div>

      {/* PLANS */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* FREE CARD */}
        <div className="flex flex-col p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-bold">Grátis</h3>
            <p className="text-sm text-muted-foreground">Para experimentar</p>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-extrabold">R$0</span>
          </div>
          <ul className="flex flex-col gap-3 flex-1 mb-8 text-sm">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> 1 busca por dia</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Até 5 leads por busca</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Instagram disponível</li>
          </ul>
          <button 
            disabled
            className="w-full py-2 px-4 rounded-md font-medium border bg-muted text-muted-foreground"
          >
            {currentPlan === "FREE" ? "Seu plano atual" : "Plano Grátis"}
          </button>
        </div>

        {/* FREELANCER CARD */}
        <div className="flex flex-col p-6 rounded-2xl border-2 border-primary bg-card text-card-foreground shadow-md relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Mais Popular
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold">Freelancer</h3>
            <p className="text-sm text-muted-foreground">Para profissionais autônomos</p>
          </div>
          <div className="mb-6 flex flex-col">
            <span className="text-4xl font-extrabold">
              {isAnnual ? "R$199,90" : "R$19,99"}
            </span>
            <span className="text-sm text-muted-foreground">{isAnnual ? "/ano" : "/mês"}</span>
          </div>
          <ul className="flex flex-col gap-3 flex-1 mb-8 text-sm">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> 10 buscas por dia</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Dezenas de oportunidades por busca</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Todos os resultados encontrados</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> WhatsApp, Telefone e Site</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Filtro inteligente por serviço</li>
          </ul>
          <button 
            onClick={() => {
              const priceId = isAnnual ? PLAN_CONFIG.FREELANCER.priceId.annual : PLAN_CONFIG.FREELANCER.priceId.monthly;
              if (priceId) onSelectPrice(priceId);
            }}
            className="w-full py-2 px-4 rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {currentPlan === "FREELANCER" ? "Plano Atual" : "Assinar Freelancer"}
          </button>
        </div>

        {/* AGENCY CARD */}
        <div className="flex flex-col p-6 rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-bold">Agência</h3>
            <p className="text-sm text-muted-foreground">Para agências e equipes</p>
          </div>
          <div className="mb-6 flex flex-col">
            <span className="text-4xl font-extrabold">
              {isAnnual ? "R$599,00" : "R$59,90"}
            </span>
            <span className="text-sm text-muted-foreground">{isAnnual ? "/ano" : "/mês"}</span>
          </div>
          <ul className="flex flex-col gap-3 flex-1 mb-8 text-sm">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Buscas ilimitadas</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Resultados ilimitados</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Todos os contatos disponíveis</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Exportação para Excel</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Acesso prioritário a recursos</li>
          </ul>
          <button 
            onClick={() => {
              const priceId = isAnnual ? PLAN_CONFIG.AGENCY.priceId.annual : PLAN_CONFIG.AGENCY.priceId.monthly;
              if (priceId) onSelectPrice(priceId);
            }}
            className="w-full py-2 px-4 rounded-md font-medium border hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {currentPlan === "AGENCY" ? "Plano Atual" : "Assinar Agência"}
          </button>
        </div>

      </div>

      {/* CREDITS SECTION */}
      <div className="mt-8 border-t pt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Créditos Avulsos</h2>
          <p className="text-muted-foreground">Precisa de mais buscas? Adicione créditos sem mudar de plano. (1 crédito = 1 busca extra)</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <div key={pkg.id} className={`flex flex-col p-5 rounded-xl border relative ${pkg.isPopular ? 'border-primary shadow-sm bg-primary/5' : 'bg-card'}`}>
              {pkg.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {pkg.label}
                </div>
              )}
              {pkg.isPopular && !pkg.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Mais escolhido
                </div>
              )}
              <h4 className="text-lg font-bold">{pkg.credits} buscas extras</h4>
              <span className="text-2xl font-extrabold my-2">
                R${pkg.price.toFixed(2).replace('.', ',')}
              </span>
              <button 
                onClick={() => pkg.priceId && onSelectPrice(pkg.priceId)}
                className={`mt-auto py-2 px-4 rounded-md font-medium transition-colors ${
                  pkg.isPopular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border hover:bg-accent'
                }`}
              >
                Comprar {pkg.credits} créditos
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
