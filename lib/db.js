// Talks to Supabase's REST API (PostgREST) directly via fetch, bypassing the
// @supabase/supabase-js client library entirely. We hit a bug where that
// library silently returned empty results against this project's legacy JWT
// service-role key, while raw fetch to the same endpoint with the same key
// worked every time — so this file is the fix, not just a style choice.

const BASE_HEADERS = () => ({
  apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
});

function restUrl(table, params) {
  const qs = params ? `?${params.toString()}` : '';
  return `${process.env.SUPABASE_URL}/rest/v1/${table}${qs}`;
}

// filters: array of [column, operator, value] e.g. ['date', 'eq', '2026-09-03']
function buildParams({ filters = [], order, limit } = {}) {
  const params = new URLSearchParams();
  params.set('select', '*');
  for (const [col, op, val] of filters) {
    params.append(col, `${op}.${val}`);
  }
  if (order) params.set('order', order);
  if (limit) params.set('limit', String(limit));
  return params;
}

export async function dbSelect(table, opts = {}) {
  try {
    const res = await fetch(restUrl(table, buildParams(opts)), {
      headers: BASE_HEADERS(),
      cache: 'no-store',
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      console.error(`dbSelect(${table}) error:`, json);
      return { data: null, error: json || { message: `HTTP ${res.status}` } };
    }
    return { data: json, error: null };
  } catch (err) {
    console.error(`dbSelect(${table}) network error:`, err);
    return { data: null, error: { message: err.message } };
  }
}

export async function dbSelectOne(table, opts = {}) {
  const { data, error } = await dbSelect(table, { ...opts, limit: 1 });
  if (error) return { data: null, error };
  return { data: data?.[0] ?? null, error: null };
}

export async function dbInsert(table, body) {
  try {
    const res = await fetch(restUrl(table), {
      method: 'POST',
      headers: { ...BASE_HEADERS(), Prefer: 'return=representation' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      console.error(`dbInsert(${table}) error:`, json);
      return { data: null, error: json || { message: `HTTP ${res.status}` } };
    }
    return { data: Array.isArray(json) ? json[0] : json, error: null };
  } catch (err) {
    console.error(`dbInsert(${table}) network error:`, err);
    return { data: null, error: { message: err.message } };
  }
}

export async function dbUpdate(table, id, body) {
  try {
    const params = new URLSearchParams();
    params.append('id', `eq.${id}`);
    const res = await fetch(restUrl(table, params), {
      method: 'PATCH',
      headers: { ...BASE_HEADERS(), Prefer: 'return=minimal' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    if (!res.ok) {
      const json = await res.json().catch(() => null);
      console.error(`dbUpdate(${table}) error:`, json);
      return { error: json || { message: `HTTP ${res.status}` } };
    }
    return { error: null };
  } catch (err) {
    console.error(`dbUpdate(${table}) network error:`, err);
    return { error: { message: err.message } };
  }
}
