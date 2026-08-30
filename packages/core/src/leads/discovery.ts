import { normalizePhone, normalizeDomain } from "./normalization";

export interface LeadSearchInput {
  query?: string;
  niche?: string;
  city?: string;
  region?: string;
  radius?: number;
  limit?: number;
}

export interface DiscoveredLead {
  providerId: string;
  name: string;
  niche: string;
  city: string;
  state: string;
  address?: string;
  phone?: string | null;
  normalizedPhone?: string | null;
  website?: string | null;
  normalizedDomain?: string | null;
  instagram?: string | null;
  hasWhatsapp: boolean;
  rating?: number | null;
  reviewCount?: number | null;
}

export interface LeadDiscoveryProvider {
  /** Identifier of the provider, e.g., 'google_places', 'mock' */
  providerName: string;
  
  search(input: LeadSearchInput): Promise<DiscoveredLead[]>;
}

// Simple Mock Provider for Development
export class MockLeadDiscoveryProvider implements LeadDiscoveryProvider {
  providerName = "mock_provider";

  async search(input: LeadSearchInput): Promise<DiscoveredLead[]> {
    // In production, if we don't have a real API, we should throw to avoid fake data
    if (process.env.NODE_ENV === "production") {
      throw new Error("SOURCE_NOT_AVAILABLE");
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const searchTerm = (input.query || input.niche || "Empresa").toLowerCase();
    const city = input.city || "São Paulo";
    
    // Generate some stable fake data based on input
    return [
      {
        providerId: `mock-1-${Date.now()}`,
        name: `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} Central`,
        niche: input.niche || "Serviços",
        city: city,
        state: "SP",
        address: "Av. Principal, 1000",
        phone: "(11) 99999-1111",
        normalizedPhone: normalizePhone("(11) 99999-1111"),
        website: null,
        normalizedDomain: null,
        instagram: null,
        hasWhatsapp: true,
        rating: 4.8,
        reviewCount: 342,
      },
      {
        providerId: `mock-2-${Date.now()}`,
        name: `${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)} do Bairro`,
        niche: input.niche || "Serviços",
        city: city,
        state: "SP",
        address: "Rua das Flores, 123",
        phone: "(11) 3333-2222",
        normalizedPhone: normalizePhone("(11) 3333-2222"),
        website: `www.${searchTerm.replace(/\s+/g, '')}bairro.com.br`,
        normalizedDomain: normalizeDomain(`www.${searchTerm.replace(/\s+/g, '')}bairro.com.br`),
        instagram: `@${searchTerm.replace(/\s+/g, '')}_bairro`,
        hasWhatsapp: false,
        rating: 3.5,
        reviewCount: 12,
      },
      {
        providerId: `mock-3-${Date.now()}`,
        name: `Premium ${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}`,
        niche: input.niche || "Serviços",
        city: city,
        state: "SP",
        address: "Av. Faria Lima, 3000",
        phone: "(11) 98888-7777",
        normalizedPhone: normalizePhone("(11) 98888-7777"),
        website: `https://${searchTerm.replace(/\s+/g, '')}premium.com`,
        normalizedDomain: normalizeDomain(`https://${searchTerm.replace(/\s+/g, '')}premium.com`),
        instagram: `@${searchTerm.replace(/\s+/g, '')}premium`,
        hasWhatsapp: true,
        rating: 4.9,
        reviewCount: 890,
      }
    ];
  }
}
