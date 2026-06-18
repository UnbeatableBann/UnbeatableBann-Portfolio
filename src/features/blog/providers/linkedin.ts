import { Article, BlogProvider } from "../types";

const FALLBACK_LINKEDIN_POSTS: Article[] = [
  {
    id: "linkedin-post-1",
    title: "Designing Multi-Agent Orchestration with State Graphs",
    excerpt:
      "Building complex AI workflows requires moving past simple chains. I wrote about how we use state graphs (LangGraph-style) to manage state, handle human-in-the-loop validation, and allow agents to route dynamically based on tool feedback. The key lies in state design—specifically, making transitions deterministic while agent behavior remains probabilistic.",
    source: "linkedin",
    url: "https://linkedin.com/in/shadab-jamadar",
    publishedAt: "2026-06-15T09:00:00.000Z",
    readTime: "4 min read",
    topics: ["Agentic AI", "Engineering"],
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "linkedin-post-2",
    title: "Why Vector Database Indexing is Harder Than You Think",
    excerpt:
      "If you're deploying RAG systems to production, your standard cosine similarity search on raw text chunks will eventually fail. Here's my breakdown of why indexing strategy (HNSW vs IVF), query expansion, and cross-encoder re-ranking are mandatory for production-grade retrieval performance. Don't skip the retrieval optimization phase!",
    source: "linkedin",
    url: "https://linkedin.com/in/shadab-jamadar",
    publishedAt: "2026-06-10T14:30:00.000Z",
    readTime: "3 min read",
    topics: ["RAG", "Engineering"],
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "linkedin-post-3",
    title: "The Shift from Software Engineer to AI Engineer",
    excerpt:
      "A lot of devs ask me how to transition into AI. The truth is, you don't need a PhD in Mathematics. You need to understand how to evaluate models, design robust prompts, orchestrate agentic systems, and profile latency/costs. The developer skills—testing, system design, monitoring—are what differentiate a demo from a production product.",
    source: "linkedin",
    url: "https://linkedin.com/in/shadab-jamadar",
    publishedAt: "2026-05-28T08:15:00.000Z",
    readTime: "5 min read",
    topics: ["Career", "AI Products"],
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "linkedin-post-4",
    title: "Evaluating RAG Pipelines: Ragas vs. Custom Testing Harnesses",
    excerpt:
      "How do you know if your prompts or retrieval parameters actually improved your RAG output? Blind testing is a recipe for silent failures. In this post, I compare automated metrics (faithfulness, answer relevance) against curated golden sets, explaining when to trust LLM-as-a-judge frameworks and when to rely on traditional assertions.",
    source: "linkedin",
    url: "https://linkedin.com/in/shadab-jamadar",
    publishedAt: "2026-05-15T10:00:00.000Z",
    readTime: "6 min read",
    topics: ["RAG", "LLMs"],
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
];

export class LinkedinBlogProvider implements BlogProvider {
  name = "linkedin";

  async fetchArticles(): Promise<Article[]> {
    if (typeof window !== "undefined") {
      return FALLBACK_LINKEDIN_POSTS; // Don't access filesystem on client
    }

    try {
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "linkedin-posts.json");

      if (!fs.existsSync(filePath)) {
        // Create the file with fallback data as a template
        fs.writeFileSync(filePath, JSON.stringify(FALLBACK_LINKEDIN_POSTS, null, 2), "utf8");
        console.log(`[LinkedinBlogProvider] Created linkedin-posts.json template file.`);
        return FALLBACK_LINKEDIN_POSTS;
      }

      const rawData = fs.readFileSync(filePath, "utf8");
      const posts = JSON.parse(rawData) as Article[];

      if (Array.isArray(posts)) {
        return posts;
      }

      console.warn("[LinkedinBlogProvider] linkedin-posts.json content is invalid.");
      return FALLBACK_LINKEDIN_POSTS;
    } catch (error) {
      console.error(
        "[LinkedinBlogProvider] Error reading linkedin-posts.json, using fallback:",
        error,
      );
      return FALLBACK_LINKEDIN_POSTS;
    }
  }
}
