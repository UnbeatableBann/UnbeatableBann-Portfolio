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

// High-fidelity dynamic mockup engine to display crisp interactive UIs instead of image placeholders
export function ProductMockup({ slug }: { slug: string }) {
  if (slug === "curio") {
    return (
      <div className="w-full h-full bg-[#0B0F19] text-[#E2E8F0] p-4 flex flex-col font-sans text-[11px] leading-relaxed relative overflow-hidden select-none">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-slate-500 font-mono text-[9px] ml-1">
              curio-co-teacher.ai/dashboard
            </span>
          </div>
          <div className="flex items-center gap-1 bg-slate-800/60 rounded px-2 py-0.5 text-slate-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6E9C53] animate-pulse" />
            <span>Voicestream Live</span>
          </div>
        </div>

        {/* Inner workspace */}
        <div className="flex flex-1 gap-3 min-h-0">
          {/* Sidebar */}
          <div className="w-28 border-r border-slate-800/60 pr-2 flex flex-col gap-1.5 text-slate-400 font-sans">
            <div className="font-bold text-slate-200 mb-1 flex items-center gap-1">
              <span className="bg-[#6E9C53]/20 text-[#6E9C53] p-0.5 rounded text-[8px]">SJ</span>{" "}
              Curio AI
            </div>
            <div className="bg-slate-850 text-white px-2 py-1 rounded font-medium cursor-pointer">
              Live Session
            </div>
            <div className="hover:bg-slate-800/40 px-2 py-1 rounded cursor-pointer transition">
              Class History
            </div>
            <div className="hover:bg-slate-800/40 px-2 py-1 rounded cursor-pointer transition">
              Curriculum Context
            </div>
            <div className="hover:bg-slate-800/40 px-2 py-1 rounded cursor-pointer transition">
              System Config
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1 flex flex-col gap-3 min-h-0">
            {/* Main banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-lg p-3 text-center flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 text-[32px] text-slate-800/20 font-serif font-bold italic select-none">
                AI
              </div>
              <h4 className="text-[13px] font-bold text-white mb-0.5">
                Your AI Co-Teacher, in Every Lesson.
              </h4>
              <p className="text-slate-400 text-[9px] max-w-xs font-normal">
                Listening to: "Machine Learning Basics - Decision Trees and Entropy..."
              </p>
            </div>

            {/* Generated Cards Grid */}
            <div className="grid grid-cols-3 gap-2 flex-1 min-h-0">
              <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[#6E9C53] font-bold mb-1">
                    <Network className="w-3 h-3" />
                    <span>Mind Map</span>
                  </div>
                  <p className="text-slate-400 text-[8px] leading-snug font-normal">
                    Visual concept map linking Entropy with Information Gain.
                  </p>
                </div>
                <div className="flex justify-center py-1.5 relative">
                  <div className="w-4 h-4 rounded-full bg-[#6E9C53]/30 border border-[#6E9C53] flex items-center justify-center text-[7px] font-bold text-white z-10">
                    H
                  </div>
                  <div className="w-3 h-[1px] bg-slate-700 absolute top-1/2 left-[25%] -translate-y-1/2" />
                  <div className="w-3 h-[1px] bg-slate-700 absolute top-1/2 right-[25%] -translate-y-1/2" />
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[6px] text-slate-300 absolute left-[15%] top-1/2 -translate-y-1/2">
                    E
                  </div>
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[6px] text-slate-300 absolute right-[15%] top-1/2 -translate-y-1/2">
                    IG
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-blue-400 font-bold mb-1">
                    <Brain className="w-3 h-3" />
                    <span>Quiz</span>
                  </div>
                  <p className="text-slate-400 text-[8px] leading-snug font-normal">
                    1. What is entropy used to measure in decision trees?
                  </p>
                </div>
                <div className="space-y-1 text-[7px] text-slate-300">
                  <div className="bg-slate-800/80 px-1 rounded border border-slate-700/60 py-0.5">
                    A. Calculation speed
                  </div>
                  <div className="bg-[#6E9C53]/10 text-[#6E9C53] border border-[#6E9C53]/30 px-1 rounded py-0.5 flex items-center justify-between">
                    <span>B. Impurity of data</span>
                    <Check className="w-2 h-2" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800/60 rounded-lg p-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-purple-400 font-bold mb-1">
                    <FileText className="w-3 h-3" />
                    <span>Summary</span>
                  </div>
                  <ul className="text-slate-400 text-[7px] list-disc list-inside space-y-0.5 font-normal">
                    <li>Information gain splits data</li>
                    <li>Leaf nodes hold outputs</li>
                    <li>Pruning prevents overfit</li>
                  </ul>
                </div>
                <div className="text-[7px] text-slate-500 font-mono text-right">Updated 3s ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "ai-interviewer") {
    return (
      <div className="w-full h-full bg-[#FAFAFA] text-[#334155] p-4 flex flex-col font-sans text-[11px] leading-relaxed relative overflow-hidden select-none border border-slate-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-slate-400 font-mono text-[9px] ml-1">
              interviewer.io/session/39f0a2
            </span>
          </div>
          <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded text-[9px] font-semibold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>24:36</span>
          </div>
        </div>

        {/* Columns split */}
        <div className="flex flex-1 gap-3 min-h-0">
          {/* Interview Question Column */}
          <div className="flex-1 flex flex-col gap-3 min-h-0 bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1">
              <span className="font-bold text-slate-700">Question 3 of 5</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-normal">
                DSA / Data Structures
              </span>
            </div>

            <p className="font-medium text-slate-800 text-[10px] leading-snug">
              Explain how a binary search tree works? Implement a node struct and search algorithm.
            </p>

            <div className="bg-[#1E293B] text-slate-300 font-mono text-[8px] p-2 rounded-md overflow-x-auto flex-1 leading-normal select-none">
              <div className="text-slate-500">// TypeScript Binary Search Tree</div>
              <div>
                <span className="text-blue-400">class</span>{" "}
                <span className="text-yellow-300">BSTNode</span> &#123;
              </div>
              <div>
                &nbsp;&nbsp;value: <span className="text-emerald-400">number</span>;
              </div>
              <div>
                &nbsp;&nbsp;left: <span className="text-yellow-300">BSTNode</span> |{" "}
                <span className="text-blue-400">null</span> ={" "}
                <span className="text-blue-400">null</span>;
              </div>
              <div>
                &nbsp;&nbsp;right: <span className="text-yellow-300">BSTNode</span> |{" "}
                <span className="text-blue-400">null</span> ={" "}
                <span className="text-blue-400">null</span>;
              </div>
              <div>&#125;</div>
            </div>

            <div className="text-slate-400 text-[8px] italic font-normal">
              Type your explanation here and explain edge cases...
            </div>
          </div>

          {/* HR Rubric Performance Panel */}
          <div className="w-36 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-sm">
            <div>
              <h5 className="font-bold text-slate-800 text-[10px] border-b border-slate-100 pb-1.5 mb-2">
                Candidate Grading
              </h5>
              <div className="text-center py-2 bg-emerald-50 rounded-lg border border-emerald-100 mb-3">
                <div className="text-slate-400 text-[8px] uppercase tracking-wider font-semibold">
                  Overall Score
                </div>
                <div className="text-lg font-bold text-emerald-600">82%</div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5 font-semibold text-slate-600">
                    <span>Communication</span>
                    <span>85%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5 font-semibold text-slate-600">
                    <span>Problem Solving</span>
                    <span>80%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "80%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5 font-semibold text-slate-600">
                    <span>Technical Reasoning</span>
                    <span>83%</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "83%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[7px] text-slate-400 font-mono">ID: user_eval_4a0d9b</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "healthcare-rag") {
    return (
      <div className="w-full h-full bg-white text-slate-700 p-4 flex flex-col font-sans text-[11px] leading-relaxed relative overflow-hidden select-none border border-slate-200">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="grid place-items-center w-5 h-5 rounded bg-emerald-500 text-white font-bold text-[9px]">
              H
            </span>
            <span className="font-semibold text-slate-800 text-[10px]">
              Healthcare RAG Dashboard
            </span>
          </div>
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-50 text-[#6E9C53] font-semibold border border-emerald-100">
            HIPAA Compliant
          </span>
        </div>

        <div className="flex flex-1 gap-3 min-h-0">
          {/* Left Panel */}
          <div className="w-24 border-r border-slate-100 pr-2 flex flex-col gap-1 text-slate-400 text-[9px] font-normal">
            <div className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-1 rounded">
              New Diagnostic
            </div>
            <div className="px-2 py-0.5 hover:bg-slate-50 rounded cursor-pointer">Patient EHRs</div>
            <div className="px-2 py-0.5 hover:bg-slate-50 rounded cursor-pointer">
              Drug Reference
            </div>
            <div className="px-2 py-0.5 hover:bg-slate-50 rounded cursor-pointer">
              Citations Index
            </div>
          </div>

          {/* Chat Workspace */}
          <div className="flex-1 flex flex-col gap-2 min-h-0">
            {/* Center question */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-2 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
              <h4 className="text-[12px] font-bold text-slate-800 mb-1">
                How can I help you today?
              </h4>
              <p className="text-slate-400 text-[8px] mb-2 max-w-[180px] font-normal">
                Ask about diagnosis metrics, clinical guidelines or paper references.
              </p>

              {/* Search bar */}
              <div className="w-full max-w-[220px] relative">
                <input
                  type="text"
                  readOnly
                  placeholder="Ask a medical question..."
                  className="w-full pl-3 pr-8 py-1 text-[8px] rounded border border-slate-200 bg-white focus:outline-none"
                />
                <Search className="w-2.5 h-2.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Quick action chips */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap">
              <span className="px-1.5 py-0.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[8px] hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer transition font-normal">
                Drug Interactions with Aspirin
              </span>
              <span className="px-1.5 py-0.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[8px] hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer transition font-normal">
                ICD-10 code for diabetes
              </span>
              <span className="px-1.5 py-0.5 rounded-full border border-slate-200 bg-white text-slate-500 text-[8px] hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer transition font-normal">
                Treatment for hypertension
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "mt5-infrastructure") {
    return (
      <div className="w-full h-full bg-[#0E1726] text-slate-300 p-4 flex flex-col font-mono text-[9px] leading-relaxed relative overflow-hidden select-none">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2 font-sans">
          <div className="flex items-center gap-1">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-slate-200 text-[10px]">MT5 Core Bridge Daemon</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] text-slate-400">IPC Mapped: OK</span>
          </div>
        </div>

        {/* Grid split */}
        <div className="grid grid-cols-4 gap-2 border-b border-slate-800 pb-2 mb-2 font-sans">
          <div className="bg-slate-900 border border-slate-800 rounded p-1 text-center">
            <span className="text-slate-500 text-[7px] block">LATENCY</span>
            <span className="text-emerald-400 text-[10px] font-bold">800μs</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded p-1 text-center">
            <span className="text-slate-500 text-[7px] block">SLIPPAGE</span>
            <span className="text-slate-200 text-[10px] font-bold">0.01%</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded p-1 text-center">
            <span className="text-slate-500 text-[7px] block">UPTIME</span>
            <span className="text-slate-200 text-[10px] font-bold">99.99%</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded p-1 text-center">
            <span className="text-slate-500 text-[7px] block">TICK STATS</span>
            <span className="text-slate-200 text-[10px] font-bold">10M+</span>
          </div>
        </div>

        {/* Console view */}
        <div className="flex-1 bg-black/60 border border-slate-900 rounded p-2 overflow-y-auto leading-normal text-slate-400 select-none text-[8px]">
          <div className="text-slate-600 font-sans">// Execution Logs - Tick Buffer Stream</div>
          <div>[08:00:00.001] [IPC] Shared memory connected.</div>
          <div className="text-emerald-400">
            [08:00:00.800] [MT5] EURUSD tick: Buy 1.08450 (Latency 800μs)
          </div>
          <div className="text-emerald-400">
            [08:00:01.200] [MT5] GBPUSD tick: Sell 1.26840 (Latency 780μs)
          </div>
          <div className="text-cyan-400">
            [08:00:02.110] [EXEC] Order filled: 0.1 lots Buy EURUSD
          </div>
          <div className="text-amber-400">
            [08:00:02.112] [EXEC] Slippage calculation: 0.00001 (0.01%)
          </div>
        </div>
      </div>
    );
  }

  if (slug === "quantix") {
    return (
      <div className="w-full h-full bg-[#0F172A] text-slate-300 p-4 flex flex-col font-sans text-[10px] leading-relaxed relative overflow-hidden select-none border border-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <BarChart4 className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-slate-200 text-[11px]">
              Quantix Portfolio Optimizer
            </span>
          </div>
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/25 px-1.5 py-0.5 rounded text-[8px] font-semibold">
            Mean-Variance Active
          </span>
        </div>

        <div className="grid grid-cols-5 gap-3 flex-1 min-h-0">
          {/* Table Cointegration */}
          <div className="col-span-3 bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex flex-col">
            <h5 className="font-bold text-slate-400 text-[9px] mb-1.5 uppercase tracking-wider">
              Cointegration Scanner
            </h5>
            <div className="space-y-1.5 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-white font-medium">EURUSD / GBPUSD</span>
                <span className="text-emerald-400 font-mono font-semibold">p = 0.02</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-white font-medium">AUDUSD / NZDUSD</span>
                <span className="text-emerald-400 font-mono font-semibold">p = 0.04</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">USDCAD / USDCHF</span>
                <span className="text-slate-500 font-mono">p = 0.18</span>
              </div>
            </div>
          </div>

          {/* Allocation Weights */}
          <div className="col-span-2 bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-slate-400 text-[9px] mb-1.5 uppercase tracking-wider">
                Weights Allocation
              </h5>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5 text-slate-400">
                    <span>EURUSD (+45%)</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5 text-slate-400">
                    <span>GBPUSD (-35%)</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "35%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[8px] mb-0.5 text-slate-400">
                    <span>NZDUSD (+20%)</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-1 text-center font-mono">
              <span className="text-[7px] text-slate-500 block uppercase">Sharpe Ratio</span>
              <span className="text-emerald-400 font-bold text-[11px]">2.4 Sharpe</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center p-4">
      <span className="text-slate-400 font-normal">Mockup unavailable</span>
    </div>
  );
}

export function ProductsPage() {
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
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-purple/10 blur-[130px] -z-10 pointer-events-none translate-x-[20%] -translate-y-[20%] animate-ambient-flow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/6 blur-[110px] -z-10 pointer-events-none -translate-x-[20%] translate-y-[20%] animate-ambient-flow [animation-delay:4s]" />

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
      <section id="products-directory" className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
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
          <div className="lg:col-span-9 space-y-10 w-full">
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
                    <div className="lg:col-span-7 bg-[#FAFAF8] border border-border shadow-card rounded-2xl overflow-hidden aspect-[4/3] relative flex items-center justify-center p-0.5 group">
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
