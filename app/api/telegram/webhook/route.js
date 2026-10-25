import { db, tg, sendEmail, emails, isOwner, moveButton } from "../../../../lib/notify.js";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.headers.get("x-telegram-bot-api-secret-token") !== process.env.TELEGRAM_SECRET) {
    return new Response("forbidden", { status: 403 });
  }
  const { callback_query: cb } = await req.json();
  if (cb) {
    try {
      if (isOwner(cb.from.id)) await onButton(cb);
      else await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Không có quyền" });
    } catch (e) {
      console.error(e);
      await tg("answerCallbackQuery", { callback_query_id: cb.id, text: "Có lỗi, thử lại" }).catch(() => {});
    }
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
const MOVE_MINUTES = 30;

// Raw shift on "YYYY-MM-DD" and "HH:MM" strings. Handles midnight rollover.
function shiftRaw(date, time, minutes) {
  const [y, m, d] = (date || "").split("-").map(Number);
  const [hh, mm] = (time || "").split(":").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d, hh, mm + minutes));
  if (Number.isNaN(t.getTime())) return null;
  return {
    date: t.toISOString().slice(0, 10),
    time: t.toISOString().slice(11, 16),
    short: t.toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", timeZone: "UTC" }),
  };
}

const OFFERS = { 60: "+1 giờ", 120: "+2 giờ", 1440: "+1 ngày", 2880: "+2 ngày" };
const offerText = (b, minutes) => {
  const s = shift(b, minutes);
  return s && `${s.day} at ${s.time}`;
};

async function onButton(cb) {
  const [action, ref, ...rest] = (cb.data || "").split(":");
  const n = rest.join(":");
  const m = cb.message;
  const answer = (text) => tg("answerCallbackQuery", { callback_query_id: cb.id, text });
  // Editing without reply_markup removes the buttons. Pass entities to keep bold text.
  const edit = (text, entities, reply_markup) =>
    tg("editMessageText", { chat_id: m.chat.id, message_id: m.message_id, text, entities, reply_markup });

  if (action === "confirm" || action === "reject") {
    const confirm = action === "confirm";
    // Conditional write: a second tap (or the other recipient) matches zero rows.
    const { data: b, error: upErr } = await db
      .from("bookings")
      .update(confirm ? { status: "confirmed" } : { status: "rejected", rejected_at: new Date().toISOString() })
      .eq("ref", ref)
      .eq("status", "pending")
      .select()
      .maybeSingle();
    if (upErr) throw upErr; // surface the real reason in the logs instead of "already handled"

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
    const rows = [[60, 120], [1440, 2880]].map((r) => r.map(btn).filter(Boolean)).filter((r) => r.length);
    await tg("sendMessage", {
      chat_id: m.chat.id,
      text: `Đề xuất giờ khác cho ${b.client_name}? (lịch cũ: ${b.date} ${b.time})`,
      reply_markup: { inline_keyboard: [...rows, [{ text: "Không đề xuất", callback_data: `plain:${b.ref}` }]] },
    });
    return;
  }

  if (action === "move") {
    const [fromDate, fromTime] = n.split("T");
    const next = shiftRaw(fromDate, fromTime, MOVE_MINUTES);
    if (!next) {
      await answer("Có lỗi, thử lại");
      return;
    }
    // Moving also confirms the booking. The reminder restarts for the new time.
    const { data: b, error: upErr } = await db
      .from("bookings")
      .update({ date: next.date, time: next.time, status: "confirmed", reminder_sent_at: null })
      .eq("ref", ref)
      .eq("date", fromDate)
      .eq("time", fromTime)
      .in("status", ["pending", "confirmed"])
      .select()
      .maybeSingle();
    if (upErr) throw upErr;
    if (!b) {
      await answer("Đã xử lý rồi");
      await edit(`${m.text}\n\nℹ️ Đã xử lý rồi`, m.entities);
      return;
    }
    await answer(`Đã dời sang ${b.time}`);
    await edit(
      `${m.text}\n\n⏰ Đã dời sang ${b.time} (${next.short}) và xác nhận`,
      m.entities,
      { inline_keyboard: [[moveButton(ref, b.date, b.time, "⏰ Dời thêm +30 phút")]] }
    );
    if (!(await sendEmail(b.client_email, emails.moved(b, `${fromDate} ${fromTime}`)))) {
      await tg("sendMessage", {
        chat_id: m.chat.id,
        text: `Khách ${b.client_name} không có email. Hãy gọi ${b.client_phone} báo giờ mới ${b.time}.`,
      });
    }
    return;
  }

  if (action === "offer" || action === "plain") {
    const { data: b, error: upErr } = await db
      .from("bookings")
      .update({ notified_at: new Date().toISOString() })
      .eq("ref", ref)
      .eq("status", "rejected")
      .is("notified_at", null)
      .select()
      .maybeSingle();
    if (upErr) throw upErr;
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