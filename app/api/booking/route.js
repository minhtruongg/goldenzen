export async function POST(req) {
  try {
    const body = await req.json();
    const { service_category, service_name, client_name, client_phone, date, time, note, price_original, price_final, duration } = body;

    // 1. Generate Reference & Timestamps
    const bookingDate = new Date().toLocaleDateString('cs-CZ');
    const bookingTime = new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
    const refNumber = `GZB${date.replace(/-/g, '').slice(2)}${Math.random().toString(36).slice(2,5).toUpperCase()}`;

    // 3. The New Message Format (Matching your image)
    const msg = [
      `📅 *GoldenZen — Đặt lịch mới*`,
      `Thời gian đặt: ${bookingTime} - ${bookingDate}`,
      `--------------------------`,
      `*Mã đặt lịch:* ${refNumber}`,
      `*Dịch vụ:* ${service_name}`,
      `*Lịch hẹn:* ${time} - ${new Date(date).toLocaleDateString('cs-CZ')}`,
      duration ? `*Thời lượng:* ${duration} phút` : null,
      price_final ? `*Giá:* ${Number(price_final).toLocaleString('cs-CZ')} Kč` : null,
      `--------------------------`,
      `*Tên khách:* ${client_name}`,
      `*Số điện thoại:* ${client_phone}`,
      note ? `*Ghi chú:* ${note}` : null,
    ].filter(Boolean).join('\n');

    // 2. Send Telegram first — always, to all recipients
    const chatIds = [process.env.TELEGRAM_CHAT_ID, process.env.TELEGRAM_CHAT_ID_2].filter(Boolean);
    await Promise.all(chatIds.map(chat_id =>
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text: msg, parse_mode: 'Markdown' }),
      }).then(r => { if (!r.ok) r.text().then(e => console.error('Telegram error:', e)); })
    ));

    // 3. Save to Supabase (best effort)
    fetch(`${process.env.SUPABASE_URL}/rest/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        service_category,
        service_name,
        client_name,
        client_phone,
        date,
        time,
        note: note || '',
        status: 'pending',
      }),
    }).catch(err => console.error('Supabase error:', err));

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Booking error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}