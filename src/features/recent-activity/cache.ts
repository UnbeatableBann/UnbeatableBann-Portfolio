import { CacheData, NormalizedActivity } from "./types";
import { CONFIG } from "./config";

const CACHE_FILE_NAME = "activity-cache.json";

export class ActivityCache {
  private async getCachePath(): Promise<string> {
    const path = await import("path");
    return path.join(process.cwd(), CACHE_FILE_NAME);
  }

  /**
   * Retrieves the cached activities if they exist and are fresh.
   * Otherwise, returns null.
   */
  async get(ignoreExpiration = false): Promise<NormalizedActivity[] | null> {
    if (typeof window !== "undefined") {
      return null; // Don't access filesystem on client
    }

    try {
      const fs = await import("fs");
      const cachePath = await this.getCachePath();

      if (!fs.existsSync(cachePath)) {
        console.log("[ActivityCache] No cache file found.");
        return null;
      }

      const rawData = fs.readFileSync(cachePath, "utf8");
      const cache: CacheData = JSON.parse(rawData);

      if (!cache.lastFetched || !Array.isArray(cache.activities)) {
        console.warn("[ActivityCache] Cache file structure is invalid.");
        return null;
      }

      if (ignoreExpiration) {
        console.log("[ActivityCache] Serving cached data (ignoring expiration).");
        return cache.activities;
      }

      const lastFetchedDate = new Date(cache.lastFetched);
      const now = new Date();
      const ageMs = now.getTime() - lastFetchedDate.getTime();
      const cacheDuration = CONFIG.cacheDurationMs;

      if (ageMs < cacheDuration && ageMs >= 0) {
        const hoursLeft = ((cacheDuration - ageMs) / (1000 * 60 * 60)).toFixed(1);
        console.log(
          `[ActivityCache] Serving fresh cache. Age: ${(ageMs / (1000 * 60 * 60)).toFixed(1)} hrs. Fresh for next ${hoursLeft} hrs.`,
        );
        return cache.activities;
      }

      console.log(
        `[ActivityCache] Cache is stale. Age: ${(ageMs / (1000 * 60 * 60)).toFixed(1)} hrs.`,
      );
      return null;
    } catch (error) {
      console.error("[ActivityCache] Error reading cache file:", error);
      return null;
    }
  }

  /**
   * Saves the provided activities to the cache file along with the current timestamp.
   */
  async set(activities: NormalizedActivity[]): Promise<boolean> {
    if (typeof window !== "undefined") {
      return false;
    }

    try {
      const fs = await import("fs");
      const cachePath = await this.getCachePath();

      const cacheData: CacheData = {
        lastFetched: new Date().toISOString(),
        activities,
      };

      console.log(`[ActivityCache] Saving ${activities.length} items to cache file: ${cachePath}`);
      fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2), "utf8");
      return true;
    } catch (error) {
      console.error("[ActivityCache] Error writing cache file:", error);
      return false;
    }
  }

  /**
   * Force invalidates/clears the cache.
   */
  async clear(): Promise<void> {
    if (typeof window !== "undefined") {
      return;
    }

    try {
      const fs = await import("fs");
      const cachePath = await this.getCachePath();

      if (fs.existsSync(cachePath)) {
        fs.unlinkSync(cachePath);
        console.log("[ActivityCache] Cache cleared successfully.");
      }
    } catch (error) {
      console.error("[ActivityCache] Error clearing cache:", error);
    }
  }

  /**
   * Returns the time since last fetched in milliseconds, or Infinity if not cached.
   */
  async getCacheAgeMs(): Promise<number> {
    if (typeof window !== "undefined") {
      return Infinity;
    }

    try {
      const fs = await import("fs");
      const cachePath = await this.getCachePath();

      if (!fs.existsSync(cachePath)) {
        return Infinity;
      }

      const rawData = fs.readFileSync(cachePath, "utf8");
      const cache: CacheData = JSON.parse(rawData);

      if (!cache.lastFetched) {
        return Infinity;
      }

      return new Date().getTime() - new Date(cache.lastFetched).getTime();
    } catch {
      return Infinity;
    }
  }
}
