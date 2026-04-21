import { WAITLIST_TEMPLATE_KEY } from "./waitlist-email.mjs";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_ORIGIN = "landing_web";
const EMAIL_PROVIDER = "resend";

export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function isValidEmail(value) {
  return EMAIL_REGEX.test(value);
}

function jsonResponse(statusCode, payload, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...JSON_HEADERS,
      ...extraHeaders,
    },
    body: JSON.stringify(payload),
  };
}

function toErrorMessage(error) {
  if (error instanceof Error && error.message) {
    return error.message.slice(0, 500);
  }

  return String(error ?? "unknown_error").slice(0, 500);
}

function parseBody(body) {
  if (!body) return {};

  try {
    return JSON.parse(body);
  } catch (error) {
    return {};
  }
}

function isUniqueViolation(error) {
  return error && typeof error === "object" && error.code === "23505";
}

async function safeCreateEmailLog(dataStore, payload, logger) {
  try {
    return await dataStore.createEmailLog(payload);
  } catch (error) {
    logger.error("waitlist_email_log_create_failed", error);
    return null;
  }
}

async function safeUpdateEmailLog(dataStore, id, patch, logger) {
  if (!id) return;

  try {
    await dataStore.updateEmailLog(id, patch);
  } catch (error) {
    logger.error("waitlist_email_log_update_failed", error);
  }
}

export function createWaitlistHandler({ dataStore, mailer, logger = console }) {
  return async function waitlistHandler(event) {
    if (event.httpMethod !== "POST") {
      return jsonResponse(
        405,
        { ok: false, error: "method_not_allowed" },
        { Allow: "POST" },
      );
    }

    const body = parseBody(event.body);
    const email = normalizeEmail(body.email);
    const website = String(body.website ?? "").trim();

    if (website) {
      return jsonResponse(200, { ok: true });
    }

    if (!isValidEmail(email)) {
      return jsonResponse(400, { ok: false, error: "invalid_email" });
    }

    try {
      const existing = await dataStore.findSubscriberByEmail(email);

      if (existing) {
        return jsonResponse(200, { ok: true });
      }

      let subscriber;

      try {
        subscriber = await dataStore.createSubscriber({
          email,
          origin: WAITLIST_ORIGIN,
        });
      } catch (error) {
        if (isUniqueViolation(error)) {
          return jsonResponse(200, { ok: true });
        }

        throw error;
      }

      const emailLog = await safeCreateEmailLog(
        dataStore,
        {
          suscriptorId: subscriber.id,
          templateKey: WAITLIST_TEMPLATE_KEY,
          provider: EMAIL_PROVIDER,
          state: "pending",
        },
        logger,
      );

      try {
        const result = await mailer.sendWaitlistThanks({ to: email });

        await safeUpdateEmailLog(
          dataStore,
          emailLog?.id,
          {
            state: "sent",
            providerMessageId: result?.id ?? null,
            sentAt: new Date().toISOString(),
            errorMessage: null,
          },
          logger,
        );
      } catch (error) {
        logger.error("waitlist_email_send_failed", error);

        await safeUpdateEmailLog(
          dataStore,
          emailLog?.id,
          {
            state: "failed",
            errorMessage: toErrorMessage(error),
          },
          logger,
        );
      }

      return jsonResponse(200, { ok: true });
    } catch (error) {
      logger.error("waitlist_signup_failed", error);
      return jsonResponse(500, { ok: false, error: "internal_error" });
    }
  };
}
