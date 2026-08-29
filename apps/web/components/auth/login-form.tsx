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
    {}
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Bem-vindo de volta</h2>
        <p className="text-sm text-slate-400 mt-2">
          Entre na sua conta para continuar prospectando.
        </p>
      </div>

      {resetSuccess && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-400 font-medium">
            Senha redefinida com sucesso. Faça login com a sua nova senha.
          </p>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="next" value={nextParam} />
        
        <div className="space-y-2">
          <Label htmlFor="email" className={state?.error && !state?.error.includes("senha") ? "text-red-400" : ""}>Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className={`bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50 ${
              state?.error && !state?.error.includes("senha") ? "border-red-500/50 focus-visible:ring-red-500/20" : ""
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
            className="bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50"
          />
          <div className="flex justify-end mt-2">
            <Link
              href="/esqueci-senha"
              className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>

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
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 h-auto transition-all"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Entrando...
            </span>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-slate-400">
        Ainda não tem uma conta?{" "}
        <Link
          href="/signup"
          className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
        >
          Criar conta
        </Link>
      </div>
    </div>
  );
}
