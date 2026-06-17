import { Article, BlogProvider } from "../types";
import { CONFIG } from "../../recent-activity/config";

export class MediumBlogProvider implements BlogProvider {
  name = "medium";
  private username: string;

  constructor() {
    this.username = CONFIG.mediumUsername || "shadabjamadar";
  }

  async fetchArticles(): Promise<Article[]> {
    if (!this.username) {
      console.warn("[MediumBlogProvider] Username is not configured.");
      return [];
    }

    const formattedUsername = this.username.startsWith("@") ? this.username : `@${this.username}`;
    const url = `https://medium.com/feed/${formattedUsername}`;

    try {
      console.log(`[MediumBlogProvider] Fetching Medium RSS feed from: ${url}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Medium RSS feed returned status ${response.status}`);
      }

      const xmlText = await response.text();
      return this.parseRssFeed(xmlText);
    } catch (error) {
      console.error("[MediumBlogProvider] Error fetching Medium articles:", error);
      return [];
    }
  }

  private normalizeTopics(categories: string[]): string[] {
    const topicsSet = new Set<string>();
    const cats = categories.map((c) => c.toLowerCase());

    for (const cat of cats) {
      if (
        cat.includes("rag") ||
        cat.includes("retrieval") ||
        cat.includes("vector") ||
        cat.includes("semantic")
      ) {
        topicsSet.add("RAG");
      } else if (
        cat.includes("agent") ||
        cat.includes("langgraph") ||
        cat.includes("orchestr") ||
        cat.includes("workflow")
      ) {
        topicsSet.add("Agentic AI");
      } else if (
        cat.includes("llm") ||
        cat.includes("gpt") ||
        cat.includes("language-model") ||
        cat.includes("prompt") ||
        cat.includes("transformer")
      ) {
        topicsSet.add("LLMs");
      } else if (
        cat.includes("product") ||
        cat.includes("ui") ||
        cat.includes("ux") ||
        cat.includes("business") ||
        cat.includes("design")
      ) {
        topicsSet.add("AI Products");
      } else if (
        cat.includes("career") ||
        cat.includes("job") ||
        cat.includes("dev") ||
        cat.includes("intern") ||
        cat.includes("interview")
      ) {
        topicsSet.add("Career");
      } else if (
        cat.includes("research") ||
        cat.includes("paper") ||
        cat.includes("clip") ||
        cat.includes("science") ||
        cat.includes("academic")
      ) {
        topicsSet.add("Research");
      } else {
        topicsSet.add("Engineering");
      }
    }

    if (topicsSet.size === 0) {
      topicsSet.add("Engineering");
    }

    return Array.from(topicsSet);
  }

  private parseRssFeed(xml: string): Article[] {
    const articles: Article[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    const extractTag = (itemContent: string, tagName: string): string => {
      const tagRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`);
      const tagMatch = itemContent.match(tagRegex);
      if (!tagMatch) return "";
      let content = tagMatch[1].trim();

      if (content.startsWith("<![CDATA[") && content.endsWith("]]>")) {
        content = content.substring(9, content.length - 3).trim();
      }
      return content;
    };

    const extractCategories = (itemContent: string): string[] => {
      const categories: string[] = [];
      const categoryRegex = /<category[^>]*>([\s\S]*?)<\/category>/g;
      let catMatch;
      while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
        let cat = catMatch[1].trim();
        if (cat.startsWith("<![CDATA[") && cat.endsWith("]]>")) {
          cat = cat.substring(9, cat.length - 3).trim();
        }
        categories.push(cat);
      }
      return categories;
    };

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const title = extractTag(itemContent, "title");
      const link = extractTag(itemContent, "link");
      const pubDate = extractTag(itemContent, "pubDate");
      const description =
        extractTag(itemContent, "description") || extractTag(itemContent, "content:encoded");

      // Extract image thumbnail from content:encoded or description
      let thumbnail: string | undefined;
      const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) {
        thumbnail = imgMatch[1];
      }

      // Transform pubDate into ISO string
      let publishedAt = new Date().toISOString();
      if (pubDate) {
        const parsedDate = new Date(pubDate);
        if (!isNaN(parsedDate.getTime())) {
          publishedAt = parsedDate.toISOString();
        }
      }

      // Extract raw text content to calculate read time and clean excerpt
      const cleanText = description
        .replace(/<[^>]*>/g, " ") // Strip HTML tags
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();

      // Estimate read time (avg 200 words per minute)
      const wordCount = cleanText.split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";

      // Form excerpt
      let excerpt = cleanText;
      if (excerpt.length > 180) {
        excerpt = excerpt.substring(0, 177) + "...";
      }

      const categories = extractCategories(itemContent);
      const topics = this.normalizeTopics(categories);

      const urlSlug =
        link.split("/").pop()?.split("?")[0] || Math.random().toString(36).substring(7);
      const id = `medium-post-${urlSlug}`;

      articles.push({
        id,
        title,
        excerpt,
        source: "medium",
        url: link,
        publishedAt,
        thumbnail,
        readTime,
        topics,
      });
    }

    return articles;
  }
}
