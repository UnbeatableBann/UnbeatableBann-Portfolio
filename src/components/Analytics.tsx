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
import { GA_ID, initGA, trackPageView, setConsent } from "@/lib/analytics";

export function Analytics() {
  const router = useRouter();

  // 1. Initialise GA4 on mount with default Consent Mode settings based on stored state
  useEffect(() => {
    initGA();

    // Listen for consent updates and adjust GA4 dynamically
    const handleConsentUpdate = () => {
      if (typeof window === "undefined") return;
      const consent = localStorage.getItem("cookie-consent");
      if (consent === "accepted") {
        setConsent(true);
      } else if (consent === "declined") {
        setConsent(false);
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentUpdate);
    };
  }, []);

  // 2. Track every completed navigation as a page_view (sent as cookieless or cookie-based by GA4)
  useEffect(() => {
    if (!GA_ID) return;

    // onResolved fires after the incoming route's loaders have settled and
    // the new page is committed — the document title is correct at this point.
    const unsubscribe = router.subscribe("onResolved", () => {
      const { pathname, searchStr } = router.state.location;
      trackPageView(pathname + searchStr, document.title);
    });

    // Fire the initial page view hit immediately for the current route
    const { pathname, searchStr } = router.state.location;
    trackPageView(pathname + searchStr, document.title);

    return unsubscribe; // clean up on unmount
  }, [router]);

  // Renders nothing — purely a side-effect component
  return null;
}
