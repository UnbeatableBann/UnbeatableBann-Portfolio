/**
 * <Analytics />
 *
 * Mount once inside RootComponent. Responsibilities:
 *  1. Calls initGA() on first render (idempotent — safe in StrictMode).
 *  2. Subscribes to TanStack Router's onResolved event to fire a page_view
 *     hit on every SPA navigation, including back/forward.
 *  3. Renders nothing to the DOM.
 */
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { GA_ID, initGA, trackPageView } from "@/lib/analytics";

export function Analytics() {
  const router = useRouter();

  // ── Step 1: initialise GA4 once on mount ──────────────────────────────────
  useEffect(() => {
    initGA();
  }, []); // empty deps → runs exactly once per mount

  // ── Step 2: track every completed navigation as a page_view ───────────────
  useEffect(() => {
    if (!GA_ID) return;

    // onResolved fires after the incoming route's loaders have settled and
    // the new page is committed — the document title is correct at this point.
    const unsubscribe = router.subscribe("onResolved", () => {
      const { pathname, searchStr } = router.state.location;
      trackPageView(pathname + searchStr, document.title);
    });

    return unsubscribe; // clean up on unmount
  }, [router]);

  // Renders nothing — purely a side-effect component
  return null;
}
