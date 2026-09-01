import { getFeed } from "@/actions/community/feed";
import { CommunityFeed } from "@/components/community/CommunityFeed";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab = params.tab === "following" ? "following" : "community";

  // Use actual feed or fallback to mock data to show the layout
  const feedPromise = getFeed({ tab, limit: 20 }).catch(() => ({ items: [] }));
  const initialFeed = await feedPromise;

  return (
    <div className="flex-1 p-6 md:p-8 max-w-[1000px] mx-auto w-full flex flex-col gap-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row gap-4 justify-between items-end border-b border-border-default pb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight mb-1">
            Comunidade
          </h1>
          <p className="text-sm text-text-muted">
            Resultados reais, estratégias de conversão e templates validados de
            forma anônima e segura.
          </p>
        </div>
      </header>

      <CommunityFeed initialData={initialFeed} tab={tab} />
    </div>
  );
}
