/* ============================================================
   TURNSTILE  (Cloudflare invisible CAPTCHA widget)
   ------------------------------------------------------------
   Renders the Turnstile challenge and hands the resulting token
   up via onToken(). The server then verifies that token before
   sending any email.

   Activates only when PUBLIC_TURNSTILE_SITE_KEY is set — if it's
   empty, this renders nothing and the forms work as before, so
   the site keeps functioning until you add your Cloudflare keys.

   Get free keys at: https://dash.cloudflare.com → Turnstile.
   For local testing, Cloudflare's always-pass test keys work:
     site:   1x00000000000000000000AA
     secret: 1x0000000000000000000000000000000AA
   ============================================================ */
import { useEffect, useRef } from "react";

const SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

// Load the Turnstile script once, shared across all widgets.
let scriptPromise;
function loadScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export default function Turnstile({ onToken }) {
  const ref = useRef(null);
  const widgetId = useRef(null);
  // Keep the latest callback without re-rendering the widget.
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !window.turnstile || !ref.current) return;
        widgetId.current = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          theme: "dark",
          callback: (token) => cb.current(token),
          "expired-callback": () => cb.current(""),
          "error-callback": () => cb.current(""),
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* widget already gone */
        }
      }
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="mt-1" />;
}
