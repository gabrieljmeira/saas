export const CURRENT_SCORE_VERSION = 1;

export interface LeadScoreReason {
  code: string;
  label: string;
  impact: number;
}

export interface LeadScoreResult {
  score: number; // 0 to 100
  reasons: LeadScoreReason[];
  version: number;
}

export interface LeadDataForScoring {
  website?: string | null;
  hasWhatsapp?: boolean | null;
  instagram?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  status?: string;
}

/**
 * Deterministic scoring algorithm for B2B Leads.
 * Follows strict contract: unknown !== false, no penalty for missing data.
 */
export function calculateLeadScore(lead: LeadDataForScoring): LeadScoreResult {
  let score = 0;
  const reasons: LeadScoreReason[] = [];

  // Website logic: If explicitly no website (we know they don't have one), big opportunity.
  // Wait, the rule says: "unknown não pode ser tratado como false; ausência de informação não deve penalizar o lead"
  // If we know they don't have a website (e.g., website is explicitly checked and empty string or false if we tracked it)
  // Let's assume `null` or `undefined` means unknown. Empty string means explicitly no website.
  if (lead.website === "") {
    score += 20;
    reasons.push({ code: "NO_WEBSITE", label: "Sem site próprio", impact: 20 });
  } else if (typeof lead.website === "string" && lead.website.trim().length > 0) {
    score += 5;
    reasons.push({ code: "HAS_WEBSITE", label: "Possui site estruturado", impact: 5 });
  }

  // Whatsapp
  if (lead.hasWhatsapp === true) {
    score += 25;
    reasons.push({ code: "HAS_WHATSAPP", label: "WhatsApp disponível", impact: 25 });
  }

  // Instagram
  if (typeof lead.instagram === "string" && lead.instagram.trim().length > 0) {
    score += 15;
    reasons.push({ code: "HAS_INSTAGRAM", label: "Instagram ativo", impact: 15 });
  } else if (lead.instagram === "") {
    // Known not to have instagram
    score += 10;
    reasons.push({ code: "NO_INSTAGRAM", label: "Falta de presença no Instagram", impact: 10 });
  }

  // Ratings
  if (typeof lead.rating === "number") {
    if (lead.rating >= 4.5) {
      score += 15;
      reasons.push({ code: "HIGH_RATING", label: "Alta reputação local", impact: 15 });
    } else if (lead.rating >= 3.5) {
      score += 10;
      reasons.push({ code: "MEDIUM_RATING", label: "Reputação média", impact: 10 });
    } else {
      score += 5;
      reasons.push({ code: "LOW_RATING", label: "Baixa reputação", impact: 5 });
    }
  }

  // Reviews volume
  if (typeof lead.reviewCount === "number") {
    if (lead.reviewCount > 100) {
      score += 15;
      reasons.push({ code: "HIGH_REVIEWS", label: "Alto volume de avaliações", impact: 15 });
    } else if (lead.reviewCount > 20) {
      score += 10;
      reasons.push({ code: "MEDIUM_REVIEWS", label: "Volume razoável de avaliações", impact: 10 });
    } else {
      score += 5;
      reasons.push({ code: "LOW_REVIEWS", label: "Poucas avaliações", impact: 5 });
    }
  }

  // Cap and floor
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return {
    score,
    reasons,
    version: CURRENT_SCORE_VERSION
  };
}
