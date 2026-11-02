import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/admin/login/route';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

const login = (password) =>
  POST(new Request('http://localhost/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  }));

describe('POST /api/admin/login', () => {
  it('rejects a wrong password with 401 and no cookie', async () => {
    const res = await login('wrong');
    expect(res.status).toBe(401);
    expect(res.headers.get('Set-Cookie')).toBeNull();
  });

  it('rejects an empty password', async () => {
    expect((await login('')).status).toBe(401);
  });

  it('sets a valid, HttpOnly session cookie on the right password', async () => {
    const res = await login('correct-horse');
    expect(res.status).toBe(200);
    const cookie = res.headers.get('Set-Cookie');
    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
    expect(cookie).toContain('SameSite=Lax');
    const token = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))[1];
    expect(await verifySessionToken(token)).toBe(true);
  });
});
