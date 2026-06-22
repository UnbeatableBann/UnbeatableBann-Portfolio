export interface Product {
  slug: string;
  name: string;
  domain: string;
  tagline: string;
  description: string;
  excerpt: string;
  techStack: string[];
  status: "Live" | "Beta" | "Alpha" | "Research" | "Production";
  users?: string;
  launchDate: string;
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  overview: {
    text: string;
    bullets: string[];
    capabilities: {
      iconName:
        | "brain"
        | "cpu"
        | "database"
        | "network"
        | "shield"
        | "fileText"
        | "sparkles"
        | "list";
      name: string;
      desc: string;
    }[];
  };
  problem: string;
  solution: string;
  architecture: {
    text: string;
    mermaidDiagram: string;
  };
  challenges: string[];
  lessons: string[];
  roadmap: {
    phase: string;
    title: string;
    desc: string;
    done: boolean;
  }[];
  related: string[]; // slugs
  metrics: {
    value: string;
    label: string;
  }[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    slug: "curio",
    name: "Curio",
    domain: "EDUCATIONAL AI",
    tagline: "AI Co-Teacher for Modern Classrooms",
    description:
      "An autonomous AI teaching assistant that listens, understands, and generates educational aids in real-time during lectures. It captures audio input, extracts semantic structures, and dynamically serves visual maps, quizzes, and summaries to students.",
    excerpt:
      "Transforming classrooms through autonomous educational AI helpers that generate classroom materials in real time.",
    techStack: ["LangGraph", "Gemini", "RAG", "FastAPI", "React", "PostgreSQL"],
    status: "Live",
    users: "500+",
    launchDate: "Jan 2025",
    links: {
      live: "https://curio-edu.ai",
      github: "https://github.com/UnbeatableBann/Curio",
      caseStudy: "/blog/curio-case-study",
    },
    overview: {
      text: "Curio empowers teachers by automating the creation of educational content during live lectures. It listens to lecture speech, references pre-loaded textbook context, extracts key pedagogical concepts, and generates structured learning materials on the fly.",
      bullets: [
        "Real-time text & visual content generation.",
        "Adaptive lecture context understanding.",
        "Multi-modal classroom outputs (slides, mind maps).",
        "Instant test & quiz generation based on spoken points.",
      ],
      capabilities: [
        {
          iconName: "network",
          name: "Mind Maps",
          desc: "Visual concept maps from lecture context.",
        },
        { iconName: "brain", name: "Quizzes", desc: "Auto-generated assessment questions." },
        { iconName: "fileText", name: "Summaries", desc: "Concise key-point digests." },
        { iconName: "sparkles", name: "Flashcards", desc: "Interactive cards for review." },
        { iconName: "cpu", name: "Slides", desc: "Structure slides matching lecture flow." },
        { iconName: "list", name: "Worksheets", desc: "Printable worksheet exercises." },
      ],
    },
    problem:
      "Teachers spend an average of 10-15 hours a week manually drafting quizzes, summaries, and lesson materials, taking away crucial time from student mentorship. Existing static tools do not adapt to live class discussions.",
    solution:
      "Curio listens to live lectures, maps spoken words to a dense educational database using hybrid semantic search, and dynamically builds high-fidelity educational outputs, reducing prep time by 80%.",
    architecture: {
      text: "Curio operates as a multi-agent system built on LangGraph. An ingestion node handles speech-to-text streams, passing chunks to an analyzer agent. The analyzer performs semantic search in PostgreSQL (pgvector) to grab relevant reference context, and routes structural requests to secondary generation nodes.",
      mermaidDiagram: `graph TD
  A[Audio Stream Input] --> B[Whisper Speech-to-Text]
  B --> C[Orchestrator Agent - LangGraph]
  C --> D[pgvector Semantic Search]
  C --> E[Quiz Generator Node]
  C --> F[MindMap Generator Node]
  C --> G[Summary Generator Node]
  E & F & G --> H[Web Socket Output Stream]
  H --> I[React Frontend Dashboard]`,
    },
    challenges: [
      "Mitigating hallucination of historical and mathematical facts in front of students.",
      "Handling real-time web socket streaming latency over fluctuating school Wi-Fi networks.",
      "Ensuring clean speaker diarization in a noisy classroom setting.",
    ],
    lessons: [
      "Rigid evaluation sets (Ragas) are critical before updating active model prompts.",
      "Caching repetitive retrieval vectors at the local Redis layer saves up to 35% in API costs.",
      "Simple UI indicator overlays build student trust during brief text-generation delays.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Real-time Auditory Pipeline",
        desc: "WebSocket audio translation layers.",
        done: true,
      },
      {
        phase: "Phase 2",
        title: "Multi-Agent Refinement",
        desc: "Splitting slide creation and quiz creation agents.",
        done: true,
      },
      {
        phase: "Phase 3",
        title: "LMS Integrations",
        desc: "Syncing materials to Google Classroom and Canvas.",
        done: false,
      },
    ],
    related: ["ai-interviewer", "healthcare-rag"],
    metrics: [
      { value: "80%", label: "Reduction in prep time" },
      { value: "10K+", label: "Educational aids generated" },
      { value: "500+", label: "Teachers using Curio" },
      { value: "95%", label: "Satisfaction rate" },
    ],
  },
  {
    slug: "ai-interviewer",
    name: "AI Interviewer",
    domain: "HIRING AI",
    tagline: "Intelligent Interviews. Better Hiring.",
    description:
      "An AI-powered interviewer that conducts structured, adaptive, and unbiased interviews at scale. It responds to candidate answers dynamically, asks intelligent follow-ups, profiles coding competencies, and grades responses based on rubric constraints.",
    excerpt:
      "Conducting scalable, adaptive, and bias-free interviews with deep technical evaluations and visual logs.",
    techStack: ["LangChain", "OpenAI", "PostgreSQL", "FastAPI", "Next.js"],
    status: "Beta",
    users: "150+",
    launchDate: "Mar 2025",
    links: {
      live: "https://ai-interviewer.io",
      github: "https://github.com/UnbeatableBann/Susan-AI-Interviewer",
      caseStudy: "/blog/evaluating-interviewer",
    },
    overview: {
      text: "AI Interviewer conducts technical evaluations asynchronously. It replaces standard coding tests with a conversational, interactive system that acts like a human developer, testing boundary cases and asking candidate developers to justify their choices.",
      bullets: [
        "Dynamic question paths adapting to answers.",
        "Interactive syntax highlighting code editor.",
        "Automatic rubric grading & structural logs.",
        "Behavioral sentiment verification.",
      ],
      capabilities: [
        {
          iconName: "brain",
          name: "Dynamic Follow-ups",
          desc: "Asks candidates to explain complex code lines.",
        },
        {
          iconName: "cpu",
          name: "Sandbox Compiler",
          desc: "Validates code compilations dynamically.",
        },
        {
          iconName: "shield",
          name: "Proctoring Integrity",
          desc: "Verifies visual attention and tab focus.",
        },
        {
          iconName: "fileText",
          name: "Grading Rubric",
          desc: "Detailed breakdown of scoring points.",
        },
      ],
    },
    problem:
      "Technical recruiting teams waste hundreds of hours screening candidates who copy-paste solutions. Conversely, standard linear coding puzzles fail to capture true system engineering and problem-solving skills.",
    solution:
      "An adaptive interview agent that doesn't just look for correct syntax, but actively probes code efficiency, testing for edge cases and forcing candidate interaction to verify reasoning depth.",
    architecture: {
      text: "The system is built on LangChain with an Express/Next.js client-facing UI. A stateful execution graph manages query cycles. Code inputs are compiled in an isolated Docker container, returning console output directly back into the LLM context loop.",
      mermaidDiagram: `graph TD
  A[Candidate Answer Input] --> B[Docker Sandbox Execution]
  B --> C[Compiler Logs Output]
  C --> D[Eval Agent - LangChain]
  D --> E[Adaptive Next-Question Node]
  E --> F[Next Question Prompt]
  D --> G[Rubric Scoring Matrix]`,
    },
    challenges: [
      "Securing user-submitted code executions inside isolated, resource-capped sandboxes.",
      "Keeping follow-up prompts conversational while adhering strictly to rubric guidelines.",
      "Supporting low-latency audio inputs for conversational-style voice interviews.",
    ],
    lessons: [
      "Strict system-prompt guards are necessary to stop candidates jailbreaking the rubric scoring.",
      "Pre-compiling base code definitions reduces generation latencies by 1.2s.",
      "Interviews must be capped at 45 minutes to prevent LLM context-window decay.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Interactive Code Editor",
        desc: "Monaco Editor integration with sandbox loops.",
        done: true,
      },
      {
        phase: "Phase 2",
        title: "Speech Conversational Loop",
        desc: "Real-time speech-to-speech audio integrations.",
        done: true,
      },
      {
        phase: "Phase 3",
        title: "Team Rubric Designer",
        desc: "Allowing HR teams to customize their grading criteria.",
        done: false,
      },
    ],
    related: ["curio"],
    metrics: [
      { value: "75%", label: "Reduction in screening cycles" },
      { value: "2K+", label: "Interviews completed" },
      { value: "85%", label: "Candidate completion rate" },
      { value: "100%", label: "Unbiased score matching" },
    ],
  },
  {
    slug: "llm-evaluation-pipeline",
    name: "LLM Evaluation Pipeline",
    domain: "AI Engineering & Observability",
    tagline: "Deterministic LLM Observability & Evaluation",
    description:
      "A deterministic evaluation pipeline measuring relevance, completeness, hallucination, and latency on 150+ queries. Features modular loader-metrics-aggregator workflows, embedding caching, and local inference for 25% faster batch executions.",
    excerpt:
      "Testing and observing LLM outputs at scale with deterministic metrics and cached embedding semantic evaluation.",
    techStack: ["Python", "Sentence Transformers", "Redis", "Docker", "FastAPI"],
    status: "Production",
    launchDate: "Feb 2026",
    links: {
      github: "https://github.com/UnbeatableBann/LLM-Evaluation-Pipeline",
    },
    overview: {
      text: "The LLM Evaluation Pipeline establishes a rigorous, automated framework for validating language model responses. It runs batch test queries through custom validators to measure criteria like relevance, context completeness, and hallucination rates before deployment.",
      bullets: [
        "Automated batch validation on 150+ clinical/technical queries.",
        "Semantic similarity evaluations using Sentence Transformers.",
        "Local Redis embedding caching to reduce latency.",
        "Isolated multi-metric score reports (hallucination, completeness, etc.).",
      ],
      capabilities: [
        {
          iconName: "brain",
          name: "Hallucination Check",
          desc: "Verifies responses against retrieved sources.",
        },
        {
          iconName: "cpu",
          name: "Local Inference",
          desc: "Runs evaluations locally to bypass external API costs.",
        },
        {
          iconName: "database",
          name: "Embedding Cache",
          desc: "Saves redundant vectors in Redis memory.",
        },
        {
          iconName: "list",
          name: "Metrics Aggregation",
          desc: "Generates comprehensive quality score sheets.",
        },
      ],
    },
    problem:
      "Evaluating generative AI outputs is traditionally subjective and slow. Unstructured responses can introduce factual errors (hallucinations) and lag behind latency targets, with API costs scaling rapidly during testing.",
    solution:
      "A automated numerical optimizer that calculates correlation vectors, sizes positions dynamically based on volatility, and executes trades via the MT5 bridge.",
    architecture: {
      text: "An ingestion loader parses prompt templates and context files. Evaluator agents run evaluations via local embeddings and scoring formulas. All results are aggregated and stored, with performance logs visualised in real-time.",
      mermaidDiagram: `graph TD
  A[Test Queries Loader] --> B[FastAPI Orchestrator]
  B --> C[Evaluation Run Engine]
  C --> D[Sentence Transformers Semantic Eval]
  C --> E[Redis Vector Cache]
  C --> F[Latency & Quality Grader]
  D & E & F --> G[Metrics Aggregator]
  G --> H[Markdown/JSON Report Output]`,
    },
    challenges: [
      "Calibrating semantic threshold scores to align with human reviewer feedback.",
      "Optimizing multi-process task batches without overflowing memory.",
      "Caching overlapping vector query namespaces efficiently.",
    ],
    lessons: [
      "Re-ranking query results before calculating completeness reduces false negatives by 18%.",
      "Pre-fetching schema definitions inside Redis saves up to 40ms per query run.",
      "Splitting testing criteria into isolated, narrow tests is more reliable than using a single generic LLM grader.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Core Metrics Suite",
        desc: "Ingestion and validation logic.",
        done: true,
      },
      {
        phase: "Phase 2",
        title: "Local Embedding Cache",
        desc: "Redis and Sentence Transformer setup.",
        done: true,
      },
      {
        phase: "Phase 3",
        title: "UI Dashboard",
        desc: "Visual charts for tracking quality score drifts.",
        done: false,
      },
    ],
    related: ["curio", "ai-interviewer"],
    metrics: [
      { value: "25%", label: "Faster batch execution" },
      { value: "150+", label: "Query scenarios evaluated" },
      { value: "0ms", label: "Hallucination bypass check" },
      { value: "100%", label: "Deterministic consistency" },
    ],
  },
  {
    slug: "healthcare-rag",
    name: "Healthcare RAG",
    domain: "HEALTHCARE AI",
    tagline: "Ask. Retrieve. Understand.",
    description:
      "A domain-specific RAG system for healthcare professionals to query medical databases and get accurate, annotated, and fully cited answers from complex clinical documentation.",
    excerpt:
      "A highly cited, secure clinical search engine mapping medical documentation to structured answers.",
    techStack: ["Llama 3", "RAG", "Qdrant", "FastAPI", "Next.js"],
    status: "Research",
    launchDate: "Nov 2025",
    links: {
      github: "https://github.com/UnbeatableBann/Healthcare-RAG",
    },
    overview: {
      text: "Healthcare RAG parses massive corpuses of clinical research, drug interactions, and hospital guidelines. It maps medical queries to semantic data chunks and answers complex diagnostics questions, always citing medical papers.",
      bullets: [
        "Semantic matching on medical ontologies (UMLS).",
        "Hybrid sparse/dense vector query indexing.",
        "Automatic cross-reference paper citation maps.",
        "Full data isolation for HIPAA security guidelines.",
      ],
      capabilities: [
        {
          iconName: "database",
          name: "Hybrid Chunking",
          desc: "Splitting docs by semantic medical headers.",
        },
        {
          iconName: "shield",
          name: "PII Scrubbing",
          desc: "Scrubbing patient identity profiles dynamically.",
        },
        {
          iconName: "network",
          name: "Ontology Mapping",
          desc: "Synonym resolution using UMLS vocabularies.",
        },
        {
          iconName: "fileText",
          name: "Medical Citations",
          desc: "Clickable PDF reference attachments.",
        },
      ],
    },
    problem:
      "Medical practitioners waste crucial time hunting through disjointed EHRs, clinical guidelines, and research files. Generic models hallucinate drug interactions, presenting extreme clinical risks.",
    solution:
      "A medical search system utilizing hybrid sparse-dense embedding models. It aligns query vectors with clinical knowledge nodes in Qdrant, providing answers that are 100% cited back to reference documents.",
    architecture: {
      text: "A FastAPI server receives queries, translates acronyms via a UMLS parser, and executes a hybrid search on Qdrant. Retrieved contexts are fed to an insulated Llama-3 model alongside system instructions enforcing citation formats.",
      mermaidDiagram: `graph TD
  A[Practitioner Query] --> B[UMLS Ontology Expansion]
  B --> C[Qdrant Hybrid Vector Search]
  C --> D[PII Validation Guardrail]
  D --> E[Llama 3 Clinical LLM]
  E --> F[Citations & Source Formatting]
  F --> G[Practitioner Response]`,
    },
    challenges: [
      "Eliminating medical classification hallucinations completely.",
      "Mapping informal medical abbreviations (e.g. 'SOB' -> Shortness of breath) cleanly.",
      "Indexing complex tables inside clinical PDF manuals.",
    ],
    lessons: [
      "Cross-encoder re-ranking is mandatory to select accurate diagnostic snippets.",
      "Excluding non-medical terms from embedding indexes improves semantic matching by 40%.",
      "Explicitly stating 'unsupported context' prevents models guessing dangerous answers.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Ontology Parser",
        desc: "Integrating UMLS term-matching loops.",
        done: true,
      },
      {
        phase: "Phase 2",
        title: "Qdrant Database",
        desc: "Setting up dense/sparse hybrid ingestion.",
        done: true,
      },
      {
        phase: "Phase 3",
        title: "Multi-PDF Uploads",
        desc: "Allowing users to upload entire medical folders.",
        done: false,
      },
    ],
    related: ["curio"],
    metrics: [
      { value: "0%", label: "Permitted Hallucination Rate" },
      { value: "98%", label: "Citation matching accuracy" },
      { value: "1.8s", label: "Diagnostic query latency" },
      { value: "100%", label: "HIPAA structural compliance" },
    ],
  },
  {
    slug: "mt5-infrastructure",
    name: "MT5 Infrastructure",
    domain: "TRADING SYSTEMS",
    tagline: "High-Frequency Bridge for Quantitative Trading",
    description:
      "A low-latency infrastructure connecting quantitative Python trading pipelines to MetaTrader 5 terminals, featuring memory-mapped IPC, automatic order routing, and failover management.",
    excerpt:
      "Low-latency market bridge connecting Python research pipelines to MetaTrader 5 execution terminals.",
    techStack: ["C++", "Python", "MT5 API", "Redis", "Docker"],
    status: "Production",
    launchDate: "Sep 2025",
    links: {
      github: "https://github.com/UnbeatableBann/MT5-Bridge",
    },
    overview: {
      text: "MT5 Infrastructure provides a fast, resilient bridge for algorithmic execution. It routes orders from Python decision containers into the MetaTrader terminal in microseconds, maintaining detailed logs of price data and system health.",
      bullets: [
        "Memory-mapped files for low-latency IPC.",
        "Automatic connection retry and socket loops.",
        "Detailed price logs and execution logging.",
        "Full Docker sandbox for isolated backtesting.",
      ],
      capabilities: [
        { iconName: "cpu", name: "Low-Latency IPC", desc: "Passing signals via shared memory." },
        {
          iconName: "database",
          name: "Tick Logging",
          desc: "Logging price changes inside Redis arrays.",
        },
        {
          iconName: "shield",
          name: "Risk Guardrails",
          desc: "Immediate order cancelation on connection loss.",
        },
        {
          iconName: "network",
          name: "Multi-Terminal",
          desc: "Handling orders across multiple terminals.",
        },
      ],
    },
    problem:
      "Standard quantitative trading setups suffer from high latency and disconnected interfaces. Standard socket protocols add milliseconds of execution slippage, leading to poor fills.",
    solution:
      "A C++ execution wrapper linked to Python via shared memory channels, delivering orders to MT5 within 800 microseconds and monitoring real-time price changes.",
    architecture: {
      text: "The infrastructure utilizes Python for research and signals, passing order data through C++ structures mapped to memory files. These memory channels link directly to MetaTrader 5 DLL layers, bypassing network stacks.",
      mermaidDiagram: `graph TD
  A[Python Signal Generator] --> B[Shared Memory IPC]
  B --> C[C++ Execution Wrapper]
  C --> D[MetaTrader 5 API DLL]
  D --> E[MT5 Broker Terminal]
  E --> F[Market Executions]`,
    },
    challenges: [
      "Eliminating memory leaks under rapid price tick streams (100 ticks/sec).",
      "Handling connection disconnects without leaving open, unmanaged risk.",
      "Synchronizing server times with broker execution timestamps.",
    ],
    lessons: [
      "Memory mapping is 12x faster than TCP sockets for local script messaging.",
      "Keeping order execution status stateless allows faster recovery from socket drops.",
      "Explicitly monitoring thread lock metrics prevents deadlock conditions during trading hours.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "C++ Wrapper DLL",
        desc: "Shared memory channel structures.",
        done: true,
      },
      {
        phase: "Phase 2",
        title: "Redis Tick Store",
        desc: "Real-time pricing data capture.",
        done: true,
      },
      { phase: "Phase 3", title: "Risk Engine", desc: "Auto-hedge order modules.", done: false },
    ],
    related: ["quantix"],
    metrics: [
      { value: "800μs", label: "Order Routing Latency" },
      { value: "0.01%", label: "Trade slippage rate" },
      { value: "99.99%", label: "System uptime" },
      { value: "10M+", label: "Market price logs recorded" },
    ],
  },
  {
    slug: "quantix",
    name: "Quantix",
    domain: "TRADING SYSTEMS",
    tagline: "Statistical Arbitrage & Portfolio Optimizer",
    description:
      "An algorithmic trading module that scans multiple asset markets for statistical price discrepancies, optimizes weights using mean-variance analysis, and places trade signals.",
    excerpt:
      "Algorithmic statistical arbitrage scanner and automated mean-variance portfolio model.",
    techStack: ["Python", "NumPy", "Pandas", "Scipy", "Redis"],
    status: "Beta",
    launchDate: "Dec 2025",
    links: {
      github: "https://github.com/UnbeatableBann/Quantix",
    },
    overview: {
      text: "Quantix executes automated statistical trading. It calculates cointegration vectors across historical assets, calculates risk metrics, and uses numerical optimization to construct portfolios that maximize Sharpe ratios.",
      bullets: [
        "Real-time asset cointegration scanning.",
        "Dynamic mean-variance portfolio sizing.",
        "Automated stop-loss risk management.",
        "Historical backtesting report runner.",
      ],
      capabilities: [
        {
          iconName: "brain",
          name: "Cointegration",
          desc: "Finding historical price-spread relationships.",
        },
        { iconName: "cpu", name: "Optimizer Engine", desc: "Sizing trades using Scipy solvers." },
        {
          iconName: "shield",
          name: "Drawdown Guard",
          desc: "Auto-reducing capital size on high volatility.",
        },
        { iconName: "database", name: "Metrics Logger", desc: "Saving daily performance vectors." },
      ],
    },
    problem:
      "Scoping statistical opportunities across thousands of asset pairs manually is impossible. Standard static portfolios suffer from large drawdowns during volatile structural market shifts.",
    solution:
      "A automated numerical optimizer that calculates correlation vectors, sizes positions dynamically based on volatility, and executes trades via the MT5 bridge.",
    architecture: {
      text: "Quantix executes on a scheduled loop. It pulls prices from Redis, runs correlation tests using NumPy, feeds metrics to Scipy optimization pipelines, and pushes signals into execution vectors.",
      mermaidDiagram: `graph TD
  A[Redis Price Data] --> B[Cointegration Engine]
  B --> C[Portfolio Optimizer]
  C --> D[Risk Check Module]
  D --> E[Trade Signals Output]
  E --> F[MT5 Infrastructure Bridge]`,
    },
    challenges: [
      "Controlling transaction costs which can eat arbitrage profits.",
      "Solving convergence failures in Scipy optimization routines.",
      "Mitigating correlation decay during volatile structural shifts.",
    ],
    lessons: [
      "Including transaction costs directly in the solver prevents it sizing micro-trades.",
      "Dynamic rolling lookbacks track market changes better than static data frames.",
      "Scaling risk exposure relative to correlation metrics preserves capital.",
    ],
    roadmap: [
      {
        phase: "Phase 1",
        title: "Pair Scanner",
        desc: "Numerical cointegration tests.",
        done: true,
      },
      {
        phase: "Phase 2",
        title: "Sharpe Optimizer",
        desc: "Scipy mean-variance execution.",
        done: true,
      },
      {
        phase: "Phase 3",
        title: "Multi-Asset Engine",
        desc: "Extending models to futures and crypto.",
        done: false,
      },
    ],
    related: ["mt5-infrastructure"],
    metrics: [
      { value: "120+", label: "Asset pairs tracked" },
      { value: "2.4", label: "Backtested Sharpe Ratio" },
      { value: "12%", label: "Maximum Peak Drawdown" },
      { value: "100%", label: "Automated risk validation" },
    ],
  },
];
