import { describe, it, expect } from 'vitest';
import { normalizePhone, normalizeDomain } from './normalization';
import { calculateLeadScore } from './scoring';
import { MockLeadDiscoveryProvider } from './discovery';
import { generateWhatsappUrl } from '../../../../apps/web/lib/leads/whatsapp';

describe('Lead Normalization', () => {
  it('normalizes phone by keeping only digits and adding country code if missing', () => {
    expect(normalizePhone('(11) 99999-1111')).toBe('5511999991111');
    expect(normalizePhone('+55 (11) 99999-1111')).toBe('5511999991111');
    expect(normalizePhone('11999991111')).toBe('5511999991111');
    expect(normalizePhone('5511999991111')).toBe('5511999991111');
    expect(normalizePhone(null)).toBe(null);
    expect(normalizePhone(undefined)).toBe(null);
    expect(normalizePhone('')).toBe(null);
  });

  it('normalizes domain by stripping protocol and www', () => {
    expect(normalizeDomain('https://www.example.com.br/path?q=1')).toBe('example.com.br');
    expect(normalizeDomain('http://example.com/')).toBe('example.com');
    expect(normalizeDomain('www.test.com')).toBe('test.com');
    expect(normalizeDomain('test.com')).toBe('test.com');
    expect(normalizeDomain(null)).toBe(null);
    expect(normalizeDomain(undefined)).toBe(null);
  });
});

describe('Lead Scoring', () => {
  it('caps score between 0 and 100 and returns valid contract', () => {
    const res = calculateLeadScore({
      website: '', // +20
      hasWhatsapp: true, // +25
      instagram: 'yes', // +15
      rating: 5, // +15
      reviewCount: 200 // +15
    });
    // 20+25+15+15+15 = 90
    expect(res.score).toBe(90);
    expect(res.reasons.length).toBeGreaterThan(0);
    expect(res.version).toBe(1);
    expect(res.reasons[0]).toHaveProperty('code');
    expect(res.reasons[0]).toHaveProperty('label');
    expect(res.reasons[0]).toHaveProperty('impact');
  });

  it('does not penalize for unknown data', () => {
    const res = calculateLeadScore({
      website: undefined,
      hasWhatsapp: undefined,
      instagram: null,
      rating: undefined,
      reviewCount: undefined
    });
    // Starting score is 0. No penalties applied.
    expect(res.score).toBe(0);
    expect(res.reasons.length).toBe(0);
  });

  it('treats empty string website as NO_WEBSITE explicitly (+20)', () => {
    const res = calculateLeadScore({ website: '' });
    expect(res.score).toBe(20);
    expect(res.reasons.find(r => r.code === 'NO_WEBSITE')).toBeDefined();
  });
});

describe('WhatsApp Integration', () => {
  it('generates correct wa.me URL', () => {
    const url = generateWhatsappUrl('5511999991111', 'Olá mundo');
    expect(url).toBe('https://wa.me/5511999991111?text=Ol%C3%A1%20mundo');
  });

  it('returns null if phone is absent or invalid', () => {
    expect(generateWhatsappUrl(null)).toBe(null);
    expect(generateWhatsappUrl('')).toBe(null);
    expect(generateWhatsappUrl('123')).toBe(null); // too short
  });
});

describe('Discovery Provider', () => {
  it('throws SOURCE_NOT_AVAILABLE in production for Mock', async () => {
    const provider = new MockLeadDiscoveryProvider();
    // Temporarily fake production
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    
    await expect(provider.search({ query: 'test' }))
      .rejects.toThrow('SOURCE_NOT_AVAILABLE');
      
    process.env.NODE_ENV = originalEnv;
  });
});
