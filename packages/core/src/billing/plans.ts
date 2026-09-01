export type PlanType = "FREE" | "FREELANCER" | "AGENCY";

export interface PlanConfig {
  name: string;
  priceId: {
    monthly: string | null;
    annual: string | null;
  };
  searchesPerDay: number | null; // null = unlimited
  maxResultsPerSearch: number | null; // null = unlimited
  unlimitedSearches: boolean;
  contactFields: {
    instagram: boolean;
    whatsapp: boolean;
    phone: boolean;
    website: boolean;
  };
  features: {
    smartServiceFilter: boolean;
    excelExport: boolean;
    priorityFeatures: boolean;
  };
}

export const PLAN_CONFIG: Record<PlanType, PlanConfig> = {
  FREE: {
    name: "Grátis",
    priceId: { monthly: null, annual: null },
    searchesPerDay: 1,
    maxResultsPerSearch: 5,
    unlimitedSearches: false,
    contactFields: {
      instagram: true,
      whatsapp: false,
      phone: false,
      website: false,
    },
    features: {
      smartServiceFilter: false,
      excelExport: false,
      priorityFeatures: false,
    },
  },
  FREELANCER: {
    name: "Freelancer",
    priceId: {
      monthly: process.env.NEXT_PUBLIC_PADDLE_FREELANCER_MONTHLY_PRICE_ID || null,
      annual: process.env.NEXT_PUBLIC_PADDLE_FREELANCER_ANNUAL_PRICE_ID || null,
    },
    searchesPerDay: 10,
    maxResultsPerSearch: null,
    unlimitedSearches: false,
    contactFields: {
      instagram: true,
      whatsapp: true,
      phone: true,
      website: true,
    },
    features: {
      smartServiceFilter: true,
      excelExport: false,
      priorityFeatures: false,
    },
  },
  AGENCY: {
    name: "Agência",
    priceId: {
      monthly: process.env.NEXT_PUBLIC_PADDLE_AGENCY_MONTHLY_PRICE_ID || null,
      annual: process.env.NEXT_PUBLIC_PADDLE_AGENCY_ANNUAL_PRICE_ID || null,
    },
    searchesPerDay: null,
    maxResultsPerSearch: null,
    unlimitedSearches: true,
    contactFields: {
      instagram: true,
      whatsapp: true,
      phone: true,
      website: true,
    },
    features: {
      smartServiceFilter: true,
      excelExport: true,
      priorityFeatures: true,
    },
  },
};

export const CREDIT_PACKAGES = [
  {
    id: "credits_8",
    priceId: process.env.NEXT_PUBLIC_PADDLE_CREDITS_8_PRICE_ID || null,
    credits: 8,
    price: 10.0,
    isPopular: false,
  },
  {
    id: "credits_20",
    priceId: process.env.NEXT_PUBLIC_PADDLE_CREDITS_20_PRICE_ID || null,
    credits: 20,
    price: 19.99,
    isPopular: true,
  },
  {
    id: "credits_40",
    priceId: process.env.NEXT_PUBLIC_PADDLE_CREDITS_40_PRICE_ID || null,
    credits: 40,
    price: 30.0,
    isPopular: false,
    label: "Melhor custo por busca",
  },
];
