import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { profiles } from "@saas/db/schema";
import { eq } from "drizzle-orm";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { AppTopbar } from "@/components/dashboard/app-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile data
  const profileResult = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  const profileData = profileResult[0] || {
    id: user.id,
    name: user.email?.split("@")[0] || "Usuário",
    role: "USER" as const,
  };

  const profile = {
    ...profileData,
    email: user.email || "",
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-text-primary">
      {/* Sidebar for Desktop */}
      <AppSidebar />

      {/* Main Column */}
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <AppTopbar profile={profile as any} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
