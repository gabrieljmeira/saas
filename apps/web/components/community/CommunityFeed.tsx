"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquarePlus, CheckCircle2, TrendingUp, HelpCircle, FileText, Share2, ThumbsUp } from "lucide-react";
import { OfficialAccountBadge } from "./OfficialAccountBadge";
import { DashboardSurface } from "@/components/ui/dashboard-surface";
import { Button } from "@/components/ui/button";

export function CommunityFeed({
  initialData,
  tab,
}: {
  initialData: any;
  tab: "community" | "following";
}) {
  const [items, setItems] = useState(initialData?.items || []);

  // Mock items if empty to demonstrate the new UI
  const displayItems = items.length > 0 ? items : [
    {
      id: "1",
      type: "result",
      isVerified: true,
      content: "Fechamento usando o novo template de cold email focado em dores de clínicas. 3 dias desde o primeiro contato até o contrato assinado.",
      createdAt: new Date().toISOString(),
      author: { name: "Gabriel", username: "gabriel", level: 12, role: "OWNER" },
      metadata: { amountCents: 450000, niche: "Clínicas Odontológicas", leadScore: 92, closeDays: 3, channel: "WhatsApp" },
      likeCount: 45,
      commentCount: 12
    },
    {
      id: "2",
      type: "strategy",
      isVerified: false,
      content: "Dica: sempre filtre por 'Sem site' ao prospectar restaurantes locais. A taxa de resposta quando você oferece uma solução rápida de cardápio digital aumenta em 40%.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      author: { name: "Carlos S.", username: "carlos_s", level: 5, role: "USER" },
      likeCount: 18,
      commentCount: 3
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2">
        <Link href="/community?tab=community">
          <Button variant={tab === "community" ? "secondary" : "ghost"} size="sm" className="h-8 rounded-full px-4">
            Comunidade Global
          </Button>
        </Link>
        <Link href="/community?tab=following">
          <Button variant={tab === "following" ? "secondary" : "ghost"} size="sm" className="h-8 rounded-full px-4 text-text-muted hover:text-text-primary">
            Conexões
          </Button>
        </Link>
      </div>

      {/* Composer */}
      <DashboardSurface className="p-4 flex items-center gap-4 cursor-text group hover:border-primary/40 transition-colors">
        <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-default flex-shrink-0 flex items-center justify-center font-bold text-text-muted">
          Você
        </div>
        <div className="text-text-muted flex-1 text-sm font-medium">
          Compartilhe um resultado, estratégia ou template com a comunidade...
        </div>
        <Button size="sm" className="h-9 shrink-0 shadow-sm opacity-90 group-hover:opacity-100">
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          Publicar
        </Button>
      </DashboardSurface>

      {/* Feed */}
      <div className="space-y-4">
        {displayItems.map((post: any) => (
          <DashboardSurface key={post.id} className="p-0 overflow-hidden">
            
            {/* Header: Type of Post Context */}
            <div className="px-5 py-3 border-b border-border-subtle bg-surface-elevated/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {post.type === "result" && <TrendingUp className="w-4 h-4 text-[#25D366]" />}
                {post.type === "strategy" && <HelpCircle className="w-4 h-4 text-accent" />}
                {post.type === "template" && <FileText className="w-4 h-4 text-primary" />}
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                  {post.type === "result" ? "Resultado Fechado" : post.type === "strategy" ? "Estratégia" : "Template"}
                </span>
              </div>
              
              {post.isVerified && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold rounded-md border border-[#25D366]/20 uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Resultado Verificado
                </div>
              )}
            </div>

            <div className="p-5">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-default overflow-hidden flex items-center justify-center text-primary font-bold">
                  {post.author.avatarUrl ? (
                    <img src={post.author.avatarUrl} alt={post.author.name} className="w-full h-full object-cover" />
                  ) : (
                    post.author.name?.charAt(0) || "?"
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-primary text-sm">
                      {post.author.name}
                    </span>
                    {(post.author.role === "OWNER" || post.author.role === "STAFF") && (
                      <OfficialAccountBadge variant="icon" />
                    )}
                    <span className="text-[10px] bg-surface-elevated border border-border-subtle text-text-secondary px-1.5 py-0.5 rounded font-mono font-medium">
                      Lv.{post.author.level}
                    </span>
                  </div>
                  <div className="text-xs text-text-muted mt-0.5">
                    @{post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Verified Result Data Table */}
              {post.type === "result" && post.metadata?.amountCents && (
                <div className="bg-surface-elevated/50 rounded-lg p-5 border border-border-subtle mb-6">
                  <div className="text-2xl font-bold text-text-primary mb-5 flex items-baseline gap-2">
                    <span className="text-[#25D366]">
                      {(post.metadata.amountCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    <span className="text-xs text-text-muted font-normal uppercase tracking-wider">Fechado</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <div className="text-xs text-text-muted mb-1 font-medium">Nicho</div>
                      <div className="text-text-primary font-semibold">{post.metadata.niche}</div>
                    </div>
                    {post.metadata.leadScore && (
                      <div>
                        <div className="text-xs text-text-muted mb-1 font-medium">Lead Score</div>
                        <div className="text-primary font-bold">{post.metadata.leadScore}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-text-muted mb-1 font-medium">Ciclo de Fechamento</div>
                      <div className="text-text-primary font-semibold">{post.metadata.closeDays} dias</div>
                    </div>
                    {post.metadata.channel && (
                      <div>
                        <div className="text-xs text-text-muted mb-1 font-medium">Canal de Origem</div>
                        <div className="text-text-primary font-semibold capitalize">{post.metadata.channel}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
                <Button variant="ghost" size="sm" className="text-text-muted hover:text-text-primary hover:bg-surface-elevated h-8 text-xs font-medium">
                  <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> Útil ({post.likeCount})
                </Button>
                <Button variant="ghost" size="sm" className="text-text-muted hover:text-text-primary hover:bg-surface-elevated h-8 text-xs font-medium">
                  <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" /> Discutir ({post.commentCount})
                </Button>
              </div>
            </div>
          </DashboardSurface>
        ))}
      </div>
    </div>
  );
}
