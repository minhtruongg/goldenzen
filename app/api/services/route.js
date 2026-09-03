import { dbSelect } from '@/lib/db';

// Public endpoint — powers the customer-facing booking page's service list.
// No auth required (same as booking/voucher), only exposes active services.
export async function GET() {
  const { data, error } = await dbSelect('services', {
    filters: [['active', 'eq', 'true']],
    order: 'sort_order.asc.nullslast,category.asc,name.asc',
  });

  if (error) {
    return Response.json({ ok: false, error: 'Failed to load services' }, { status: 500 });
  }

  return Response.json({ ok: true, services: data });
}
