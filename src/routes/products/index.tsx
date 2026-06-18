import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ArrowRight,
  Github,
  Mail,
  Cpu,
  Brain,
  Database,
  Network,
  Shield,
  FileText,
  Sparkles,
  List,
  Check,
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  Play,
  Terminal,
  BarChart4,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS_DATA, Product } from "@/features/products/data";
import { ProductMockup } from "@/features/products/components/ProductMockup";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products — Shadab Jamadar | AI Engineer & Product Builder" },
      {
        name: "description",
        content:
          "Explore AI products, systems, and experiments built by Shadab Jamadar to solve real-world problems.",
      },
    ],
  }),
});

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Filters mapping helper
  const filtersList = [
    "All",
    "AI Products",
    "Research",
    "Open Source",
    "Educational AI",
    "Trading Systems",
  ];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Search Query filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // 2. Tab Filter
      if (selectedFilter === "All") return true;
      if (selectedFilter === "AI Products") {
        return (
          product.domain.includes("AI") ||
          ["curio", "ai-interviewer", "healthcare-rag"].includes(product.slug)
        );
      }
      if (selectedFilter === "Research") {
        return product.status === "Research";
      }
      if (selectedFilter === "Open Source") {
        return !!product.links.github;
      }
      if (selectedFilter === "Educational AI") {
        return product.domain === "EDUCATIONAL AI" || product.slug === "curio";
      }
      if (selectedFilter === "Trading Systems") {
        return (
          product.domain === "TRADING SYSTEMS" ||
          ["mt5-infrastructure", "quantix"].includes(product.slug)
        );
      }

      return true;
    });
  }, [searchQuery, selectedFilter]);

  const [activeSlug, setActiveSlug] = useState(() => filteredProducts[0]?.slug || "curio");

  // Reset active slug to first matching product if the current active slug gets filtered out
  useEffect(() => {
    const isCurrentActiveVisible = filteredProducts.some((p) => p.slug === activeSlug);
    if (!isCurrentActiveVisible && filteredProducts.length > 0) {
      setActiveSlug(filteredProducts[0].slug);
    }
  }, [filteredProducts, activeSlug]);

  // Smooth scroll helper
  const scrollToProduct = (slug: string) => {
    const element = document.getElementById(`product-${slug}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scrollspy logic: update active sidebar menu highlight during page scrolling (observing only filtered products)
  useEffect(() => {
    const handleScroll = () => {
      const sections = filteredProducts.map((p) => document.getElementById(`product-${p.slug}`));
      let currentActive = activeSlug;
      let minDistance = Infinity;

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // We look for the section closest to the top offset threshold (e.g. 180px)
          const distance = Math.abs(rect.top - 180);
          if (rect.top <= 250 && distance < minDistance) {
            minDistance = distance;
            currentActive = section.id.replace("product-", "");
          }
        }
      }
      if (currentActive !== activeSlug) {
        setActiveSlug(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSlug, filteredProducts]);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-36 pb-20 bg-gradient-to-br from-[#f2eefc] via-[#eef4df] to-[#fdf5eb]">
        {/* Subtle moving grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none -z-20" />

        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-brand-purple/10 blur-[80px] md:blur-[130px] -z-10 pointer-events-none translate-x-[10%] md:translate-x-[20%] -translate-y-[10%] md:-translate-y-[20%] animate-ambient-flow" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-brand-orange/6 blur-[70px] md:blur-[110px] -z-10 pointer-events-none -translate-x-[10%] md:-translate-x-[20%] translate-y-[10%] md:translate-y-[20%] animate-ambient-flow [animation-delay:4s]" />

        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 space-y-6">
          <div className="space-y-4 max-w-3xl">
            <div className="text-label-custom text-[#6E9C53] font-bold tracking-wider">
              PRODUCTS
            </div>
            <h1 className="text-hero-title leading-[1.05] tracking-tight text-heading">
              Things I've Built.
            </h1>
            <p className="text-hero-desc text-body max-w-2xl font-normal leading-[1.7]">
              AI products, systems, and experiments designed to solve real-world problems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                const element = document.getElementById("products-directory");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-7 py-3.5 text-sm font-semibold hover:bg-primary-hover transition-all duration-200 shadow-md cursor-pointer"
            >
              Explore Products ↓
            </button>
            <a
              href="/#experience"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-heading hover:bg-[#FAFAF8] transition-all duration-200"
            >
              View Journey <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section
        id="products-directory"
        className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-16 pb-8 md:pb-16"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Sidebar - Sticky Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-[100px] space-y-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-border shadow-soft p-5 space-y-5">
              <div>
                <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3 px-2">
                  ALL PRODUCTS
                </div>
                <nav className="space-y-1.5">
                  {filteredProducts.map((prod) => {
                    const isActive = activeSlug === prod.slug;
                    return (
                      <button
                        key={prod.slug}
                        onClick={() => {
                          setActiveSlug(prod.slug);
                          scrollToProduct(prod.slug);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all text-left cursor-pointer ${
                          isActive
                            ? "bg-[#E8F0D2] text-[#6E9C53] border-l-2 border-[#6E9C53] font-bold shadow-sm"
                            : "text-body hover:bg-slate-50 hover:text-heading border-l-2 border-transparent"
                        }`}
                      >
                        {prod.slug === "curio" && <Brain className="w-3.5 h-3.5" />}
                        {prod.slug === "ai-interviewer" && <Cpu className="w-3.5 h-3.5" />}
                        {prod.slug === "healthcare-rag" && <Database className="w-3.5 h-3.5" />}
                        {prod.slug === "mt5-infrastructure" && <Network className="w-3.5 h-3.5" />}
                        {prod.slug === "quantix" && <Shield className="w-3.5 h-3.5" />}
                        <span>{prod.name}</span>
                        {isActive && <span className="ml-auto w-1 h-1 rounded-full bg-[#6E9C53]" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Idea Card Box */}
              <div className="bg-[#FAFAF8] rounded-xl border border-border/80 p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-semibold text-xs text-heading">Have an idea?</span>
                </div>
                <p className="text-[11px] text-body leading-relaxed font-normal">
                  Let's build something impactful together. Let's talk about details.
                </p>
                <a
                  href="mailto:shadabjamadar4@gmail.com?subject=Product%20Development%20Collaboration"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#6E9C53] hover:underline"
                >
                  Let's Talk <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Right Panel - Product Content & Filters */}
          <div className="lg:col-span-9 space-y-10 w-full min-w-0">
            {/* Filter Bar & Search */}
            <div className="bg-white rounded-2xl border border-border p-4 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Horizontal scrollable tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                {filtersList.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedFilter === filter
                        ? "bg-[#6E9C53] text-white shadow-sm font-bold"
                        : "bg-slate-50 border border-border text-body hover:bg-slate-100 hover:text-heading"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:max-w-[240px]">
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-3 pr-9 py-2 rounded-full border border-border bg-slate-50 text-xs focus:outline-none focus:ring-1 focus:ring-[#6E9C53] focus:border-[#6E9C53] focus:bg-white transition-all shadow-sm"
                />
                <Search className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            {/* Mobile Scrollspy Navigation list */}
            <div className="lg:hidden block overflow-x-auto whitespace-nowrap py-1 bg-white border border-border rounded-xl p-2 shadow-soft scrollbar-none sticky top-[72px] z-30">
              <div className="flex gap-2">
                {filteredProducts.map((prod) => {
                  const isActive = activeSlug === prod.slug;
                  return (
                    <button
                      key={prod.slug}
                      onClick={() => {
                        setActiveSlug(prod.slug);
                        scrollToProduct(prod.slug);
                      }}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#E8F0D2] text-[#6E9C53] border border-[#d1ebd9] font-bold shadow-sm"
                          : "text-body bg-slate-50 border border-border/60 hover:text-heading"
                      }`}
                    >
                      <span>{prod.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Showcases */}
            <div className="space-y-16">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <div
                    key={prod.slug}
                    id={`product-${prod.slug}`}
                    className="scroll-mt-[120px] grid lg:grid-cols-12 gap-8 items-center border-b border-border/60 pb-16 last:border-b-0 last:pb-0"
                  >
                    {/* Left Details column */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6E9C53] bg-[#E8F0D2] px-2 py-0.5 rounded">
                          {prod.domain}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            prod.status === "Live" || prod.status === "Production"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-100"
                          }`}
                        >
                          {prod.status}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-heading tracking-tight">
                        {prod.name}
                      </h3>
                      <div className="text-sm font-semibold text-[#6E9C53] italic">
                        {prod.tagline}
                      </div>
                      <p className="text-small-custom text-body leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {prod.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-50 text-body border border-border/80 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-3">
                        <Link
                          to="/products/$slug"
                          params={{ slug: prod.slug }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E9C53] hover:underline cursor-pointer"
                        >
                          View Product <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {prod.links.live && (
                          <a
                            href={prod.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-body hover:text-heading cursor-pointer"
                          >
                            Live Demo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {prod.links.github && (
                          <a
                            href={prod.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-body hover:text-heading cursor-pointer"
                          >
                            GitHub <Github className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Mockup column */}
                    <div className="lg:col-span-7 bg-[#FAFAF8] border border-border shadow-card rounded-2xl overflow-hidden aspect-[4/3] relative flex items-center justify-center p-0.5 group w-full min-w-0">
                      <ProductMockup slug={prod.slug} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-fade-in" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-border p-12 text-center text-body space-y-2">
                  <div className="text-lg font-semibold text-heading">
                    No products match your search
                  </div>
                  <p className="text-xs text-muted font-normal max-w-sm mx-auto">
                    Try clearing filters or search terms to browse Shadab's other projects.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedFilter("All");
                    }}
                    className="inline-flex items-center justify-center rounded-lg bg-primary text-white px-4 py-2 text-xs font-semibold hover:bg-primary-hover transition duration-200 mt-2 cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Banner block at bottom */}
            <div className="bg-white rounded-3xl border border-border p-6 md:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden mt-12">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />
              <div className="flex gap-4 items-start md:items-center">
                <span className="w-10 h-10 rounded-full bg-[#E8F0D2] text-[#6E9C53] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-heading">
                    Every product is built with a focus on solving real problems.
                  </h4>
                  <p className="text-xs text-body leading-relaxed max-w-xl font-normal">
                    Interested in engineering collaboration, specialized quantitative models, or
                    custom educational AI solutions? Let's connect.
                  </p>
                </div>
              </div>
              <a
                href="mailto:shadabjamadar4@gmail.com?subject=Project%20Inquiry%20%2F%20Let's%20Connect"
                className="inline-flex items-center gap-2 rounded-full bg-[#6E9C53] hover:bg-[#5C8545] text-white px-6 py-3 text-xs font-semibold transition-all shadow-sm w-fit self-start md:self-auto cursor-pointer"
              >
                Let's Connect <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
