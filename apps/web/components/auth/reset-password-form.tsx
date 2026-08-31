"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordField } from "@/components/auth/password-field";
import { AlertCircle, Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction, pending] = useActionState<any, FormData>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (prevState: any, formData: FormData) => {
      return await resetPasswordAction(formData);
    },
    {},
  );

  return (
    <div className="w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
          Redefinir senha
        </h2>
        <p className="text-sm sm:text-base text-text-muted mt-2">
          Crie uma nova senha segura para a sua conta.
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
            htmlFor="password"
            className="text-sm font-medium text-text-secondary"
          >
            Nova senha
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
            Confirmar nova senha
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
          className="w-full h-11 text-base font-medium shadow-sm transition-all mt-4"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Salvando...
            </span>
          ) : (
            "Salvar nova senha"
          )}
        </Button>
      </form>
    </div>
  );
}
