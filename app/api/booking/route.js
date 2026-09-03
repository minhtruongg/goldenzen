import { dbInsert } from '@/lib/db';
import { upsertCustomerByPhone } from '@/lib/customers';

export async function POST(req) {
  try {
    const body = await req.json();
    const { service_category, service_name, client_name, client_phone, client_email, date, time, note, price_final, duration } = body;

    // 1. Generate Reference & Timestamps
    const bookingDate = new Date().toLocaleDateString('cs-CZ', { timeZone: 'Europe/Prague' });
    const bookingTime = new Date().toLocaleTimeString('cs-CZ', { timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit' });
    const refNumber = `GZB${date.replace(/-/g, '').slice(2)}${Math.random().toString(36).slice(2,5).toUpperCase()}`;

    const msg = [
      `📅 *GoldenZen — Đặt lịch mới*`,
      `Thời gian đặt: ${bookingTime} - ${bookingDate}`,
      `--------------------------`,
      `*Mã đặt lịch:* ${refNumber}`,
      `*Dịch vụ:* ${service_name}`,
      `*Lịch hẹn:* ${time} - ${new Date(date).toLocaleDateString('cs-CZ', { timeZone: 'Europe/Prague' })}`,
      duration ? `*Thời lượng:* ${duration} phút` : null,
      price_final ? `*Giá:* ${Number(price_final).toLocaleString('cs-CZ')} Kč` : null,
      `--------------------------`,
      `*Tên khách:* ${client_name}`,
      `*Số điện thoại:* ${client_phone}`,
      client_email ? `*Email:* ${client_email}` : null,
      note ? `*Ghi chú:* ${note}` : null,
    ].filter(Boolean).join('\n');

    // 2. Send Telegram — always, to all recipients. Kept as a safety net:
    // if the database write below fails, this message is still the record.
    const chatIds = [process.env.TELEGRAM_CHAT_ID, process.env.TELEGRAM_CHAT_ID_2].filter(Boolean);
    await Promise.all(chatIds.map(chat_id =>
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text: msg, parse_mode: 'Markdown' }),
      }).then(r => { if (!r.ok) r.text().then(e => console.error('Telegram error:', e)); })
    ));

    // 3. Save to the database — awaited, so a failure is caught instead of silent.
    // Link (or create) the customer record by phone number.
    const customer_id = await upsertCustomerByPhone({
      name: client_name,
      phone: client_phone,
      email: client_email,
    });

    const { error: bookingErr } = await dbInsert('bookings', {
      service_category,
      service_name,
      client_name,
      client_phone,
      client_email: client_email || '',
      date,
      time,
      note: note || '',
      status: 'pending',
      customer_id,
      price: price_final ?? null,
      duration: duration ?? null,
    });

    if (bookingErr) {
      return Response.json({ ok: false, error: 'Không lưu được vào cơ sở dữ liệu' }, { status: 500 });
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Booking error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
