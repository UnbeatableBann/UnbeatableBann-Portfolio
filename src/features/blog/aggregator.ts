import { Article, BlogProvider } from "./types";
import { MediumBlogProvider } from "./providers/medium";
import { LinkedinBlogProvider } from "./providers/linkedin";
import { BlogCache } from "./cache";

export class BlogAggregator {
  private providers: BlogProvider[] = [];
  private cache: BlogCache;

  constructor() {
    this.cache = new BlogCache();
    this.providers.push(new MediumBlogProvider());
    this.providers.push(new LinkedinBlogProvider());
  }

  async getArticles(forceRefresh = false): Promise<Article[]> {
    if (!forceRefresh) {
      const cached = await this.cache.get(true);
      if (cached) {
        console.log(`[BlogAggregator] Returning ${cached.length} cached articles.`);

        // Background refresh if cache is stale (older than 24 hours)
        this.cache.get(false).then((fresh) => {
          if (!fresh) {
            console.log(`[BlogAggregator] Cache is stale, triggering background rebuild...`);
            this.refresh().catch((err) =>
              console.error("[BlogAggregator] Background refresh failed:", err),
            );
          }
        });

        return cached;
      }
      console.log("[BlogAggregator] Cache missing. Rebuilding cache for the first time.");
    }

    return this.refresh();
  }

  async refresh(): Promise<Article[]> {
    console.log("[BlogAggregator] Rebuilding blog feed from all providers...");
    const fetchPromises = this.providers.map(async (provider) => {
      try {
        console.log(`[BlogAggregator] Executing provider: ${provider.name}`);
        const list = await provider.fetchArticles();
        console.log(`[BlogAggregator] Provider ${provider.name} fetched ${list.length} articles.`);
        return list;
      } catch (error) {
        console.error(`[BlogAggregator] Provider ${provider.name} failed:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    const allArticles = results.flat();

    // Sort by publication date descending (newest first)
    allArticles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    // Update cache
    await this.cache.set(allArticles);
    console.log(`[BlogAggregator] Cache successfully updated with ${allArticles.length} articles.`);

    return allArticles;
  }
}
