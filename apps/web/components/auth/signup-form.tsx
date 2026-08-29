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
  const [state, formAction, pending] = useActionState<any, FormData>(
    async (prevState: any, formData: FormData) => {
      return await signupAction(formData);
    },
    {}
  );

  if (state?.success && state?.requireEmailConfirmation) {
    return (
      <div className="w-full text-center">
        <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6">
          <MailCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
          Confira seu email
        </h2>
        <p className="text-slate-400 mb-8">
          Enviamos um link de confirmação para o seu endereço. Confirme o email para continuar e acessar a plataforma.
        </p>
        <Link href="/login" className="flex w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg justify-center transition-all">
          Voltar para o Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Crie sua conta</h2>
        <p className="text-sm text-slate-400 mt-2">
          Comece a encontrar e organizar suas próximas oportunidades.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className={state?.details?.fieldErrors?.name ? "text-red-400" : ""}>Nome completo</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome"
            required
            autoComplete="name"
            className={`bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50 ${
              state?.details?.fieldErrors?.name ? "border-red-500/50 focus-visible:ring-red-500/20" : ""
            }`}
          />
          {state?.details?.fieldErrors?.name && (
            <p className="text-xs text-red-400">{state.details.fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className={state?.details?.fieldErrors?.email ? "text-red-400" : ""}>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className={`bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50 ${
              state?.details?.fieldErrors?.email ? "border-red-500/50 focus-visible:ring-red-500/20" : ""
            }`}
          />
          {state?.details?.fieldErrors?.email && (
            <p className="text-xs text-red-400">{state.details.fieldErrors.email[0]}</p>
          )}
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Senha"
          required
          showStrength
          autoComplete="new-password"
          className="bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50"
          error={state?.details?.fieldErrors?.password?.[0]}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar senha"
          required
          autoComplete="new-password"
          className="bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50"
          error={state?.details?.fieldErrors?.confirmPassword?.[0]}
        />

        {state?.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400 font-medium">
              {state.error}
            </p>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={pending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 h-auto transition-all mt-6"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Criando conta...
            </span>
          ) : (
            "Criar conta"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        Ao criar sua conta, você concorda com os{" "}
        <Link href="/termos" className="text-slate-400 hover:text-white underline underline-offset-2">Termos de Uso</Link> e reconhece a{" "}
        <Link href="/privacidade" className="text-slate-400 hover:text-white underline underline-offset-2">Política de Privacidade</Link>.
      </div>

      <div className="mt-8 text-center text-sm text-slate-400">
        Já possui uma conta?{" "}
        <Link
          href="/login"
          className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}
