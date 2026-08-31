"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signupAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/password-field";
import { AlertCircle, Loader2, MailCheck } from "lucide-react";

export function SignupForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction, pending] = useActionState<any, FormData>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (prevState: any, formData: FormData) => {
      return await signupAction(formData);
    },
    {},
  );

  if (state?.success && state?.requireEmailConfirmation) {
    return (
      <div className="w-full text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-success-muted text-success rounded-full flex items-center justify-center mb-6 shadow-sm border border-success/20">
          <MailCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight mb-3">
          Confira seu email
        </h2>
        <p className="text-sm sm:text-base text-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          Enviamos um link de confirmação para o seu endereço. Confirme o email
          para acessar sua conta.
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
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
          Crie sua conta
        </h2>
        <p className="text-sm sm:text-base text-text-muted mt-2">
          Comece a prospectar e vender com o FetchLeads hoje.
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 shadow-sm" role="alert">
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm text-destructive font-medium leading-relaxed">{state.error}</p>
            {state?.details?.fieldErrors && (
              <ul className="list-disc pl-4 text-xs text-destructive/80 space-y-1">
                {Object.entries(state.details.fieldErrors).map(
                  ([field, errors]) => (
                    <li key={field}>{(errors as string[])[0]}</li>
                  ),
                )}
              </ul>
            )}
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium text-text-secondary"
          >
            Nome completo
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="João Silva"
            required
            autoComplete="name"
            className={`h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary ${
              state?.details?.fieldErrors?.name
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-text-secondary"
          >
            Email comercial
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="joao@empresa.com"
            required
            autoComplete="email"
            className={`h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary ${
              state?.details?.fieldErrors?.email
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-text-secondary"
          >
            Senha
          </Label>
          <PasswordField
            id="password"
            name="password"
            required
            autoComplete="new-password"
            className={`h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary ${
              state?.details?.fieldErrors?.password
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
          <p className="text-xs text-text-muted">Mínimo de 6 caracteres.</p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-text-secondary"
          >
            Confirmar senha
          </Label>
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            required
            autoComplete="new-password"
            className={`h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary ${
              state?.details?.fieldErrors?.confirmPassword
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full h-11 text-base font-medium shadow-sm transition-all mt-6"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Criando conta...
            </span>
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col items-center gap-4">
        <div className="text-sm text-text-muted">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-medium text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline underline-offset-4"
          >
            Fazer login
          </Link>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-text-muted/60">
          <Link href="/termos" className="hover:text-text-muted transition-colors">Termos de Uso</Link>
          <span>&bull;</span>
          <Link href="/privacidade" className="hover:text-text-muted transition-colors">Privacidade</Link>
        </div>
      </div>
    </div>
  );
}
