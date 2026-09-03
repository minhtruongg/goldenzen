import { createSessionToken, COOKIE_NAME, SESSION_DAYS } from '@/lib/auth';

export async function POST(req) {
  const { password } = await req.json();

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, error: 'Sai mật khẩu' }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = Response.json({ ok: true });
  res.headers.set(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`
  );
  return res;
}
