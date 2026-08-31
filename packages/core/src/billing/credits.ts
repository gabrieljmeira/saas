import { db } from "@saas/db/client";
import { creditTransactions, creditWallet, searchUsage } from "@saas/db/schema/billing";
import { eq, sql, desc, and, gte } from "drizzle-orm";
import { getSearchLimit, hasUnlimitedSearches } from "./entitlements";
import { PlanType } from "./plans";

/**
 * Retorna o saldo atual da carteira de créditos do usuário.
 */
export async function getCreditBalance(userId: string): Promise<number> {
  const wallet = await db.query.creditWallet.findFirst({
    where: eq(creditWallet.userId, userId),
  });
  return wallet?.balance || 0;
}

/**
 * Adiciona créditos na conta de um usuário de forma atômica,
 * registrando a transação. Utilizado no webhook da Paddle (One-Time).
 */
export async function addCredits(userId: string, amount: number, referenceId?: string): Promise<void> {
  if (amount <= 0) return;

  await db.transaction(async (tx) => {
    // Upsert the wallet to ensure row exists
    await tx.insert(creditWallet)
      .values({ userId, balance: amount })
      .onConflictDoUpdate({
        target: creditWallet.userId,
        set: { 
          balance: sql`${creditWallet.balance} + ${amount}`,
          updatedAt: new Date(),
        }
      });
      
    // Fetch updated balance for ledger
    const updatedWallet = await tx.query.creditWallet.findFirst({
      where: eq(creditWallet.userId, userId),
    });
    const balanceAfter = updatedWallet?.balance || amount;

    // Log transaction
    await tx.insert(creditTransactions).values({
      userId,
      type: "PURCHASE",
      amount,
      balanceAfter,
      referenceId,
    });
  });
}

export type SearchConsumptionResult = {
  allowed: boolean;
  source: "PLAN" | "CREDIT" | "UNLIMITED";
  usageId?: string;
  creditTransactionId?: string;
};

/**
 * Registra o início de uma busca e consome quota/crédito se necessário.
 * Deve ser chamado ANTES de executar a busca no provedor externo.
 */
export async function consumeSearch(userId: string, plan: PlanType): Promise<SearchConsumptionResult> {
  return await db.transaction(async (tx) => {
    // Se o plano tiver buscas ilimitadas, aprovar imediatamente
    if (hasUnlimitedSearches(plan)) {
      const [usage] = await tx.insert(searchUsage).values({
        userId,
        planAtTime: plan,
        source: "UNLIMITED",
        status: "PENDING",
      }).returning();

      return { allowed: true, source: "UNLIMITED", usageId: usage.id };
    }

    // Checar uso diário (quota do plano)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const limit = getSearchLimit(plan);
    let allowedByPlan = false;

    if (limit && limit > 0) {
      const [{ count }] = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(searchUsage)
        .where(
          and(
            eq(searchUsage.userId, userId),
            eq(searchUsage.source, "PLAN"),
            gte(searchUsage.startedAt, today),
            // Ignoramos falhas devolvidas (REFUNDED)
            sql`${searchUsage.status} != 'REFUNDED'`
          )
        );

      if (count < limit) {
        allowedByPlan = true;
      }
    }

    if (allowedByPlan) {
      const [usage] = await tx.insert(searchUsage).values({
        userId,
        planAtTime: plan,
        source: "PLAN",
        status: "PENDING",
      }).returning();

      return { allowed: true, source: "PLAN", usageId: usage.id };
    }

    // Fallback: Tentar usar CRÉDITOS
    const wallet = await tx.query.creditWallet.findFirst({
      where: eq(creditWallet.userId, userId),
    });

    if (!wallet || wallet.balance < 1) {
      return { allowed: false, source: "CREDIT" }; // Bloqueado
    }

    // Consumir 1 crédito
    const amount = -1;
    await tx.update(creditWallet)
      .set({ 
        balance: sql`${creditWallet.balance} - 1`,
        updatedAt: new Date()
      })
      .where(eq(creditWallet.userId, userId));
    
    const balanceAfter = wallet.balance - 1;

    const [txLog] = await tx.insert(creditTransactions).values({
      userId,
      type: "CONSUMPTION",
      amount,
      balanceAfter,
    }).returning();

    const [usage] = await tx.insert(searchUsage).values({
      userId,
      planAtTime: plan,
      source: "CREDIT",
      status: "PENDING",
      creditTransactionId: txLog.id,
    }).returning();

    return { allowed: true, source: "CREDIT", usageId: usage.id, creditTransactionId: txLog.id };
  });
}

/**
 * Marca uma busca como concluída com sucesso
 */
export async function completeSearch(usageId: string, resultsReturned: number) {
  await db.update(searchUsage)
    .set({
      status: "SUCCESS",
      resultsReturned,
      completedAt: new Date(),
    })
    .where(eq(searchUsage.id, usageId));
}

/**
 * Falha a busca e devolve crédito (se usou crédito) ou devolve quota (status REFUNDED não conta no daily usage).
 */
export async function refundSearch(usageId: string, reason: string) {
  await db.transaction(async (tx) => {
    const usage = await tx.query.searchUsage.findFirst({
      where: eq(searchUsage.id, usageId),
    });

    if (!usage || usage.status === "REFUNDED" || usage.status === "SUCCESS") return;

    await tx.update(searchUsage)
      .set({
        status: "REFUNDED",
        failureReason: reason,
        completedAt: new Date(),
      })
      .where(eq(searchUsage.id, usageId));

    if (usage.source === "CREDIT" && usage.creditTransactionId) {
      // Estornar
      await tx.update(creditWallet)
        .set({ 
          balance: sql`${creditWallet.balance} + 1`,
          updatedAt: new Date()
        })
        .where(eq(creditWallet.userId, usage.userId));
        
      const updatedWallet = await tx.query.creditWallet.findFirst({
        where: eq(creditWallet.userId, usage.userId),
      });

      await tx.insert(creditTransactions).values({
        userId: usage.userId,
        type: "REFUND",
        amount: 1,
        balanceAfter: updatedWallet?.balance || 0,
        referenceId: usageId,
      });
    }
  });
}

export async function getTodayUsage(userId: string, plan: PlanType) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(searchUsage)
    .where(
      and(
        eq(searchUsage.userId, userId),
        eq(searchUsage.source, "PLAN"),
        gte(searchUsage.startedAt, today),
        sql`${searchUsage.status} != 'REFUNDED'`
      )
    );

  return count;
}
