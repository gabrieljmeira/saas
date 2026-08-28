import { useState } from "react";
import {
  Search,
  Sparkles,
  Menu,
  X,
  Check,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}

export function Header({
  onOpenMobileMenu,
  searchQuery,
  onSearch,
}: HeaderProps) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6 py-4 md:flex-row md:items-center md:justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden shrink-0"
            onClick={onOpenMobileMenu}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">
              Painel de leads
            </h1>
            <p className="hidden md:block text-sm text-muted-foreground">
              Gerencie seus contatos e encontre novas oportunidades.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por empresa..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-8 w-full sm:w-[250px] bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="default"
              className="shrink-0 flex-1 sm:flex-none"
              onClick={() => setIsSearchModalOpen(true)}
            >
              Buscar novos leads
            </Button>
            <Button
              variant="secondary"
              className="shrink-0 bg-ai text-ai-foreground hover:bg-ai/90 border-transparent"
              onClick={() => setIsAiModalOpen(true)}
            >
              <Sparkles className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Análise Inteligente</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Modal Demonstrativo: Buscar Novos Leads */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md rounded-lg shadow-xl border border-border p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Nova Busca de Leads</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cidade</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Ex: Gravataí" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nicho</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Ex: Restaurantes" className="pl-9" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsSearchModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={() => setIsSearchModalOpen(false)}>
                <Search className="w-4 h-4 mr-2" />
                Iniciar Busca
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Demonstrativo: Análise Inteligente */}
      {isAiModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-lg rounded-lg shadow-xl border border-ai/30 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-ai font-medium">
                <Sparkles className="w-5 h-5" />
                <h2>Análise de Oportunidades (Demo)</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAiModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                Com base nos leads atuais, a Inteligência Artificial identificou
                os seguintes padrões:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2 p-3 bg-muted/50 rounded-md">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>
                    <strong>Hamburguerias em Gravataí</strong> têm 60% mais
                    chance de não possuir site. Focar abordagem na criação de
                    catálogos digitais.
                  </span>
                </li>
                <li className="flex gap-2 p-3 bg-muted/50 rounded-md">
                  <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <span>
                    3 leads marcados para &quot;Follow-up&quot; já passaram de
                    48 horas de espera. Recomendamos enviar uma mensagem de
                    acompanhamento hoje.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                className="bg-ai text-ai-foreground hover:bg-ai/90"
                onClick={() => setIsAiModalOpen(false)}
              >
                Entendido
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
