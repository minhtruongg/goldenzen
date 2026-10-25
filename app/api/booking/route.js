import { dbInsert } from '@/lib/db';
import { upsertCustomerByPhone } from '@/lib/customers';
import { confirmKeyboard, ownerIds, sendEmail, emails } from '@/lib/notify';


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

    // 2. Save to the database FIRST, so the Telegram buttons have a booking to act on.
    // A failure here no longer throws: Telegram still goes out below as the safety net.
    let saved = false;
    try {
      // Link (or create) the customer record by phone number.
      const customer_id = await upsertCustomerByPhone({
        name: client_name,
        phone: client_phone,
        email: client_email,
      });

      const { error: bookingErr } = await dbInsert('bookings', {
        ref: refNumber,
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
      saved = !bookingErr;
      if (bookingErr) console.error('Booking insert error:', bookingErr);
    } catch (dbErr) {
      console.error('Booking save error:', dbErr);
    }

    // 3. Send Telegram to every recipient. Buttons only when the booking is saved.
    const text = saved ? msg : `${msg}\n\n⚠️ Chưa lưu được vào hệ thống. Hãy ghi lại lịch này.`;
    const sendTelegram = (chat_id, markdown) =>
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          // Plain-text retry drops the asterisks so no stray markup shows.
          text: markdown ? text : text.replace(/\*/g, ''),
          ...(markdown && { parse_mode: 'Markdown' }),
          ...(saved && { reply_markup: confirmKeyboard(refNumber) }),
        }),
      });

    await Promise.all(ownerIds().map(async (chat_id) => {
      try {
        let r = await sendTelegram(chat_id, true);
        if (!r.ok) {
          // A name like "Anna_K" can break Markdown. Send again as plain text.
          console.error('Telegram Markdown failed, retrying plain:', await r.text());
          r = await sendTelegram(chat_id, false);
          if (!r.ok) console.error('Telegram error:', await r.text());
        }
      } catch (e) {
        console.error('Telegram send failed:', e);
      }
    }));

    if (!saved) {
      return Response.json({ ok: false, error: 'Không lưu được vào cơ sở dữ liệu' }, { status: 500 });
    }

    // 4. Tell the customer the request arrived (skipped when no email was given).
    await sendEmail(client_email, emails.waiting({ client_name, service_name, date, time }));

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Booking error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}