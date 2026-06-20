import { ActivityProvider, NormalizedActivity } from "../types";
import { CONFIG } from "../config";

export class MediumProvider implements ActivityProvider {
  name = "medium";
  private username: string;

  constructor() {
    this.username = CONFIG.mediumUsername;
  }

  async fetchActivities(): Promise<NormalizedActivity[]> {
    if (!this.username) {
      console.warn("[MediumProvider] MEDIUM_USERNAME is not configured.");
      return [];
    }

    // Handle leading @ if provided, otherwise prepend it as Medium feeds require it
    const formattedUsername = this.username.startsWith("@") ? this.username : `@${this.username}`;
    const url = `https://medium.com/feed/${formattedUsername}`;

    try {
      console.log(`[MediumProvider] Fetching Medium RSS feed from: ${url}`);
      const response = await fetch(url, {
        next: { revalidate: 0 },
      } as RequestInit & { next?: { revalidate: number } });

      if (!response.ok) {
        throw new Error(
          `Medium RSS feed returned status ${response.status}: ${response.statusText}`,
        );
      }

      const xmlText = await response.text();
      return this.parseRssFeed(xmlText);
    } catch (error) {
      console.error("[MediumProvider] Error fetching Medium articles:", error);
      return [];
    }
  }

  private parseRssFeed(xml: string): NormalizedActivity[] {
    const activities: NormalizedActivity[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    const extractTag = (itemContent: string, tagName: string): string => {
      const tagRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`);
      const tagMatch = itemContent.match(tagRegex);
      if (!tagMatch) return "";
      let content = tagMatch[1].trim();

      // Remove CDATA tags if present
      if (content.startsWith("<![CDATA[") && content.endsWith("]]>")) {
        content = content.substring(9, content.length - 3).trim();
      }
      return content;
    };

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemContent = match[1];
      const title = extractTag(itemContent, "title");
      const link = extractTag(itemContent, "link");
      const pubDate = extractTag(itemContent, "pubDate");
      const description =
        extractTag(itemContent, "description") || extractTag(itemContent, "content:encoded");

      // Transform pubDate into ISO string
      let publishedAt = new Date().toISOString();
      if (pubDate) {
        const parsedDate = new Date(pubDate);
        if (!isNaN(parsedDate.getTime())) {
          publishedAt = parsedDate.toISOString();
        }
      }

      // Extract a clean summary from description/content
      let summary = description
        .replace(/<[^>]*>/g, " ") // Strip HTML tags
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();

      if (summary.length > 180) {
        summary = summary.substring(0, 177) + "...";
      }

      const urlSlug =
        link.split("/").pop()?.split("?")[0] || Math.random().toString(36).substring(7);
      const id = `medium-post-${urlSlug}`;

      activities.push({
        id,
        source: "medium",
        title: `Published: ${title}`,
        description: summary || `Read the full article on Medium.`,
        url: link,
        timestamp: publishedAt,
        type: "article",
        score: 0,
        metadata: {
          originalTitle: title,
        },
      });
    }

    return activities;
  }
}
