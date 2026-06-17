import { Thought } from "../types";

const OWNER_AUTHOR = "Shadab Jamadar";

export const THOUGHTS: Thought[] = [
  // === AI CATEGORY (40% - 18 Thoughts) ===
  {
    id: "ai-1",
    category: "AI",
    text: "The best models are useless without good systems.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-2",
    category: "AI",
    text: "AI is valuable only when it solves real problems.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-3",
    category: "AI",
    text: "Retrieval quality matters more than model size.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-4",
    category: "AI",
    text: "The hardest part of AI engineering is not the AI; it's the engineering.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-5",
    category: "AI",
    text: "Prompt engineering is just software engineering in natural language.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-6",
    category: "AI",
    text: "Do not build wrappers; build workflows.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-7",
    category: "AI",
    text: "An agent is only as good as the tools you give it.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-8",
    category: "AI",
    text: "A dumb model with a smart workflow beats a smart model with a dumb workflow.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-9",
    category: "AI",
    text: "Evaluators are the compilers of the LLM era.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-10",
    category: "AI",
    text: "The future of software is agentic, but the foundation is still deterministic.",
    author: OWNER_AUTHOR,
  },
  {
    id: "ai-11",
    category: "AI",
    text: "Software is eating the world, but AI is eating software.",
    author: "Jensen Huang",
  },
  {
    id: "ai-12",
    category: "AI",
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    id: "ai-13",
    category: "AI",
    text: "If you're not prototyping, you're not thinking.",
    author: "Yann LeCun",
  },
  {
    id: "ai-14",
    category: "AI",
    text: "We want models that can reason, not just retrieve.",
    author: "Andrej Karpathy",
  },
  {
    id: "ai-15",
    category: "AI",
    text: "Copilot makes good developers faster, but it doesn't make bad developers good.",
    author: "Andrej Karpathy",
  },
  {
    id: "ai-16",
    category: "AI",
    text: "Data is the new oil, but context is the new engine.",
    author: "Sam Altman",
  },
  {
    id: "ai-17",
    category: "AI",
    text: "The context window is the new RAM.",
    author: "Sam Altman",
  },
  {
    id: "ai-18",
    category: "AI",
    text: "A model is a compressed representation of human knowledge.",
    author: "Ilya Sutskever",
  },

  // === PRODUCT CATEGORY (25% - 12 Thoughts) ===
  {
    id: "prod-1",
    category: "PRODUCT",
    text: "Build products, not project portfolios.",
    author: OWNER_AUTHOR,
  },
  {
    id: "prod-2",
    category: "PRODUCT",
    text: "Shipping teaches more than planning.",
    author: OWNER_AUTHOR,
  },
  {
    id: "prod-3",
    category: "PRODUCT",
    text: "Real users expose assumptions faster than roadmaps.",
    author: OWNER_AUTHOR,
  },
  {
    id: "prod-4",
    category: "PRODUCT",
    text: "Focus on the core value loop before adding shiny features.",
    author: OWNER_AUTHOR,
  },
  {
    id: "prod-5",
    category: "PRODUCT",
    text: "A product is defined by what it chooses not to do.",
    author: OWNER_AUTHOR,
  },
  {
    id: "prod-6",
    category: "PRODUCT",
    text: "Make something people want.",
    author: "Paul Graham",
  },
  {
    id: "prod-7",
    category: "PRODUCT",
    text: "It's hard to build products by focus groups. A lot of times, people don't know what they want until you show it to them.",
    author: "Steve Jobs",
  },
  {
    id: "prod-8",
    category: "PRODUCT",
    text: "Simple can be harder than complex: You have to work hard to get your thinking clean to make it simple.",
    author: "Steve Jobs",
  },
  {
    id: "prod-9",
    category: "PRODUCT",
    text: "If you are not embarrassed by the first version of your product, you’ve launched too late.",
    author: "Reid Hoffman",
  },
  {
    id: "prod-10",
    category: "PRODUCT",
    text: "Start simple, scale when it hurts.",
    author: "Marc Andreessen",
  },
  {
    id: "prod-11",
    category: "PRODUCT",
    text: "Fall in love with the problem, not the solution.",
    author: "Uri Levine",
  },
  {
    id: "prod-12",
    category: "PRODUCT",
    text: "UX is not how it looks, UX is how it works.",
    author: "Steve Jobs",
  },

  // === ENGINEERING CATEGORY (15% - 7 Thoughts) ===
  {
    id: "eng-1",
    category: "ENGINEERING",
    text: "Complexity is the enemy of scale.",
    author: OWNER_AUTHOR,
  },
  {
    id: "eng-2",
    category: "ENGINEERING",
    text: "Great systems are built one iteration at a time.",
    author: OWNER_AUTHOR,
  },
  {
    id: "eng-3",
    category: "ENGINEERING",
    text: "Reliability is a feature.",
    author: OWNER_AUTHOR,
  },
  {
    id: "eng-4",
    category: "ENGINEERING",
    text: "Code is a liability; features are assets. Write less code.",
    author: OWNER_AUTHOR,
  },
  {
    id: "eng-5",
    category: "ENGINEERING",
    text: "The best code is no code at all.",
    author: OWNER_AUTHOR,
  },
  {
    id: "eng-6",
    category: "ENGINEERING",
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
  },
  {
    id: "eng-7",
    category: "ENGINEERING",
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },

  // === BUILDING CATEGORY (10% - 4 Thoughts) ===
  {
    id: "build-1",
    category: "BUILDING",
    text: "The future belongs to builders.",
    author: OWNER_AUTHOR,
  },
  {
    id: "build-2",
    category: "BUILDING",
    text: "Ideas are common. Execution is rare.",
    author: OWNER_AUTHOR,
  },
  {
    id: "build-3",
    category: "BUILDING",
    text: "Progress comes from shipping.",
    author: OWNER_AUTHOR,
  },
  {
    id: "build-4",
    category: "BUILDING",
    text: "Move fast and break things. Unless you are breaking things, you are not moving fast enough.",
    author: "Mark Zuckerberg",
  },

  // === LEARNING CATEGORY (10% - 4 Thoughts) ===
  {
    id: "learn-1",
    category: "LEARNING",
    text: "Consistency beats intensity.",
    author: OWNER_AUTHOR,
  },
  {
    id: "learn-2",
    category: "LEARNING",
    text: "Small experiments compound into large breakthroughs.",
    author: OWNER_AUTHOR,
  },
  {
    id: "learn-3",
    category: "LEARNING",
    text: "Learning happens through building.",
    author: OWNER_AUTHOR,
  },
  {
    id: "learn-4",
    category: "LEARNING",
    text: "The only way to learn a new programming language is by writing programs in it.",
    author: "Dennis Ritchie",
  },
];
