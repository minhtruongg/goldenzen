import { NextResponse } from 'next/server';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ ok: false, error: 'Chưa đăng nhập' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
