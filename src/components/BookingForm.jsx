/* ============================================================
   BOOKING FORM  (React island)
   ------------------------------------------------------------
   A self-contained month calendar + contact form. The visitor
   picks an event date, fills in their details, and submits to
   the /api/booking endpoint (which emails it via Resend).

   - No extra date-picker dependency: the calendar is built here
     so it matches the site's dark/neon theme and stays light.
   - All visible text comes in via `labels` (from src/data/site.ts),
     so it works in both English and Spanish.

   Props:
     labels  -> the `booking` object for the current language
     lang    -> "en" | "es" (used for date formatting)
   ============================================================ */
import { useMemo, useState } from "react";

// Strip the time component so date-only comparisons are clean.
function atMidnight(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function BookingForm({ labels, lang = "en" }) {
  const today = useMemo(() => atMidnight(new Date()), []);

  // Which month the calendar is currently showing.
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selected, setSelected] = useState(null);

  // Form fields.
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: labels.eventTypes[0] ?? "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // --- Calendar grid math ---
  const firstWeekday = new Date(view.year, view.month, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // Don't let the user page back before the current month.
  const atCurrentMonth =
    view.year === today.getFullYear() && view.month === today.getMonth();

  const goMonth = (delta) =>
    setView((v) => {
      const m = v.month + delta;
      return {
        year: v.year + Math.floor(m / 12),
        month: ((m % 12) + 12) % 12,
      };
    });

  const sameDay = (a, b) =>
    a && b && a.getTime() === atMidnight(b).getTime();

  // Human-readable date string sent in the email + shown to the user.
  const selectedLabel = selected
    ? selected.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Client-side validation (the server re-checks too).
    if (!selected) return setError(labels.validation.date);
    if (!form.name.trim()) return setError(labels.validation.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError(labels.validation.email);

    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedLabel }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // --- Success screen ---
  if (status === "success") {
    return (
      <div className="rounded-2xl border border-white/10 bg-ink-soft p-8 text-center">
        <h3 className="font-display text-2xl font-black text-gradient">
          {labels.successTitle}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
          {labels.successBody}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-neon-violet/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 rounded-2xl border border-white/10 bg-ink-soft p-6 sm:p-8 md:grid-cols-2"
    >
      {/* -------- Calendar -------- */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goMonth(-1)}
            disabled={atCurrentMonth}
            className="rounded-full border border-white/10 px-3 py-1 text-sm transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous month"
          >
            ‹
          </button>
          <div className="font-display text-lg font-bold">
            {labels.months[view.month]} {view.year}
          </div>
          <button
            type="button"
            onClick={() => goMonth(1)}
            className="rounded-full border border-white/10 px-3 py-1 text-sm transition hover:border-white/40"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-white/40">
          {labels.weekdays.map((w) => (
            <div key={w} className="py-1">
              {w}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <div key={`e${i}`} />;
            const date = new Date(view.year, view.month, d);
            const isPast = date < today;
            const isSel = sameDay(selected, date);
            return (
              <button
                key={d}
                type="button"
                disabled={isPast}
                onClick={() => setSelected(date)}
                className={[
                  "aspect-square rounded-lg text-sm transition",
                  isPast
                    ? "cursor-not-allowed text-white/20"
                    : "hover:bg-white/10",
                  isSel
                    ? "bg-gradient-to-r from-neon-violet to-neon-pink font-bold text-ink"
                    : "text-white/80",
                ].join(" ")}
              >
                {d}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-white/50">
          {selected ? (
            <>
              {labels.selectedLabel}:{" "}
              <span className="text-white">{selectedLabel}</span>
            </>
          ) : (
            labels.noDateLabel
          )}
        </p>
      </div>

      {/* -------- Details -------- */}
      <div className="grid content-start gap-3">
        <input
          className={inputCls}
          type="text"
          placeholder={labels.fields.name}
          value={form.name}
          onChange={setField("name")}
          required
        />
        <input
          className={inputCls}
          type="email"
          placeholder={labels.fields.email}
          value={form.email}
          onChange={setField("email")}
          required
        />
        <input
          className={inputCls}
          type="tel"
          placeholder={labels.fields.phone}
          value={form.phone}
          onChange={setField("phone")}
        />
        <select
          className={inputCls}
          value={form.eventType}
          onChange={setField("eventType")}
          aria-label={labels.fields.eventType}
        >
          {labels.eventTypes.map((t) => (
            <option key={t} value={t} className="bg-ink">
              {t}
            </option>
          ))}
        </select>
        <textarea
          className={`${inputCls} min-h-24 resize-y`}
          placeholder={labels.fields.message}
          value={form.message}
          onChange={setField("message")}
          rows={3}
        />

        {(error || status === "error") && (
          <p className="text-sm text-neon-pink">
            {status === "error" ? labels.errorBody : error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-1 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
