import { dbUpdate } from '@/lib/db';

const ALLOWED_FIELDS = ['category', 'name', 'name_en', 'price', 'duration', 'active'];

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const updates = {};
    for (const key of ALLOWED_FIELDS) {
      if (key in body) updates[key] = body[key];
    }
    if ('price' in updates) updates.price = Number(updates.price);
    if ('duration' in updates) updates.duration = Number(updates.duration);

    if (Object.keys(updates).length === 0) {
      return Response.json({ ok: false, error: 'Không có gì để cập nhật' }, { status: 400 });
    }

    const { error } = await dbUpdate('services', params.id, updates);

    if (error) {
      return Response.json({ ok: false, error: 'Không lưu được thay đổi' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Service PATCH error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
