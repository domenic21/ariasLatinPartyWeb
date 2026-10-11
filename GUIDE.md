# Project Guide — DJ Edison Arias Website

A short guide to understand how this project works, so you can maintain and extend it yourself.

---

## 1. What this project is

A marketing website for a DJ, built with **Astro**. It's mostly a **static site** (plain HTML/CSS/JS generated ahead of time), with **one small server function** for sending emails.

Two languages: English at `/` and Spanish at `/es/`.

---

## 2. The tech stack (and why)

| Tool | What it does | Why it's here |
|------|-------------|---------------|
| **Astro** | The framework. Turns your components into HTML pages. | Fast static sites, great SEO, easy to mix in React. |
| **React** | Used only for *interactive* pieces (the calendar, the modal). | Astro is static by default; React adds the "live" bits. |
| **Tailwind CSS** | Styling via utility classes (`text-white`, `rounded-full`). | Style without writing separate CSS files. |
| **Three.js** | The 3D DJ console in the hero section. | Visual flair. |
| **Resend** | Sends emails from the server. | Booking/contact form delivery. |
| **Cloudflare Turnstile** | Invisible anti-spam CAPTCHA. | Stops bot spam on the forms. |

---

## 3. The golden rule: static vs. server

This is the **most important concept** in the whole project.

- **Static** = built once, served as files. No secrets, runs in the browser. Fast & cheap.
- **Server** = runs code on each request. Can hold secrets (API keys).

Your site is static **except** one file: `src/pages/api/booking.ts`. That file has `export const prerender = false`, which tells Astro: *"run this on a server, not at build time."*

**Why it matters:** your `RESEND_API_KEY` is a secret. If it ran in the browser, anyone could steal it. So email sending lives in that one server file. The browser just sends form data *to* it.

---

## 4. The folder map

```
src/
├── pages/              ← each file = one URL
│   ├── index.astro         "/"          (English home)
│   ├── es/index.astro      "/es/"       (Spanish home)
│   ├── linktree.astro      "/linktree"
│   └── api/booking.ts      "/api/booking" (the server function)
├── components/         ← reusable pieces of a page
│   ├── *.astro             static sections (Hero, Services, FAQ...)
│   └── *.jsx               interactive React pieces (BookingForm, ContactModal)
├── layouts/Layout.astro    ← the <head> + shared wrapper for every page
├── data/site.ts            ← ALL text content lives here (EN + ES)
└── styles/global.css       ← Tailwind import + brand colors
```

**Key idea:** `data/site.ts` is the "single source of truth" for text. You change copy there, not in the components. That's why it's bilingual in one place.

## 5. How the booking email actually works (follow the data)

This is the flow worth understanding deeply, because it touches everything:

```
1. Visitor picks a date + fills the form   →  BookingForm.jsx (browser/React)
2. Turnstile gives a "I'm human" token       →  Turnstile.jsx
3. Form sends a POST to /api/booking          →  fetch() with JSON
4. Server checks honeypot + Turnstile token   →  booking.ts
5. Server validates name/email                →  booking.ts
6. Server calls Resend to send the email      →  booking.ts (uses secret key)
7. Server replies { ok: true }                →  form shows success ✅
```

The two forms (`BookingForm.jsx` = calendar, `ContactModal.jsx` = "Send inquiry"
popup) both hit the **same** `/api/booking`. The only difference: the calendar
sends a `date`, the modal doesn't. That's why `date` is optional on the server.

### The two anti-spam layers
- **Honeypot:** a hidden field named `company`. Humans never see it. Bots auto-fill it → server silently drops the message.
- **Turnstile:** the server re-checks the token with Cloudflare before sending. Never trust the browser alone — *always* re-validate on the server.

---

## 6. Environment variables (`.env`)

Secrets and config live in `.env` (which is **gitignored** — never commit it).

```
RESEND_API_KEY=...            secret, server-only
BOOKING_TO_EMAIL=...          where inquiries go
BOOKING_FROM_EMAIL=...        the "from" address
PUBLIC_TURNSTILE_SITE_KEY=... public (browser), so it has the PUBLIC_ prefix
TURNSTILE_SECRET_KEY=...      secret, server-only
```

**Rule:** anything starting with `PUBLIC_` is shipped to the browser. Everything
else stays on the server. Never put a secret in a `PUBLIC_` variable.

**Important:** `.env` is for *local* dev only. On Vercel you must add the same
variables in the dashboard (Settings → Environment Variables) and redeploy.

---

## 7. Running it locally

```bash
npm install        # once, installs dependencies
npm run dev        # start dev server at http://localhost:4321
npm run build      # generate the production site into /dist
npm run preview    # preview the built site
```

`npm run dev` auto-reloads when you save a file. Keep it running while you work.

---

## 8. How to make common changes

| I want to... | Edit this |
|--------------|-----------|
| Change any text (EN or ES) | `src/data/site.ts` |
| Change brand colors | `src/styles/global.css` (the `@theme` block) |
| Add/remove a page section | `src/components/Home.astro` (the list of sections) |
| Add a gallery photo | drop it in `public/images/gallery/` + list it in `site.ts` |
| Change where emails go | `BOOKING_TO_EMAIL` in `.env` (and Vercel) |
| Edit the contact form fields | `BookingForm.jsx` / `ContactModal.jsx` + the server checks in `booking.ts` |

---

## 9. Concepts to go learn next (in order)

1. **HTML & CSS basics** — everything sits on top of these.
2. **JavaScript fundamentals** — variables, functions, `fetch`, promises/`async`.
3. **Components & props** — how a piece of UI receives data (you see this everywhere here).
4. **React `useState`/`useEffect`** — how the calendar "remembers" the selected date.
5. **Client vs. server** — re-read section 3; it's the mental model that unlocks the rest.

---

## 10. Mental models to keep

- **The browser is untrusted.** Always re-check important things on the server.
- **One source of truth.** Text in `site.ts`, colors in `global.css` — don't scatter them.
- **Secrets stay server-side.** `PUBLIC_` = public. No exceptions.
- **Static when you can, server when you must.** Servers cost money and complexity; only `booking.ts` needs one.

You already shipped a real feature (a working contact system with spam protection
and email). Re-read the files you touched with this guide next to you — that's the
fastest way to turn "it works" into "I understand why."

