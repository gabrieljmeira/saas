"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { OfficialAccountBadge } from "./OfficialAccountBadge";

export function CommunityFeed({
  initialData,
  tab,
}: {
  initialData: any;
  tab: "community" | "following";
}) {
  // In a real app we'd use useInfiniteQuery for pagination here
  const [items, setItems] = useState(initialData.items);

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-800 pb-2">
        <Link
          href="/community?tab=community"
          className={`text-sm font-medium pb-2 -mb-2 border-b-2 transition-colors ${
            tab === "community"
              ? "border-orange-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Comunidade
        </Link>
        <Link
          href="/community?tab=following"
          className={`text-sm font-medium pb-2 -mb-2 border-b-2 transition-colors ${
            tab === "following"
              ? "border-orange-500 text-white"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Seguindo
        </Link>
      </div>

      {/* Composer Skeleton for MVP */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800/80 transition-colors">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0" />
        <div className="text-slate-400 flex-1">
          O que você aprendeu ou conquistou hoje?
        </div>
        <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
          <MessageSquarePlus className="w-5 h-5" />
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800/50">
            <h3 className="text-lg font-medium text-slate-200 mb-2">
              Nenhuma pista farejada ainda...
            </h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              O Cyber-Caramelo ainda não encontrou movimentação por aqui.
              Compartilhe uma estratégia, resultado ou dúvida com a Matilha.
            </p>
          </div>
        ) : (
          items.map((post: any) => (
            <div
              key={post.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                  {post.author.avatarUrl ? (
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                      {post.author.name?.charAt(0) || "?"}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-200">
                      {post.author.name}
                    </span>
                    {(post.author.role === "OWNER" || post.author.role === "STAFF") && (
                      <OfficialAccountBadge variant="icon" />
                    )}
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                      Nv. {post.author.level}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500">
                    @{post.author.username} •{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {post.isVerified && (
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-md mb-3 border border-emerald-500/20">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Verificado pelo Sistema
                </div>
              )}

              <p className="text-slate-300 mb-4 whitespace-pre-wrap">
                {post.content}
              </p>

              {post.type === "result" && post.metadata?.amountCents && (
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/60 mb-4">
                  <div className="text-2xl font-bold text-emerald-400 mb-4">
                    {(post.metadata.amountCents / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 mb-1">Nicho</div>
                      <div className="text-purple-400 font-medium">
                        {post.metadata.niche}
                      </div>
                    </div>
                    {post.metadata.leadScore && (
                      <div>
                        <div className="text-slate-500 mb-1">Lead Score</div>
                        <div className="text-slate-200">
                          {post.metadata.leadScore}/100
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-slate-500 mb-1">Fechamento</div>
                      <div className="text-slate-200">
                        {post.metadata.closeDays} dias
                      </div>
                    </div>
                    {post.metadata.channel && (
                      <div>
                        <div className="text-slate-500 mb-1">Canal</div>
                        <div className="text-slate-200 capitalize">
                          {post.metadata.channel}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 text-sm text-slate-400 mt-2">
                <button className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                  <span>♡</span> {post.likeCount}
                </button>
                <button className="flex items-center gap-1.5 hover:text-slate-200 transition-colors">
                  <span>💬</span> {post.commentCount}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
