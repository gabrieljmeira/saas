"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/password-field";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next") || "";
  const resetSuccess = searchParams.get("reset") === "success";

  const [state, formAction, pending] = useActionState<any, FormData>(
    async (prevState: any, formData: FormData) => {
      return await loginAction(formData);
    },
    {},
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-text-primary tracking-tight">
          Bem-vindo de volta
        </h2>
        <p className="text-sm text-text-muted mt-2">
          Entre na sua conta para continuar prospectando.
        </p>
      </div>

      {resetSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-success-muted border border-success/20 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
          <p className="text-sm text-success font-medium">
            Senha redefinida com sucesso. Faça login com a sua nova senha.
          </p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="next" value={nextParam} />

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={
              state?.error && !state?.error.includes("senha")
                ? "text-destructive"
                : ""
            }
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
            className={`bg-surface border-border-default focus-visible:ring-primary ${
              state?.error && !state?.error.includes("senha")
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }`}
          />
        </div>

        <div>
          <PasswordField
            id="password"
            name="password"
            label="Senha"
            required
            autoComplete="current-password"
            className="bg-surface border-border-default focus-visible:ring-primary"
          />
          <div className="flex justify-end mt-2">
            <Link
              href="/esqueci-senha"
              className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>

        {state?.error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive font-medium">{state.error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Entrando…
            </span>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-text-secondary">
        Ainda não tem uma conta?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:text-primary-hover transition-colors"
        >
          Criar conta
        </Link>
      </div>
    </div>
  );
}
