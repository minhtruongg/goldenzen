import { dbInsert } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, effective_value, buyer_name, buyer_phone, buyer_email } = body;

    // 1. Build Telegram message
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

    // 2. Send Telegram notification first — always, to all recipients
    const chatIds = [process.env.TELEGRAM_CHAT_ID, process.env.TELEGRAM_CHAT_ID_2].filter(Boolean);
    await Promise.all(chatIds.map(chat_id =>
      fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text: msg, parse_mode: 'Markdown' }),
      }).then(r => { if (!r.ok) r.text().then(e => console.error('Telegram error:', e)); })
    ));

    // 3. Save to the database — awaited, so a failure is caught instead of silent.
    const { error: voucherErr } = await dbInsert('voucher_orders', {
      amount,
      effective_value,
      buyer_name,
      buyer_phone,
      buyer_email,
      status: 'pending_payment',
    });

    if (voucherErr) {
      return Response.json({ ok: false, error: 'Không lưu được vào cơ sở dữ liệu' }, { status: 500 });
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error('Voucher error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}