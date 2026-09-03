import { dbUpdate } from '@/lib/db';

const ALLOWED_FIELDS = ['status', 'date', 'time', 'note', 'client_name', 'client_phone'];

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const updates = {};
    for (const key of ALLOWED_FIELDS) {
      if (key in body) updates[key] = body[key];
    }
    if (Object.keys(updates).length === 0) {
      return Response.json({ ok: false, error: 'Không có gì để cập nhật' }, { status: 400 });
    }

    const { error } = await dbUpdate('bookings', params.id, updates);

    if (error) {
      return Response.json({ ok: false, error: 'Không lưu được thay đổi' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Appointment PATCH error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
