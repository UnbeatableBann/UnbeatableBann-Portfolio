import { CacheData, NormalizedActivity } from "./types";
import { CONFIG } from "./config";
import fallbackCacheRaw from "../../../activity-cache.json";

const CACHE_FILE_NAME = "activity-cache.json";

export class ActivityCache {
  private async getCachePaths(): Promise<{ writePath: string; readPaths: string[] }> {
    const path = await import("path");
    const os = await import("os");

    const rootPath = path.join(process.cwd(), CACHE_FILE_NAME);
    const tempPath = path.join(os.tmpdir(), CACHE_FILE_NAME);

    // In production/serverless, process.cwd() is read-only, so we must write to the temp directory.
    // In development, writing to process.cwd() is preferred so the cache is visible in the workspace.
    const isDev = process.env.NODE_ENV === "development";
    const writePath = isDev ? rootPath : tempPath;

    // When reading, check tempPath first (for latest updates), then fallback to rootPath (bundled version).
    const readPaths = isDev ? [rootPath] : [tempPath, rootPath];

    return { writePath, readPaths };
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
      const { readPaths } = await this.getCachePaths();

      let cachePath = "";
      for (const p of readPaths) {
        if (fs.existsSync(p)) {
          cachePath = p;
          break;
        }
      }

      let cache: CacheData | null = null;
      if (cachePath) {
        const rawData = fs.readFileSync(cachePath, "utf8");
        cache = JSON.parse(rawData);
      } else {
        // Fallback to the bundled JSON in serverless/static environments
        cache = fallbackCacheRaw as CacheData;
      }

      if (!cache || !cache.lastFetched || !Array.isArray(cache.activities)) {
        return null;
      }

      if (ignoreExpiration) {
        return cache.activities;
      }

      const lastFetchedDate = new Date(cache.lastFetched);
      const now = new Date();
      const ageMs = now.getTime() - lastFetchedDate.getTime();
      const cacheDuration = CONFIG.cacheDurationMs;

      if (ageMs < cacheDuration && ageMs >= 0) {
        return cache.activities;
      }

      return null;
    } catch (error) {
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
      const { writePath } = await this.getCachePaths();

      const cacheData: CacheData = {
        lastFetched: new Date().toISOString(),
        activities,
      };

      fs.writeFileSync(writePath, JSON.stringify(cacheData, null, 2), "utf8");
      return true;
    } catch (error) {
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
      const { writePath } = await this.getCachePaths();

      if (fs.existsSync(writePath)) {
        fs.unlinkSync(writePath);
      }
    } catch (error) {
      // Ignored
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
      const { readPaths } = await this.getCachePaths();

      let cachePath = "";
      for (const p of readPaths) {
        if (fs.existsSync(p)) {
          cachePath = p;
          break;
        }
      }

      let cache: CacheData | null = null;
      if (cachePath) {
        const rawData = fs.readFileSync(cachePath, "utf8");
        cache = JSON.parse(rawData);
      } else {
        cache = fallbackCacheRaw as CacheData;
      }

      if (!cache.lastFetched) {
        return Infinity;
      }

      return new Date().getTime() - new Date(cache.lastFetched).getTime();
    } catch {
      return Infinity;
    }
  }
}
