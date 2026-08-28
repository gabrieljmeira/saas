"use client";
import { useState, useMemo, useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { SummaryCards } from "./summary-cards";
import { Filters } from "./filters";
import { LeadsTable } from "./leads-table";
import { MOCK_LEADS, Lead } from "./mock-data";
import { EmptyState } from "./empty-state";
import { LoadingFaro } from "./loading-faro";

export function DashboardModule() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Local state for leads so we can modify them (e.g. mark as contacted)
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

  // Simulate loading on search/filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters]);

  const toggleFilter = (filterName: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((f) => f !== filterName)
        : [...prev, filterName],
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
  };

  const updateLead = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l)),
    );
  };

  // Filter logic
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        lead.company.toLowerCase().includes(query) ||
        lead.niche.toLowerCase().includes(query) ||
        lead.city.toLowerCase().includes(query);

      // Filters
      const matchesFilters = activeFilters.every((filter) => {
        if (filter === "Gravataí") return lead.city === "Gravataí";
        if (filter === "Sem site") return !lead.hasWebsite;
        if (filter === "Alta Prioridade") return lead.opportunityScore >= 80;
        if (filter === "Follow-up") return lead.status === "follow_up";
        if (filter === "Novo") return lead.status === "novo";
        return true;
      });

      return matchesSearch && matchesFilters;
    });
  }, [leads, searchQuery, activeFilters]);

  return (
    <div className="dark min-h-screen bg-background text-foreground flex overflow-hidden">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8 bg-slate-950">
          {/* Métricas e Meta */}
          <div className="w-full">
            <SummaryCards leads={leads} />
          </div>

          {/* Área Principal (Tabela e Filtros) */}
          <div className="space-y-4">
            <Filters
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
              onClear={clearFilters}
              resultsCount={filteredLeads.length}
            />

            {isLoading ? (
              <LoadingFaro />
            ) : filteredLeads.length > 0 ? (
              <LeadsTable leads={filteredLeads} onUpdateLead={updateLead} />
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
