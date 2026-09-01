import { NextResponse } from "next/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema/users";
import { webhookEvents } from "@saas/db/schema/billing";
import { eq } from "drizzle-orm";
import { addCredits } from "@saas/core/billing";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

// Inicializa SDK (se PADDLE_API_KEY existir)
const paddle = new Paddle(
  process.env.PADDLE_API_KEY || process.env.PADDLE_SANDBOX_API_KEY || "",
  {
    environment:
      process.env.PADDLE_ENV === "sandbox" ||
      process.env.NODE_ENV === "development"
        ? Environment.sandbox
        : Environment.production,
  },
);

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("paddle-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const rawBody = await req.text();
    const secretKey = process.env.PADDLE_WEBHOOK_SECRET || "";

    let eventData;
    try {
      if (secretKey) {
        eventData = paddle.webhooks.unmarshal(rawBody, secretKey, signature);
      } else {
        // Fallback for local testing if secret not configured, parse json directly
        eventData = JSON.parse(rawBody);
      }
    } catch (e) {
      console.error("Invalid webhook signature", e);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const eventId = eventData.event_id || eventData.id;
    const eventType = eventData.event_type;
    const payload = eventData.data;

    if (!eventId || !eventType) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Idempotency check
    const existingEvent = await db.query.webhookEvents.findFirst({
      where: eq(webhookEvents.id, eventId),
    });

    if (existingEvent) {
      return NextResponse.json(
        { message: "Already processed" },
        { status: 200 },
      );
    }

    // Log the event
    await db.insert(webhookEvents).values({
      id: eventId,
      type: eventType,
      status: "processed",
    });

    // Handle events
    switch (eventType) {
      case "transaction.completed":
        await handleTransactionCompleted(payload);
        break;
      case "subscription.created":
      case "subscription.updated":
      case "subscription.activated":
        await handleSubscriptionUpdated(payload);
        break;
      case "subscription.canceled":
        await handleSubscriptionCanceled(payload);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

async function handleTransactionCompleted(data: any) {
  // Ignorar transações de assinaturas (elas são geridas nos webhooks de subscription)
  if (data.origin !== "web" && data.origin !== "api") return;

  const items = data.items || [];
  const customerId = data.customer_id;

  if (!customerId) return;

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.paddleCustomerId, customerId),
  });

  if (!profile) return; // User not found

  // Map paddle item prices to credits
  for (const item of items) {
    const priceId = item.price?.id;
    if (!priceId) continue;

    let addedCredits = 0;
    if (priceId === process.env.NEXT_PUBLIC_PADDLE_CREDITS_8_PRICE_ID)
      addedCredits = 8;
    else if (priceId === process.env.NEXT_PUBLIC_PADDLE_CREDITS_20_PRICE_ID)
      addedCredits = 20;
    else if (priceId === process.env.NEXT_PUBLIC_PADDLE_CREDITS_40_PRICE_ID)
      addedCredits = 40;

    if (addedCredits > 0) {
      await addCredits(profile.id, addedCredits * item.quantity, data.id);
    }
  }
}

async function handleSubscriptionUpdated(data: any) {
  const customerId = data.customer_id;
  const subscriptionId = data.id;
  const status = data.status;
  const currentPeriodStart = data.current_billing_period?.starts_at;
  const currentPeriodEnd = data.current_billing_period?.ends_at;
  const cancelAtPeriodEnd = data.scheduled_change?.action === "cancel";

  if (!customerId) return;

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.paddleCustomerId, customerId),
  });

  if (!profile) return; // Se o cliente ainda não foi associado, não podemos vincular.
  // Na prática real, você poderia associar pelo email se houvesse na payload.

  // Determine plan based on first item price ID
  const priceId = data.items?.[0]?.price?.id;
  let plan: "FREE" | "FREELANCER" | "AGENCY" = "FREE";

  if (
    priceId === process.env.NEXT_PUBLIC_PADDLE_FREELANCER_MONTHLY_PRICE_ID ||
    priceId === process.env.NEXT_PUBLIC_PADDLE_FREELANCER_ANNUAL_PRICE_ID
  ) {
    plan = "FREELANCER";
  } else if (
    priceId === process.env.NEXT_PUBLIC_PADDLE_AGENCY_MONTHLY_PRICE_ID ||
    priceId === process.env.NEXT_PUBLIC_PADDLE_AGENCY_ANNUAL_PRICE_ID
  ) {
    plan = "AGENCY";
  }

  // Se o status for past_due, a subscription_status = past_due, etc.
  // Atualiza no banco
  await db
    .update(profiles)
    .set({
      plan:
        status === "active" || status === "trialing" || status === "past_due"
          ? plan
          : "FREE",
      paddleSubscriptionId: subscriptionId,
      subscriptionStatus: status,
      currentPeriodStart: currentPeriodStart
        ? new Date(currentPeriodStart)
        : null,
      currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : null,
      cancelAtPeriodEnd: !!cancelAtPeriodEnd,
    })
    .where(eq(profiles.id, profile.id));
}

async function handleSubscriptionCanceled(data: any) {
  const customerId = data.customer_id;

  if (!customerId) return;

  await db
    .update(profiles)
    .set({
      plan: "FREE",
      subscriptionStatus: "canceled",
      cancelAtPeriodEnd: false,
    })
    .where(eq(profiles.paddleCustomerId, customerId));
}
