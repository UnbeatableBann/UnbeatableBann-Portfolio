declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

let previousPage = "";
if (typeof window !== "undefined") {
  previousPage = document.referrer ? new URL(document.referrer).pathname : "";
}

/**
 * Updates the previous page tracker. Should be called by the router.
 */
export const updatePreviousPage = (newPrevPage: string) => {
  previousPage = newPrevPage;
};

// Internal Session State
const sessionState = {
  initialized: false,
  projectsViewed: new Set<string>(),
  pagesVisited: 0,
  projectClicks: {} as Record<string, { github?: boolean; demo?: boolean }>,
  sessionStart: Date.now(),
  signalsFired: new Set<string>(),
};

const safelyParseLocalStorage = (key: string, defaultValue: unknown) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const safelySetLocalStorage = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore error */
  }
};

/**
 * Initializes session tracking (referrer, landing page, UTMs, returning visitor).
 */
export const initSessionTracking = () => {
  if (typeof window === "undefined" || sessionState.initialized) return;
  sessionState.initialized = true;

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get("utm_source");
  const utm_medium = urlParams.get("utm_medium");
  const utm_campaign = urlParams.get("utm_campaign");

  const referrer = document.referrer;
  const landingPage = window.location.pathname;

  // Check Returning Visitor
  const now = Date.now();
  const lastVisit = safelyParseLocalStorage("last_visit_timestamp", null);

  if (lastVisit) {
    trackEvent("return_visit", {
      days_since_last_visit: Math.round((now - lastVisit) / (1000 * 60 * 60 * 24)),
    });
    const diffDays = (now - lastVisit) / (1000 * 60 * 60 * 24);
    if (diffDays <= 7 && diffDays > 0.05) {
      // more than 1 hour ago but less than 7 days
      fireRecruiterSignal("returned_within_7_days");
    }
  }
  safelySetLocalStorage("last_visit_timestamp", now);

  // Check Traffic Source Signals
  if (referrer.includes("linkedin.com") || utm_source === "linkedin") {
    fireRecruiterSignal("came_from_linkedin");
  } else if (referrer.includes("github.com") || utm_source === "github") {
    fireRecruiterSignal("came_from_github");
  }
};

const fireRecruiterSignal = (signalName: string, params: Record<string, unknown> = {}) => {
  if (sessionState.signalsFired.has(signalName)) return; // Only fire once per session
  sessionState.signalsFired.add(signalName);
  trackEvent("recruiter_signal", { signal_type: signalName, ...params });
};

/**
 * Pushes an event to the Google Tag Manager dataLayer.
 * Standardizes common contextual parameters automatically.
 */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Base parameters that should accompany most events
  const baseParams = {
    page_name: params.page_name || window.location.pathname,
    previous_page: previousPage,
    device_type: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer.push({
    event: eventName,
    ...baseParams,
    ...params,
  });

  // Intercept for Recruiter Signals
  if (eventName === "page_view") {
    sessionState.pagesVisited += 1;
    if (sessionState.pagesVisited > 1) {
      fireRecruiterSignal("visited_multiple_pages", {
        page_name: baseParams.page_name,
        previous_page: baseParams.previous_page,
      });
    }
    const currentPage = baseParams.page_name;
    if (currentPage === "/about" && baseParams.previous_page.startsWith("/products")) {
      fireRecruiterSignal("contact_after_projects", {
        page_name: baseParams.page_name,
        previous_page: baseParams.previous_page,
      });
    }
  }

  if (eventName === "project_open") {
    const projectName = params.project_name;
    if (typeof projectName === "string") {
      sessionState.projectsViewed.add(projectName);
      if (sessionState.projectsViewed.size > 1) {
        fireRecruiterSignal("viewed_multiple_projects", {
          page_name: baseParams.page_name,
          previous_page: baseParams.previous_page,
        });
      }
    }
  }

  if (eventName === "resume_download" || eventName === "resume_click") {
    if (sessionState.projectsViewed.size > 0) {
      fireRecruiterSignal("downloaded_resume_after_projects", {
        page_name: baseParams.page_name,
        previous_page: baseParams.previous_page,
      });
    }
  }

  if (eventName === "project_github_click" || eventName === "project_demo_click") {
    const projectName = params.project_name;
    if (typeof projectName === "string") {
      if (!sessionState.projectClicks[projectName]) {
        sessionState.projectClicks[projectName] = {};
      }
      if (eventName === "project_github_click")
        sessionState.projectClicks[projectName].github = true;
      if (eventName === "project_demo_click") sessionState.projectClicks[projectName].demo = true;

      if (
        sessionState.projectClicks[projectName].github &&
        sessionState.projectClicks[projectName].demo
      ) {
        fireRecruiterSignal("clicked_both_github_and_demo", {
          project: projectName,
          page_name: baseParams.page_name,
          previous_page: baseParams.previous_page,
        });
      }
    }
  }

  if (eventName === "time_on_page") {
    const sessionDurationSeconds = (Date.now() - sessionState.sessionStart) / 1000;
    if (sessionDurationSeconds > 120) {
      fireRecruiterSignal("session_longer_than_2_mins", {
        page_name: baseParams.page_name,
        previous_page: baseParams.previous_page,
      });
    }
  }
};
