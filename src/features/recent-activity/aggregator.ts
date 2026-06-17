import { ActivityProvider, NormalizedActivity } from "./types";
import { GitHubProvider } from "./providers/github";
import { MediumProvider } from "./providers/medium";
import { ActivityCache } from "./cache";
import { ActivityRankingEngine } from "./engine";
import { CONFIG } from "./config";

export class ActivityAggregator {
  private providers: ActivityProvider[] = [];
  private cache: ActivityCache;

  constructor() {
    this.cache = new ActivityCache();

    // Register providers here.
    // Adding a new source requires creating the provider class and registering it here.
    // The rest of the scoring, ranking, caching, and API layers remain untouched.
    this.providers.push(new GitHubProvider());
    this.providers.push(new MediumProvider());
  }

  /**
   * Aggregates activities from all registered providers.
   * By default, it reads from the cache regardless of age (to avoid runtime external requests).
   * If forceRefresh is true, it checks if the cache is expired:
   *   - If not expired: serves the cache without calling providers.
   *   - If expired: fetches from providers, ranks, updates cache, and returns the result.
   */
  async getActivities(forceRefresh = false): Promise<NormalizedActivity[]> {
    if (!forceRefresh) {
      // Normal page visit: Homepage reads only from cache. No runtime processing.
      const cached = await this.cache.get(true); // ignoreExpiration = true
      if (cached) {
        console.log(
          `[ActivityAggregator] Normal page load: returning ${cached.length} cached activities.`,
        );

        // Stale-While-Revalidate: Trigger background refresh if cache is expired (24 hours)
        this.cache.getCacheAgeMs().then((ageMs) => {
          if (ageMs > CONFIG.cacheDurationMs) {
            console.log(
              `[ActivityAggregator] Cache is expired (Age: ${(ageMs / (1000 * 60 * 60)).toFixed(1)} hrs). Triggering background rebuild...`,
            );
            this.refresh().catch((err) =>
              console.error("[ActivityAggregator] Background refresh failed:", err),
            );
          }
        });

        return cached;
      }
      console.log("[ActivityAggregator] Cache missing. Rebuilding cache for first time.");
    } else {
      // Visitor clicked refresh inside the block: Always fetch fresh data.
      console.log(
        "[ActivityAggregator] Manual refresh triggered by visitor. Bypassing cache age limits to fetch latest activities...",
      );
    }

    // If we reach here, we need to fetch fresh data (cache is missing or expired and refreshed)
    const fetchPromises = this.providers.map(async (provider) => {
      try {
        console.log(`[ActivityAggregator] Executing provider: ${provider.name}`);
        const activities = await provider.fetchActivities();
        console.log(
          `[ActivityAggregator] Provider ${provider.name} fetched ${activities.length} items.`,
        );
        return activities;
      } catch (error) {
        console.error(`[ActivityAggregator] Provider ${provider.name} failed during fetch:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const rawActivities = results.flat();

    console.log(
      `[ActivityAggregator] Normalizing, scoring, and ranking ${rawActivities.length} total activities...`,
    );

    // Rank feed using the Scoring & Ranking Engine (which applies diversity rules)
    const rankedActivities = ActivityRankingEngine.rank(rawActivities);

    // Slice to the configured maximum feed size
    const finalFeed = rankedActivities.slice(0, CONFIG.maxFeedSize);

    // Save final feed to cache
    await this.cache.set(finalFeed);

    return finalFeed;
  }

  /**
   * Forcefully triggers a refresh across all providers and updates the cache.
   */
  async refresh(): Promise<NormalizedActivity[]> {
    return this.getActivities(true);
  }
}
