/**
 * Google Analytics 4 — analytics utility
 *
 * Reads VITE_GA_ID at build-time (Vite replaces it via import.meta.env).
 * All functions are no-ops when the ID is absent, so the app never
 * crashes in local dev or preview deployments without GA configured.
 */

// ─── TypeScript typing for window.gtag ────────────────────────────────────────
declare global {
  interface Window {
    // Standard gtag command queue initialised by the gtag.js snippet
    gtag: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetOrDate: string | Date,
      params?: Record<string, unknown>,
    ) => void;
    // gtag.js pushes into this queue before the script finishes loading
    dataLayer: unknown[];
  }
}

// ─── Measurement ID ────────────────────────────────────────────────────────────
export const GA_ID: string | undefined = import.meta.env.VITE_GA_ID;

// ─── Localhost detection ───────────────────────────────────────────────────────
const isLocalhost = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.startsWith("192.168.")
  );
};

// ─── Init ──────────────────────────────────────────────────────────────────────
/**
 * Bootstraps the GA4 data-layer and fires the initial config hit.
 * Safe to call multiple times — idempotent via the `_ga4Initialised` flag.
 */
let _initialised = false;

export function initGA(): void {
  if (!GA_ID || typeof window === "undefined" || _initialised) return;

  if (isLocalhost()) {
    console.log(`[Analytics] [Localhost Excluded] initGA (GA_ID: ${GA_ID})`);
    return;
  }

  // Initialise the command queue that gtag.js reads from
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function (...args: Parameters<Window["gtag"]>) {
    window.dataLayer.push(args);
  };

  // Seed the timestamp required by GA4
  window.gtag("js", new Date());

  // Send the initial config hit; disable automatic page_view because
  // we fire it manually on every SPA navigation below.
  window.gtag("config", GA_ID, { send_page_view: false });

  _initialised = true;
}

// ─── Page-view helper ─────────────────────────────────────────────────────────
/**
 * Sends a `page_view` event to GA4.
 *
 * @param path - The pathname + search string, e.g. "/about?ref=home"
 * @param title - The document title at the time of navigation
 */
export function trackPageView(path: string, title?: string): void {
  if (!GA_ID || typeof window === "undefined") return;

  if (isLocalhost()) {
    console.log(`[Analytics] [Localhost Excluded] page_view:`, {
      page_path: path,
      page_title: title ?? document.title,
      page_location: window.location.href,
    });
    return;
  }

  if (!window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

// ─── Custom Event Helper ──────────────────────────────────────────────────────
/**
 * Sends a custom tracking event to GA4.
 *
 * @param eventName - The name of the custom event, e.g. "resume_download"
 * @param params - Optional parameter payload for the event
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!GA_ID || typeof window === "undefined") return;

  if (isLocalhost()) {
    console.log(`[Analytics] [Localhost Excluded] custom_event "${eventName}":`, params);
    return;
  }

  if (!window.gtag) return;

  window.gtag("event", eventName, params);
}
