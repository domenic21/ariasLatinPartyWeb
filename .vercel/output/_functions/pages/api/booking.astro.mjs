import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_EMAILJS_PUBLIC_KEY": "LGkGsLeGBVBiY5RCj", "PUBLIC_EMAILJS_SERVICE_ID": "service_ingl5id", "PUBLIC_EMAILJS_TEMPLATE_ID": "template_rvpyty4", "PUBLIC_TURNSTILE_SITE_KEY": "", "SITE": "https://www.ariaslatinparty.com", "SSR": true};
const prerender = false;
const env = (key) => {
  const fromProcess = process.env[key];
  if (fromProcess) return fromProcess;
  const fromMeta = Object.assign(__vite_import_meta_env__, { RESEND_API_KEY: "re_9ccrrh1t_MZB5pSMQWpNHCghdHMx1RuvM", BOOKING_TO_EMAIL: "fdarias21@gmail.com", BOOKING_FROM_EMAIL: "Arias Latin Party <onboarding@resend.dev>", TURNSTILE_SECRET_KEY: "", OS: process.env.OS })[key];
  return fromMeta || void 0;
};
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json" }
});
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (v) => v.replace(
  /[&<>"']/g,
  (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
);
async function verifyTurnstile(token, ip) {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          ...ip ? { remoteip: ip } : {}
        })
      }
    );
    const data = await res.json().catch(() => ({}));
    return data.success === true;
  } catch {
    return false;
  }
}
const POST = async ({ request, clientAddress }) => {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[booking] RESEND_API_KEY is not set");
    return json({ ok: false, error: "Email service not configured." }, 500);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }
  if (String(body.company ?? "").trim() !== "") {
    return json({ ok: true });
  }
  const turnstileOk = await verifyTurnstile(
    String(body.turnstileToken ?? ""),
    clientAddress
  );
  if (!turnstileOk) {
    return json({ ok: false, error: "Verification failed." }, 403);
  }
  const date = String(body.date ?? "").trim();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const eventType = String(body.eventType ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name) return json({ ok: false, error: "Missing name." }, 400);
  if (!isEmail(email)) return json({ ok: false, error: "Invalid email." }, 400);
  const to = env("BOOKING_TO_EMAIL") ?? "darias@vcssoftware.com";
  const from = env("BOOKING_FROM_EMAIL") ?? "Arias Latin Party <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      // replying goes straight to the requester
      subject: date ? `New date request: ${date}${eventType ? ` — ${eventType}` : ""}` : `New inquiry from ${name}`,
      html: `
        <h2>${date ? "New event date request" : "New website inquiry"}</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          ${date ? `<tr><td style="padding:4px 12px 4px 0"><strong>Requested date</strong></td><td>${esc(date)}</td></tr>` : ""}
          <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${esc(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${esc(phone) || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><strong>Event type</strong></td><td>${esc(eventType) || "—"}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px"><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>
      `
    });
    if (error) {
      console.error("[booking] Resend error:", error);
      return json({ ok: false, error: "Could not send email." }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[booking] Unexpected error:", err);
    return json({ ok: false, error: "Unexpected server error." }, 500);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
