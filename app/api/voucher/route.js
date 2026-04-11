export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, effective_value, buyer_name, buyer_phone, buyer_email } = body;

    // 1. Save to Supabase
    const dbRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/voucher_orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        amount,
        effective_value,
        buyer_name,
        buyer_phone,
        buyer_email,
        status: 'pending_payment',
      }),
    });

    if (!dbRes.ok) {
      const err = await dbRes.text();
      console.error('Supabase error:', err);
      return Response.json({ ok: false, error: 'Database error' }, { status: 500 });
    }

    // 2. Build Telegram message
    const now = new Date();
    const orderDate = now.toLocaleDateString('cs-CZ');
    const orderTime = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
    const refNumber = `GZV${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    const bonus = effective_value - amount;
    const bonusLine = bonus > 0 ? `\n*Tiền thưởng:* +${bonus.toLocaleString('cs-CZ')} Kč` : '';

    const msg = [
      `🎁 *GoldenZen — Phiếu quà tặng*`,
      `Thời gian đặt: ${orderTime} - ${orderDate}`,
      `--------------------------`,
      `*Mã đơn:* ${refNumber}`,
      `*Số tiền thanh toán:* ${amount.toLocaleString('cs-CZ')} Kč`,
      `*Giá trị phiếu:* ${effective_value.toLocaleString('cs-CZ')} Kč${bonusLine}`,
      `--------------------------`,
      `*Người mua:* ${buyer_name}`,
      `*Điện thoại:* ${buyer_phone}`,
      `*Email:* ${buyer_email}`,
      `--------------------------`,
    ].filter(Boolean).join('\n');

    // 3. Send Telegram notification
    const tgRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: msg,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!tgRes.ok) {
      const err = await tgRes.text();
      console.error('Telegram error:', err);
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Voucher error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
