import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SITE_URL } from "@/lib/config";
import {
  Award,
  Check,
  X,
  Compass,
  AlertCircle,
  Brain,
  Layers,
  Cpu,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  Globe,
} from "lucide-react";
// ... (rest of the imports unchanged)
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useResumeUrl } from "@/hooks/useResumeUrl";
import { trackEvent } from "@/lib/analytics";

// Assets
import firstLinesCode from "@/assets/first-lines-code.webp";
import journeyHero from "@/assets/journey-hero.webp";
import criqlLogo from "@/assets/company-logos/criql-labs.png";
import renuLogo from "@/assets/company-logos/renu-sharma.webp";
import plantoLogo from "@/assets/company-logos/planto-ai.webp";

// School & College Logos
import dypatilLogo from "@/assets/education/dypatil-logo.png";
import spicerLogo from "@/assets/education/spicer-logo.webp";

// Certificate Company Logos
import gdgLogo from "@/assets/education/gdg-logo.webp";
import caLogo from "@/assets/education/ca-logo.webp";
import wadhwaniLogo from "@/assets/education/wadhwani-logo.png";
import ibmLogo from "@/assets/education/ibm-logo.png";
import jioLogo from "@/assets/education/jio-logo.png";
import copyrightLogo from "@/assets/education/copyright-logo.svg";
import iitgLogo from "@/assets/education/IIT-Gandhinagar-Logo.svg";

// Certificate Documents & Ceremony Photos
import ibmCertificateImg from "@/assets/education/ibm-certificate.webp";
import wadhwaniCertificateImg from "@/assets/education/wadhwani-certificate.webp";
import ibmCeremonyImg from "@/assets/education/ibm-ceremony.webp";
import caCertificateImg from "@/assets/education/ca-certificate.webp";
import jioCertificateImg from "@/assets/education/jio-certificate.webp";
import gdgHackathon1 from "@/assets/education/gdg-hackathon-1.webp";
import gdgHackathon2 from "@/assets/education/gdg-hackathon-2.webp";
import gdgHackathon3 from "@/assets/education/gdg-hackathon-3.webp";
import ibmCeremonyImg2 from "@/assets/education/ibm-ceremony-2.webp";
import ibmCeremonyImg3 from "@/assets/education/ibm-ceremony-3.webp";
import copyrightCert1 from "@/assets/education/ROC Certificate-1.jpg";
import copyrightCert2 from "@/assets/education/ROC Certificate-2.jpg";
import iitgOfferLetter1 from "@/assets/education/IIT Gandhinagar Offer Letter 1.jpg";
import iitgOfferLetter2 from "@/assets/education/IIT Gandhinagar Offer Letter 2.jpg";

export const Route = createFileRoute("/journey/")({
  component: JourneyPage,
  head: () => ({
    meta: [
      { title: "My Journey — Shadab Jamadar | AI Engineer & Product Builder" },
      {
        name: "description",
        content:
          "The story, education, experience, failures, and turning points that shaped Shadab Jamadar into an AI Engineer.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/journey` }],
  }),
});

// Types & Interfaces
interface TimelineItem {
  year: string;
  title: string;
  description: string;
  lesson: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  logo: string;
  certImg?: string;
  images?: string[];
  isPhoto?: boolean;
  date: string;
  certId: string;
  skills: string[];
  colorTheme: {
    border: string;
    bg: string;
    text: string;
    accent: string;
    badgeBg: string;
  };
}

interface FailureItem {
  type: string;
  year: string;
  happened: string;
  wrong: string;
  lesson: string;
}

// Data Sets
const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2019",
    title: "Discovered Programming",
    description:
      "Built my first small scripts at Spicer High School, Pune, and fell in love with applying logic to solve real problems.",
    lesson: "Small projects matter more than tutorials.",
  },
  {
    year: "2022",
    title: "Entered B.Tech Program",
    description:
      "Enrolled in Artificial Intelligence & Data Science at Dr. D Y Patil, Pune. Began exploring algorithms, linear algebra, and data structures.",
    lesson: "Fundamentals build strong foundations.",
  },
  {
    year: "2023",
    title: "Competitive Prototyping",
    description:
      "Participated in the Jio Creative Hackathon, placing in the top 100 teams out of 16,000. Understood the thrill of fast-paced collaborative building.",
    lesson: "Constraints force creative solutions.",
  },
  {
    year: "2024",
    title: "Real-world Data Systems",
    description:
      "Built the Ishara Indian Sign Language recognition tool processing 200GB of video. Placed Top 10 in the IBM Maharashtra Hackathon.",
    lesson: "Real-world data is messy but rewarding.",
  },
  {
    year: "2025",
    title: "AI & Data Science Internships",
    description:
      "Joined Planto AI and Renu Sharma Foundation. Engineered scalable FastAPI/Redis backends and launched the Curio Agentic system.",
    lesson: "The future belongs to agentic builders.",
  },
  {
    year: "2026",
    title: "Trading Architecture & Google Hackathon",
    description:
      "Built trading SDKs at Criql Labs and placed Top 25 in the Google Build & Grow AI Hackathon.",
    lesson: "Scale requires modular, testable designs.",
  },
];

const CERTIFICATES: Certificate[] = [
  {
    id: "google-grow",
    title: "Google Build & Grow AI Hackathon 2.0",
    issuer: "Google",
    logo: gdgLogo,
    certImg: gdgHackathon1,
    images: [gdgHackathon1, gdgHackathon2, gdgHackathon3],
    isPhoto: true,
    date: "January 2026",
    certId: "GG-AI-HACK-2.0",
    skills: ["AI Engineering", "Generative AI", "Agentic Workflows"],
    colorTheme: {
      border: "border-blue-200 hover:border-blue-300",
      bg: "bg-gradient-to-br from-white to-blue-50/10",
      text: "text-blue-800",
      accent: "bg-blue-600",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-100",
    },
  },
  {
    id: "wadhwani-ignitex",
    title: "Wadhwani IgniteX Startup Program",
    issuer: "Wadhwani Association",
    logo: wadhwaniLogo,
    certImg: wadhwaniCertificateImg,
    date: "September 2024",
    certId: "WA-IGNITEX-2024",
    skills: ["Startup Ideation", "Timeline Strategy", "Business Pitching"],
    colorTheme: {
      border: "border-purple-200 hover:border-purple-300",
      bg: "bg-gradient-to-br from-white to-purple-50/10",
      text: "text-purple-800",
      accent: "bg-purple-600",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-100",
    },
  },
  {
    id: "ibm-maharashtra",
    title: "IBM State Level Maharashtra Hackathon",
    issuer: "IBM",
    logo: ibmLogo,
    certImg: ibmCeremonyImg,
    images: [ibmCeremonyImg, ibmCertificateImg, ibmCeremonyImg2, ibmCeremonyImg3],
    date: "February 2024",
    certId: "IBM-MH-HACK-10",
    skills: [
      "Rapid Prototyping",
      "Cloud Deployments",
      "API Development",
      "Top 10 Team Recognition",
      "State Finals Representation",
    ],
    colorTheme: {
      border: "border-cyan-200 hover:border-cyan-300",
      bg: "bg-gradient-to-br from-white to-cyan-50/10",
      text: "text-cyan-800",
      accent: "bg-cyan-600",
      badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-100",
    },
  },
  {
    id: "iitg-consulting",
    title: "Winter Consulting Program",
    issuer: "Consulting & Analytics Club, IIT Guwahati",
    logo: caLogo,
    certImg: caCertificateImg,
    date: "January 2025",
    certId: "IITG-WCP-2025",
    skills: ["Case Studies", "Strategic Analytics", "Management Consulting"],
    colorTheme: {
      border: "border-emerald-200 hover:border-emerald-300",
      bg: "bg-gradient-to-br from-white to-emerald-50/10",
      text: "text-emerald-800",
      accent: "bg-emerald-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
  },
  {
    id: "jio-creative",
    title: "Jio Creative Hackathon",
    issuer: "Reliance Jio",
    logo: jioLogo,
    certImg: jioCertificateImg,
    date: "August 2023",
    certId: "JIO-CREATIVE-100",
    skills: ["Distributed Architectures", "Core Product Innovation"],
    colorTheme: {
      border: "border-orange-200 hover:border-orange-300",
      bg: "bg-gradient-to-br from-white to-orange-50/10",
      text: "text-orange-850",
      accent: "bg-orange-600",
      badgeBg: "bg-orange-50 text-orange-700 border-orange-100",
    },
  },
  {
    id: "copyright-roc",
    title: "Government Copyright Registration (ROC)",
    issuer: "Registrar of Copyrights, Government of India",
    logo: copyrightLogo,
    certImg: copyrightCert1,
    images: [copyrightCert1, copyrightCert2],
    isPhoto: false,
    date: "February 2026",
    certId: "ROC-REG-2026",
    skills: ["Intellectual Property", "Software Copyright", "Algorithm Protection"],
    colorTheme: {
      border: "border-amber-200 hover:border-amber-300",
      bg: "bg-gradient-to-br from-white to-amber-50/10",
      text: "text-amber-800",
      accent: "bg-amber-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-100",
    },
  },
  {
    id: "iit-gandhinagar-offer",
    title: "IIT Gandhinagar Offer Letter",
    issuer: "IIT Gandhinagar",
    logo: iitgLogo,
    certImg: iitgOfferLetter1,
    images: [iitgOfferLetter1, iitgOfferLetter2],
    isPhoto: false,
    date: "May 2024",
    certId: "IITGN-RES-2024",
    skills: ["Research Methodologies", "Academic Collaboration", "Technical Writing"],
    colorTheme: {
      border: "border-indigo-200 hover:border-indigo-300",
      bg: "bg-gradient-to-br from-white to-indigo-50/10",
      text: "text-indigo-800",
      accent: "bg-indigo-600",
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-100",
    },
  },
];

const FAILURES: FailureItem[] = [
  {
    type: "Failed Product",
    year: "2023",
    happened:
      "Spent 3 months building a curriculum planning tool that got zero active users upon launch.",
    wrong:
      "Build-first approach without doing user research or checking if there was actual demand.",
    lesson:
      "Talk to users early and validate fast. Code is the most expensive way to test an assumption.",
  },
  {
    type: "Rejection Streak",
    year: "2022",
    happened:
      "Applied to dozens of internships and junior roles over six months, resulting in absolute silence.",
    wrong:
      "Relying on generic applications, certificates, and tutorials rather than unique personal proof-of-work.",
    lesson:
      "Projects matter more than certificates. Documenting and building in public creates real opportunities.",
  },
  {
    type: "Lost Data",
    year: "2022",
    happened:
      "Lost weeks of code for an interactive NLP tool because of a local drive failure and untracked changes.",
    wrong:
      "Lack of backup hygiene, improper git discipline, and running modifications directly on bare metal.",
    lesson:
      "Backups and strict git workflows aren't options; they are basic survival processes for engineers.",
  },
];

function JourneyPage() {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleSelectCert = (cert: Certificate) => {
    setActiveCert(cert);
    setCurrentImageIdx(0);
  };
  const resumeUrl = useResumeUrl();

  // Swipe gesture detection state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance in px
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (activeCert && activeCert.images && activeCert.images.length > 1) {
      if (isLeftSwipe) {
        // Swipe left -> Next image
        setCurrentImageIdx((prev) => (prev === activeCert.images!.length - 1 ? 0 : prev + 1));
      }
      if (isRightSwipe) {
        // Swipe right -> Previous image
        setCurrentImageIdx((prev) => (prev === 0 ? activeCert.images!.length - 1 : prev - 1));
      }
    }
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCert) return;
      if (e.key === "Escape") {
        setActiveCert(null);
      } else if (activeCert.images && activeCert.images.length > 1) {
        if (e.key === "ArrowRight") {
          setCurrentImageIdx((prev) => (prev === activeCert.images!.length - 1 ? 0 : prev + 1));
        } else if (e.key === "ArrowLeft") {
          setCurrentImageIdx((prev) => (prev === 0 ? activeCert.images!.length - 1 : prev - 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeCert]);

  const handleDownload = () => {
    trackEvent("resume_download", { method: "button", page: "journey" });
    if (!resumeUrl) return;
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Shadab_Jamadar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const jobs = [
    {
      company: "Criql Labs",
      logo: criqlLogo,
      role: "Software Developer Intern",
      duration: "Jan 2026 – April 2026",
      location: "Remote",
      bullets: [
        <>
          Built a unified{" "}
          <strong className="font-semibold text-heading">Python algorithmic trading SDK</strong>{" "}
          integrating 3 broker APIs (Zerodha, Angel One, FivePaisa) using a{" "}
          <strong className="font-semibold text-heading">modular adapter architecture</strong>.
        </>,
        <>
          Designed a broker-agnostic{" "}
          <strong className="font-semibold text-heading">Instrument Master schema</strong> and
          ingestion pipeline in SQLite, normalizing{" "}
          <strong className="font-semibold text-heading">
            100% of broker-specific instrument fields
          </strong>{" "}
          into a consistent data model.
        </>,
        <>
          Implemented tests covering core trading workflows, added{" "}
          <strong className="font-semibold text-heading">structured logging</strong>, and packaged
          the SDK with <strong className="font-semibold text-heading">Poetry</strong>, enabling
          scalable onboarding of new brokers.
        </>,
      ],
    },
    {
      company: "Renu Sharma Healthcare & Educational Foundation",
      logo: renuLogo,
      role: "Data Science Intern",
      duration: "Jul 2025 – Dec 2025",
      location: "Remote",
      bullets: [
        <>
          Engineered end-to-end backend for{" "}
          <strong className="font-semibold text-heading">AI Interviewer platform</strong>, designing
          APIs, integrating databases, and implementing security protocols, reducing backend errors
          by <strong className="font-semibold text-heading">25%</strong>.
        </>,
        <>
          Developed{" "}
          <strong className="font-semibold text-heading">role-based authentication</strong> (admin,
          HR, student) with secure{" "}
          <strong className="font-semibold text-heading">OAuth2.0 management</strong>, supporting{" "}
          <strong className="font-semibold text-heading">100+ concurrent users</strong>.
        </>,
        <>
          Built a multi-container{" "}
          <strong className="font-semibold text-heading">
            Docker setup with FastAPI and Redis
          </strong>
          , cutting startup time by <strong className="font-semibold text-heading">30%</strong> and
          enabling scalable infrastructure.
        </>,
      ],
    },
    {
      company: "Planto AI",
      logo: plantoLogo,
      role: "AI Research Intern",
      duration: "Apr 2025 - Oct 2025",
      location: "Remote",
      bullets: [
        <>
          Led <strong className="font-semibold text-heading">competitive analysis</strong> of 4 key
          industry players (tech stacks, strategy, financials), uncovering{" "}
          <strong className="font-semibold text-heading">7 innovation gaps</strong>, improving
          Planto AI’s strategic planning effectiveness by{" "}
          <strong className="font-semibold text-heading">4%</strong>.
        </>,
        <>
          Identified and resolved{" "}
          <strong className="font-semibold text-heading">performance bottlenecks</strong> in core AI
          solutions, boosting processing speed by{" "}
          <strong className="font-semibold text-heading">15%</strong> and improving market
          positioning by <strong className="font-semibold text-heading">12%</strong>.
        </>,
        <>
          Built <strong className="font-semibold text-heading">research briefs</strong> summarising
          technical and market insights, enabling{" "}
          <strong className="font-semibold text-heading">15+ data-informed decisions</strong> across
          product and engineering teams.
        </>,
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen lg:h-screen lg:max-h-[900px] flex items-center pt-20 bg-gradient-to-br from-[#f2eefc] via-[#eef4df] to-[#fdf5eb]">
        {/* Subtle moving grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none -z-20" />

        {/* Ambient Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-purple/10 blur-[130px] -z-10 pointer-events-none translate-x-[20%] -translate-y-[20%] animate-ambient-flow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-orange/6 blur-[110px] -z-10 pointer-events-none -translate-x-[20%] translate-y-[20%] animate-ambient-flow [animation-delay:4s]" />

        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-8 animate-fade-up">
            <div className="text-label-custom text-muted font-bold tracking-wider">JOURNEY</div>

            <h1 className="text-hero-title leading-[1.05] tracking-tight text-heading">
              A journey of{" "}
              <span className="font-serif italic text-accent/75 font-normal">curiosity</span>,
              failures, learning, and building<span className="text-accent">.</span>
            </h1>

            <p className="text-hero-desc text-body max-w-xl font-normal leading-[1.7]">
              Nothing here was planned. Most of it happened because of curiosity.
            </p>
          </div>

          {/* Right Column (Path Graphic) */}
          <div className="lg:col-span-5 relative flex items-center justify-center animate-fade-up [animation-delay:0.2s]">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-border shadow-soft bg-white p-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
              <img
                src={journeyHero}
                alt="Winding path graphic representing the personal journey"
                className="w-full h-full object-cover rounded-2xl"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Beginning */}
      <section className="py-24 border-t border-border bg-white">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                The Origin
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-heading">
              The Beginning<span className="text-accent">.</span>
            </h2>
            <div className="space-y-4 text-body text-base leading-[1.8] font-normal">
              <p>
                I was that kid who was always curious about how things worked. From taking apart
                toys to building random websites, I enjoyed creating things.
              </p>
              <p>
                My first real interaction with code was in school, and I instantly knew I wanted to
                build things that could make an impact. Writing those first lines of code and seeing
                something appear on the screen felt like magic. It wasn't about the technology yet,
                it was about the power of translating an idea into reality.
              </p>
              <p>
                That early interest sparked a lifelong obsession with engineering. I spent hours
                reading docs, breaking systems, and building simple tools just to understand how it
                all fit together.
              </p>
            </div>
          </div>

          {/* Retro Image Mockup */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl overflow-hidden border border-border shadow-soft aspect-[4/3] bg-zinc-950 flex flex-col justify-end">
              <img
                src={firstLinesCode}
                alt="Kid coding on CRT monitor at night representing the beginning of coding"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="relative z-10 p-6 text-white space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                  Circa 2017
                </span>
                <p className="font-serif italic text-lg text-zinc-200">
                  "Writing my first lines of code..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 border-t border-border bg-[#FAFAF8]">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 space-y-16">
          <div className="max-w-xl">
            <div className="text-label-custom text-muted font-semibold mb-2">
              Milestones & Growth
            </div>
            <h2 className="text-section-title font-bold tracking-tight text-heading">
              My Journey<span className="text-accent">.</span>
            </h2>
          </div>

          {/* Timeline Connector Container */}
          <div className="relative border-l border-border/80 ml-4 md:ml-6 space-y-12">
            {TIMELINE_DATA.map((item) => (
              <div key={item.year} className="relative pl-8 group">
                {/* Node dot with pulsing hover state */}
                <div className="absolute -left-[5.5px] top-1.5 w-3.5 h-3.5 rounded-full border border-border bg-white group-hover:border-accent group-hover:bg-accent transition-all duration-300 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-white" />
                </div>

                {/* Timeline content split columns on desktop, stack on mobile */}
                <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Year */}
                  <div className="md:col-span-2">
                    <span className="text-xl font-bold text-heading tracking-tight block mt-0.5 group-hover:text-accent transition-colors">
                      {item.year}
                    </span>
                  </div>

                  {/* Event & Description */}
                  <div className="md:col-span-7 space-y-1.5">
                    <h3 className="text-lg font-semibold text-heading tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-body text-sm leading-[1.6]">{item.description}</p>
                  </div>

                  {/* Lesson highlight block */}
                  <div className="md:col-span-3">
                    <div className="p-4 rounded-2xl border border-border bg-white shadow-soft group-hover:border-accent-soft group-hover:bg-white/60 transition-all duration-200">
                      <span className="text-[10px] font-mono font-semibold tracking-wider text-muted block mb-1">
                        LESSON
                      </span>
                      <p className="text-body text-xs leading-[1.5] italic font-serif text-[#6e9c53]">
                        "{item.lesson}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Timeline - Homepage Layout */}
      <section
        id="experience"
        className="mx-auto max-w-[1280px] px-6 lg:px-10 py-24 border-t border-border bg-[#FAFAF8]"
      >
        <div className="grid lg:grid-cols-12 gap-6 items-start relative">
          {/* Left Column (Sticky Title) */}
          <div className="lg:col-span-4 lg:sticky lg:top-[120px] self-start space-y-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                Professional Path
              </span>
            </div>
            <h2 className="text-section-title font-bold tracking-tight text-heading">
              Work Experience
            </h2>
            <p className="text-body-custom text-body max-w-sm">
              Milestones and roles in software development, data science, and AI research that have
              shaped my technical approach.
            </p>
            {resumeUrl && (
              <div className="pt-4">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#6e9c53] hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  Download Full Resume <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column (Timeline) */}
          <div className="lg:col-span-8 relative border-l border-border ml-4 pl-8 space-y-12">
            {jobs.map((job, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="relative group animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-white border flex items-center justify-center shadow-sm transition-all duration-300 ${
                      isExpanded
                        ? "border-accent scale-110"
                        : "border-border group-hover:border-zinc-400"
                    }`}
                  >
                    {isExpanded ? (
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent opacity-85"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 transition-colors duration-300 group-hover:bg-zinc-400" />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1 flex-shrink-0 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </span>
                        <div>
                          <h3
                            className="font-semibold text-lg text-heading cursor-pointer hover:text-accent transition-colors select-none"
                            onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                          >
                            {job.role}
                          </h3>
                          <p className="text-sm text-body">
                            {job.company} · {job.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted font-medium">{job.duration}</span>
                        <button
                          onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                          className="p-1.5 rounded-full hover:bg-white border border-border text-body hover:text-heading transition-colors cursor-pointer"
                          title={isExpanded ? "Collapse details" : "Expand details"}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isExpanded
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <ul className="space-y-3 pl-11 pt-2 border-t border-border/40">
                        {job.bullets.map((bullet, bulletIdx) => (
                          <li
                            key={bulletIdx}
                            className={`text-sm text-body leading-[1.7] list-disc marker:text-accent transition-all duration-500 transform ${
                              isExpanded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2 pointer-events-none"
                            }`}
                            style={{ transitionDelay: isExpanded ? `${bulletIdx * 80}ms` : "0ms" }}
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 border-t border-border bg-white">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Institution Description */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-xs uppercase tracking-widest text-muted font-bold">
                  Academics
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-heading">
                Education<span className="text-accent">.</span>
              </h2>

              <div className="space-y-4">
                {/* College Card */}
                <div className="relative p-[1.2px] rounded-2xl overflow-hidden group/edu border border-border bg-[#FAFAF8] hover:border-transparent hover:-translate-y-1 hover:scale-[1.02] shadow-sm hover:shadow-soft transition-all duration-300 ease-out">
                  {/* Light revolving border beam */}
                  <div className="absolute inset-[-250%] bg-[conic-gradient(from_0deg,transparent_30%,#6e9c53_50%,#e8f0d2_70%,transparent_90%)] animate-border-beam opacity-0 group-hover/edu:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Inner Card */}
                  <div className="relative z-10 p-6 rounded-[15px] bg-gradient-to-br from-white via-white to-[#e8f0d2]/45 group-hover/edu:to-[#e8f0d2]/65 space-y-4 transition-all duration-300 h-full cursor-default">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-accent bg-accent-soft px-2.5 py-1 rounded-full group-hover/edu:bg-accent group-hover/edu:text-white transition-colors duration-300">
                        2022 - 2026
                      </span>
                      <span className="text-xs font-bold text-heading group-hover/edu:text-accent transition-colors duration-300">
                        GPA: 9.6/10
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-11 h-11 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1 flex-shrink-0 shadow-sm transition-all duration-300 group-hover/edu:scale-110 group-hover/edu:shadow-md">
                        <img
                          src={dypatilLogo}
                          alt="Dr. D Y Patil Logo"
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-heading group-hover/edu:text-accent transition-colors duration-300">
                          B.Tech in Artificial Intelligence & Data Science
                        </h3>
                        <p className="text-[11px] text-muted font-semibold leading-tight">
                          Dr. D Y Patil School Of Science And Technology, Pune
                        </p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-border group-hover/edu:bg-accent/25 transition-colors duration-300" />
                    <p className="text-xs text-body leading-relaxed font-normal">
                      Specialized in artificial intelligence, deep learning models, natural language
                      processing, and distributed microservices architectures.
                    </p>
                  </div>
                </div>

                {/* High School Spicer XII */}
                <div className="relative p-[1.2px] rounded-2xl overflow-hidden group/edu border border-border bg-[#FAFAF8] hover:border-transparent hover:-translate-y-0.5 hover:scale-[1.015] shadow-sm hover:shadow-soft transition-all duration-300 ease-out">
                  {/* Light revolving border beam */}
                  <div className="absolute inset-[-250%] bg-[conic-gradient(from_0deg,transparent_35%,#6e9c53_50%,#e8f0d2_65%,transparent_80%)] animate-border-beam opacity-0 group-hover/edu:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Inner Card */}
                  <div className="relative z-10 p-5 rounded-[15px] bg-[#FAFAF8] group-hover/edu:bg-gradient-to-br group-hover/edu:from-white group-hover/edu:to-accent-soft/25 space-y-3 transition-colors duration-300 h-full cursor-default">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-mono font-semibold text-muted group-hover/edu:text-accent transition-colors duration-300">
                        2020 - 2021
                      </span>
                      <span className="text-[12px] font-bold text-heading group-hover/edu:text-accent transition-colors duration-300">
                        Score: 81%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1 flex-shrink-0 shadow-sm transition-all duration-300 group-hover/edu:scale-110 group-hover/edu:shadow-md">
                        <img
                          src={spicerLogo}
                          alt="Spicer Logo"
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-heading group-hover/edu:text-accent transition-colors duration-300">
                          Senior Secondary (XII), ISC - Science
                        </h3>
                        <p className="text-[11px] text-muted font-semibold leading-tight">
                          Spicer Higher Secondary School, Pune
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* High School Spicer X */}
                <div className="relative p-[1.2px] rounded-2xl overflow-hidden group/edu border border-border bg-[#FAFAF8] hover:border-transparent hover:-translate-y-0.5 hover:scale-[1.015] shadow-sm hover:shadow-soft transition-all duration-300 ease-out">
                  {/* Light revolving border beam */}
                  <div className="absolute inset-[-250%] bg-[conic-gradient(from_0deg,transparent_35%,#6e9c53_50%,#e8f0d2_65%,transparent_80%)] animate-border-beam opacity-0 group-hover/edu:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Inner Card */}
                  <div className="relative z-10 p-5 rounded-[15px] bg-[#FAFAF8] group-hover/edu:bg-gradient-to-br group-hover/edu:from-white group-hover/edu:to-accent-soft/25 space-y-3 transition-colors duration-300 h-full cursor-default">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-mono font-semibold text-muted group-hover/edu:text-accent transition-colors duration-300">
                        2018 - 2019
                      </span>
                      <span className="text-[12px] font-bold text-heading group-hover/edu:text-accent transition-colors duration-300">
                        Score: 85%
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1 flex-shrink-0 shadow-sm transition-all duration-300 group-hover/edu:scale-110 group-hover/edu:shadow-md">
                        <img
                          src={spicerLogo}
                          alt="Spicer Logo"
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-heading group-hover/edu:text-accent transition-colors duration-300">
                          Secondary (X), ICSE
                        </h3>
                        <p className="text-[11px] text-muted font-semibold leading-tight">
                          Spicer Higher Secondary School, Pune
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates & Documents Gallery */}
            <div className="lg:col-span-7 space-y-6 lg:h-[610px] flex flex-col">
              <div className="flex items-center justify-between flex-shrink-0">
                <span className="text-xs uppercase tracking-widest text-muted font-bold">
                  Certificates & Documents
                </span>
                <span className="text-xs text-accent font-semibold flex items-center gap-1">
                  Scroll to view all
                </span>
              </div>

              {/* Grid of credentials */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[480px] lg:max-h-none">
                {CERTIFICATES.map((cert) => (
                  <div
                    key={cert.id}
                    onClick={() => handleSelectCert(cert)}
                    className={`cursor-pointer p-5 rounded-2xl border ${cert.colorTheme.border} ${cert.colorTheme.bg} hover:shadow-soft transition-all duration-300 flex flex-col justify-between h-full lg:flex-row lg:items-center gap-4 group`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-grow">
                      {/* Image Thumbnail inside the Certificate card */}
                      {cert.certImg ? (
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-border/60 flex-shrink-0 bg-slate-50 relative shadow-xs group-hover:border-accent/40 transition-colors">
                          <img
                            src={cert.certImg}
                            alt={`${cert.title} preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        // Fallback brand-themed digital badge icon
                        <div
                          className={`w-20 h-14 rounded-lg border border-border/60 flex-shrink-0 bg-gradient-to-br ${cert.colorTheme.bg} flex items-center justify-center shadow-xs`}
                        >
                          <Award className={`w-6 h-6 ${cert.colorTheme.text} opacity-80`} />
                        </div>
                      )}

                      <div className="space-y-2 lg:space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white border border-border shadow-xs flex items-center justify-center p-0.5 overflow-hidden flex-shrink-0">
                            <img
                              src={cert.logo}
                              alt={cert.issuer}
                              className="w-full h-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                            {cert.issuer}
                          </span>
                        </div>
                        <h4 className="text-sm md:text-base font-bold text-heading group-hover:text-accent transition-colors">
                          {cert.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/40 pt-3 lg:pt-0 lg:border-0 w-full lg:w-auto gap-4">
                      <span className="text-xs text-muted font-semibold">{cert.date}</span>
                      <div className="flex items-center gap-1.5 text-xs text-accent font-semibold bg-accent-soft/30 px-3 py-1 rounded-full border border-accent-soft opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{cert.certImg ? "View Image" : "View Details"}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 border-t border-border bg-white">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 space-y-16">
          <div className="max-w-xl">
            <h2 className="text-section-title font-bold tracking-tight text-heading">
              Achievements<span className="text-accent">.</span>
            </h2>
          </div>

          {/* Display grid of achievements - clean and premium cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "Google AI Hackathon Rank", value: "Top 25", sub: "Out of 1000 teams" },
              { label: "B.Tech Academic GPA", value: "9.6/10", sub: "Dr. D Y Patil Academic" },
              { label: "IBM Maharashtra Hackathon", value: "Top 10", sub: "State level finals" },
              { label: "Jio Creative Hackathon", value: "Top 100", sub: "Out of 16,000 teams" },
              {
                label: "Academic Excellence",
                value: "Top 5",
                sub: "Consistently ranked in B.Tech AI & DS, received 2nd-year academic award",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white border border-border shadow-soft rounded-2xl p-6 flex flex-col justify-between min-h-[140px] hover:border-accent-soft hover:shadow-card transition-all duration-300"
              >
                <div className="w-full flex items-center justify-between text-muted">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-muted/60">
                    Milestone {i + 1}
                  </span>
                </div>
                <div className="space-y-1 mt-4">
                  <div className="text-2xl md:text-3xl font-bold text-heading tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-heading font-semibold leading-snug">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-muted font-normal leading-normal">
                    {stat.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Failures & Lessons */}
      <section className="py-24 border-t border-border bg-[#FAFAF8]">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 space-y-16">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                Unveiling the Backstage
              </span>
            </div>
            <h2 className="text-section-title font-bold tracking-tight text-heading">
              Failures & Lessons<span className="text-accent">.</span>
            </h2>
            <p className="text-body text-sm leading-relaxed max-w-lg font-normal">
              Most portfolios only display a curated list of successes. I believe the failures that
              shaped those wins are just as important. Here is what didn't work, and what it taught
              me.
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block border border-border bg-white rounded-3xl overflow-hidden shadow-soft">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAF8] border-b border-border text-muted uppercase font-bold text-[10px] tracking-widest">
                  <th className="py-5 px-6 w-1/4">Failure & Year</th>
                  <th className="py-5 px-6 w-1/4">What Happened</th>
                  <th className="py-5 px-6 w-1/4">What Went Wrong</th>
                  <th className="py-5 px-6 w-1/4">What It Taught Me</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {FAILURES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 px-6 align-top">
                      <div className="space-y-2">
                        <span className="inline-block text-[10px] font-mono font-bold text-red-650 bg-red-50 border border-red-100 rounded px-2.5 py-0.5">
                          {item.year}
                        </span>
                        <h4 className="text-sm font-bold text-heading">{item.type}</h4>
                      </div>
                    </td>
                    <td className="py-6 px-6 text-sm text-body align-top leading-relaxed font-normal">
                      {item.happened}
                    </td>
                    <td className="py-6 px-6 text-sm text-body align-top leading-relaxed font-normal">
                      {item.wrong}
                    </td>
                    <td className="py-6 px-6 text-sm text-heading font-serif italic align-top leading-relaxed font-normal">
                      "{item.lesson}"
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-6">
            {FAILURES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-white shadow-soft space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-heading">{item.type}</h4>
                  <span className="text-[10px] font-mono font-bold text-red-650 bg-red-50 border border-red-100 rounded px-2.5 py-0.5">
                    {item.year}
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-muted block mb-0.5">
                      What Happened
                    </span>
                    <p className="text-body font-normal">{item.happened}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-muted block mb-0.5">
                      What Went Wrong
                    </span>
                    <p className="text-body font-normal">{item.wrong}</p>
                  </div>
                  <div className="p-3 bg-red-50/30 border border-red-100/50 rounded-xl">
                    <span className="text-[9px] font-mono font-bold uppercase text-red-650 block mb-0.5">
                      Lesson Learned
                    </span>
                    <p className="text-heading font-serif italic font-medium">"{item.lesson}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Direction (What's Next?) */}
      <section className="py-24 border-t border-border bg-white">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Text and context */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                Looking Forward
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-heading">
              What's Next?<span className="text-accent">.</span>
            </h2>
            <p className="text-body text-base leading-relaxed max-w-lg font-normal">
              The journey is far from over. I'm excited about what's ahead and determined to build
              products that create real impact. I am currently deep-diving into production-grade
              architectures and agent-based design.
            </p>
          </div>

          {/* Grid of future focus pills */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {[
              {
                title: "Agentic AI",
                desc: "Autonomous reasoning systems & orchestrators",
                icon: Brain,
              },
              {
                title: "Educational AI",
                desc: "Adaptive tutoring & concept mapping flows",
                icon: Layers,
              },
              {
                title: "AI Products",
                desc: "Full-stack client-facing intelligent apps",
                icon: Cpu,
              },
              {
                title: "Production AI Systems",
                desc: "Scalable APIs, RAG, and evaluation guards",
                icon: Globe,
              },
            ].map((focus) => {
              const IconComp = focus.icon;
              return (
                <div
                  key={focus.title}
                  className="p-5 rounded-2xl border border-border bg-[#FAFAF8] shadow-soft hover:shadow-card hover:border-accent-soft hover:bg-white transition-all duration-300 space-y-3 group"
                >
                  <div className="p-2 rounded-xl bg-white border border-border w-fit group-hover:border-accent-soft group-hover:bg-accent-soft/20 transition-all">
                    <IconComp className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-heading group-hover:text-accent transition-colors">
                      {focus.title}
                    </h4>
                    <p className="text-[11px] text-muted leading-relaxed mt-0.5 font-normal">
                      {focus.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modal Backdrop & Contents */}
      {activeCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111]/70 backdrop-blur-sm p-4 transition-all duration-300 animate-fade-in"
          onClick={() => setActiveCert(null)}
        >
          <div
            className={`relative w-full ${
              activeCert.certImg ? "max-w-3xl" : "max-w-2xl"
            } bg-white border border-border rounded-3xl shadow-2xl p-6 md:p-10 overflow-hidden transform scale-100 transition-all duration-300 flex flex-col items-center justify-center text-center animate-scale-up`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-6 right-6 z-20 text-muted hover:text-heading transition-colors p-2 hover:bg-slate-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeCert.certImg ? (
              // If there is an image, display it nicely as a certificate document/photo
              <div className="space-y-6 w-full mt-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-4 text-left">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1 shadow-sm">
                      <img
                        src={activeCert.logo}
                        alt={activeCert.issuer}
                        className="w-full h-full object-contain"
                      />
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-heading leading-tight">
                        {activeCert.title}
                      </h4>
                      <p className="text-xs text-muted font-semibold">
                        {activeCert.issuer} · {activeCert.date}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-accent-soft text-accent border border-accent-soft px-2.5 py-1 rounded-full uppercase">
                    {activeCert.isPhoto ? "Photo Release" : "Official Credential"}
                  </span>
                </div>

                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`relative rounded-xl border border-border overflow-hidden bg-slate-50 flex flex-col items-center justify-center p-2 md:p-4 shadow-inner min-h-[40vh] max-h-[55vh] md:max-h-[60vh] group/modal-img w-full select-none ${
                    activeCert.images && activeCert.images.length > 1
                      ? "cursor-grab active:cursor-grabbing"
                      : ""
                  }`}
                >
                  <img
                    src={
                      activeCert.images ? activeCert.images[currentImageIdx] : activeCert.certImg
                    }
                    alt={`${activeCert.title} Document ${currentImageIdx + 1}`}
                    className="w-full max-h-[45vh] md:max-h-[50vh] object-contain rounded-lg border border-border/40 shadow-md transition-all duration-300"
                  />

                  {/* Previous / Next buttons */}
                  {activeCert.images && activeCert.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIdx((prev) =>
                            prev === 0 ? activeCert.images!.length - 1 : prev - 1,
                          );
                        }}
                        className="absolute left-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-heading flex items-center justify-center border border-border shadow-md transition-all cursor-pointer opacity-0 group-hover/modal-img:opacity-100"
                        title="Previous Image"
                      >
                        <ChevronRight className="w-5 h-5 rotate-180" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIdx((prev) =>
                            prev === activeCert.images!.length - 1 ? 0 : prev + 1,
                          );
                        }}
                        className="absolute right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-heading flex items-center justify-center border border-border shadow-md transition-all cursor-pointer opacity-0 group-hover/modal-img:opacity-100"
                        title="Next Image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Dots indicators */}
                      <div className="absolute bottom-6 flex gap-2 z-10 bg-black/35 backdrop-blur-xs px-3 py-1.5 rounded-full">
                        {activeCert.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIdx(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all border-0 p-0 cursor-pointer ${
                              idx === currentImageIdx
                                ? "bg-white scale-125"
                                : "bg-white/50 hover:bg-white/80"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6 text-left w-full text-xs text-muted font-semibold">
                  <div>
                    Verification ID:{" "}
                    <span className="font-mono text-heading">{activeCert.certId}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-[#FAFAF8] border border-border px-2.5 py-1 rounded-lg text-heading"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Else, display the custom stylized text certificate template we created
              <>
                {/* Double Border Frame */}
                <div className="absolute inset-4 border border-[#EAEAE0]/60 pointer-events-none rounded-2xl" />
                <div className="absolute inset-6 border border-accent/10 pointer-events-none rounded-xl" />

                {/* Credential Seal Header */}
                <div className="space-y-2 mb-8 mt-4">
                  <div className="flex justify-center gap-1 mb-2">
                    <span className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1.5 shadow-sm">
                      <img
                        src={activeCert.logo}
                        alt={activeCert.issuer}
                        className="w-full h-full object-contain"
                      />
                    </span>
                  </div>
                  <h3 className="text-xs uppercase tracking-widest text-muted font-bold">
                    Credential of Completion
                  </h3>
                  <div className="h-[1px] w-16 bg-accent/30 mx-auto" />
                </div>

                {/* Recipient Details */}
                <div className="space-y-4 mb-8">
                  <p className="text-sm font-light text-body font-serif italic">
                    This certifies that
                  </p>
                  <h4 className="text-3xl font-serif italic text-heading font-medium tracking-tight text-gradient">
                    Shadab Jamadar
                  </h4>
                  <p className="text-sm text-body max-w-md mx-auto leading-relaxed font-normal">
                    has successfully met all academic standards and guidelines prescribed by the
                    accrediting body to be recognized as an expert in:
                  </p>
                  <h5 className="text-lg md:text-xl font-bold text-heading tracking-tight max-w-lg mx-auto py-2.5 px-6 bg-[#FAFAF8] rounded-xl border border-border">
                    {activeCert.title}
                  </h5>
                </div>

                {/* Verification & Metadata */}
                <div className="w-full grid grid-cols-2 gap-8 border-t border-border/60 pt-8 text-left max-w-md mx-auto">
                  <div>
                    <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
                      ISSUING AUTHORITY
                    </span>
                    <span className="text-sm text-heading font-semibold mt-1 block">
                      {activeCert.issuer}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
                      DATE SECURED
                    </span>
                    <span className="text-sm text-heading font-semibold mt-1 block">
                      {activeCert.date}
                    </span>
                  </div>
                  <div className="col-span-2 text-center pt-2">
                    <span className="text-[10px] text-muted font-bold uppercase tracking-wider block">
                      CREDENTIAL SIGNATURE ID
                    </span>
                    <span className="text-xs font-mono text-body bg-slate-50 border border-slate-100 rounded px-2.5 py-1 inline-block mt-1.5 font-semibold">
                      {activeCert.certId}
                    </span>
                  </div>
                </div>

                {/* Verified Seal badge */}
                <div className="mt-8 flex items-center gap-2.5 bg-accent-soft/40 border border-[#d1ebd9]/65 rounded-full px-5 py-2.5 shadow-sm text-xs font-semibold text-[#205c46]">
                  <Check className="w-4 h-4 text-[#309c7d]" />
                  <span>Verified Credential Portfolio</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
