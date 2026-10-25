import { db, tg, sendEmail, emails, isOwner } from "../../../../lib/notify.js";

export const dynamic = "force-dynamic";

export async function POST(req) {
  if (req.headers.get("x-telegram-bot-api-secret-token") !== process.env.TELEGRAM_SECRET) {
    return new Response("forbidden", { status: 403 });
  }
  const { callback_query: cb } = await req.json();
  if (cb) {
    const answer = (text) => tg("answerCallbackQuery", { callback_query_id: cb.id, text });
    try {
      if (!isOwner(cb.from.id)) await answer("Không có quyền");
      else await onButton(cb, answer);
    } catch (e) {
      console.error(e);
      await answer("Có lỗi, thử lại").catch(() => {});
    }
  }
  return new Response("ok");
}

async function onButton(cb, answer) {
  const [action, ref] = (cb.data || "").split(":");
  const m = cb.message;
  // Editing without reply_markup removes the buttons. Pass entities to keep bold text.
  const edit = (text) =>
    tg("editMessageText", { chat_id: m.chat.id, message_id: m.message_id, text, entities: m.entities });

  // Older messages may still carry the removed Reject and Move buttons.
  if (action !== "confirm") {
    await answer("Nút này đã bỏ. Hãy gọi khách.");
    return;
  }

  // Conditional write: a second tap (or the other recipient) matches zero rows.
  const { data: b, error } = await db
    .from("bookings")
    .update({ status: "confirmed" })
    .eq("ref", ref)
    .eq("status", "pending")
    .select()
    .maybeSingle();
  if (error) throw error;

  const label = b ? "✅ Đã xác nhận" : "ℹ️ Đã xử lý rồi";
  await answer(label);
  await edit(`${m.text}\n\n${label}`);
  if (!b) return;

  if (!(await sendEmail(b.client_email, emails.confirmed(b)))) {
    await tg("sendMessage", {
      chat_id: m.chat.id,
      text: `Khách ${b.client_name} không có email. Hãy gọi ${b.client_phone}.`,
    });
  }
}