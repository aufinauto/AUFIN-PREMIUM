export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-CSWTMY06GP";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
