export async function POST(req) {
  try {
    const body = await req.json();
    const { service_category, service_name, client_name, client_phone, date, time, note } = body;

    // 1. Save to Supabase
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

    // 2. Send Telegram message
    const msg = [
      `📅 Nová rezervace!`,
      `👤 ${client_name} | ${client_phone}`,
      `💆 ${service_name}`,
      `📆 ${date} — ${time}`,
      note ? `📝 ${note}` : null,
    ].filter(Boolean).join('\n');

    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: msg,
        }),
      }
    );

    if (!tgRes.ok) {
      const err = await tgRes.text();
      console.error('Telegram error:', err);
      // Don't fail the whole request if Telegram fails — booking is saved
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Booking error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
