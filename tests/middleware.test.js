import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';
import { createSessionToken, COOKIE_NAME } from '@/lib/auth';

const req = (path, token) =>
  new NextRequest(`http://localhost${path}`, {
    headers: token ? { cookie: `${COOKIE_NAME}=${token}` } : {},
  });

describe('admin middleware', () => {
  it('returns 401 JSON for unauthenticated API calls', async () => {
    const res = await middleware(req('/api/admin/appointments'));
    expect(res.status).toBe(401);
    expect((await res.json()).ok).toBe(false);
  });

  it('redirects unauthenticated page requests to the login page', async () => {
    const res = await middleware(req('/admin/calendar'));
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toBe('http://localhost/admin/login');
  });

  it('lets the login page and login API through', async () => {
    for (const path of ['/admin/login', '/api/admin/login']) {
      const res = await middleware(req(path));
      expect(res.headers.get('x-middleware-next')).toBe('1');
    }
  });

  it('lets an authenticated request through', async () => {
    const res = await middleware(req('/admin/calendar', await createSessionToken()));
    expect(res.headers.get('x-middleware-next')).toBe('1');
  });

  it('treats a forged cookie as unauthenticated', async () => {
    const res = await middleware(req('/api/admin/appointments', '9999999999999.deadbeef'));
    expect(res.status).toBe(401);
  });
});
