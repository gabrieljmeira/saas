import { SignupForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FetchLeads — Criar conta",
  description:
    "Crie sua conta no FetchLeads e comece a encontrar oportunidades.",
};

export default function SignupPage() {
  return <SignupForm />;
}
