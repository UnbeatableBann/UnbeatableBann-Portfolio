import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Terminal,
  Database,
  Code,
  Cpu,
  Layers,
  GitBranch,
  Binary,
  Workflow,
  X,
  Sparkles,
  Globe,
  Activity,
  FileText,
} from "lucide-react";

interface SkillNode {
  id: string;
  label: string;
  category: "center" | "ai" | "programming" | "ml" | "backend" | "infrastructure" | "languages";
  size: "large" | "medium" | "small";
  level: string;
  experience: string;
  usedIn: string[];
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  logo?: string; // Slugs for cdn.simpleicons.org
  pinned?: boolean;
  // Physics properties
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface SkillLink {
  source: string;
  target: string;
}

const SKILL_NODES: SkillNode[] = [
  // Central Node
  {
    id: "ai-engineer",
    label: "AI Engineer",
    category: "center",
    size: "large",
    level: "Core Role",
    experience: "3+ Years",
    usedIn: ["Curio", "AI Interviewer"],
    description: "Architecting intelligent systems by combining generative AI, agent workflows, and backend services.",
    icon: Sparkles,
    x: 1200, y: 700, vx: 0, vy: 0,
  },
  // Level 1: Categories
  {
    id: "ai",
    label: "Artificial Intelligence",
    category: "ai",
    size: "large",
    level: "Expert",
    experience: "2+ Years",
    usedIn: ["Curio - AI Co-Teacher", "AI Interviewer Platform"],
    description: "Designing agentic orchestrations, retrieval pipelines, and building GenAI applications.",
    icon: Bot,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "ml",
    label: "Machine Learning",
    category: "ml",
    size: "large",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara", "Planto AI Solutions"],
    description: "Training neural architectures, data profiling, and NLP models to capture patterns.",
    icon: Cpu,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "programming",
    label: "Programming Languages",
    category: "programming",
    size: "large",
    level: "Core Strength",
    experience: "4 Years",
    usedIn: ["All Projects"],
    description: "Writing robust code using high-level scripting languages and low-level system design languages.",
    icon: Code,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "backend",
    label: "Backend Engineering",
    category: "backend",
    size: "large",
    level: "Expert",
    experience: "2+ Years",
    usedIn: ["AI Interviewer Platform", "Algorithmic Trading SDK"],
    description: "Building scalable API architectures, authentication patterns, and database layers.",
    icon: Terminal,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    category: "infrastructure",
    size: "large",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["All Projects"],
    description: "Deploying applications, configuring container runtimes, version control, and CI/CD pipelines.",
    icon: Layers,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "languages",
    label: "Languages",
    category: "languages",
    size: "large",
    level: "Fluent",
    experience: "Bilingual",
    usedIn: ["Communication"],
    description: "Professional written and verbal communication languages.",
    icon: Globe,
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Level 2: Sub-domains
  // Under AI
  {
    id: "llm-applications",
    label: "LLM Applications",
    category: "ai",
    size: "medium",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Curio - AI Co-Teacher"],
    description: "Integrating LLMs into applications using APIs, prompt templates, and structured outputs.",
    icon: Cpu,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "closed-llms",
    label: "Closed LLMs",
    category: "ai",
    size: "medium",
    level: "Advanced",
    experience: "Integration",
    usedIn: ["Curio", "AI Interviewer"],
    description: "Working with commercial frontier models from OpenAI, Google, and Anthropic.",
    icon: Bot,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "open-llms",
    label: "Open LLMs",
    category: "ai",
    size: "medium",
    level: "Intermediate",
    experience: "Self-Hosting",
    usedIn: ["Local LLM Pipeline"],
    description: "Self-hosting and prompt-tuning open source weights for custom application domains.",
    icon: Cpu,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "rag-systems",
    label: "RAG Systems",
    category: "ai",
    size: "medium",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["LLM Evaluation Pipeline", "Curio"],
    description: "Building retrieval-augmented generation pipelines to supply external knowledge to LLMs.",
    icon: Layers,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "vector-databases",
    label: "Vector Databases",
    category: "ai",
    size: "medium",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["LLM Evaluation Pipeline"],
    description: "Storing, indexing, and querying semantic embeddings for RAG pipelines.",
    icon: Database,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "agentic-ai",
    label: "Agentic AI",
    category: "ai",
    size: "medium",
    level: "Expert",
    experience: "2 Years",
    usedIn: ["Curio - AI Co-Teacher", "AI Interviewer Platform"],
    description: "Designing autonomous, cyclical reasoning loops and task executors utilizing LLMs.",
    icon: Bot,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under ML
  {
    id: "core-areas-ml",
    label: "Core Areas",
    category: "ml",
    size: "medium",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara", "Planto AI Solutions"],
    description: "Core concepts of supervised models, deep learning, NLP, and features extraction.",
    icon: Cpu,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "frameworks-ml",
    label: "Frameworks",
    category: "ml",
    size: "medium",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara", "Planto AI"],
    description: "Proficient in frameworks supporting feature modeling and neural graph computations.",
    icon: Layers,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under Backend
  {
    id: "core-areas-backend",
    label: "Core Areas",
    category: "backend",
    size: "medium",
    level: "Expert",
    experience: "2 Years+",
    usedIn: ["AI Interviewer Platform", "Algorithmic Trading SDK"],
    description: "Developing robust APIs, handling authorization schemes, and concurrent processing.",
    icon: Terminal,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "databases-backend",
    label: "Databases",
    category: "backend",
    size: "medium",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Algorithmic Trading SDK", "AI Interviewer Platform"],
    description: "Proficient in relational databases, lightweight SQL engines, and fast caching stores.",
    icon: Database,
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Level 3: Tools & Skills
  // Under Closed LLMs
  {
    id: "openai",
    label: "OpenAI",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Curio", "AI Interviewer"],
    description: "GPT-4o API integration, tool calls, JSON mode, and assistants framework.",
    icon: Bot,
    logo: "openai",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "gemini",
    label: "Gemini",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Curio - AI Co-Teacher"],
    description: "Utilizing Gemini Pro, Flash, multimodal tokens, and low-latency voice endpoints.",
    icon: Sparkles,
    logo: "googlegemini",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "claude",
    label: "Claude",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Curio"],
    description: "Leveraging Claude 3.5 Sonnet for advanced reasoning, code generation, and long-context analysis.",
    icon: Bot,
    logo: "anthropic",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under Open LLMs
  {
    id: "mistral",
    label: "Mistral",
    category: "ai",
    size: "small",
    level: "Intermediate",
    experience: "1+ Year",
    usedIn: ["Local Pipeline"],
    description: "Deploying Mistral-7B and Mixtral models for cost-efficient local workflows.",
    icon: Cpu,
    logo: "mistral",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "ollama",
    label: "Ollama",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["Local Pipeline", "LLM Eval"],
    description: "Managing local LLM runtimes, custom Modelfiles, and embedding configurations.",
    icon: Terminal,
    logo: "ollama",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "llama",
    label: "Llama",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["Local Pipeline"],
    description: "Deploying and prompt-engineering Llama 3 models for specialized local extraction tasks.",
    icon: Cpu,
    logo: "meta",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under Vector Databases
  {
    id: "pinecone",
    label: "Pinecone",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["LLM Evaluation Pipeline"],
    description: "Deploying cloud vector indexes, hybrid search, and managing metadata filtering namespaces.",
    icon: Database,
    logo: "pinecone",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "faiss",
    label: "FAISS",
    category: "ai",
    size: "small",
    level: "Intermediate",
    experience: "1+ Year",
    usedIn: ["Local Search Index"],
    description: "Using Facebook AI Similarity Search for high-performance in-memory vector searches.",
    icon: Binary,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "qdrant",
    label: "Qdrant",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["LLM Evaluation Pipeline"],
    description: "Implementing Qdrant vector search engine with strict payload filters and high throughput.",
    icon: Database,
    logo: "qdrant",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under RAG Systems (directly)
  {
    id: "multi-agent-rag",
    label: "Multi-Agent RAG",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1+ Year",
    usedIn: ["Curio"],
    description: "Coordinating multiple specialised RAG agents that evaluate and retrieve chunks dynamically.",
    icon: Workflow,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "rag-eval",
    label: "RAG Evaluation",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1+ Year",
    usedIn: ["LLM Evaluation Pipeline"],
    description: "Measuring retrieval relevance, context precision, completeness, and faithfulness.",
    icon: FileText,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under Agentic AI
  {
    id: "langgraph",
    label: "LangGraph",
    category: "ai",
    size: "small",
    level: "Expert",
    experience: "1.5 Years",
    usedIn: ["Curio - AI Co-Teacher"],
    description: "Stateful, multi-agent orchestrations with robust node transitions and human-in-the-loop triggers.",
    icon: Workflow,
    logo: "langchain",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "langchain",
    label: "LangChain",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Curio", "AI Interviewer"],
    description: "Constructing prompt templates, parser chains, document loaders, and memory providers.",
    icon: Workflow,
    logo: "langchain",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "mcp",
    label: "MCP",
    category: "ai",
    size: "small",
    level: "Intermediate",
    experience: "6 Months",
    usedIn: ["Tool Integrations"],
    description: "Integrating Model Context Protocol to bridge models with database schemas and terminal APIs.",
    icon: Binary,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "multi-agent-systems",
    label: "Multi-Agent Systems",
    category: "ai",
    size: "small",
    level: "Expert",
    experience: "1.5 Years",
    usedIn: ["Curio - AI Co-Teacher"],
    description: "Designing supervisor-worker agent architectures with shared memory and task delegation loops.",
    icon: Bot,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under AI Category directly (Other Skills)
  {
    id: "prompt-eng",
    label: "Prompt Engineering",
    category: "ai",
    size: "small",
    level: "Expert",
    experience: "2 Years",
    usedIn: ["All AI Projects"],
    description: "Crafting structured few-shot prompts, chain-of-thought instructions, and guarding against injection.",
    icon: Activity,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "llm-eval",
    label: "LLM Evaluation",
    category: "ai",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["LLM Evaluation Pipeline"],
    description: "Measuring latency, coherence, hallucinations, and safety boundaries across models.",
    icon: FileText,
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Under Programming Languages
  {
    id: "python",
    label: "Python",
    category: "programming",
    size: "small",
    level: "Expert",
    experience: "4 Years",
    usedIn: ["Algorithmic Trading SDK", "LLM Evaluation Pipeline"],
    description: "Primary backend, data analysis, and AI development language. Proficient in OOP and testing.",
    icon: Code,
    logo: "python",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "c-lang",
    label: "C",
    category: "programming",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Academic Projects"],
    description: "Writing optimized procedural code, low-level pointer management, and basic hardware calls.",
    icon: Binary,
    logo: "c",
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Under ML Core Areas
  {
    id: "supervised-learning",
    label: "Supervised Learning",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Academic Projects"],
    description: "Building linear models, regression, tree classifiers, and support vector machines.",
    icon: Cpu,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "deep-learning",
    label: "Deep Learning",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara - ISL Recognition"],
    description: "Designing LSTM networks, CNNs, and dense neural maps for multi-class predictions.",
    icon: Cpu,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "nlp",
    label: "NLP",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara", "AI Interviewer"],
    description: "Sequence models, bag-of-words, TF-IDF, tokenization, embeddings, and parsing.",
    icon: Binary,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "model-eval-ml",
    label: "Model Evaluation",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara"],
    description: "Analyzing confusion matrices, precision-recall thresholds, F1-scores, and cross-validation.",
    icon: FileText,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "feature-engineering",
    label: "Feature Engineering",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Ishara"],
    description: "Normalizing data distributions, vectorizing raw features, and applying dimensionality reduction.",
    icon: Activity,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under ML Frameworks
  {
    id: "scikit-learn",
    label: "Scikit-Learn",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Academic Projects"],
    description: "Implementing pipelines, regression algorithms, ensemble trees, and clustering setups.",
    icon: Cpu,
    logo: "scikitlearn",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "tensorflow",
    label: "TensorFlow",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["Ishara - ISL Recognition"],
    description: "Using Keras, training sequential models, saving H5 weights, and managing GPU allocations.",
    icon: Cpu,
    logo: "tensorflow",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "pytorch",
    label: "PyTorch",
    category: "ml",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["Research Projects"],
    description: "Defining custom model subclasses, backward passes, and tensors configurations.",
    icon: Cpu,
    logo: "pytorch",
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Under Backend Core Areas
  {
    id: "django",
    label: "Django",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "1 Year",
    usedIn: ["E-commerce App"],
    description: "Designing database models, implementing the admin interface, and setting up class-based views.",
    icon: Terminal,
    logo: "django",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "fastapi",
    label: "FastAPI",
    category: "backend",
    size: "small",
    level: "Expert",
    experience: "2 Years",
    usedIn: ["AI Interviewer Platform"],
    description: "High-performance endpoint designs, WebSockets for real-time streaming, and background tasks execution.",
    icon: Terminal,
    logo: "fastapi",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "api-design",
    label: "API Design",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Algorithmic Trading SDK", "AI Interviewer Platform"],
    description: "Designing REST endpoints, request/response models in Pydantic, and adapter abstractions.",
    icon: Workflow,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "authentication",
    label: "Authentication",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["AI Interviewer Platform"],
    description: "Implementing role-based access controls (RBAC) and OAuth2 security patterns with JWT tokens.",
    icon: Code,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "async-programming",
    label: "Async Programming",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["AI Interviewer Platform", "Algorithmic Trading SDK"],
    description: "Writing non-blocking event loops with asyncio, supporting concurrent network requests.",
    icon: Terminal,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "database-design",
    label: "Database Design",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Algorithmic Trading SDK"],
    description: "Defining database schemas, foreign keys, constraints, indexes, and normalization strategies.",
    icon: Database,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  // Under Backend Databases
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["AI Interviewer Platform"],
    description: "Query writing, using connection pools, and utilizing JSONB columns for semi-structured records.",
    icon: Database,
    logo: "postgresql",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "sqlite",
    label: "SQLite",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["Algorithmic Trading SDK"],
    description: "Writing custom instrument ingestion tasks, indexing columns, and normalizing payloads in lightweight DBs.",
    icon: Database,
    logo: "sqlite",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "redis",
    label: "Redis",
    category: "backend",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["AI Interviewer Platform"],
    description: "Implementing task queues, pub/sub communication, session caching, and rate limit counters.",
    icon: Database,
    logo: "redis",
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Under Infrastructure
  {
    id: "docker",
    label: "Docker",
    category: "infrastructure",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["AI Interviewer Platform"],
    description: "Building production Dockerfiles, docker-compose multi-container services, and optimizing images.",
    icon: Layers,
    logo: "docker",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "git",
    label: "Git",
    category: "infrastructure",
    size: "small",
    level: "Expert",
    experience: "4 Years",
    usedIn: ["All Projects"],
    description: "Advanced branching workflows, resolving conflicts, rebase procedures, and commit sanity checks.",
    icon: GitBranch,
    logo: "git",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "github-actions",
    label: "GitHub Actions",
    category: "infrastructure",
    size: "small",
    level: "Advanced",
    experience: "1.5 Years",
    usedIn: ["CI/CD setups"],
    description: "Automating validation tasks, testing workflows, and configuring code analysis steps on pull requests.",
    icon: GitBranch,
    logo: "githubactions",
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "cicd",
    label: "CI/CD",
    category: "infrastructure",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["All Projects"],
    description: "Configuring automated test-build-deploy loops to ensure delivery of valid software releases.",
    icon: Workflow,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "deployment",
    label: "Deployment",
    category: "infrastructure",
    size: "small",
    level: "Advanced",
    experience: "2 Years",
    usedIn: ["All Projects"],
    description: "Deploying services on cloud platforms, configuring environment parameters and port forwards.",
    icon: Layers,
    x: 0, y: 0, vx: 0, vy: 0,
  },

  // Under Languages
  {
    id: "english",
    label: "English",
    category: "languages",
    size: "small",
    level: "Fluent",
    experience: "Native/Bilingual",
    usedIn: ["Documentation", "SDK package"],
    description: "Primary language for professional writing, technical docs, and international cooperation.",
    icon: Globe,
    x: 0, y: 0, vx: 0, vy: 0,
  },
  {
    id: "hindi",
    label: "Hindi",
    category: "languages",
    size: "small",
    level: "Fluent",
    experience: "Native",
    usedIn: ["Communication"],
    description: "Native verbal and written communication proficiency.",
    icon: Globe,
    x: 0, y: 0, vx: 0, vy: 0,
  },
];

const SKILL_LINKS: SkillLink[] = [
  // AI Engineer connects to category roots
  { source: "ai-engineer", target: "ai" },
  { source: "ai-engineer", target: "ml" },
  { source: "ai-engineer", target: "programming" },
  { source: "ai-engineer", target: "backend" },
  { source: "ai-engineer", target: "infrastructure" },
  { source: "ai-engineer", target: "languages" },

  // AI Category connects to sub-domains
  { source: "ai", target: "llm-applications" },
  { source: "ai", target: "rag-systems" },
  { source: "ai", target: "agentic-ai" },
  { source: "ai", target: "prompt-eng" },
  { source: "ai", target: "llm-eval" },

  // LLM Applications connects to Closed/Open LLMs sub-domains
  { source: "llm-applications", target: "closed-llms" },
  { source: "llm-applications", target: "open-llms" },

  // Closed/Open LLMs connect to tools
  { source: "closed-llms", target: "openai" },
  { source: "closed-llms", target: "gemini" },
  { source: "closed-llms", target: "claude" },
  { source: "open-llms", target: "mistral" },
  { source: "open-llms", target: "ollama" },
  { source: "open-llms", target: "llama" },

  // RAG Systems connects to Vector Databases sub-domain and direct tools
  { source: "rag-systems", target: "vector-databases" },
  { source: "rag-systems", target: "multi-agent-rag" },
  { source: "rag-systems", target: "rag-eval" },

  // Vector Databases connects to tools
  { source: "vector-databases", target: "pinecone" },
  { source: "vector-databases", target: "faiss" },
  { source: "vector-databases", target: "qdrant" },

  // Agentic AI connects to tools
  { source: "agentic-ai", target: "langgraph" },
  { source: "agentic-ai", target: "langchain" },
  { source: "agentic-ai", target: "mcp" },
  { source: "agentic-ai", target: "multi-agent-systems" },

  // Programming Languages connects to tools
  { source: "programming", target: "python" },
  { source: "programming", target: "c-lang" },

  // ML connects to sub-domains
  { source: "ml", target: "core-areas-ml" },
  { source: "ml", target: "frameworks-ml" },

  // ML Core Areas connects to tools
  { source: "core-areas-ml", target: "supervised-learning" },
  { source: "core-areas-ml", target: "deep-learning" },
  { source: "core-areas-ml", target: "nlp" },
  { source: "core-areas-ml", target: "model-eval-ml" },
  { source: "core-areas-ml", target: "feature-engineering" },

  // ML Frameworks connects to tools
  { source: "frameworks-ml", target: "scikit-learn" },
  { source: "frameworks-ml", target: "tensorflow" },
  { source: "frameworks-ml", target: "pytorch" },

  // Backend connects to sub-domains
  { source: "backend", target: "core-areas-backend" },
  { source: "backend", target: "databases-backend" },

  // Backend Core Areas connects to tools
  { source: "core-areas-backend", target: "django" },
  { source: "core-areas-backend", target: "fastapi" },
  { source: "core-areas-backend", target: "api-design" },
  { source: "core-areas-backend", target: "authentication" },
  { source: "core-areas-backend", target: "async-programming" },
  { source: "core-areas-backend", target: "database-design" },

  // Backend Databases connects to tools
  { source: "databases-backend", target: "postgresql" },
  { source: "databases-backend", target: "sqlite" },
  { source: "databases-backend", target: "redis" },

  // Infrastructure connects to tools
  { source: "infrastructure", target: "docker" },
  { source: "infrastructure", target: "git" },
  { source: "infrastructure", target: "github-actions" },
  { source: "infrastructure", target: "cicd" },
  { source: "infrastructure", target: "deployment" },

  // Languages connects to tools
  { source: "languages", target: "english" },
  { source: "languages", target: "hindi" },
];

const PARENT_MAP: Record<string, string> = {
  // Category roots
  "ai": "ai-engineer",
  "ml": "ai-engineer",
  "programming": "ai-engineer",
  "backend": "ai-engineer",
  "infrastructure": "ai-engineer",
  "languages": "ai-engineer",

  // AI Sub-domains
  "llm-applications": "ai",
  "rag-systems": "ai",
  "agentic-ai": "ai",
  "prompt-eng": "ai",
  "llm-eval": "ai",

  // LLM Apps sub-domains
  "closed-llms": "llm-applications",
  "open-llms": "llm-applications",

  // Closed/Open LLMs tools
  "openai": "closed-llms",
  "gemini": "closed-llms",
  "claude": "closed-llms",
  "mistral": "open-llms",
  "ollama": "open-llms",
  "llama": "open-llms",

  // RAG systems sub-domains & tools
  "vector-databases": "rag-systems",
  "pinecone": "vector-databases",
  "faiss": "vector-databases",
  "qdrant": "vector-databases",
  "multi-agent-rag": "rag-systems",
  "rag-eval": "rag-systems",

  // Agentic AI tools
  "langgraph": "agentic-ai",
  "langchain": "agentic-ai",
  "mcp": "agentic-ai",
  "multi-agent-systems": "agentic-ai",

  // Programming tools
  "python": "programming",
  "c-lang": "programming",

  // ML Sub-domains
  "core-areas-ml": "ml",
  "frameworks-ml": "ml",

  // ML Core tools
  "supervised-learning": "core-areas-ml",
  "deep-learning": "core-areas-ml",
  "nlp": "core-areas-ml",
  "model-eval-ml": "core-areas-ml",
  "feature-engineering": "core-areas-ml",

  // ML Frameworks tools
  "scikit-learn": "frameworks-ml",
  "tensorflow": "frameworks-ml",
  "pytorch": "frameworks-ml",

  // Backend Sub-domains
  "core-areas-backend": "backend",
  "databases-backend": "backend",

  // Backend Core tools
  "django": "core-areas-backend",
  "fastapi": "core-areas-backend",
  "api-design": "core-areas-backend",
  "authentication": "core-areas-backend",
  "async-programming": "core-areas-backend",
  "database-design": "core-areas-backend",

  // Backend Databases tools
  "postgresql": "databases-backend",
  "sqlite": "databases-backend",
  "redis": "databases-backend",

  // Infrastructure tools
  "docker": "infrastructure",
  "git": "infrastructure",
  "github-actions": "infrastructure",
  "cicd": "infrastructure",
  "deployment": "infrastructure",

  // Languages tools
  "english": "languages",
  "hindi": "languages",
};

const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  center: "Core Role",
  ai: "Artificial Intelligence",
  programming: "Programming Languages",
  ml: "Machine Learning",
  backend: "Backend Engineering",
  infrastructure: "Infrastructure",
  languages: "Languages",
};

const centers: Record<string, { x: number; y: number }> = {
  center: { x: 1200, y: 700 },
  ai: { x: 700, y: 400 },
  programming: { x: 700, y: 700 },
  ml: { x: 1700, y: 700 },
  backend: { x: 800, y: 1000 },
  infrastructure: { x: 1200, y: 250 },
  languages: { x: 1600, y: 1000 },
};

const SIBLING_ORDERING: Record<string, string[]> = {
  ai: ["prompt-eng", "agentic-ai", "llm-applications", "rag-systems", "llm-eval"],
};

const getDeterministicTargetCoords = (nodeId: string, allNodes: SkillNode[]): { x: number; y: number } => {
  const center = { x: 1200, y: 700 };

  if (nodeId === "ai-engineer") return center;

  const categoryAngles: Record<string, number> = {
    infrastructure: -Math.PI / 2,      // -90 deg
    ml: -Math.PI / 6,                  // -30 deg
    languages: Math.PI / 6,            // 30 deg
    backend: Math.PI / 2,              // 90 deg
    programming: 5 * Math.PI / 6,      // 150 deg
    ai: -5 * Math.PI / 6,              // -150 deg
  };

  if (nodeId in categoryAngles) {
    const angle = categoryAngles[nodeId];
    return {
      x: center.x + 400 * Math.cos(angle),
      y: center.y + 400 * Math.sin(angle),
    };
  }

  const parentId = PARENT_MAP[nodeId];
  if (!parentId) return center;

  // Recurse to find parent's coordinate
  const parentTarget = getDeterministicTargetCoords(parentId, allNodes);

  // Get siblings sorted stably, respecting custom order if defined
  const siblings = allNodes
    .filter((n) => PARENT_MAP[n.id] === parentId)
    .map((n) => n.id);

  const customOrder = SIBLING_ORDERING[parentId];
  if (customOrder) {
    siblings.sort((a, b) => {
      const idxA = customOrder.indexOf(a);
      const idxB = customOrder.indexOf(b);
      const valA = idxA !== -1 ? idxA : 999;
      const valB = idxB !== -1 ? idxB : 999;
      return valA - valB;
    });
  } else {
    siblings.sort();
  }

  const siblingIndex = siblings.indexOf(nodeId);
  const numSiblings = siblings.length;

  // Calculate the angle of the parent from the central node
  const parentAngle = Math.atan2(parentTarget.y - center.y, parentTarget.x - center.x);

  // Determine spacing and arc spread based on size/level
  let dist = 160; // Default distance for tools
  let arc = (65 * Math.PI) / 180; // 65 degrees default for tools

  if (parentId === "ai") {
    arc = (75 * Math.PI) / 180;
    dist = 260;
  } else if (parentId === "infrastructure") {
    arc = (70 * Math.PI) / 180;
    dist = 250;
  } else if (parentId === "ml" || parentId === "backend") {
    arc = (55 * Math.PI) / 180;
    dist = 250;
  } else if (parentId === "programming" || parentId === "languages") {
    arc = (60 * Math.PI) / 180;
    dist = 220;
  } else if (parentId === "llm-applications") {
    arc = (65 * Math.PI) / 180;
    dist = 190;
  } else if (parentId === "rag-systems") {
    arc = (70 * Math.PI) / 180;
    dist = 190;
  } else if (parentId === "agentic-ai") {
    arc = (75 * Math.PI) / 180;
    dist = 180;
  } else if (parentId === "core-areas-ml") {
    arc = (75 * Math.PI) / 180;
    dist = 180;
  } else if (parentId === "core-areas-backend") {
    arc = (80 * Math.PI) / 180;
    dist = 180;
  }

  const startAngle = parentAngle - arc / 2;
  const angleStep = numSiblings > 1 ? arc / (numSiblings - 1) : 0;
  const nodeAngle = startAngle + siblingIndex * angleStep;

  return {
    x: parentTarget.x + dist * Math.cos(nodeAngle),
    y: parentTarget.y + dist * Math.sin(nodeAngle),
  };
};

const getNodeRadius = (size: "large" | "medium" | "small", id: string) => {
  if (id === "ai-engineer") return 55;
  if (size === "large") return 45;
  if (size === "medium") return 32;
  return 25;
};

const getIconConfig = (size: "large" | "medium" | "small") => {
  if (size === "large") return { size: 24, offset: -12 };
  if (size === "medium") return { size: 16, offset: -8 };
  return { size: 11, offset: -5.5 };
};

const hasChildren = (nodeId: string) => {
  return SKILL_LINKS.some((link) => link.source === nodeId);
};

const renderWrappedText = (label: string, fontSizeClass: string, dyStart: number, textColor: string) => {
  const words = label.split(" ");
  if (words.length === 1) {
    return (
      <text y={dyStart + 3} textAnchor="middle" fill={textColor} className={`${fontSizeClass} font-semibold font-sans`}>
        {words[0]}
      </text>
    );
  }
  if (words.length === 2) {
    return (
      <text textAnchor="middle" fill={textColor} className={`${fontSizeClass} font-semibold font-sans`}>
        <tspan x="0" y={dyStart - 2}>{words[0]}</tspan>
        <tspan x="0" y={dyStart + 9}>{words[1]}</tspan>
      </text>
    );
  }
  return (
    <text textAnchor="middle" fill={textColor} className={`${fontSizeClass} font-semibold font-sans`}>
      <tspan x="0" y={dyStart - 7}>{words[0]}</tspan>
      <tspan x="0" y={dyStart + 5}>{words[1]}</tspan>
      <tspan x="0" y={dyStart + 17}>{words[2]}</tspan>
    </text>
  );
};

export function SkillsGraph() {
  const [nodes, setNodes] = useState<SkillNode[]>(() => {
    const getInitialCoords = (nodeId: string): { x: number; y: number } => {
      if (nodeId === "ai-engineer") return { x: 1200, y: 700 };
      
      const parentId = PARENT_MAP[nodeId];
      if (!parentId) {
        // Direct category roots
        return centers[nodeId] || { x: 1200, y: 700 };
      }

      // Recursive lookup for parent's coords to initialize children close to their parent
      const parentCoords = getInitialCoords(parentId);
      const angle = Math.random() * Math.PI * 2;
      const offset = 45 + Math.random() * 30;
      return {
        x: parentCoords.x + Math.cos(angle) * offset,
        y: parentCoords.y + Math.sin(angle) * offset,
      };
    };

    return SKILL_NODES.map((node) => {
      const coords = getInitialCoords(node.id);
      return {
        ...node,
        x: coords.x,
        y: coords.y,
        vx: 0,
        vy: 0,
      };
    });
  });

  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [collapsedNodeIds, setCollapsedNodeIds] = useState<Set<string>>(new Set());

  // Dragging and Zooming states - Zoom set to 1.0 initially, centering around AI Engineer (1200, 700)
  const [pan, setPan] = useState({ x: -650, y: -410 });
  const [zoom, setZoom] = useState(1.0);
  const [isPanning, setIsPanning] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Set up intersection observer to only simulate when graph is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, []);
  const panStartRef = useRef({ x: 0, y: 0 });
  const touchStartDistRef = useRef<number>(0);
  const touchStartZoomRef = useRef<number>(1.0);

  // SVG size configuration
  const width = 2400;
  const height = 1400;

  // Simulation cooling/decay to stabilize graph and prevent endless floating
  const alphaRef = useRef(1.0);
  const wakeUpSimulation = () => {
    alphaRef.current = 1.0;
  };

  // Refs for tracking physics variables to keep them decoupled from render cycles
  const collapsedRef = useRef(collapsedNodeIds);
  useEffect(() => {
    collapsedRef.current = collapsedNodeIds;
  }, [collapsedNodeIds]);

  const draggedNodeIdRef = useRef(draggedNodeId);
  useEffect(() => {
    draggedNodeIdRef.current = draggedNodeId;
  }, [draggedNodeId]);

  // Touchpad pinch-to-zoom and mouse wheel zoom listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevents browser page zoom on pinch-to-zoom
      const delta = -e.deltaY;
      
      // Laptop touchpads emit ctrlKey === true for pinch gestures
      // Set appropriate zoom sensitivity: faster for pinch (0.015) and slower for mouse wheel (0.0025)
      const speedFactor = e.ctrlKey ? 0.015 : 0.0025;
      
      setZoom((z) => {
        const nextZoom = z * Math.exp(delta * speedFactor);
        return Math.max(0.4, Math.min(2.5, nextZoom));
      });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Helper function to check if a node is visible
  const isNodeVisible = (nodeId: string, collapsedIds: Set<string>): boolean => {
    let current = nodeId;
    while (true) {
      const parent = PARENT_MAP[current];
      if (!parent) return true;
      if (collapsedIds.has(parent)) return false;
      current = parent;
    }
  };

  // Safe checks to clear selected or hovered nodes if they get hidden
  useEffect(() => {
    if (selectedNode && !isNodeVisible(selectedNode.id, collapsedNodeIds)) {
      setSelectedNode(null);
    }
  }, [collapsedNodeIds, selectedNode]);

  useEffect(() => {
    if (hoveredNode && !isNodeVisible(hoveredNode.id, collapsedNodeIds)) {
      setHoveredNode(null);
    }
  }, [collapsedNodeIds, hoveredNode]);

  // Run force simulation loop
  useEffect(() => {
    if (!isIntersecting) return;

    let animationFrameId: number;

    const updatePhysics = () => {
      setNodes((prevNodes) => {
        const nextNodes = prevNodes.map((n) => ({ ...n }));
        const activeCollapsed = collapsedRef.current;
        const currentDragged = draggedNodeIdRef.current;

        // 1. If a node is not visible, collapse it to its parent's coordinate space instantly
        // This sets up the radiating transition starting coordinates when they are re-expanded
        nextNodes.forEach((node) => {
          if (!isNodeVisible(node.id, activeCollapsed)) {
            const parentId = PARENT_MAP[node.id];
            const parent = nextNodes.find((n) => n.id === parentId);
            if (parent) {
              node.x = parent.x;
              node.y = parent.y;
              node.vx = 0;
              node.vy = 0;
            }
          }
        });

        // 2. Smoothly slide visible nodes to their deterministic target coordinates
        nextNodes.forEach((node) => {
          if (!isNodeVisible(node.id, activeCollapsed)) return;
          if (node.id === currentDragged || node.pinned) return;

          const target = getDeterministicTargetCoords(node.id, nextNodes);
          
          // Spring interpolation
          node.vx = (target.x - node.x) * 0.14;
          node.vy = (target.y - node.y) * 0.14;

          node.x += node.vx;
          node.y += node.vy;
        });

        // 3. Collision resolution (anti-collision force)
        // Displace overlapping nodes to guarantee they do not overlap
        for (let iter = 0; iter < 4; iter++) {
          for (let u = 0; u < nextNodes.length; u++) {
            const nodeA = nextNodes[u];
            if (!isNodeVisible(nodeA.id, activeCollapsed)) continue;
            
            for (let v = u + 1; v < nextNodes.length; v++) {
              const nodeB = nextNodes[v];
              if (!isNodeVisible(nodeB.id, activeCollapsed)) continue;
              
              const dx = nodeB.x - nodeA.x;
              const dy = nodeB.y - nodeA.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              
              const radiusA = getNodeRadius(nodeA.size, nodeA.id);
              const radiusB = getNodeRadius(nodeB.size, nodeB.id);
              
              // Spacing boundary: nodes radius sum + 28px buffer
              const minDistance = radiusA + radiusB + 28;
              
              if (distance < minDistance) {
                const overlap = minDistance - distance;
                const pushX = (dx / distance) * overlap * 0.5;
                const pushY = (dy / distance) * overlap * 0.5;
                
                if (nodeA.id !== currentDragged && !nodeA.pinned) {
                  nodeA.x -= pushX;
                  nodeA.y -= pushY;
                }
                if (nodeB.id !== currentDragged && !nodeB.pinned) {
                  nodeB.x += pushX;
                  nodeB.y += pushY;
                }
              }
            }
          }
        }

        return nextNodes;
      });

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isIntersecting]);

  // Handle Drag Start
  const handleNodeMouseDown = (e: React.MouseEvent, node: SkillNode) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedNode(node);
    setDraggedNodeId(node.id);
    wakeUpSimulation();

    // Pin the node initially when dragged
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === node.id) {
          return { ...n, pinned: true };
        }
        return n;
      })
    );

    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleBgMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNodeId) {
      wakeUpSimulation();
      const dx = (e.clientX - dragStartRef.current.x) / zoom;
      const dy = (e.clientY - dragStartRef.current.y) / zoom;

      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === draggedNodeId) {
            return {
              ...n,
              x: Math.max(40, Math.min(width - 40, n.x + dx)),
              y: Math.max(40, Math.min(height - 40, n.y + dy)),
            };
          }
          return n;
        }),
      );
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
    }
  };

  // Drag Release - Unpins node so it slides smoothly back to its position!
  const handleMouseUp = () => {
    if (draggedNodeId) {
      wakeUpSimulation();
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === draggedNodeId) {
            return { ...n, pinned: false };
          }
          return n;
        })
      );
    }
    setDraggedNodeId(null);
    setIsPanning(false);
  };

  // Double click to collapse category
  const handleNodeDoubleClick = (e: React.MouseEvent, node: SkillNode) => {
    e.stopPropagation();
    e.preventDefault();
    wakeUpSimulation();

    const hasChildNodes = hasChildren(node.id);

    if (hasChildNodes) {
      setCollapsedNodeIds((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) {
          next.delete(node.id);
        } else {
          next.add(node.id);
        }
        return next;
      });
    }
  };

  // Touch handlers for mobile pan & pinch-zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const touchX = (touch.clientX - rect.left - pan.x) / zoom;
      const touchY = (touch.clientY - rect.top - pan.y) / zoom;

      const activeCollapsed = collapsedNodeIds;
      const hitNode = nodes.find((n) => {
        if (!isNodeVisible(n.id, activeCollapsed)) return false;
        const dx = n.x - touchX;
        const dy = n.y - touchY;
        const radius = getNodeRadius(n.size, n.id);
        return Math.sqrt(dx * dx + dy * dy) < radius + 10;
      });

      if (hitNode) {
        setSelectedNode(hitNode);
        setDraggedNodeId(hitNode.id);
        wakeUpSimulation();
        setNodes((prev) =>
          prev.map((n) => {
            if (n.id === hitNode.id) return { ...n, pinned: true };
            return n;
          })
        );
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
      } else {
        setIsPanning(true);
        panStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
      }
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      setDraggedNodeId(null);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      touchStartDistRef.current = dist;
      touchStartZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (draggedNodeId) {
        wakeUpSimulation();
        const dx = (touch.clientX - dragStartRef.current.x) / zoom;
        const dy = (touch.clientY - dragStartRef.current.y) / zoom;

        setNodes((prev) =>
          prev.map((n) => {
            if (n.id === draggedNodeId) {
              return {
                ...n,
                x: Math.max(40, Math.min(width - 40, n.x + dx)),
                y: Math.max(40, Math.min(height - 40, n.y + dy)),
              };
            }
            return n;
          }),
        );
        dragStartRef.current = { x: touch.clientX, y: touch.clientY };
      } else if (isPanning) {
        setPan({
          x: touch.clientX - panStartRef.current.x,
          y: touch.clientY - panStartRef.current.y,
        });
      }
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      if (touchStartDistRef.current > 0) {
        const factor = dist / touchStartDistRef.current;
        setZoom(Math.max(0.6, Math.min(2.0, touchStartZoomRef.current * factor)));
      }
    }
  };

  // Touch Release - Unpins node so it slides back
  const handleTouchEnd = () => {
    if (draggedNodeId) {
      wakeUpSimulation();
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === draggedNodeId) return { ...n, pinned: false };
          return n;
        })
      );
    }
    setDraggedNodeId(null);
    setIsPanning(false);
    touchStartDistRef.current = 0;
  };

  const getCategoryStyles = (category: string, isSelected: boolean) => {
    switch (category) {
      case "center":
        return {
          stroke: "#0F172A",
          fillBg: "#0F172A",
          textColor: "fill-white",
          bulletColor: "bg-[#0F172A]",
        };
      default:
        return {
          stroke: "#475569", // Slate-600 border/link stroke
          fillBg: "#1E293B", // Slate-800 background for categories
          textColor: "fill-white",
          bulletColor: "bg-[#1E293B]",
        };
    }
  };

  // Get node rendering styles based on hierarchy level and category
  const getNodeStyles = (node: SkillNode, isSelected: boolean) => {
    if (node.id === "ai-engineer") {
      return {
        fill: "#0F172A", // Slate-900 (Pitch black style)
        stroke: isSelected ? "#111111" : "#0F172A",
        strokeWidth: 3,
        textColor: "#FFFFFF",
        textClass: "text-xs font-bold",
        customTextColor: "#FFFFFF",
      };
    }

    if (node.size === "large") {
      // Level 1 Category nodes: Solid Slate-800 backgrounds with white text
      return {
        fill: "#1E293B",
        stroke: isSelected ? "#0F172A" : "#1E293B",
        strokeWidth: isSelected ? 3.5 : 1.5,
        textColor: "#FFFFFF",
        textClass: "text-[9px] font-bold uppercase tracking-wider",
        customTextColor: "#FFFFFF",
      };
    } else if (node.size === "medium") {
      // Level 2 Sub-domain nodes: White background with Slate-600 borders and Slate-600 text
      return {
        fill: "#FFFFFF",
        stroke: "#475569",
        strokeWidth: isSelected ? 3.5 : 2,
        textColor: "#475569",
        textClass: "text-[8.5px] font-bold",
        customTextColor: "#475569",
      };
    } else {
      // Level 3 Tool nodes: White background with Slate-300 borders and Slate-700 text
      return {
        fill: "#FFFFFF",
        stroke: isSelected ? "#0F172A" : "#cbd5e1",
        strokeWidth: isSelected ? 2.5 : 1.5,
        textColor: "#334155",
        textClass: "text-[7.5px] font-medium",
        customTextColor: "#334155",
      };
    }
  };

  const visibleNodes = nodes.filter((n) => isNodeVisible(n.id, collapsedNodeIds));
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleLinks = SKILL_LINKS.filter(
    (l) => visibleNodeIds.has(l.source) && visibleNodeIds.has(l.target)
  );

  return (
    <section id="skills" className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-10 md:pt-14 pb-[140px] select-none">
      <div className="max-w-2xl mb-9">
        <div className="text-label-custom text-muted font-semibold mb-3">
          Skills Knowledge Graph
        </div>
        <h2 className="text-section-title font-bold tracking-tight text-heading">
          My Technology Ecosystem
        </h2>
        <p className="mt-4 text-body-custom text-body">
          A collection of abilities I’ve honed to create, design, and solve problems.
        </p>
      </div>

      <div className="w-full relative bg-white rounded-2xl border border-border overflow-hidden h-[580px] cursor-grab active:cursor-grabbing">
        {/* Zoom and layout controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-row items-center gap-1 bg-[#FAFAF8] border border-border rounded-lg p-1">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
            className="w-8 h-8 rounded hover:bg-[#E8E8E8] text-[#111111] flex items-center justify-center font-bold text-sm"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
            className="w-8 h-8 rounded hover:bg-[#E8E8E8] text-[#111111] flex items-center justify-center font-bold text-sm"
            title="Zoom Out"
          >
            -
          </button>
          <button
            onClick={() => {
              setZoom(1.0);
              setPan({ x: -650, y: -410 });
              setCollapsedNodeIds(new Set());
              wakeUpSimulation();
              setNodes((prev) => prev.map((n) => ({ ...n, pinned: false })));
            }}
            className="px-2.5 h-8 rounded hover:bg-[#E8E8E8] text-body flex items-center justify-center text-xs font-semibold"
            title="Reset View & Unpin All"
          >
            Reset
          </button>
        </div>

        {/* Floating Tooltip details box */}
        {hoveredNode && (
          <div
            className="absolute z-20 bg-white/95 backdrop-blur-md border border-border/80 shadow-2xl rounded-2xl p-4 w-56 pointer-events-none select-none text-left animate-in fade-in zoom-in-95 duration-150 ease-out"
            style={{
              left: hoveredNode.x * zoom + pan.x,
              top: (hoveredNode.y - getNodeRadius(hoveredNode.size, hoveredNode.id)) * zoom + pan.y - 12,
              transform: "translate(-50%, -100%)",
            }}
          >
            {/* Node Category indicator dot */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className={`w-2 h-2 rounded-full ${getCategoryStyles(hoveredNode.category, false).bulletColor}`} />
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted/80">
                {CATEGORY_DISPLAY_NAMES[hoveredNode.category] || (hoveredNode.category === "center" ? "Core" : hoveredNode.category)}
              </span>
            </div>

            {/* Node Title */}
            <div className="font-bold text-[#111111] text-base mb-3 leading-snug border-b border-border/60 pb-1.5">
              {hoveredNode.label}
            </div>

            {/* Used In List */}
            {hoveredNode.usedIn && hoveredNode.usedIn.length > 0 && (
              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Used In:</div>
                <ul className="text-xs text-body space-y-1 pl-1">
                  {hoveredNode.usedIn.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-muted/60 mt-0.5">•</span>
                      <span className="font-medium text-[#222222]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Status & Experience Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/40">
              <div>
                <div className="text-[9px] uppercase tracking-wider text-muted font-bold leading-normal">Learning Status</div>
                <div className="text-xs font-semibold text-[#111111] mt-0.5">
                  {hoveredNode.level}
                </div>
              </div>
              <div>
                <div className="text-[9px] uppercase tracking-wider text-muted font-bold leading-normal">Experience</div>
                <div className="text-xs font-semibold text-[#111111] mt-0.5">
                  {hoveredNode.experience}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Graph viewport container */}
        <div
          ref={containerRef}
          className="w-full h-full"
          onMouseDown={handleBgMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <svg className="w-full h-full pointer-events-none">
            {/* Premium SVG Dot-Grid Pattern */}
            <defs>
              <pattern
                id="dot-grid"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="#E8E8E8" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#dot-grid)"
              className="pointer-events-none"
            />

            {/* Transform Group (Handles Pan and Zoom) */}
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 1. Connections / Links */}
              {visibleLinks.map((link, idx) => {
                const sNode = nodes.find((n) => n.id === link.source);
                const tNode = nodes.find((n) => n.id === link.target);
                if (!sNode || !tNode) return null;

                const isHighlighted =
                  selectedNode && (selectedNode.id === sNode.id || selectedNode.id === tNode.id);

                return (
                  <line
                    key={`${link.source}-${link.target}-${idx}`}
                    x1={sNode.x}
                    y1={sNode.y}
                    x2={tNode.x}
                    y2={tNode.y}
                    stroke={isHighlighted ? "#0f172a" : "#e2e8f0"}
                    strokeWidth={isHighlighted ? 2 : 1.2}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* 2. Nodes */}
              {visibleNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const nodeStyles = getNodeStyles(node, isSelected);
                const radius = getNodeRadius(node.size, node.id);
                const iconConfig = getIconConfig(node.size);
                const hasChildNodes = hasChildren(node.id);
                const isCollapsed = collapsedNodeIds.has(node.id);

                // Set node specific font sizing for multi-word tool descriptions
                const isSmallMultiWord = node.size === "small" && node.label.split(" ").length > 1;
                const textFontSizeClass = isSmallMultiWord ? "text-[6.5px] leading-tight" : nodeStyles.textClass;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer pointer-events-auto"
                    onMouseDown={(e) => handleNodeMouseDown(e, node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onDoubleClick={(e) => handleNodeDoubleClick(e, node)}
                  >
                    {/* Pulse ring for selected node */}
                    {isSelected && (
                      <circle
                        r={radius + 7}
                        fill="none"
                        stroke={nodeStyles.stroke}
                        strokeWidth="2"
                        className="animate-ping opacity-20"
                      />
                    )}

                    {/* Outer boundary circle */}
                    <circle
                      r={radius}
                      fill={nodeStyles.fill}
                      stroke={nodeStyles.stroke}
                      strokeWidth={nodeStyles.strokeWidth}
                      className="transition-all duration-200 shadow-soft"
                    />

                    {/* Node contents (Logo/Icon + Text, or Centered Text) */}
                    {node.size === "small" && (node.logo || node.icon) ? (
                      // Level 3 Nodes with logo or icon: Logo is at y = -11, Text is at y = 11
                      <>
                        {node.logo ? (
                          <image
                            href={`https://cdn.simpleicons.org/${node.logo}`}
                            x="-8"
                            y="-14"
                            width="16"
                            height="16"
                            className="pointer-events-none"
                          />
                        ) : (
                          <g transform="translate(-8, -14)">
                            <node.icon style={{ width: 16, height: 16, color: nodeStyles.customTextColor }} />
                          </g>
                        )}
                        {/* Text at the bottom */}
                        {renderWrappedText(node.label, textFontSizeClass, 11, nodeStyles.textColor)}
                      </>
                    ) : (
                      // Level 1, Level 2, or Level 3 nodes without logo/icon: Center the wrapped text
                      renderWrappedText(node.label, textFontSizeClass, 0, nodeStyles.textColor)
                    )}

                    {/* Plus Badge if collapsed */}
                    {hasChildNodes && isCollapsed && (
                      <g transform={`translate(${radius - 4}, ${radius - 4})`}>
                        <circle r="6" fill={nodeStyles.stroke} />
                        <text
                          y="1.8"
                          textAnchor="middle"
                          className="text-[8px] font-bold fill-white select-none pointer-events-none"
                        >
                          +
                        </text>
                      </g>
                    )}

                    {/* Pinned Anchor Indicator (pulsing red dot) */}
                    {node.pinned && (
                      <circle
                        r="3.5"
                        cx={radius * 0.7}
                        cy={-radius * 0.7}
                        fill="#EF4444"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                        className="animate-pulse pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
