"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, MailCheck, ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction, pending] = useActionState<any, FormData>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (prevState: any, formData: FormData) => {
      return await forgotPasswordAction(formData);
    },
    {},
  );

  if (state?.success) {
    return (
      <div className="w-full text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-success-muted text-success rounded-full flex items-center justify-center mb-6 shadow-sm border border-success/20">
          <MailCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mb-3">
          Verifique seu email
        </h2>
        <p className="text-sm sm:text-base text-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          Se o email informado estiver cadastrado, você receberá um link para
          redefinir sua senha em instantes.
        </p>
        <Link href="/login" className="w-full">
          <Button variant="outline" className="w-full h-11 text-base font-medium">
            Voltar para o login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link
          href="/login"
          className="inline-flex items-center text-sm font-medium text-text-muted hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para login
        </Link>
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
          Esqueceu sua senha?
        </h2>
        <p className="text-sm sm:text-base text-text-muted mt-2">
          Não se preocupe. Digite seu email para enviarmos um link de redefinição.
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 shadow-sm" role="alert">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive font-medium leading-relaxed">{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-text-secondary"
          >
            Email cadastrado
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className={`h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary ${
              state?.error
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full h-11 text-base font-medium shadow-sm transition-all mt-4"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </span>
          ) : (
            "Enviar link de redefinição"
          )}
        </Button>
      </form>
    </div>
  );
}
