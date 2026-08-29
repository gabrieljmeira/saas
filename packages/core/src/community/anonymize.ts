/**
 * Utility functions to anonymize sensitive CRM data before sharing to the community.
 */

export function anonymizeLeadName(name: string, city?: string | null): string {
  // e.g. "Restaurante Sabor Sul" -> "Restaurante"
  // If city is present: "Restaurante • Porto Alegre"
  
  const words = name.trim().split(" ");
  const firstWord = words[0] || "Empresa";
  
  if (city) {
    return `${firstWord} • ${city}`;
  }
  
  return firstWord;
}

export function stripContactInfo(text: string): string {
  // Remove phone numbers and emails
  let cleanText = text.replace(/[\w.-]+@[\w.-]+\.\w+/g, "[EMAIL OCULTO]");
  cleanText = cleanText.replace(/\+?\d{2,3}?\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}/g, "[TELEFONE OCULTO]");
  return cleanText;
}
