export interface ActivityConfig {
  githubUsername: string;
  mediumUsername: string;
  githubToken?: string;
  cronSecret?: string;

  // Source Weights (Step 4 & 5)
  weights: {
    medium: number;
    githubMajor: number; // >= 10 commits
    githubMinor: number; // < 10 commits
    projectRelease: number; // e.g. 95
    projectMilestone: number; // e.g. 90
    caseStudy: number; // e.g. 85
    devto: number; // e.g. 80
  };

  // Recency bonus points config (Step 6)
  recency: {
    today: number; // < 1 day ago (+25)
    oneDay: number; // 1 day ago (+20)
    threeDays: number; // 2-3 days ago (+15)
    sevenDays: number; // 4-7 days ago (+10)
    fourteenDays: number; // 8-14 days ago (+5)
  };

  // Activity Importance boosts (Step 4)
  importance: {
    majorCommitTier: number; // e.g. >= 15 commits gets +15 points
    mediumCommitTier: number; // e.g. >= 10 commits gets +10 points
    minorCommitTier: number; // e.g. >= 5 commits gets +5 points
  };

  // GitHub aggregation configs (Step 3)
  github: {
    minCommitsThreshold: number; // Ignore repository updates with fewer than this many commits
    aggregationWindowHours: number; // The rolling window size in hours for grouping commits
    priorityBoosts: Record<string, number>; // Specific repository priority score boosts
  };

  // Source diversity rules (Step 8)
  diversity: {
    maxConsecutiveFromSameSource: number; // Avoid listing more than this many items consecutively from the same source
    maxPercentageContribution: Record<string, number>; // Max percentage share of the feed for a source
  };

  // Cache & Feed settings (Step 9)
  cacheDurationMs: number; // Default 24 hours
  maxFeedSize: number; // Number of top items to serve to the visitor
}

// Load configurations safely from environment variables or fallbacks
export const CONFIG: ActivityConfig = {
  githubUsername:
    (typeof process !== "undefined" ? process.env.GITHUB_USERNAME : undefined) ||
    (import.meta.env
      ? import.meta.env.VITE_GITHUB_USERNAME || import.meta.env.GITHUB_USERNAME
      : "") ||
    "UnbeatableBann",

  mediumUsername:
    (typeof process !== "undefined" ? process.env.MEDIUM_USERNAME : undefined) ||
    (import.meta.env
      ? import.meta.env.VITE_MEDIUM_USERNAME || import.meta.env.MEDIUM_USERNAME
      : "") ||
    "UnbeatableBann",

  githubToken:
    (typeof process !== "undefined" ? process.env.GITHUB_TOKEN : undefined) ||
    (import.meta.env ? import.meta.env.VITE_GITHUB_TOKEN || import.meta.env.GITHUB_TOKEN : ""),

  cronSecret:
    (typeof process !== "undefined" ? process.env.CRON_SECRET : undefined) ||
    (import.meta.env ? import.meta.env.VITE_CRON_SECRET || import.meta.env.CRON_SECRET : "") ||
    "super_secret_cron_token",

  weights: {
    medium: 100,
    projectRelease: 95,
    projectMilestone: 90,
    caseStudy: 85,
    devto: 80,
    githubMajor: 75,
    githubMinor: 50,
  },

  recency: {
    today: 25,
    oneDay: 20,
    threeDays: 15,
    sevenDays: 10,
    fourteenDays: 5,
  },

  importance: {
    majorCommitTier: 15, // 15+ commits gets +15 pts
    mediumCommitTier: 10, // 10+ commits gets +10 pts
    minorCommitTier: 5, // 5+ commits gets +5 pts
  },

  github: {
    minCommitsThreshold: Number(
      (typeof process !== "undefined" ? process.env.GITHUB_MIN_COMMITS : undefined) || 3,
    ),
    aggregationWindowHours: Number(
      (typeof process !== "undefined" ? process.env.GITHUB_WINDOW_HOURS : undefined) || 48,
    ),
    priorityBoosts: {
      Curio: 10,
      "AI-Interviewer": 10,
    },
  },

  diversity: {
    maxConsecutiveFromSameSource: 2,
    maxPercentageContribution: {
      github: 0.67,
      medium: 0.67,
    },
  },

  cacheDurationMs: 24 * 60 * 60 * 1000, // 24 hours
  maxFeedSize: 3, // Display exactly the top 3 items
};
