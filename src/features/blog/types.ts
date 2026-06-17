export type Article = {
  id: string;
  title: string;
  excerpt: string;
  source: "medium" | "linkedin";
  url: string;
  publishedAt: string;
  thumbnail?: string;
  readTime?: string;
  topics?: string[];
};

export interface BlogProvider {
  name: string;
  fetchArticles(): Promise<Article[]>;
}
