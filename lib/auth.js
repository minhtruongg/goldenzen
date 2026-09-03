// Simple signed-cookie session — no user table, single shared admin login.
// Uses Web Crypto so it works in both middleware (Edge runtime) and API routes (Node).

const COOKIE_NAME = 'gz_admin_session';
const SESSION_DAYS = 90;

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const sig = await hmac(secret, String(expires));
  return `${expires}.${sig}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;
  const [expiresStr, sig] = token.split('.');
  if (!expiresStr || !sig) return false;
  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;
  const secret = process.env.ADMIN_SESSION_SECRET;
  const expectedSig = await hmac(secret, expiresStr);
  return expectedSig === sig;
}

export { COOKIE_NAME, SESSION_DAYS };
