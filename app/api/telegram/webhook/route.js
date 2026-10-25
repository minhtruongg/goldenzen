import { db, tg, sendEmail, emails, isOwner } from "../../../../lib/notify.js";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.headers.get("x-telegram-bot-api-secret-token") !== process.env.TELEGRAM_SECRET) {
    return new Response("forbidden", { status: 403 });
  }
  const { callback_query: cb } = await req.json();
  try {
    if (cb && isOwner(cb.from.id)) await onButton(cb);
  } catch (e) {
    console.error(e);
  }
  return new Response("ok");
}

// Booking time shifted by N minutes. "day" and "time" go to the customer email,
// "short" (27. 10.) goes on the button.
function shift(b, minutes) {
  const [y, m, d] = (b.date || "").split("-").map(Number);
  const [hh, mm] = (b.time || "").split(":").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d, hh, mm + minutes));
  if (Number.isNaN(t.getTime())) return null;
  return {
    day: t.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }),
    short: t.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", timeZone: "UTC" }),
    time: t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }),
  };
}
const OFFERS = { 30: "+30 phút", 60: "+1 giờ", 120: "+2 giờ", 1440: "+1 ngày", 2880: "+2 ngày" };
const offerText = (b, minutes) => {
  const s = shift(b, minutes);
  return s && `${s.day} at ${s.time}`;
};

async function onButton(cb) {
  const [action, ref, n] = (cb.data || "").split(":");
  const m = cb.message;
  const answer = (text) => tg("answerCallbackQuery", { callback_query_id: cb.id, text });
  // Editing without reply_markup removes the buttons. Pass entities to keep bold text.
  const edit = (text, entities) =>
    tg("editMessageText", { chat_id: m.chat.id, message_id: m.message_id, text, entities });

  if (action === "confirm" || action === "reject") {
    const confirm = action === "confirm";
    // Conditional write: a second tap (or the other recipient) matches zero rows.
    const { data: b } = await db
      .from("bookings")
      .update(confirm ? { status: "confirmed" } : { status: "rejected", rejected_at: new Date().toISOString() })
      .eq("ref", ref)
      .eq("status", "pending")
      .select()
      .maybeSingle();

    const label = !b ? "ℹ️ Đã xử lý rồi" : confirm ? "✅ Đã xác nhận" : "❌ Đã từ chối";
    await answer(label);
    await edit(`${m.text}\n\n${label}`, m.entities);
    if (!b) return;

    if (confirm) {
      if (!(await sendEmail(b.client_email, emails.confirmed(b)))) {
        await tg("sendMessage", {
          chat_id: m.chat.id,
          text: `Khách ${b.client_name} không có email. Hãy gọi ${b.client_phone}.`,
        });
      }
      return;
    }

    // Reject: tap-only alternatives, shifted by hours or days.
    const btn = (minutes) => {
      const s = shift(b, minutes);
      if (!s) return null;
      const short = minutes < 1440 ? s.time : s.short;
      return { text: `${OFFERS[minutes]} · ${short}`, callback_data: `offer:${b.ref}:${minutes}` };
    };
    const rows = [[30, 60, 120], [1440, 2880]].map((r) => r.map(btn).filter(Boolean)).filter((r) => r.length);
    await tg("sendMessage", {
      chat_id: m.chat.id,
      text: `Đề xuất giờ khác cho ${b.client_name}? (lịch cũ: ${b.date} ${b.time})`,
      reply_markup: { inline_keyboard: [...rows, [{ text: "Không đề xuất", callback_data: `plain:${b.ref}` }]] },
    });
    return;
  }

  if (action === "offer" || action === "plain") {
    const { data: b } = await db
      .from("bookings")
      .update({ notified_at: new Date().toISOString() })
      .eq("ref", ref)
      .eq("status", "rejected")
      .is("notified_at", null)
      .select()
      .maybeSingle();
    if (!b) {
      await answer("Đã gửi rồi");
      await edit(`${m.text}\n\nℹ️ Đã gửi rồi`);
      return;
    }
    const offer = action === "offer" && OFFERS[n] ? offerText(b, Number(n)) : null;
    const sent = await sendEmail(b.client_email, emails.rejected(b, offer));
    await answer(sent ? "Đã gửi" : "Không có email");
    await edit(
      sent
        ? `Đã gửi email cho ${b.client_name}${offer ? `: ${offer}` : ""}.`
        : `Khách ${b.client_name} không có email. Hãy gọi ${b.client_phone}${offer ? ` và đề xuất ${offer}` : ""}.`
    );
  }
}