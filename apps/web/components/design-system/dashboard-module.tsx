"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { SummaryCards } from "./summary-cards";
import { DailyGoal } from "./daily-goal";
import { Filters } from "./filters";
import { LeadsTable } from "./leads-table";
import { MOCK_LEADS, Lead } from "./mock-data";
import { EmptyState } from "./empty-state";

export function DashboardModule() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Local state for leads so we can modify them (e.g. mark as contacted)
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);

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

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8">
          {/* Métricas e Meta */}
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1">
              <SummaryCards leads={leads} />
            </div>
            <div className="w-full xl:w-96 shrink-0">
              <DailyGoal leads={leads} />
            </div>
          </div>

          {/* Área Principal (Tabela e Filtros) */}
          <div className="space-y-4">
            <Filters
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
              onClear={clearFilters}
              resultsCount={filteredLeads.length}
            />

            {filteredLeads.length > 0 ? (
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
