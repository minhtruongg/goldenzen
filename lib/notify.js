import { createElement } from "react";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { EmailTemplate } from "./EmailTemplate.jsx";

// A service-role key can write past row-level security. Use it when it exists.
const DB_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_KEY;
export const db = createClient(process.env.SUPABASE_URL, DB_KEY);

// Both Telegram recipients can confirm. The first tap wins.
export const ownerIds = () =>
  [process.env.TELEGRAM_CHAT_ID, process.env.TELEGRAM_CHAT_ID_2].filter(Boolean).map(String);
export const isOwner = (id) => ownerIds().includes(String(id));

export function tg(method, body) {
  return fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// One button. callback_data carries the booking ref (e.g. GZB261027ABC).
export const confirmKeyboard = (ref) => ({
  inline_keyboard: [[{ text: "✅ Xác nhận", callback_data: `confirm:${ref}` }]],
});

export async function sendEmail(to, { subject, props }) {
  if (!to) return false;
  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      react: createElement(EmailTemplate, props),
    });
    if (error) {
      console.error("email failed", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("email failed", e);
    return false;
  }
}

const slot = (b) => `${b.service_name} on ${b.date} at ${b.time}`;

export const emails = {
  waiting: (b) => ({
    subject: "We received your booking",
    props: {
      name: b.client_name,
      preview: "We received your booking request.",
      heading: "Booking received",
      lines: [`We received your request for ${slot(b)}.`, "The spa will confirm shortly."],
    },
  }),
  confirmed: (b) => ({
    subject: "Your booking is confirmed",
    props: {
      name: b.client_name,
      preview: "Your booking is confirmed.",
      heading: "Booking confirmed",
      lines: [`Your booking for ${slot(b)} is confirmed.`, "See you then."],
    },
  }),
  reminder: (b) => ({
    subject: "Reminder: your booking is tomorrow",
    props: {
      name: b.client_name,
      preview: "A reminder about your booking.",
      heading: "See you tomorrow",
      lines: [`A reminder about ${slot(b)}.`, "See you soon."],
    },
  }),
};