import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  ArrowRight,
  ExternalLink,
  Calendar,
  Clock,
  RefreshCw,
  AlertCircle,
  BookOpen,
  Filter,
} from "lucide-react";
import { Navbar, MediumIcon, LinkedinIcon } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useBlog } from "@/features/blog/hooks/useBlog";
import { Article } from "@/features/blog/types";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — Shadab Jamadar | AI Engineer & Product Builder" },
      {
        name: "description",
        content:
          "Explore experiments, lessons, research, and ideas from building AI products by Shadab Jamadar.",
      },
    ],
  }),
});

function BlogPage() {
  const {
    filteredArticles,
    featuredArticle,
    latestArticles,
    isLoading,
    error,
    refresh,

    // Filters & Search
    searchQuery,
    setSearchQuery,
    selectedTopic,
    setSelectedTopic,
    selectedSource,
    setSelectedSource,
    sortBy,
    setSortBy,

    // Statistics & Sidebar Metadata
    statistics,
    topicCounts,
    sourceCounts,
  } = useBlog();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  const topicsList = [
    "All",
    "RAG",
    "Agentic AI",
    "LLMs",
    "AI Products",
    "Engineering",
    "Career",
    "Research",
  ];
  const sourcesList = [
    { label: "All Sources", value: "All" },
    { label: "Medium", value: "Medium" },
    { label: "LinkedIn", value: "LinkedIn" },
  ];

  // Format Date Helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-br from-[#f2eefc] via-[#eef4df] to-[#fdf5eb]">
        {/* Subtle moving grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none -z-20" />

        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-purple/10 blur-[130px] -z-10 pointer-events-none translate-x-[20%] -translate-y-[20%] animate-ambient-flow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/6 blur-[110px] -z-10 pointer-events-none -translate-x-[20%] translate-y-[20%] animate-ambient-flow [animation-delay:4s]" />

        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 space-y-6">
          <div className="space-y-4 max-w-3xl">
            <div className="text-label-custom text-muted font-bold tracking-wider">BLOG</div>
            <h1 className="text-hero-title leading-[1.05] tracking-tight text-heading">
              Writing<span className="text-accent">.</span>
            </h1>
            <p className="text-hero-desc text-body max-w-2xl font-normal leading-[1.7]">
              Experiments, lessons, research, and ideas from building AI products.
            </p>
            <p className="text-sm text-muted-foreground font-normal leading-[1.6]">
              All my content from Medium and LinkedIn in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#articles-feed"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-7 py-3.5 text-sm font-semibold hover:bg-primary-hover transition-all duration-200"
            >
              Explore Articles <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/shadab-jamadar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-heading hover:bg-[#FAFAF8] transition-all duration-200"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Writing Statistics Section */}
      <section className="border-y border-border bg-white py-8">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center md:text-left">
            <div className="space-y-1 md:border-r border-border/60 md:pr-4">
              <div className="text-2xl font-bold text-heading font-serif italic">
                {statistics.articlesPublished}
              </div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Articles Published
              </div>
            </div>
            <div className="space-y-1 md:border-r border-border/60 md:px-4">
              <div className="text-2xl font-bold text-heading font-serif italic">
                {statistics.topicsCovered}
              </div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Topics Covered
              </div>
            </div>
            <div className="space-y-1 md:border-r border-border/60 md:px-4">
              <div className="text-2xl font-bold text-heading font-serif italic">2</div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Platforms (Medium + LI)
              </div>
            </div>
            <div className="space-y-1 md:pl-4">
              <div className="text-2xl font-bold text-heading font-serif italic">
                {statistics.since}
              </div>
              <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Writing Since
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Feed Area */}
      <section id="articles-feed" className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
        {/* Filters and Search Header */}
        <div className="flex flex-col gap-6 mb-12 border-b border-border/60 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted-foreground">
                <Search className="w-4 h-4" />
              </span>
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-white text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all shadow-sm"
              />
            </div>

            {/* Source and Sort filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
              {/* Source tabs */}
              <div className="inline-flex rounded-full bg-zinc-100 p-1 border border-border flex-shrink-0">
                {["All", "Medium", "LinkedIn"].map((src) => (
                  <button
                    id={`source-filter-${src.toLowerCase().replace(/\s+/g, "-")}`}
                    key={src}
                    onClick={() => setSelectedSource(src)}
                    className={`px-2.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedSource === src
                        ? "bg-white text-heading shadow-sm"
                        : "text-muted-foreground hover:text-heading"
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>

              {/* Sort Toggle */}
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
                className="px-3 sm:px-4 py-2 bg-white border border-border rounded-full text-xs font-semibold text-heading focus:outline-none focus:ring-1 focus:ring-accent shadow-sm flex-shrink-0"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              {/* Refresh button */}
              <button
                id="refresh-button"
                onClick={handleManualRefresh}
                disabled={isLoading || isRefreshing}
                className="p-2.5 rounded-full border border-border bg-white text-body hover:text-heading hover:bg-[#FAFAF8] shadow-sm transition-all disabled:opacity-50 flex-shrink-0"
                title="Force refresh feed"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoading || isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Topic Pills */}
          <div className="flex flex-wrap gap-2">
            {topicsList.map((topic) => {
              const count = topicCounts[topic] ?? 0;
              const isSelected = selectedTopic === topic;
              return (
                <button
                  id={`topic-pill-${topic.toLowerCase().replace(/\s+/g, "-")}`}
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                    isSelected
                      ? "bg-primary border-primary text-white shadow-sm"
                      : "bg-white border-border text-body hover:bg-zinc-50"
                  }`}
                >
                  {topic}
                  <span
                    className={`ml-1.5 text-[10px] ${isSelected ? "text-white/80" : "text-muted-foreground"}`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic content rendering grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Main Feed Column */}
          <div className="lg:col-span-8 space-y-12">
            {isLoading && filteredArticles.length === 0 ? (
              // Loading State (Skeletons)
              <div className="space-y-12">
                {/* Featured Skeleton */}
                <div className="bg-white border border-border rounded-3xl p-8 space-y-6 animate-pulse">
                  <div className="h-4 bg-zinc-200 rounded w-20" />
                  <div className="space-y-3">
                    <div className="h-8 bg-zinc-200 rounded w-3/4" />
                    <div className="h-4 bg-zinc-200 rounded w-full" />
                    <div className="h-4 bg-zinc-200 rounded w-5/6" />
                  </div>
                  <div className="h-48 bg-zinc-100 rounded-2xl w-full" />
                </div>
                {/* Card Skeletons */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2].map((n) => (
                    <div
                      key={n}
                      className="bg-white border border-border rounded-2xl p-6 space-y-4 animate-pulse"
                    >
                      <div className="h-4 bg-zinc-200 rounded w-16" />
                      <div className="h-6 bg-zinc-200 rounded w-5/6" />
                      <div className="h-16 bg-zinc-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ) : error && filteredArticles.length === 0 ? (
              // Error State
              <div className="py-16 text-center border border-dashed border-border rounded-3xl bg-white p-8 space-y-4">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto opacity-75" />
                <h3 className="text-lg font-semibold text-heading">Failed to fetch articles</h3>
                <p className="text-sm text-body max-w-sm mx-auto">
                  There was an issue retrieving the writing feed from Medium and LinkedIn.
                </p>
                <button
                  onClick={handleManualRefresh}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-2.5 text-xs font-semibold hover:bg-primary-hover transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry Fetching
                </button>
              </div>
            ) : filteredArticles.length === 0 ? (
              // Empty State
              <div className="py-16 text-center border border-dashed border-border rounded-3xl bg-white p-8 space-y-4">
                <BookOpen className="w-12 h-12 text-muted mx-auto opacity-50" />
                <h3 className="text-lg font-semibold text-heading">
                  No articles match your criteria
                </h3>
                <p className="text-sm text-body max-w-sm mx-auto">
                  Try clearing your search query or adjusting your source and topic filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTopic("All");
                    setSelectedSource("All");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-xs font-semibold hover:bg-zinc-50 transition-all text-heading"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              // Content loaded state
              <div className="space-y-12">
                {/* 1. Featured Article (Dynamic) */}
                {featuredArticle && (
                  <div className="group relative bg-white border border-border rounded-3xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-card hover:border-[#D0D0D0]">
                    <div className="grid md:grid-cols-12">
                      <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          {/* Badges and metadata */}
                          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                            {featuredArticle.source === "medium" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f2f2] text-zinc-900 px-3 py-1 text-[11px]">
                                <MediumIcon className="w-3.5 h-3.5" /> Read on Medium
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4fe] text-[#006097] px-3 py-1 text-[11px]">
                                <LinkedinIcon className="w-3.5 h-3.5" /> Read on LinkedIn
                              </span>
                            )}
                            <span className="text-muted flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />{" "}
                              {formatDate(featuredArticle.publishedAt)}
                            </span>
                            {featuredArticle.readTime && (
                              <span className="text-muted flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h2 className="text-2xl md:text-3xl font-bold text-heading leading-tight tracking-tight group-hover:text-accent transition-colors duration-200">
                            <a
                              href={featuredArticle.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackEvent("article_click", {
                                  title: featuredArticle.title,
                                  url: featuredArticle.url,
                                  type: "featured_title",
                                })
                              }
                            >
                              {featuredArticle.title}
                            </a>
                          </h2>

                          {/* Description */}
                          <p className="text-sm text-body leading-relaxed line-clamp-3">
                            {featuredArticle.excerpt}
                          </p>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
                          <div className="flex flex-wrap gap-1.5">
                            {featuredArticle.topics?.map((topic) => (
                              <span
                                key={topic}
                                className="bg-[#f0f3eb] text-[#426a2e] px-2.5 py-0.5 rounded text-[11px] font-semibold"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>

                          <a
                            href={featuredArticle.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("article_click", {
                                title: featuredArticle.title,
                                url: featuredArticle.url,
                                type: "featured_button",
                              })
                            }
                            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent hover:underline group-hover:translate-x-0.5 transition-transform"
                          >
                            Read Full Article <ExternalLink className="w-3.5 h-3.5 ml-1" />
                          </a>
                        </div>
                      </div>

                      {/* Featured Thumbnail */}
                      <div className="md:col-span-5 relative min-h-[220px] md:min-h-full bg-zinc-50 overflow-hidden">
                        {featuredArticle.thumbnail ? (
                          <img
                            src={featuredArticle.thumbnail}
                            alt={featuredArticle.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-brand-peach/10 to-accent/10 flex items-center justify-center p-6 text-center select-none">
                            <BookOpen className="w-12 h-12 text-muted opacity-30 stroke-[1.25]" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Latest Articles Grid */}
                {latestArticles.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      Latest Articles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {latestArticles.map((art) => (
                        <article
                          key={art.id}
                          className="group bg-white border border-border rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-soft transition-all duration-300 hover:shadow-card hover:border-[#D0D0D0]"
                        >
                          <div className="space-y-4">
                            {/* Badges & Meta */}
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                              {art.source === "medium" ? (
                                <span className="inline-flex items-center gap-1.5 font-semibold text-zinc-900">
                                  <MediumIcon className="w-3.5 h-3.5" /> Medium
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 font-semibold text-[#006097]">
                                  <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                                </span>
                              )}
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {formatDate(art.publishedAt)}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-lg font-bold text-heading leading-snug group-hover:text-accent transition-colors duration-200">
                              <a
                                href={art.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                  trackEvent("article_click", {
                                    title: art.title,
                                    url: art.url,
                                    type: "grid_title",
                                  })
                                }
                              >
                                {art.title}
                              </a>
                            </h4>

                            {/* Excerpt */}
                            <p className="text-xs text-body leading-relaxed line-clamp-3">
                              {art.excerpt}
                            </p>
                          </div>

                          {/* Footer details */}
                          <div className="pt-4 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold">
                            <span className="bg-[#f0f3eb] text-[#426a2e] px-2 py-0.5 rounded">
                              {art.topics?.[0] || "Engineering"}
                            </span>
                            <a
                              href={art.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackEvent("article_click", {
                                  title: art.title,
                                  url: art.url,
                                  type: "grid_button",
                                })
                              }
                              className="inline-flex items-center gap-1 text-primary hover:text-accent"
                            >
                              Read <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-[90px]">
            {/* Topic Filter Widget */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-soft space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-heading font-semibold border-b border-border/60 pb-3 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-accent" /> Topics
              </h4>
              <ul className="space-y-2.5">
                {topicsList.map((topic) => {
                  const count = topicCounts[topic] ?? 0;
                  const isSelected = selectedTopic === topic;
                  return (
                    <li key={topic}>
                      <button
                        id={`sidebar-topic-${topic.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setSelectedTopic(topic)}
                        className={`w-full flex items-center justify-between text-xs font-semibold transition-all py-1.5 px-2.5 rounded-lg ${
                          isSelected
                            ? "bg-accent-soft text-[#426a2e] font-bold"
                            : "text-body hover:bg-zinc-50 hover:text-heading"
                        }`}
                      >
                        <span>{topic === "All" ? "All Topics" : topic}</span>
                        <span className="text-[10px] text-muted">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Source Filter Widget */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-soft space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-heading font-semibold border-b border-border/60 pb-3 flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-accent" /> Sources
              </h4>
              <ul className="space-y-2.5">
                {sourcesList.map((src) => {
                  const count = sourceCounts[src.value] ?? 0;
                  const isSelected = selectedSource === src.value;
                  return (
                    <li key={src.value}>
                      <button
                        id={`sidebar-source-${src.value.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => setSelectedSource(src.value)}
                        className={`w-full flex items-center justify-between text-xs font-semibold transition-all py-1.5 px-2.5 rounded-lg ${
                          isSelected
                            ? "bg-accent-soft text-[#426a2e] font-bold"
                            : "text-body hover:bg-zinc-50 hover:text-heading"
                        }`}
                      >
                        <span>{src.label}</span>
                        <span className="text-[10px] text-muted">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
