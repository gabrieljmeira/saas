import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FetchLeads — Recuperar senha",
  description: "Recupere sua senha do FetchLeads.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
