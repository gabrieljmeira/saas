"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Send } from "lucide-react";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<any, FormData>(
    async (prevState: any, formData: FormData) => {
      return await forgotPasswordAction(formData);
    },
    {},
  );

  if (state?.success) {
    return (
      <div className="w-full text-center">
        <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6">
          <Send className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-semibold text-white tracking-tight mb-3">
          Verifique seu email
        </h2>
        <p className="text-slate-400 mb-8">
          Se houver uma conta associada a esse email, você receberá instruções
          para redefinir sua senha.
        </p>
        <Link
          href="/login"
          className="flex w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg justify-center transition-all"
        >
          Voltar para o Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Recuperar senha
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Digite seu email e enviaremos um link para você redefinir sua senha.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className={state?.error ? "text-red-400" : ""}>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className={`bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50 ${
              state?.error
                ? "border-red-500/50 focus-visible:ring-red-500/20"
                : ""
            }`}
          />
        </div>

        {state?.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400 font-medium">{state.error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 h-auto transition-colors"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando…
            </span>
          ) : (
            "Enviar instruções"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-400">
        Lembrou da senha?{" "}
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
