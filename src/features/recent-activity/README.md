# Recent Activity Aggregator Feature Module

This module provides a production-grade, extensible "Recent Activity" aggregation system for the developer portfolio. It fetches updates from multiple remote sources (e.g., GitHub events and Medium RSS feeds), normalizes them into a unified schema, handles server-side file caching to prevent API rate-limiting, and exposes a clean interface to the frontend.

## Architecture Overview

The system uses a **Provider-Based Architecture** following clean architecture principles. It consists of the following components:

```
src/features/recent-activity/
├── types.ts              # Core type definitions, schemas, and provider contracts
├── cache.ts              # File-based caching wrapper (activity-cache.json)
├── aggregator.ts         # Aggregator service executing providers and sorting output
├── providers/
│   ├── base.ts           # (Optional) Base classes or common helpers
│   ├── github.ts         # GitHub public events provider
│   └── medium.ts         # Medium RSS feed provider
├── components/
│   └── ActivityFeed.tsx  # React component representing the aggregated activity timeline
└── hooks/
    └── useActivityFeed.ts # React custom hook fetching data and tracking loading/error states
```

---

## Normalized Activity Model

Every activity event is transformed into a standard `NormalizedActivity` object defined in `types.ts`:

```typescript
export interface NormalizedActivity {
  id: string; // Unique identifier across all providers
  source: "github" | "medium" | string; // Provider source indicator
  title: string; // Clean, human-readable description
  description: string; // Expanded detail (e.g. repo name, commit count)
  url: string; // Canonical action URL
  publishedAt: string; // ISO 8601 Timestamp
  type: "commit" | "repository_update" | "article" | string; // Action class
  metadata?: Record<string, any>; // Additional provider-specific payloads
}
```

---

## Caching Strategy

To avoid hitting GitHub rate limits (unauthenticated limit is 60 requests/hr) and to speed up page loads:

1. **File Cache:** An `activity-cache.json` file is read and written in the project root.
2. **Freshness Window:** If the cache file exists and the `lastFetched` timestamp is less than **24 hours old**, the server serves the cached data immediately.
3. **Automatic Refresh:** If the cache is stale or missing, the `ActivityAggregator` triggers fresh fetches, updates the cache file, and serves the new data.

---

## API Layer

A single TanStack Start API endpoint is exposed at:
GET /api/activity-feed

### Parameters

- `refresh=true` (optional): Requests a cache refresh. It only calls external APIs if the cache is older than 24 hours (protects from spamming).

---

## Adding a New Provider

The system is highly extensible. Adding a new source (e.g., a `ProjectProvider` or `YouTubeProvider`) requires only **two steps**:

### 1. Implement the `ActivityProvider` Interface

Create a new file in `providers/` (e.g., `src/features/recent-activity/providers/projects.ts`):

```typescript
import { ActivityProvider, NormalizedActivity } from "../types";

export class ProjectProvider implements ActivityProvider {
  name = "projects";

  async fetchActivities(): Promise<NormalizedActivity[]> {
    // 1. Fetch data from your database, CMS, or local files
    // 2. Map items to NormalizedActivity schema
    // 3. Return the array
    return [
      {
        id: "project-curio-launch",
        source: "projects",
        title: "Released Curio AI Co-Teacher Beta",
        description: "Launched the beta test portal for public testing.",
        url: "https://curio-example.com",
        timestamp: new Date().toISOString(),
        type: "repository_update",
      },
    ];
  }
}
```

### 2. Register the Provider in `ActivityAggregator`

Add your provider instance to the constructor of `ActivityAggregator` in `src/features/recent-activity/aggregator.ts`:

```typescript
import { ProjectProvider } from "./providers/projects"; // Import your new provider

export class ActivityAggregator {
  private providers: ActivityProvider[] = [];

  constructor() {
    this.cache = new ActivityCache();

    // Register active providers
    this.providers.push(new GitHubProvider());
    this.providers.push(new MediumProvider());
    this.providers.push(new ProjectProvider()); // <-- Added!
  }
}
```

No modifications are needed in the UI component, hooks, caching layer, or API routes.

---

## Environment Configuration

Configure the following variables in your `.env` or deployment platform settings:

```env
# GitHub configurations
GITHUB_USERNAME=YourGitHubUsername
GITHUB_TOKEN=optional_github_token_for_unlimited_api_rate_limits

# Medium configurations
MEDIUM_USERNAME=YourMediumUsername

# Scheduled task configurations
CRON_SECRET=super_secret_token_to_allow_automated_cron_refreshes
```

---

## Deployment & Scheduled Refreshes

To ensure the cache stays fresh, you can trigger the `/api/activity-feed?refresh=true` route.

### Vercel Cron Configuration

If deploying on Vercel, use the root-level `vercel.json` already defined:

```json
{
  "crons": [
    {
      "path": "/api/activity-feed?refresh=true",
      "schedule": "0 0 * * *"
    }
  ]
}
```
