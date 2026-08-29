"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { PasswordField } from "@/components/auth/password-field";
import { AlertCircle, Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState<any, FormData>(
    async (prevState: any, formData: FormData) => {
      return await resetPasswordAction(formData);
    },
    {},
  );

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Redefinir senha
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Crie uma nova senha segura para sua conta.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <PasswordField
          id="password"
          name="password"
          label="Nova senha"
          required
          showStrength
          autoComplete="new-password"
          className="bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50"
          error={state?.details?.fieldErrors?.password?.[0]}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar nova senha"
          required
          autoComplete="new-password"
          className="bg-slate-900/50 border-slate-800 focus-visible:ring-purple-500/50"
          error={state?.details?.fieldErrors?.confirmPassword?.[0]}
        />

        {state?.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400 font-medium">{state.error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 h-auto transition-colors mt-6"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Redefinindo…
            </span>
          ) : (
            "Redefinir senha"
          )}
        </Button>
      </form>
    </div>
  );
}
