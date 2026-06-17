import { Article } from "./types";

const CACHE_FILE_NAME = "blog-cache.json";

export interface BlogCacheData {
  lastFetched: string;
  articles: Article[];
}

export class BlogCache {
  private async getCachePath(): Promise<string> {
    const path = await import("path");
    return path.join(process.cwd(), CACHE_FILE_NAME);
  }

  async get(ignoreExpiration = false): Promise<Article[] | null> {
    if (typeof window !== "undefined") {
      return null;
    }

    try {
      const fs = await import("fs");
      const cachePath = await this.getCachePath();

      if (!fs.existsSync(cachePath)) {
        return null;
      }

      const rawData = fs.readFileSync(cachePath, "utf8");
      const cache: BlogCacheData = JSON.parse(rawData);

      if (!cache.lastFetched || !Array.isArray(cache.articles)) {
        return null;
      }

      if (ignoreExpiration) {
        return cache.articles;
      }

      // 24 hour cache duration
      const lastFetchedDate = new Date(cache.lastFetched);
      const now = new Date();
      const ageMs = now.getTime() - lastFetchedDate.getTime();
      const cacheDuration = 24 * 60 * 60 * 1000;

      if (ageMs < cacheDuration && ageMs >= 0) {
        return cache.articles;
      }

      return null;
    } catch (error) {
      console.error("[BlogCache] Error reading blog cache:", error);
      return null;
    }
  }

  async set(articles: Article[]): Promise<boolean> {
    if (typeof window !== "undefined") {
      return false;
    }

    try {
      const fs = await import("fs");
      const cachePath = await this.getCachePath();

      const cacheData: BlogCacheData = {
        lastFetched: new Date().toISOString(),
        articles,
      };

      fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2), "utf8");
      return true;
    } catch (error) {
      console.error("[BlogCache] Error writing blog cache:", error);
      return false;
    }
  }
}
