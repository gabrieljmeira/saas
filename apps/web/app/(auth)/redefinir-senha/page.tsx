import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FetchLeads — Redefinir senha",
  description: "Crie uma nova senha para sua conta no FetchLeads.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
