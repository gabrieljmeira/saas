"use server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  LoginSchema,
  SignupSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "./schemas";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const remember = formData.get("remember") === "on";
  let nextUrl = (formData.get("next") as string) || "/dashboard";

  // Prevent open redirect
  if (!nextUrl.startsWith("/") || nextUrl.startsWith("//")) {
    nextUrl = "/dashboard";
  }

  const parsed = LoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: "Dados inválidos." };
  }

  // Import locally to avoid modifying top level if not needed, or just ensure it's available
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  // Set the preference BEFORE calling createClient/signInWithPassword
  cookieStore.set("sb-remember-me", remember ? "true" : "false", {
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Email ou senha incorretos." };
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Confirme seu email antes de fazer login." };
    }
    return { error: "Não foi possível fazer o login no momento." };
  }

  revalidatePath("/", "layout");
  redirect(nextUrl);
}

export async function signupAction(formData: FormData) {
  const supabase = await createClient();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const parsed = SignupSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });
  if (!parsed.success) {
    return {
      error: "Por favor, verifique os dados preenchidos.",
      details: parsed.error.flatten(),
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      // Safe enumeration prevention: act like it worked or return safe error
      return { error: "Este email já está em uso ou é inválido." };
    }
    return {
      error: "Não foi possível criar a conta. Tente novamente mais tarde.",
    };
  }

  if (data.user) {
    // Garantir criação do profile idempotente
    const role =
      parsed.data.email === process.env.FETCHLEADS_OWNER_EMAIL
        ? "OWNER"
        : "USER";

    try {
      await db
        .insert(profiles)
        .values({
          id: data.user.id,
          name: parsed.data.name,
          role: role as any, // Cast to any to avoid TS issues if schema isn't fully updated in node_modules yet
        })
        .onConflictDoNothing();
    } catch (e) {
      console.error("Failed to create profile:", e);
    }
  }

  // Verifica se o Supabase exigiu confirmação
  if (data.user?.identities?.length === 0 || !data.session) {
    return { success: true, requireEmailConfirmation: true };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete("sb-remember-me");

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function forgotPasswordAction(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const parsed = ForgotPasswordSchema.safeParse({ email });
  if (!parsed.success) {
    return { error: "Digite um email válido." };
  }

  // Não retornamos erro caso o email não exista para evitar enumeração
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // Assuming the site runs on origin, we use the callback to redirect to reset
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback?next=/redefinir-senha`,
  });

  if (error) {
    console.error("Forgot password error:", error);
  }

  return { success: true };
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const parsed = ResetPasswordSchema.safeParse({ password, confirmPassword });
  if (!parsed.success) {
    return {
      error: "Senhas inválidas ou não coincidem.",
      details: parsed.error.flatten(),
    };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      error:
        "Sua sessão expirou ou ocorreu um erro. Solicite a redefinição novamente.",
    };
  }

  redirect("/login?reset=success");
}
