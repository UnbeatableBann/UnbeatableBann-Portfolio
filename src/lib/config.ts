/**
 * Client-accessible configuration.
 * Prefix dynamic env vars with VITE_ to make them available in the browser.
 */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://unbeatable-bann-portfolio.vercel.app";
