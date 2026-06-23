/* ============================================================
   CONTACT MODAL  (React island)
   ------------------------------------------------------------
   Renders the "SEND INQUIRY NOW" button. Clicking it opens a
   modal with a general contact form (name, email, phone,
   message) that posts to the same /api/booking endpoint — just
   without a date, so it arrives as a plain inquiry email.

   Props:
     triggerLabel -> button text (from cta.button.label)
     booking      -> booking labels (reused for field names/states)
     contact      -> contact-modal labels (title/subtitle/close)
   ============================================================ */
import { useEffect, useState } from "react";

export default function ContactModal({ triggerLabel, booking, contact }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const setField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Close on ESC + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    // Reset after the closing transition so it reopens fresh.
    setTimeout(() => {
      setStatus("idle");
      setError("");
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 200);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError(booking.validation.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError(booking.validation.email);

    setStatus("sending");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // no `date` -> plain inquiry
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-neon-violet/60";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-10 inline-block rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition hover:bg-white/90"
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={contact.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-ink-soft p-6 text-left shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label={contact.close}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>

            {status === "success" ? (
              <div className="py-6 text-center">
                <h3 className="font-display text-2xl font-black text-gradient">
                  {booking.successTitle}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm text-white/70">
                  {booking.successBody}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
                >
                  {contact.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-3">
                <h3 className="font-display text-2xl font-black italic">
                  {contact.title}
                </h3>
                <p className="-mt-1 mb-1 text-sm text-white/60">
                  {contact.subtitle}
                </p>

                <input
                  className={inputCls}
                  type="text"
                  placeholder={booking.fields.name}
                  value={form.name}
                  onChange={setField("name")}
                  required
                />
                <input
                  className={inputCls}
                  type="email"
                  placeholder={booking.fields.email}
                  value={form.email}
                  onChange={setField("email")}
                  required
                />
                <input
                  className={inputCls}
                  type="tel"
                  placeholder={booking.fields.phone}
                  value={form.phone}
                  onChange={setField("phone")}
                />
                <textarea
                  className={`${inputCls} min-h-24 resize-y`}
                  placeholder={booking.fields.message}
                  value={form.message}
                  onChange={setField("message")}
                  rows={4}
                />

                {(error || status === "error") && (
                  <p className="text-sm text-neon-pink">
                    {status === "error" ? booking.errorBody : error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition hover:bg-white/90 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? booking.sending : booking.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
