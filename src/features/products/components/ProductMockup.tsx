import { Network, Brain, Check, FileText, Search, Terminal, BarChart4 } from "lucide-react";

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
          <div className="w-28 border-r border-slate-800/60 pr-2 flex flex-col gap-1.5 text-slate-400 font-sans hidden sm:flex">
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
          <div className="w-36 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-sm hidden sm:flex">
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
          <div className="w-24 border-r border-slate-100 pr-2 flex flex-col gap-1 text-slate-400 text-[9px] font-normal hidden sm:flex">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-800 pb-2 mb-2 font-sans">
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

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 flex-1 min-h-0">
          {/* Table Cointegration */}
          <div className="col-span-1 sm:col-span-3 bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex flex-col">
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
          <div className="col-span-1 sm:col-span-2 bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex flex-col justify-between hidden sm:flex">
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
