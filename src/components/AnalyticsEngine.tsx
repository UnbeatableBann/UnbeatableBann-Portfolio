import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { trackEvent, updatePreviousPage, initSessionTracking } from "@/lib/analytics";

export function AnalyticsEngine() {
  const routerState = useRouterState();
  const location = routerState.location;

  const scrollMilestones = useRef(new Set<number>());
  const timeMilestones = useRef(new Set<number>());

  useEffect(() => {
    // 0. Initialize Session
    initSessionTracking();

    // 1. Page View Tracking
    trackEvent("page_view", { navigation_type: "client_side", page_name: location.pathname });

    // Update previous page AFTER firing the event so the current event uses the OLD previous page
    updatePreviousPage(location.pathname);

    // Reset trackers
    scrollMilestones.current.clear();
    timeMilestones.current.clear();

    // 2. Scroll Tracking (25, 50, 75, 100)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollY = window.scrollY;
      const scrollPercent = (scrollY / scrollHeight) * 100;

      const milestones = [25, 50, 75, 100];
      for (const m of milestones) {
        if (scrollPercent >= m && !scrollMilestones.current.has(m)) {
          scrollMilestones.current.add(m);
          trackEvent("scroll_depth", {
            scroll_depth: `${m}%`,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Time on Page Tracking (30s, 60s, 120s, 300s)
    const timeIntervals = [30, 60, 120, 300];
    const timers = timeIntervals.map((seconds) => {
      return setTimeout(() => {
        if (!timeMilestones.current.has(seconds)) {
          timeMilestones.current.add(seconds);
          trackEvent("time_on_page", {
            duration_seconds: seconds,
          });
        }
      }, seconds * 1000);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      timers.forEach(clearTimeout);
    };
  }, [location.pathname]);

  // Global Error Tracking
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent("unhandled_promise_rejection", {
        error_message: event.reason?.message || "Promise Rejection",
      });
    };

    const handleWindowError = (event: ErrorEvent) => {
      if (event.target instanceof HTMLImageElement) {
        trackEvent("image_load_error", { image_src: event.target.src });
      } else {
        trackEvent("javascript_error", { error_message: event.message });
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleWindowError, true);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleWindowError, true);
    };
  }, []);

  return null;
}
