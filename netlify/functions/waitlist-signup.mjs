import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

import { buildWaitlistThanksEmail } from "./_lib/waitlist-email.mjs";
import { createWaitlistHandler } from "./_lib/waitlist-handler.mjs";
import { createSupabaseWaitlistStore } from "./_lib/waitlist-store.mjs";

let cachedHandler;

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(payload),
  };
}

function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function formatFromEmail(fromEmail, fromName = "Lenguaje Claro") {
  const email = String(fromEmail || "").trim();
  const name = String(fromName || "").trim();

  if (!email) {
    throw new Error("Missing required sender email");
  }

  if (email.includes("<") && email.includes(">")) {
    return email;
  }

  return name ? `${name} <${email}>` : email;
}

function createWaitlistMailer() {
  const resend = new Resend(getRequiredEnv("RESEND_API_KEY"));
  const from = formatFromEmail(
    getRequiredEnv("FROM_EMAIL"),
    process.env.FROM_EMAIL_NAME,
  );
  const replyTo = process.env.REPLY_TO_EMAIL?.trim();

  return {
    async sendWaitlistThanks({ to }) {
      const email = buildWaitlistThanksEmail();
      const payload = {
        from,
        to,
        subject: email.subject,
        html: email.html,
        text: email.text,
      };

      if (replyTo) {
        payload.replyTo = replyTo;
      }

      const { data, error } = await resend.emails.send(payload);

      if (error) {
        throw new Error(error.message || "resend_send_failed");
      }

      return data;
    },
  };
}

function getHandler() {
  if (cachedHandler) {
    return cachedHandler;
  }

  const supabase = createClient(
    getRequiredEnv("SUPABASE_URL"),
    getRequiredEnv("SUPABASE_SECRET_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          "X-Client-Info": "lenguaje-claro-web/waitlist",
        },
      },
    },
  );

  cachedHandler = createWaitlistHandler({
    dataStore: createSupabaseWaitlistStore(supabase),
    mailer: createWaitlistMailer(),
  });

  return cachedHandler;
}

export async function handler(event) {
  try {
    return await getHandler()(event);
  } catch (error) {
    console.error("waitlist_handler_boot_failed", error);
    return jsonResponse(500, { ok: false, error: "internal_error" });
  }
}
