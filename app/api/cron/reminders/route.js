import { db, tg, sendEmail, emails, confirmKeyboard, ownerIds } from "../../../../lib/notify.js";

export const dynamic = "force-dynamic";

const pragueDate = (ms) => new Date(ms).toLocaleDateString("sv-SE", { timeZone: "Europe/Prague" });

// Assumes bookings.date is "YYYY-MM-DD" and bookings.time is "HH:MM" in Prague time.
// Returns NaN for any other format, which skips the reminder.
function startMs(b) {
  const [y, m, d] = (b.date || "").split("-").map(Number);
  const [hh, mm] = (b.time || "").split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  if (Number.isNaN(guess)) return NaN;
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Prague",
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
      .formatToParts(new Date(guess))
      .map((x) => [x.type, Number(x.value)])
  );
  const asPrague = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return guess - (asPrague - guess);
}

export async function GET(req) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("forbidden", { status: 403 });
  }
  const now = Date.now();
  const ago = (min) => new Date(now - min * 60000).toISOString();
  const out = { reminders: 0, nudges: 0, rejections: 0 };

  // 1. Reminders: confirmed bookings starting in 23 to 25 hours.
  const days = [0, 1, 2].map((n) => pragueDate(now + n * 86400000));
  const { data: due } = await db
    .from("bookings")
    .select("*")
    .eq("status", "confirmed")
    .is("reminder_sent_at", null)
    .neq("client_email", "")
    .not("client_email", "is", null)
    .in("date", days);
  for (const b of due || []) {
    const hrs = (startMs(b) - now) / 3600000;
    if (!(hrs >= 23 && hrs <= 25)) continue;
    if (await sendEmail(b.client_email, emails.reminder(b))) {
      await db.from("bookings").update({ reminder_sent_at: new Date().toISOString() }).eq("id", b.id);
      out.reminders++;
    }
  }

  // 2. Nudge the owners once about bookings pending for 30+ minutes.
  const { data: stale } = await db
    .from("bookings")
    .select("*")
    .eq("status", "pending")
    .not("ref", "is", null)
    .is("nudged_at", null)
    .lt("created_at", ago(30))
    .gt("created_at", ago(1440));
  for (const b of stale || []) {
    await Promise.all(
      ownerIds().map((chat_id) =>
        tg("sendMessage", {
          chat_id,
          text: `⏰ Vẫn chờ xác nhận\n${b.client_name}, ${b.service_name}\n${b.date} ${b.time}\n${b.client_phone}`,
          reply_markup: confirmKeyboard(b.ref, b.date, b.time),
        })
      )
    );
    await db.from("bookings").update({ nudged_at: new Date().toISOString() }).eq("id", b.id);
    out.nudges++;
  }

  // 3. Fallback: rejected but no offer chosen. Send the plain rejection after 15 minutes.
  const { data: open } = await db
    .from("bookings")
    .select("*")
    .eq("status", "rejected")
    .is("notified_at", null)
    .lt("rejected_at", ago(15))
    .gt("rejected_at", ago(1440));
  for (const b of open || []) {
    await sendEmail(b.client_email, emails.rejected(b, null));
    await db.from("bookings").update({ notified_at: new Date().toISOString() }).eq("id", b.id);
    out.rejections++;
  }

  return Response.json(out);
}