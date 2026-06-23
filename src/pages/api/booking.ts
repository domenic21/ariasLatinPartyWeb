/* ============================================================
   BOOKING API ENDPOINT  —  POST /api/booking
   ------------------------------------------------------------
   Receives the date-request form from BookingForm.jsx and emails
   it to the business via Resend.

   This is the ONLY server-rendered route on the site:
   `prerender = false` turns it into a Vercel serverless function,
   so the secret RESEND_API_KEY stays on the server and is never
   shipped to the browser.

   Required environment variables (set in .env locally AND in the
   Vercel dashboard for production — see .env.example):
     - RESEND_API_KEY     your Resend secret key
     - BOOKING_TO_EMAIL   where inquiries are delivered
     - BOOKING_FROM_EMAIL verified sender, e.g.
                          "Arias Latin Party <bookings@ariaslatinparty.com>"
   ============================================================ */
import type { APIRoute } from "astro";
import { Resend } from "resend";

// Mark as on-demand (server) so the API key never reaches the client bundle.
export const prerender = false;

// Read env at runtime. import.meta.env covers local `.env`; process.env
// covers values set in the Vercel dashboard.
const env = (key: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[key] ??
  process.env[key];

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Simple email shape check (good enough for a contact form).
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Escape user input before dropping it into the HTML email body.
const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export const POST: APIRoute = async ({ request }) => {
  const apiKey = env("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[booking] RESEND_API_KEY is not set");
    return json({ ok: false, error: "Email service not configured." }, 500);
  }

  // Parse the JSON body.
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  // Pull + trim fields.
  const date = String(body.date ?? "").trim();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const eventType = String(body.eventType ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Server-side validation (never trust the client).
  // `date` is optional: the calendar form sends one, the general
  // "Send inquiry" modal does not.
  if (!name) return json({ ok: false, error: "Missing name." }, 400);
  if (!isEmail(email)) return json({ ok: false, error: "Invalid email." }, 400);

  const to = env("BOOKING_TO_EMAIL") ?? "darias@vcssoftware.com";
  const from =
    env("BOOKING_FROM_EMAIL") ?? "Arias Latin Party <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // replying goes straight to the requester
      subject: date
        ? `New date request: ${date}${eventType ? ` — ${eventType}` : ""}`
        : `New inquiry from ${name}`,
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
      `,
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
