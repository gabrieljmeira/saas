import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema/users";
import { eq } from "drizzle-orm";
import { getCreditBalance, getTodayUsage, getPlanConfig, PlanType } from "@saas/core";
import { PricingCards } from "@/components/billing/pricing-cards";

export const metadata = {
  title: "Plano e Cobrança | FetchLeads",
};

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const profileResult = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  const profile = profileResult[0];

  if (!profile) {
    redirect("/login");
  }

  const currentPlan = profile.plan as PlanType;
  const config = getPlanConfig(currentPlan);
  const credits = await getCreditBalance(user.id);
  const usedToday = await getTodayUsage(user.id, currentPlan);

  return (
    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Plano e Cobrança</h1>
        <p className="text-muted-foreground">Gerencie sua assinatura, limites e créditos avulsos.</p>
      </div>

      {/* USO E STATUS ATUAL */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-card">
          <p className="text-sm font-medium text-muted-foreground mb-1">Plano Atual</p>
          <p className="text-2xl font-bold">{config.name}</p>
          {profile.subscriptionStatus && (
            <p className="text-sm text-emerald-500 mt-2 font-medium capitalize">Status: {profile.subscriptionStatus}</p>
          )}
        </div>

        <div className="p-6 border rounded-xl bg-card">
          <p className="text-sm font-medium text-muted-foreground mb-1">Buscas Hoje</p>
          {config.unlimitedSearches ? (
            <p className="text-2xl font-bold">Ilimitadas</p>
          ) : (
            <div>
              <p className="text-2xl font-bold">{usedToday} <span className="text-muted-foreground text-lg font-normal">/ {config.searchesPerDay}</span></p>
              <p className="text-sm text-muted-foreground mt-2">
                Restantes: {Math.max(0, (config.searchesPerDay || 0) - usedToday)}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 border rounded-xl bg-card">
          <p className="text-sm font-medium text-muted-foreground mb-1">Fetch Credits (Avulsos)</p>
          <p className="text-2xl font-bold">{credits}</p>
          <p className="text-sm text-muted-foreground mt-2">1 crédito = 1 busca extra</p>
        </div>
      </div>

      {/* COMPONENTE CLIENT-SIDE COM PADDLE */}
      {/* Aqui a PricingCards pode ser injetada de um Client Component que abre o Paddle.js */}
      <div className="mt-8">
         <PricingCardsWrapper currentPlan={currentPlan} />
      </div>
    </div>
  );
}

// Num arquivo real, isso poderia importar um Client Component que integra o window.Paddle
import { PaddleCheckoutProvider } from "./paddle-provider";

function PricingCardsWrapper({ currentPlan }: { currentPlan: string }) {
  return (
    <PaddleCheckoutProvider>
      {(openCheckout) => (
        <PricingCards 
          currentPlan={currentPlan} 
          onSelectPrice={(priceId) => openCheckout(priceId)} 
        />
      )}
    </PaddleCheckoutProvider>
  );
}
