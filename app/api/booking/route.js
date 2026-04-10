export async function POST(req) {
  try {
    const body = await req.json();
    const { service_category, service_name, client_name, client_phone, date, time, note } = body;

    // 1. Save to Supabase (Your original logic)
    const dbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/bookings`, {
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
    });

    if (!dbRes.ok) {
      const err = await dbRes.text();
      console.error('Supabase error:', err);
      return Response.json({ ok: false, error: 'Database error' }, { status: 500 });
    }

    // 2. Generate Reference & Timestamps (New parts for the screenshot look)
    const bookingDate = new Date().toLocaleDateString('cs-CZ');
    const bookingTime = new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
    const refNumber = `GZB${date.replace(/-/g, '').slice(2)}${Math.random().toString(36).slice(2,5).toUpperCase()}`;

    // 3. The New Message Format (Matching your image)
    const msg = [
      `*GoldenzenBookingBOT*`,
      `*GoldenZen Booking*`,
      `Thời gian Booking: ${bookingTime} - ${bookingDate}`,
      `--------------------------`,
      `*Mã Booking:*`,
      `${refNumber}`,
      `*Dịch vụ:* ${service_name}`,
      `*Lịch đặt:* ${time} - ${new Date(date).toLocaleDateString('cs-CZ')}`,
      `*Tên:* ${client_name}`,
      `*Số điện thoại:* ${client_phone}`,
      `*Tin nhắn:* ${note || 'Ok'}`
    ].join('\n');

    // 4. Send Telegram message
    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: 'Markdown', // Crucial for bolding
        }),
      }
    );

    if (!tgRes.ok) {
      const err = await tgRes.text();
      console.error('Telegram error:', err);
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Booking error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}