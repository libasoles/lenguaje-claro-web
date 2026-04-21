import assert from "node:assert/strict";
import test from "node:test";

import {
  createWaitlistHandler,
  normalizeEmail,
  isValidEmail,
} from "../netlify/functions/_lib/waitlist-handler.mjs";
import {
  LINKEDIN_URL,
  SITE_URL,
  WAITLIST_EMAIL_SUBJECT,
  WAITLIST_TEMPLATE_KEY,
  buildWaitlistThanksEmail,
} from "../netlify/functions/_lib/waitlist-email.mjs";
import { formatFromEmail } from "../netlify/functions/waitlist-signup.mjs";

function createEvent(body, httpMethod = "POST") {
  return {
    httpMethod,
    body: JSON.stringify(body),
  };
}

function createMemoryStore() {
  const subscribers = [];
  const emailLogs = [];

  return {
    subscribers,
    emailLogs,

    async findSubscriberByEmail(email) {
      return subscribers.find((subscriber) => subscriber.email === email) ?? null;
    },

    async createSubscriber({ email, origin }) {
      const subscriber = {
        id: `sub_${subscribers.length + 1}`,
        email,
        origin,
        activo: true,
      };

      subscribers.push(subscriber);
      return subscriber;
    },

    async createEmailLog({
      suscriptorId,
      templateKey,
      provider,
      state,
      providerMessageId = null,
      errorMessage = null,
      sentAt = null,
    }) {
      const log = {
        id: `email_${emailLogs.length + 1}`,
        suscriptorId,
        templateKey,
        provider,
        state,
        providerMessageId,
        errorMessage,
        sentAt,
      };

      emailLogs.push(log);
      return log;
    },

    async updateEmailLog(id, patch) {
      const log = emailLogs.find((entry) => entry.id === id);
      Object.assign(log, patch);
    },
  };
}

test("normalizes and validates emails", () => {
  assert.equal(normalizeEmail("  TEST@Example.COM "), "test@example.com");
  assert.equal(isValidEmail("persona@example.com"), true);
  assert.equal(isValidEmail("persona"), false);
});

test("formats the sender with the default brand name", () => {
  assert.equal(
    formatFromEmail("hola@extensionlenguajeclaro.com.ar"),
    "Lenguaje Claro <hola@extensionlenguajeclaro.com.ar>",
  );
});

test("preserves a sender that already includes a display name", () => {
  assert.equal(
    formatFromEmail("Lenguaje Claro <hola@extensionlenguajeclaro.com.ar>"),
    "Lenguaje Claro <hola@extensionlenguajeclaro.com.ar>",
  );
});

test("creates a subscriber and marks the email as sent on first signup", async () => {
  const dataStore = createMemoryStore();
  let mailCount = 0;

  const handler = createWaitlistHandler({
    dataStore,
    mailer: {
      async sendWaitlistThanks({ to }) {
        mailCount += 1;
        assert.equal(to, "persona@example.com");
        return { id: "re_123" };
      },
    },
    logger: { error() {} },
  });

  const response = await handler(createEvent({ email: "Persona@Example.com" }));
  const payload = JSON.parse(response.body);

  assert.equal(response.statusCode, 200);
  assert.deepEqual(payload, { ok: true });
  assert.equal(mailCount, 1);
  assert.equal(dataStore.subscribers.length, 1);
  assert.equal(dataStore.emailLogs.length, 1);
  assert.equal(dataStore.emailLogs[0].templateKey, WAITLIST_TEMPLATE_KEY);
  assert.equal(dataStore.emailLogs[0].state, "sent");
  assert.equal(dataStore.emailLogs[0].providerMessageId, "re_123");
  assert.ok(dataStore.emailLogs[0].sentAt);
});

test("returns success for duplicate emails without sending again", async () => {
  const dataStore = createMemoryStore();
  dataStore.subscribers.push({
    id: "sub_existing",
    email: "persona@example.com",
    origin: "landing_web",
    activo: true,
  });

  let mailCount = 0;
  const handler = createWaitlistHandler({
    dataStore,
    mailer: {
      async sendWaitlistThanks() {
        mailCount += 1;
        return { id: "unexpected" };
      },
    },
    logger: { error() {} },
  });

  const response = await handler(createEvent({ email: "persona@example.com" }));

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { ok: true });
  assert.equal(mailCount, 0);
  assert.equal(dataStore.emailLogs.length, 0);
});

test("returns success when the database insert hits the unique email constraint", async () => {
  const handler = createWaitlistHandler({
    dataStore: {
      async findSubscriberByEmail() {
        return null;
      },
      async createSubscriber() {
        const error = new Error("duplicate key value violates unique constraint");
        error.code = "23505";
        throw error;
      },
    },
    mailer: {
      async sendWaitlistThanks() {
        throw new Error("should_not_send");
      },
    },
    logger: { error() {} },
  });

  const response = await handler(createEvent({ email: "persona@example.com" }));

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { ok: true });
});

test("rejects invalid emails", async () => {
  const dataStore = createMemoryStore();
  const handler = createWaitlistHandler({
    dataStore,
    mailer: {
      async sendWaitlistThanks() {
        throw new Error("should_not_send");
      },
    },
    logger: { error() {} },
  });

  const response = await handler(createEvent({ email: "correo-invalido" }));

  assert.equal(response.statusCode, 400);
  assert.deepEqual(JSON.parse(response.body), {
    ok: false,
    error: "invalid_email",
  });
  assert.equal(dataStore.subscribers.length, 0);
});

test("returns success and ignores honeypot submissions", async () => {
  const dataStore = createMemoryStore();
  let mailCount = 0;

  const handler = createWaitlistHandler({
    dataStore,
    mailer: {
      async sendWaitlistThanks() {
        mailCount += 1;
        return { id: "unexpected" };
      },
    },
    logger: { error() {} },
  });

  const response = await handler(
    createEvent({
      email: "persona@example.com",
      website: "spam.example",
    }),
  );

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { ok: true });
  assert.equal(dataStore.subscribers.length, 0);
  assert.equal(mailCount, 0);
});

test("returns internal error when subscriber persistence fails", async () => {
  const handler = createWaitlistHandler({
    dataStore: {
      async findSubscriberByEmail() {
        return null;
      },
      async createSubscriber() {
        throw new Error("db_down");
      },
    },
    mailer: {
      async sendWaitlistThanks() {
        throw new Error("should_not_send");
      },
    },
    logger: { error() {} },
  });

  const response = await handler(createEvent({ email: "persona@example.com" }));

  assert.equal(response.statusCode, 500);
  assert.deepEqual(JSON.parse(response.body), {
    ok: false,
    error: "internal_error",
  });
});

test("keeps the signup and records email failure when resend fails", async () => {
  const dataStore = createMemoryStore();

  const handler = createWaitlistHandler({
    dataStore,
    mailer: {
      async sendWaitlistThanks() {
        throw new Error("resend_failed");
      },
    },
    logger: { error() {} },
  });

  const response = await handler(createEvent({ email: "persona@example.com" }));

  assert.equal(response.statusCode, 200);
  assert.deepEqual(JSON.parse(response.body), { ok: true });
  assert.equal(dataStore.subscribers.length, 1);
  assert.equal(dataStore.emailLogs.length, 1);
  assert.equal(dataStore.emailLogs[0].state, "failed");
  assert.equal(dataStore.emailLogs[0].errorMessage, "resend_failed");
});

test("builds the waitlist thank-you email with branded html and plain text", () => {
  const email = buildWaitlistThanksEmail();

  assert.equal(email.subject, WAITLIST_EMAIL_SUBJECT);
  assert.match(email.html, /<title>[\s\S]*<\/title>/i);
  assert.match(email.html, /<body[\s\S]*<\/body>/i);
  assert.ok(email.text.length > 40);
  assert.ok(!/<[a-z][\s\S]*>/i.test(email.text));
  assert.match(email.html, /mailto:gperez78@gmail\.com/i);
  assert.match(email.html, new RegExp(SITE_URL.replaceAll(".", "\\."), "i"));
  assert.match(
    email.html,
    new RegExp(LINKEDIN_URL.replaceAll(".", "\\."), "i"),
  );
  assert.match(email.text, /gperez78@gmail\.com/i);
  assert.match(email.text, /Linkedin/i);
  assert.match(email.html, /color:\s*#b75d3c/i);
});
