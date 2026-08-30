import { getFeed } from "@/actions/community/feed";
import { CommunityFeed } from "@/components/community/CommunityFeed";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab = params.tab === "following" ? "following" : "community";
  const initialFeed = await getFeed({ tab, limit: 20 });

  return (
    <div className="min-h-screen bg-background text-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Comunidade</h1>
          <p className="text-text-muted">
            Resultados, estratégias e aprendizados de quem está prospectando de
            verdade.
          </p>
        </header>

        <CommunityFeed initialData={initialFeed} tab={tab} />
      </div>
    </div>
  );
}
