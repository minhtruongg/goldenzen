import { describe, it, expect, afterEach, vi } from 'vitest';
import { createSessionToken, verifySessionToken } from '@/lib/auth';

afterEach(() => vi.useRealTimers());

describe('session tokens', () => {
  it('accepts a token it just created', async () => {
    expect(await verifySessionToken(await createSessionToken())).toBe(true);
  });

  it('rejects a missing token', async () => {
    expect(await verifySessionToken(undefined)).toBe(false);
    expect(await verifySessionToken('')).toBe(false);
  });

  it('rejects a token with no signature', async () => {
    expect(await verifySessionToken('1999999999999')).toBe(false);
  });

  it('rejects a token with a tampered signature', async () => {
    const token = await createSessionToken();
    const [expires, sig] = token.split('.');
    const flipped = (sig[0] === 'a' ? 'b' : 'a') + sig.slice(1);
    expect(await verifySessionToken(`${expires}.${flipped}`)).toBe(false);
  });

  it('rejects a token whose expiry was extended', async () => {
    const token = await createSessionToken();
    const [expires, sig] = token.split('.');
    const extended = String(Number(expires) + 86400000);
    expect(await verifySessionToken(`${extended}.${sig}`)).toBe(false);
  });

  it('rejects an expired token', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const token = await createSessionToken();
    vi.setSystemTime(new Date('2026-06-01T00:00:00Z')); // past the 90-day window
    expect(await verifySessionToken(token)).toBe(false);
  });

  it('accepts a token just inside the 90-day window', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    const token = await createSessionToken();
    vi.setSystemTime(new Date('2026-03-30T00:00:00Z')); // day 88
    expect(await verifySessionToken(token)).toBe(true);
  });
});
