/**
 * Generates a safe WhatsApp wa.me URL
 * @param normalizedPhone Must be digits only, with country code (e.g. 5511999999999)
 * @param message Optional message to pre-fill
 */
export function generateWhatsappUrl(normalizedPhone: string | null | undefined, message?: string): string | null {
  if (!normalizedPhone || normalizedPhone.length < 10) {
    return null; // Invalid or missing phone
  }

  // Ensure digits only (extra safety)
  const safePhone = normalizedPhone.replace(/\D/g, "");
  
  if (safePhone.length < 10) return null;

  let url = `https://wa.me/${safePhone}`;
  
  if (message && message.trim() !== "") {
    url += `?text=${encodeURIComponent(message.trim())}`;
  }

  return url;
}
