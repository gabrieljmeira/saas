"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordField } from "@/components/auth/password-field";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next") || "";
  const resetSuccess = searchParams.get("reset") === "success";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction, pending] = useActionState<any, FormData>(
    loginAction as any,
    {},
  );

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
          Bem-vindo de volta
        </h2>
        <p className="text-sm sm:text-base text-text-muted mt-2">
          Entre na sua conta para continuar sua prospecção.
        </p>
      </div>

      {resetSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-success-muted border border-success/20 flex items-start gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <p className="text-sm text-success font-medium leading-relaxed">
            Senha redefinida com sucesso. Faça login com a sua nova senha.
          </p>
        </div>
      )}

      {state?.error && (
        <div
          className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3 shadow-sm"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive font-medium leading-relaxed">
            {state.error}
          </p>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={nextParam} />

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={`text-sm font-medium ${
              state?.error && !state?.error.includes("senha")
                ? "text-destructive"
                : "text-text-secondary"
            }`}
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className={`h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary ${
              state?.error && !state?.error.includes("senha")
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
            autoComplete="current-password"
            className="h-11 bg-surface border-border-default focus-visible:ring-primary text-text-primary"
          />
        </div>

        <div className="flex items-center justify-between pt-1 pb-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              name="remember"
              defaultChecked
              value="on"
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="remember"
              className="text-sm font-medium text-text-muted cursor-pointer hover:text-text-primary transition-colors"
            >
              Manter conectado
            </Label>
          </div>
          <Link
            href="/esqueci-senha"
            className="text-sm font-medium text-primary hover:text-primary-hover transition-colors focus-visible:outline-none focus-visible:underline underline-offset-4"
          >
            Esqueci a senha
          </Link>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full h-11 text-base font-medium shadow-sm transition-all"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Entrando...
            </span>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border-subtle flex flex-col items-center gap-4">
        <div className="text-sm text-text-muted">
          Ainda não tem uma conta?{" "}
          <Link
            href="/signup"
            className="font-medium text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline underline-offset-4"
          >
            Criar conta
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs text-text-muted/60">
          <Link
            href="/termos"
            className="hover:text-text-muted transition-colors"
          >
            Termos de Uso
          </Link>
          <span>&bull;</span>
          <Link
            href="/privacidade"
            className="hover:text-text-muted transition-colors"
          >
            Privacidade
          </Link>
        </div>
      </div>
    </div>
  );
}
