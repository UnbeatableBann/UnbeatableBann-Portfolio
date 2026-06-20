import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Brain,
  Database,
  Network,
  Shield,
  FileText,
  Sparkles,
  List,
  MessageSquare,
  Activity,
  Calendar,
  Users,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS_DATA, Product } from "@/features/products/data";
import { ProductMockup } from "@/features/products/components/ProductMockup";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetailPage,
  head: ({ params }) => {
    const matchedProduct = PRODUCTS_DATA.find((p) => p.slug === params.slug);
    return {
      meta: [
        {
          title: matchedProduct
            ? `${matchedProduct.name} — AI Product Detail | Shadab Jamadar`
            : "Product Details — Shadab Jamadar",
        },
        {
          name: "description",
          content:
            matchedProduct?.tagline ||
            "Detailed engineering review of AI product by Shadab Jamadar.",
        },
      ],
    };
  },
});

function ArchitectureFlowchart({ slug }: { slug: string }) {
  if (slug === "curio") {
    return (
      <div className="bg-slate-50 border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6E9C53] animate-pulse" />
          <h4 className="text-xs font-bold text-heading uppercase tracking-wider">
            Ingestion & Processing Pipeline
          </h4>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-[#6E9C53] mb-0.5">INPUT</span>
            <span className="text-[11px] font-semibold text-heading">Audio Input</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">WebSocket Stream</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-[#6E9C53] mb-0.5">SPEECH</span>
            <span className="text-[11px] font-semibold text-heading">Whisper STT</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Transcription Layer</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-[#E8F0D2] border border-[#d1ebd9] rounded-xl w-full md:w-36 text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-800 mb-0.5">ORCHESTRATOR</span>
            <span className="text-[11px] font-semibold text-heading font-mono">
              LangGraph Agent
            </span>
            <span className="text-[9px] text-[#6E9C53] font-semibold mt-0.5">State Management</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col gap-1.5 w-full md:w-40 flex-shrink-0">
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-heading shadow-xs">
              pgvector Semantic Search
            </div>
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-heading shadow-xs">
              Quiz Generator Node
            </div>
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-heading shadow-xs">
              Summary Generator Node
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-[#6E9C53] mb-0.5">OUTPUT</span>
            <span className="text-[11px] font-semibold text-heading">React Dashboard</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Real-time WebSocket</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "ai-interviewer") {
    return (
      <div className="bg-slate-50 border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <h4 className="text-xs font-bold text-heading uppercase tracking-wider">
            Asynchronous Evaluation Cycle
          </h4>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-blue-600 mb-0.5">SUBMISSION</span>
            <span className="text-[11px] font-semibold text-heading">Candidate Answer</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Text & Code Snippets</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-blue-600 mb-0.5">EXECUTION</span>
            <span className="text-[11px] font-semibold text-heading">Docker Sandbox</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Secure Isolated Run</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-blue-50/50 border border-blue-100 rounded-xl w-full md:w-36 text-center shadow-xs">
            <span className="text-[10px] font-bold text-blue-700 mb-0.5">EVALUATION</span>
            <span className="text-[11px] font-semibold text-heading font-mono">
              LangChain Agent
            </span>
            <span className="text-[9px] text-blue-600 font-semibold mt-0.5">State Flow Runner</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col gap-1.5 w-full md:w-40 flex-shrink-0">
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-heading shadow-xs">
              Adaptive Follow-up Quest
            </div>
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-heading shadow-xs">
              Rubric Assessment Scale
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "healthcare-rag") {
    return (
      <div className="bg-slate-50 border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="text-xs font-bold text-heading uppercase tracking-wider">
            Secure Retrieval & Attributed Answer Ingestion
          </h4>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-600 mb-0.5">INPUT</span>
            <span className="text-[11px] font-semibold text-heading">Practitioner Query</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">
              Clinical Diagnoses Question
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-600 mb-0.5">SEMANTIC</span>
            <span className="text-[11px] font-semibold text-heading">UMLS Expansion</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Ontology Mapping</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-600 mb-0.5">DATALINK</span>
            <span className="text-[11px] font-semibold text-heading">Qdrant Hybrid</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Dense & Sparse Indexes</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl w-full md:w-36 text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-700 mb-0.5">COMPLIANCE</span>
            <span className="text-[11px] font-semibold text-heading font-mono">
              Llama 3 Clinical
            </span>
            <span className="text-[9px] text-[#6E9C53] font-semibold mt-0.5">
              PII Validation Filters
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-emerald-600 mb-0.5">RESPONSE</span>
            <span className="text-[11px] font-semibold text-heading">Medical Citations</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">100% Attributed Result</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "mt5-infrastructure") {
    return (
      <div className="bg-slate-50 border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h4 className="text-xs font-bold text-heading uppercase tracking-wider">
            Memory-Mapped IPC Bridge Path
          </h4>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-red-600 mb-0.5">SIGNAL</span>
            <span className="text-[11px] font-semibold text-heading">Python Signals</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Quantitative Engine</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-red-600 mb-0.5">IPC TRANSFER</span>
            <span className="text-[11px] font-semibold text-heading">Shared Memory</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">
              Low-Latency IPC Channel
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-[#0E1726] border border-slate-800 rounded-xl w-full md:w-36 text-center text-slate-350 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-400 mb-0.5">DLL BINDING</span>
            <span className="text-[11px] font-semibold text-white font-mono">C++ Wrapper</span>
            <span className="text-[9px] text-slate-400 mt-0.5">MetaTrader 5 API DLL</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-red-600 mb-0.5">MARKET</span>
            <span className="text-[11px] font-semibold text-heading">MT5 Execution</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Broker Order Terminal</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "quantix") {
    return (
      <div className="bg-slate-50 border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <h4 className="text-xs font-bold text-heading uppercase tracking-wider">
            Arbitrage Scanning & Optimization Pipeline
          </h4>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-amber-600 mb-0.5">PRICING</span>
            <span className="text-[11px] font-semibold text-heading">Redis Tick Store</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">Tick Price Logging</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-white border border-border rounded-xl w-full md:w-32 text-center shadow-xs">
            <span className="text-[10px] font-bold text-amber-600 mb-0.5">SCANNER</span>
            <span className="text-[11px] font-semibold text-heading">Cointegration Scan</span>
            <span className="text-[9px] text-muted font-normal mt-0.5">NumPy Matrix Tests</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col items-center p-3 bg-[#0F172A] border border-slate-800 rounded-xl w-full md:w-36 text-center text-slate-350 shadow-xs">
            <span className="text-[10px] font-bold text-amber-500 mb-0.5">OPTIMIZER</span>
            <span className="text-[11px] font-semibold text-white font-mono">Mean-Variance</span>
            <span className="text-[9px] text-slate-400 mt-0.5">SciPy Optimization</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted hidden md:block flex-shrink-0" />
          <div className="w-[1px] h-4 bg-border md:hidden" />

          <div className="flex flex-col gap-1.5 w-full md:w-40 flex-shrink-0">
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-heading shadow-xs">
              Risk Check Module
            </div>
            <div className="p-2 bg-white border border-border rounded-lg text-center text-[10px] font-semibold text-[#6E9C53] shadow-xs">
              Trade Signal Output
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const matchedProduct = PRODUCTS_DATA.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState("Overview");

  // Track product view in Google Analytics
  useEffect(() => {
    if (matchedProduct) {
      trackEvent("product_view", {
        product_id: matchedProduct.slug,
        product_name: matchedProduct.name,
      });
    }
  }, [matchedProduct]);

  // If the product doesn't exist, redirect safely to products directory
  useEffect(() => {
    if (!matchedProduct) {
      navigate({ to: "/products" });
    }
  }, [matchedProduct, navigate]);

  const tabs = [
    "Overview",
    "Problem",
    "Solution",
    "Architecture",
    "Tech Stack",
    "Screenshots",
    "Challenges",
    "Roadmap",
  ];

  // Scrollspy logic for horizontal tabs: highlight current tab during detail section scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) => document.getElementById(tab.toLowerCase()));
      let currentActive = "Overview";
      let minDistance = Infinity;

      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          // We look for sections matching closest viewport threshold (e.g. 160px from the top)
          const distance = Math.abs(rect.top - 160);
          if (rect.top <= 220 && distance < minDistance) {
            minDistance = distance;
            currentActive = section.id;
          }
        }
      }
      const matchingTab = tabs.find((t) => t.toLowerCase() === currentActive);
      if (matchingTab && matchingTab !== activeTab) {
        setActiveTab(matchingTab);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  if (!matchedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] text-body">
        <div className="text-center space-y-4">
          <span className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-heading">
            <Layers className="w-6 h-6 animate-pulse" />
          </span>
          <h2 className="text-lg font-bold text-heading">Loading Product details...</h2>
        </div>
      </div>
    );
  }

  // Get related products objects
  const relatedProducts = PRODUCTS_DATA.filter((p) => matchedProduct.related.includes(p.slug));

  const handleTabClick = (tabId: string) => {
    const element = document.getElementById(tabId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(tabId);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">
      <Navbar />

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-32 pb-8 md:pb-16">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E9C53] hover:underline mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all products
        </Link>

        {/* Layout split: Left Sidebar + Right Details workspace */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-[100px] space-y-6 hidden lg:block">
            <div className="bg-white rounded-2xl border border-border shadow-soft p-5 space-y-5">
              <div>
                <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-3 px-2">
                  ALL PRODUCTS
                </div>
                <nav className="space-y-1.5">
                  {PRODUCTS_DATA.map((prod) => {
                    const isCurrent = prod.slug === slug;
                    return (
                      <Link
                        key={prod.slug}
                        to="/products/$slug"
                        params={{ slug: prod.slug }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all text-left cursor-pointer ${
                          isCurrent
                            ? "bg-[#E8F0D2] text-[#6E9C53] border-l-2 border-[#6E9C53] font-bold shadow-sm"
                            : "text-body hover:bg-slate-50 hover:text-heading border-l-2 border-transparent"
                        }`}
                      >
                        {prod.slug === "curio" && <Brain className="w-3.5 h-3.5" />}
                        {prod.slug === "ai-interviewer" && <Cpu className="w-3.5 h-3.5" />}
                        {prod.slug === "llm-evaluation-pipeline" && <Activity className="w-3.5 h-3.5" />}
                        {prod.slug === "healthcare-rag" && <Database className="w-3.5 h-3.5" />}
                        {prod.slug === "mt5-infrastructure" && <Network className="w-3.5 h-3.5" />}
                        {prod.slug === "quantix" && <Shield className="w-3.5 h-3.5" />}
                        <span>{prod.name}</span>
                        {isCurrent && (
                          <span className="ml-auto w-1 h-1 rounded-full bg-[#6E9C53]" />
                        )}
                      </Link>
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

          {/* Right Panel Workspace */}
          <div className="lg:col-span-9 space-y-12 w-full min-w-0">
            {/* Header Block */}
            <div className="grid md:grid-cols-12 gap-8 items-center border-b border-border/60 pb-10">
              <div className="md:col-span-7 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#6E9C53] bg-[#E8F0D2] px-2 py-0.5 rounded w-fit inline-block">
                  {matchedProduct.domain}
                </span>
                <h1 className="text-4xl font-bold text-heading tracking-tight leading-tight">
                  {matchedProduct.name}
                </h1>
                <div className="text-base font-semibold text-[#6E9C53] italic">
                  {matchedProduct.tagline}
                </div>
                <p className="text-body-custom text-body leading-relaxed max-w-xl">
                  {matchedProduct.description}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {matchedProduct.links.live && (
                    <a
                      href={matchedProduct.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#6E9C53] hover:bg-[#5C8545] text-white px-6 py-3 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                    >
                      Visit Product <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {matchedProduct.links.caseStudy && (
                    <a
                      href={matchedProduct.links.caseStudy}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white text-heading hover:bg-[#FAFAF8] px-6 py-3 text-xs font-semibold transition-all cursor-pointer"
                    >
                      Case Study
                    </a>
                  )}
                  {matchedProduct.links.github && (
                    <a
                      href={matchedProduct.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-white text-heading hover:bg-[#FAFAF8] px-6 py-3 text-xs font-semibold transition-all cursor-pointer"
                    >
                      GitHub <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Metadata Highlights Card */}
              <div className="md:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-soft space-y-4">
                <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider border-b border-border pb-2">
                  Launch Specifications
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex gap-2.5 items-center">
                    <span className="w-8 h-8 rounded-lg bg-[#E8F0D2] text-[#6E9C53] flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[9px] text-muted block uppercase tracking-wider">
                        Status
                      </span>
                      <span className="text-xs font-semibold text-heading">
                        {matchedProduct.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <span className="w-8 h-8 rounded-lg bg-[#E8F0D2] text-[#6E9C53] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[9px] text-muted block uppercase tracking-wider">
                        Launched
                      </span>
                      <span className="text-xs font-semibold text-heading">
                        {matchedProduct.launchDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <span className="w-8 h-8 rounded-lg bg-[#E8F0D2] text-[#6E9C53] flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[9px] text-muted block uppercase tracking-wider">
                        Active Users
                      </span>
                      <span className="text-xs font-semibold text-heading">
                        {matchedProduct.users || "N/A (Research)"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    <span className="w-8 h-8 rounded-lg bg-[#E8F0D2] text-[#6E9C53] flex items-center justify-center flex-shrink-0">
                      <Layers className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[9px] text-muted block uppercase tracking-wider">
                        Scale
                      </span>
                      <span className="text-xs font-semibold text-heading">
                        {matchedProduct.domain.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Scroll Tabs navigation bar */}
            <div className="sticky top-[72px] z-30 bg-[#FAFAF8]/95 backdrop-blur-xs border-y border-border py-1 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center">
              <div className="flex gap-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`px-4 py-2.5 text-xs font-semibold tracking-tight transition-all relative cursor-pointer ${
                        isActive ? "text-[#6E9C53] font-bold" : "text-body hover:text-heading"
                      }`}
                    >
                      <span>{tab}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#6E9C53] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              {/* Overview Section */}
              <section id="overview" className="scroll-mt-[130px] space-y-6">
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 space-y-4">
                    <h3 className="text-xl font-bold text-heading">Product Overview</h3>
                    <p className="text-small-custom text-body leading-relaxed">
                      {matchedProduct.overview.text}
                    </p>
                    <ul className="space-y-2 pt-2">
                      {matchedProduct.overview.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-xs text-body leading-relaxed font-normal"
                        >
                          <CheckCircle2 className="w-4.5 h-4.5 text-[#6E9C53] flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Capabilities Card */}
                  <div className="md:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-soft space-y-4">
                    <h4 className="text-xs font-bold text-heading tracking-tight border-b border-border pb-2.5">
                      What {matchedProduct.name} Can Generate
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {matchedProduct.overview.capabilities.map((cap, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 border border-border/80 rounded-xl space-y-1"
                        >
                          <div className="flex items-center gap-1.5 text-[#6E9C53]">
                            {cap.iconName === "brain" && <Brain className="w-3.5 h-3.5" />}
                            {cap.iconName === "cpu" && <Cpu className="w-3.5 h-3.5" />}
                            {cap.iconName === "database" && <Database className="w-3.5 h-3.5" />}
                            {cap.iconName === "network" && <Network className="w-3.5 h-3.5" />}
                            {cap.iconName === "shield" && <Shield className="w-3.5 h-3.5" />}
                            {cap.iconName === "fileText" && <FileText className="w-3.5 h-3.5" />}
                            {cap.iconName === "sparkles" && <Sparkles className="w-3.5 h-3.5" />}
                            {cap.iconName === "list" && <List className="w-3.5 h-3.5" />}
                            <span className="text-[10px] font-bold text-heading leading-tight">
                              {cap.name}
                            </span>
                          </div>
                          <p className="text-[9px] text-body font-normal leading-snug">
                            {cap.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics highlights row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-border rounded-2xl p-5 shadow-soft text-center md:text-left mt-8">
                  {matchedProduct.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="space-y-1 border-r border-border/60 last:border-r-0 pr-4 last:pr-0"
                    >
                      <div className="text-2xl font-bold text-heading font-serif italic text-[#6E9C53]">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-muted font-semibold uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Problem Section */}
              <section id="problem" className="scroll-mt-[130px] space-y-4">
                <h3 className="text-xl font-bold text-heading">The Problem</h3>
                <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
                  <p className="text-small-custom text-body leading-relaxed font-normal">
                    {matchedProduct.problem}
                  </p>
                </div>
              </section>

              {/* Solution Section */}
              <section id="solution" className="scroll-mt-[130px] space-y-4">
                <h3 className="text-xl font-bold text-heading">Our Solution</h3>
                <div className="bg-[#E8F0D2]/30 border border-[#d1ebd9] rounded-2xl p-6 shadow-sm">
                  <p className="text-small-custom text-body leading-relaxed font-normal">
                    {matchedProduct.solution}
                  </p>
                </div>
              </section>

              {/* Architecture Section */}
              <section id="architecture" className="scroll-mt-[130px] space-y-6">
                <h3 className="text-xl font-bold text-heading">Technical Architecture</h3>
                <p className="text-small-custom text-body leading-relaxed">
                  {matchedProduct.architecture.text}
                </p>

                {/* SVG/HTML schematic map */}
                <ArchitectureFlowchart slug={matchedProduct.slug} />
              </section>

              {/* Tech Stack Section */}
              <section id="tech stack" className="scroll-mt-[130px] space-y-4">
                <h3 className="text-xl font-bold text-heading">Tech Stack</h3>
                <div className="flex flex-wrap gap-2.5">
                  {matchedProduct.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-border text-xs font-semibold text-heading shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E9C53]" />
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Screenshots Mockup Section */}
              <section id="screenshots" className="scroll-mt-[130px] space-y-4">
                <h3 className="text-xl font-bold text-heading">Dashboard View Simulation</h3>
                <div className="bg-[#FAFAF8] border border-border shadow-card rounded-2xl overflow-hidden aspect-[16/10] relative flex items-center justify-center p-2 w-full min-w-0 max-w-full">
                  <ProductMockup slug={matchedProduct.slug} />
                </div>
              </section>

              {/* Challenges Section */}
              <section id="challenges" className="scroll-mt-[130px] space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column: Engineering Challenges */}
                  <div className="bg-white border border-border rounded-2xl p-6 shadow-soft space-y-4">
                    <h4 className="font-bold text-heading text-sm border-b border-border pb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-red-500" /> Key Engineering Challenges
                    </h4>
                    <ul className="space-y-3">
                      {matchedProduct.challenges.map((challenge, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2.5 text-xs text-body font-normal leading-relaxed"
                        >
                          <span className="text-red-500 font-bold">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Lessons Learned */}
                  <div className="bg-white border border-border rounded-2xl p-6 shadow-soft space-y-4">
                    <h4 className="font-bold text-heading text-sm border-b border-border pb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#6E9C53]" /> Key Lessons Learned
                    </h4>
                    <ul className="space-y-3">
                      {matchedProduct.lessons.map((lesson, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2.5 text-xs text-body font-normal leading-relaxed"
                        >
                          <span className="text-[#6E9C53] font-bold">✓</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Roadmap Section */}
              <section id="roadmap" className="scroll-mt-[130px] space-y-6">
                <h3 className="text-xl font-bold text-heading">Development Roadmap</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {matchedProduct.roadmap.map((step, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-2xl p-5 shadow-soft relative flex flex-col justify-between h-36 ${
                        step.done ? "bg-[#E8F0D2]/20 border-[#d1ebd9]" : "bg-white border-border"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            {step.phase}
                          </span>
                          <span
                            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                              step.done
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {step.done ? "Completed" : "Planned"}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-heading">{step.title}</h4>
                        <p className="text-[11px] text-body leading-relaxed font-normal">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Related Products Widget */}
            {relatedProducts.length > 0 && (
              <section className="border-t border-border/60 pt-12 mt-12 space-y-6">
                <h3 className="text-lg font-bold text-heading">Related Products</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedProducts.map((rel) => (
                    <Link
                      key={rel.slug}
                      to="/products/$slug"
                      params={{ slug: rel.slug }}
                      className="bg-white border border-border hover:border-zinc-400 hover:shadow-soft rounded-2xl p-5 transition-all flex flex-col justify-between h-40 group cursor-pointer"
                    >
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#6E9C53] bg-[#E8F0D2] px-2 py-0.5 rounded">
                          {rel.domain}
                        </span>
                        <h4 className="text-base font-bold text-heading group-hover:text-[#6E9C53] transition-colors">
                          {rel.name}
                        </h4>
                        <p className="text-xs text-body line-clamp-2 leading-relaxed font-normal">
                          {rel.tagline}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6E9C53] mt-2">
                        View Product Details{" "}
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Footer Connection Box */}
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
