import { ResultMetadata } from "./schemas";

export interface CommunityOpportunitySource {
  id: string;
  userId: string;
  status: "won" | "lost" | "open";
  leadName: string;
  city: string | null;
  revenueCents: number;
  niche: string;
  leadScore: number | null;
  daysToClose: number;
  channel: "whatsapp" | "instagram" | "email" | "other";
}

/**
 * Adapter interface to connect the Community module to the CRM/Pipeline
 * module without creating tight coupling.
 */
export interface CommunitySourceAdapter {
  getWonOpportunity(opportunityId: string, userId: string): Promise<CommunityOpportunitySource | null>;
}

/**
 * Real implementation throws SOURCE_NOT_AVAILABLE 
 * until the CRM is built and connected in production.
 */
export class ProductionCRMAdapter implements CommunitySourceAdapter {
  async getWonOpportunity(opportunityId: string, userId: string): Promise<CommunityOpportunitySource | null> {
    throw new Error("SOURCE_NOT_AVAILABLE: O módulo de CRM ainda não está integrado em produção.");
  }
}

export const crmAdapter = new ProductionCRMAdapter();
