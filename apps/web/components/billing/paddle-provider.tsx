"use client";

import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

interface PaddleCheckoutProviderProps {
  children: (openCheckout: (priceId: string) => void) => React.ReactNode;
}

export function PaddleCheckoutProvider({ children }: PaddleCheckoutProviderProps) {
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);

  useEffect(() => {
    // Only init if token exists
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!token) return;

    initializePaddle({
      environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production",
      token: token,
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const openCheckout = (priceId: string) => {
    if (!paddle) {
      console.error("Paddle not initialized");
      alert("Sistema de pagamentos não configurado no momento.");
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      // Customer email/ID can be pre-filled if passed down
    });
  };

  return <>{children(openCheckout)}</>;
}
