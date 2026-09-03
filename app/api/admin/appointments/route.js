import { dbSelectOne, dbInsert } from '@/lib/db';
import { upsertCustomerByPhone } from '@/lib/customers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { client_name, client_phone, client_email, service_id, date, time, note } = body;

    if (!client_name || !date || !time) {
      return Response.json({ ok: false, error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    // Look up the chosen service so we snapshot its name/category/price/duration
    // onto the booking (same as the online booking flow does).
    let service = null;
    if (service_id) {
      const { data } = await dbSelectOne('services', { filters: [['id', 'eq', service_id]] });
      service = data;
    }

    const customer_id = await upsertCustomerByPhone({
      name: client_name,
      phone: client_phone,
      email: client_email,
    });

    const { data: booking, error } = await dbInsert('bookings', {
      client_name,
      client_phone: client_phone || '',
      client_email: client_email || '',
      service_id: service?.id || null,
      service_name: service?.name || body.service_name || '',
      service_category: service?.category || null,
      price: service?.price ?? null,
      duration: service?.duration ?? null,
      date,
      time,
      note: note || '',
      status: 'confirmed', // manually entered by staff — treated as already confirmed
      customer_id,
    });

    if (error) {
      return Response.json({ ok: false, error: 'Không lưu được lịch hẹn' }, { status: 500 });
    }

    return Response.json({ ok: true, id: booking.id });
  } catch (err) {
    console.error('Manual appointment error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
