/**
 * Remove all non-numeric characters from a phone number.
 * Ensures the DDI is present (assuming +55 if 10-11 digits without DDI).
 */
export function normalizePhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  
  let cleaned = phone.replace(/\D/g, "");
  
  if (!cleaned) return null;

  // Assuming Brazilian numbers as default for this CRM context
  // If it's a mobile or landline without country code (10 or 11 digits)
  if (cleaned.length === 10 || cleaned.length === 11) {
    cleaned = "55" + cleaned;
  }
  
  return cleaned;
}

/**
 * Extracts the base domain from a URL (removes protocol, www, paths, queries).
 */
export function normalizeDomain(url: string | null | undefined): string | null {
  if (!url) return null;
  
  let cleaned = url.toLowerCase().trim();
  
  // Remove protocol
  cleaned = cleaned.replace(/^(https?:\/\/)?/, "");
  
  // Remove www.
  cleaned = cleaned.replace(/^www\./, "");
  
  // Remove paths, hashes, query strings
  cleaned = cleaned.split('/')[0];
  cleaned = cleaned.split('?')[0];
  cleaned = cleaned.split('#')[0];
  
  return cleaned ? cleaned : null;
}
