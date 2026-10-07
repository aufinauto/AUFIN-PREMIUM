"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Phone / e-mail / WhatsApp links live in many (mostly server) components,
// so track them with one delegated listener instead of per-link handlers.
export default function ContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { page_path: window.location.pathname };

      if (href.startsWith("tel:")) trackEvent("click_phone", params);
      else if (href.startsWith("mailto:")) trackEvent("click_email", params);
      else if (href.includes("wa.me/")) trackEvent("click_whatsapp", params);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
