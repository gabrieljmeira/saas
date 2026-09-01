import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@saas/db/client";
import { leads } from "@saas/db/schema";
import { eq, desc, asc, ilike, and, or, sql, gte } from "drizzle-orm";
import { LeadsClient, LeadRow } from "@/components/leads/leads-client";
import { PageHeader } from "@/components/ui/page-header";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const status =
    typeof resolvedParams.status === "string" ? resolvedParams.status : "";
  const pageParam =
    typeof resolvedParams.page === "string"
      ? parseInt(resolvedParams.page, 10)
      : 1;
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const limit = 50;
  const offset = (page - 1) * limit;

  // Build conditions safely
  const conditions = [eq(leads.userId, user.id)];

  if (q) {
    conditions.push(
      or(
        ilike(leads.name, `%${q}%`),
        ilike(leads.niche, `%${q}%`),
        ilike(leads.city, `%${q}%`),
      )!,
    );
  }

  if (status) {
    conditions.push(eq(leads.status, status));
  }

  // Fetch leads for the current user
  const userLeads = await db.query.leads.findMany({
    where: and(...conditions),
    orderBy: [desc(leads.createdAt)],
    limit: limit,
    offset: offset,
    columns: {
      id: true,
      name: true,
      niche: true,
      city: true,
      leadScore: true,
      status: true,
      rating: true,
      hasWhatsapp: true,
      website: true,
      updatedAt: true,
    },
  });

  // Map to Client props
  const formattedLeads: LeadRow[] = userLeads.map((l) => ({
    id: l.id,
    name: l.name,
    niche: l.niche,
    city: l.city,
    score: l.leadScore,
    status: l.status,
    rating: l.rating,
    hasWhatsapp: l.hasWhatsapp,
    website: l.website,
    updatedAt: l.updatedAt,
  }));

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
      <PageHeader
        title="Leads"
        description="Gerencie e qualifique empresas descobertas."
      />

      <LeadsClient
        initialLeads={formattedLeads}
        currentQuery={q}
        currentStatus={status}
        page={page}
        hasMore={formattedLeads.length === limit}
      />
    </div>
  );
}
