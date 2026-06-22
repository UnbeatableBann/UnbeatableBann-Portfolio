import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import { SITE_URL } from "@/lib/config";
import {
  ArrowRight,
  Github,
  Mail,
  Download,
  ArrowUpRight,
  Bot,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useResumeUrl } from "@/hooks/useResumeUrl";
import {
  HeroGreetingOption,
  HeroThoughtStreamOption,
  HeroBoatAnimationOption,
} from "@/components/HeroStatusBadge";

import portraitHero from "@/assets/shadab-portrait-hero-transparent.webp";
import curio from "@/assets/product-curio.webp";
import interviewer from "@/assets/product-interviewer.webp";
import trading from "@/assets/product-trading.webp";
import floatRag from "@/assets/float-rag.webp";
import floatAgent from "@/assets/float-agent.webp";

import criqlLogo from "@/assets/company-logos/criql-labs.png";
import renuLogo from "@/assets/company-logos/renu-sharma.webp";
import plantoLogo from "@/assets/company-logos/planto-ai.webp";

import inProgress1 from "@/assets/in-progress-1.jpg";
import inProgress2 from "@/assets/in-progress-2.jpg";
import inProgress3 from "@/assets/in-progress-3.jpg";
import inProgress4 from "@/assets/in-progress-4.jpg";
import inProgress5 from "@/assets/in-progress-5.jpg";

import { ThoughtOfDayCard } from "@/features/thought-of-day";
import { ActivityFeed } from "@/features/recent-activity/components/ActivityFeed";
import { trackEvent } from "@/lib/analytics";

import { lazy, Suspense } from "react";
const SkillsGraph = lazy(() =>
  import("@/components/SkillsGraph").then((module) => ({ default: module.SkillsGraph })),
);

function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="5.5" cy="12" r="5.5" />
      <ellipse cx="14.5" cy="12" rx="2.75" ry="5.25" />
      <ellipse cx="20.5" cy="12" rx="1.25" ry="4.75" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shadab Jamadar — AI Engineer & Product Builder" },
      {
        name: "description",
        content:
          "AI Engineer focused on building intelligent products, agentic systems, and production-ready AI applications.",
      },
      { property: "og:title", content: "Shadab Jamadar — AI Engineer" },
      {
        property: "og:description",
        content: "Building AI systems that teach, reason and automate real work.",
      },
    ],
    links: [
      { rel: "preload", href: portraitHero, as: "image", type: "image/webp" },
      { rel: "canonical", href: `${SITE_URL}/` },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen lg:h-screen lg:max-h-[900px] flex items-center pt-20 bg-gradient-to-br from-[#f2eefc] via-[#eef4df] to-[#fdf5eb]"
    >
      {/* Subtle moving grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70 pointer-events-none -z-20" />

      {/* Background Ambient Gradients with premium ambient flow animation */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-brand-purple/10 blur-[130px] -z-10 pointer-events-none translate-x-[20%] -translate-y-[20%] animate-ambient-flow" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-orange/6 blur-[110px] -z-10 pointer-events-none -translate-x-[20%] translate-y-[20%] animate-ambient-flow [animation-delay:4s]" />
      <div className="absolute top-[20%] left-[25%] w-[450px] h-[450px] rounded-full bg-accent-soft/30 blur-[100px] -z-10 pointer-events-none animate-ambient-flow [animation-delay:8s]" />

      <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        {/* Left Side (Content) */}
        <div className="lg:col-span-7 space-y-8 animate-fade-up">
          {/* TO SWITCH BETWEEN HERO STATUS BADGE OPTIONS, UNCOMMENT THE DESIRED ONE BELOW: */}
          {/* <HeroGreetingOption /> */}
          {/* <HeroThoughtStreamOption /> */}
          <HeroBoatAnimationOption />

          <h1 className="text-hero-title leading-[1.05] tracking-tight text-heading">
            <span className="font-serif italic text-accent/70 font-normal block mb-2 md:mb-3">
              Hi, I'm
            </span>
            Shadab Jamadar
          </h1>

          <p className="text-hero-desc text-body max-w-xl font-normal leading-[1.7]">
            Building AI products so humans can spend more time creating new problems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <div className="relative group inline-flex">
              {/* Soft, light ambient blur glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6e9c53] via-[#3b82f6] to-[#8b5cf6] rounded-full blur-xl opacity-40 group-hover:opacity-65 transition-all duration-300 pointer-events-none" />

              {/* Thicker border wrapper containing the rotating gradient */}
              <div className="relative p-[2.8px] rounded-full overflow-hidden bg-zinc-900/10 inline-flex">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_10%,#6e9c53_35%,#3b82f6_50%,#8b5cf6_65%,transparent_90%)] animate-border-beam pointer-events-none" />
                <Link
                  to="/products"
                  className="relative inline-flex items-center gap-2 rounded-full bg-primary text-white px-7 py-4 text-sm font-semibold hover:bg-primary-hover transition-all duration-200 z-10"
                >
                  Explore My Work <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <Link
              to="/about"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-4 text-sm font-semibold text-heading hover:bg-[#FAFAF8] transition-all duration-200"
            >
              Let's Connect
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-6">
            {[
              {
                Icon: Github,
                label: "GitHub",
                href: "https://github.com/UnbeatableBann",
                brandClass:
                  "text-[#24292f] border-[#24292f]/20 hover:bg-[#24292f]/5 hover:border-[#24292f]",
              },
              {
                Icon: LinkedinIcon,
                label: "LinkedIn",
                href: "https://linkedin.com/in/shadab-jamadar",
                brandClass:
                  "text-[#0A66C2] border-[#0A66C2]/20 hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]",
              },
              {
                Icon: MediumIcon,
                label: "Medium",
                href: "https://medium.com/@shadabjamadar",
                brandClass:
                  "text-[#090909] border-[#090909]/20 hover:bg-[#090909]/5 hover:border-[#090909]",
              },
              {
                Icon: Mail,
                label: "Email",
                href: "mailto:shadabjamadar4@gmail.com?subject=Collaboration%20Inquiry%20%2F%20Let's%20Connect&body=Hi%20Shadab%2C%0A%0AI%20hope%20you%20are%20doing%20well.%20I%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20work%20in%20AI%20and%20software%20engineering.%20I%20would%20love%20to%20connect%20to%20discuss%20potential%20opportunities%20or%20collaborations.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D",
                brandClass:
                  "text-[#EA4335] border-[#EA4335]/20 hover:bg-[#EA4335]/5 hover:border-[#EA4335]",
              },
            ].map(({ Icon, label, href, brandClass }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`grid place-items-center w-11 h-11 rounded-full border bg-white transition-all duration-200 ${brandClass}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side (Portrait with colored background circle) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-[360px] h-[360px] md:w-[460px] md:h-[460px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] aspect-square flex items-center justify-center overflow-visible">
            {/* Soft-Green Circle representing sketches' Colored Transparent Circle */}
            <div
              className="absolute bg-accent-soft/70 rounded-full scale-105 z-0"
              style={{ width: "82%", height: "82%" }}
            />

            {/* The Portrait Image (overflowing the circle border) */}
            <div className="absolute inset-0 flex items-end justify-center overflow-visible z-10">
              <img
                src={portraitHero}
                alt="Portrait of Shadab Jamadar"
                className="w-full h-full object-contain object-bottom"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurrentlyBuilding() {
  const row1Images = [
    curio,
    interviewer,
    trading,
    floatRag,
    floatAgent,
    curio,
    interviewer,
    trading,
    floatRag,
    floatAgent,
  ];

  const row2Images = [
    trading,
    floatRag,
    floatAgent,
    curio,
    interviewer,
    trading,
    floatRag,
    floatAgent,
    curio,
    interviewer,
  ];

  return (
    <section
      id="about"
      className="scroll-mt-[100px] mx-auto max-w-[1340px] px-6 lg:px-20 py-12 lg:h-[95vh] lg:min-h-[1100px] flex flex-col justify-center gap-6 overflow-visible lg:overflow-hidden"
    >
      <div className="max-w-2xl">
        <div className="text-label-custom text-muted font-semibold mb-2">Focus & Stream</div>
        <h2 className="text-section-title font-bold tracking-tight text-heading">
          Currently Building & Activity
        </h2>
      </div>

      <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1 justify-between max-w-[1120px] w-full mx-auto">
        {/* Currently Building Block */}
        <div className="relative rounded-3xl border border-border bg-[#FAFAF8] shadow-soft overflow-hidden h-[530px] md:h-[560px] w-full max-w-[1120px] mx-auto flex items-center justify-center p-4 flex-shrink-0">
          {/* Dual-row scrolling screenshot marquees in background (like muditjain.in) */}
          <div className="absolute inset-0 z-0 opacity-[0.65] overflow-hidden select-none pointer-events-none flex flex-col justify-center gap-4 py-4 blur-[1 px]">
            {/* Top Row: Scrolls right to left */}
            <div className="relative h-[210px] w-full overflow-hidden">
              <div className="flex w-max items-center flex-shrink-0 animate-marquee">
                {row1Images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-[210px] w-[320px] object-cover rounded-xl flex-shrink-0 border border-border/40 shadow-sm mr-4"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Row: Scrolls left to right */}
            <div className="relative h-[210px] w-full overflow-hidden">
              <div className="flex w-max items-center flex-shrink-0 animate-marquee-reverse">
                {row2Images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-[210px] w-[320px] object-cover rounded-xl flex-shrink-0 border border-border/40 shadow-sm mr-4"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 bg-white/10" />
          </div>

          {/* Details Box overlay (Centered Vertical White Card) */}
          <div className="relative z-10 w-full max-w-[350px] bg-white border border-border shadow-2xl rounded-2xl p-6 flex flex-col justify-between h-[46 0px] gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-accent-soft px-3.5 py-1 text-xs text-accent font-medium w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-accent opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                </span>
                In Progress
              </div>
              <h3 className="text-2xl font-semibold text-heading">AI Mock Interview Platform</h3>
              <p className="text-small-custom text-body leading-[1.6]">
                FastAPI and Redis multi-container architecture. Designed and engineered role-based
                authentication and secure APIs supporting 100+ concurrent candidate sessions.
              </p>
            </div>

            <div className="border-t border-border/60 pt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-label-custom text-muted">EXPECTED RELEASE</div>
                <div className="text-sm font-medium text-heading mt-1">Q3 2026</div>
              </div>
              <div className="text-right">
                <div className="text-label-custom text-muted font-sans">DETAILS</div>
                <a
                  href="https://github.com/UnbeatableBann/Susan-AI-Interviewer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-white px-4 py-2 text-xs font-semibold hover:bg-primary-hover transition-all mt-1"
                >
                  Explore Details
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-body">
                <span>Development Progress</span>
                <span>85%</span>
              </div>
              <div className="relative h-2 rounded-full bg-[#FAFAF8] border border-border overflow-hidden">
                {/* Progress Fill with nested Bullet Fire Spark */}
                <div
                  className="relative h-full bg-accent rounded-full overflow-hidden"
                  style={{ width: "85%" }}
                >
                  {/* Bullet Fire Spark moving from 0% to 100% of the done progress */}
                  <div className="absolute inset-y-0 w-16 animate-bullet-fire flex items-center pointer-events-none">
                    {/* Fire/comet tail */}
                    <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-white/50 to-white" />
                    {/* Glowing Bullet Head */}
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,1),0_0_10px_3px_#6e9c53] flex-shrink-0 -ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Twin block: Recent Activity & Thought */}
        <div className="grid md:grid-cols-2 gap-6 lg:min-h-0 lg:flex-1">
          <div className="h-full lg:overflow-y-auto pr-1">
            <ActivityFeed />
          </div>
          <div className="h-full lg:overflow-y-auto pr-1">
            <ThoughtOfDayCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSnapshot() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isManualInteraction = useRef(false);
  const timeoutRef = useRef<number | null>(null);

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

  const handleManualExpand = (idx: number) => {
    isManualInteraction.current = true;
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      isManualInteraction.current = false;
    }, 1200);

    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -40% 0px", // triggers around middle third of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isManualInteraction.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = jobRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setExpandedIndex(index);
          }
        }
      });
    }, observerOptions);

    jobRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      id="experience"
      className="scroll-mt-[100px] mx-auto max-w-[1280px] px-6 lg:px-10 pt-[140px] pb-[90px]"
    >
      <div className="grid lg:grid-cols-12 gap-6 items-start relative">
        {/* Left Column (Sticky Title) */}
        <div className="lg:col-span-4 lg:sticky lg:top-[120px] self-start space-y-4">
          <div className="text-label-custom text-muted font-semibold">Experience Timeline</div>
          <h2 className="text-section-title font-bold tracking-tight text-heading">
            Professional Journey
          </h2>
          <p className="text-body-custom text-body max-w-sm">
            Milestones and roles in software development, data science, and AI research that have
            shaped my technical approach.
          </p>
          <div className="pt-4">
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 text-xs font-semibold text-black hover:underline cursor-pointer"
            >
              View Full Journey <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column (Timeline) */}
        <div className="lg:col-span-8 relative border-l border-border ml-4 pl-8 space-y-12">
          {jobs.map((job, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                ref={(el) => {
                  jobRefs.current[idx] = el;
                }}
                className="relative group"
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
                  <div
                    className="flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none group/header"
                    onClick={() => handleManualExpand(idx)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center overflow-hidden p-1 flex-shrink-0 shadow-sm transition-all duration-300 group-hover/header:scale-110 group-hover/header:shadow-md">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg text-heading group-hover/header:text-accent transition-colors">
                          {job.role}
                        </h3>
                        <p className="text-sm text-body">
                          {job.company} · {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted font-medium">{job.duration}</span>
                      <div
                        className="p-1.5 rounded-full bg-white border border-border text-body hover:text-heading transition-colors group-hover/header:border-accent/40"
                        title={isExpanded ? "Collapse details" : "Expand details"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
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
  );
}

function Products() {
  const projects = [
    {
      slug: "curio",
      domain: "Education AI",
      name: "Curio - AI Co-Teacher",
      description:
        "An Agentic AI system that autonomously handles 5+ core teaching tasks, reducing manual workload for teachers by up to 40%. Generates educational assets like quizzes, images, and summaries, and integrates real-time voice interaction using Gemini for live classes.",
      tech: ["LangGraph", "FastAPI", "Picovoice", "Gemini API", "React"],
      image: curio,
      link: "https://github.com/UnbeatableBann",
    },
    {
      slug: "llm-evaluation-pipeline",
      domain: "AI Engineering & Observability",
      name: "LLM Evaluation Pipeline",
      description:
        "A deterministic evaluation pipeline measuring relevance, completeness, hallucination, and latency on 150+ queries. Features modular loader-metrics-aggregator workflows, embedding caching, and local inference for 25% faster batch executions.",
      tech: ["Python", "Sentence Transformers", "Redis", "Docker", "FastAPI"],
      image: interviewer,
      link: "https://github.com/UnbeatableBann/LLM-Evaluation-Pipeline",
    },
    {
      slug: "quantix",
      domain: "Fintech & Developer Tools",
      name: "Quantix - Algorithmic Trading SDK",
      description:
        "A unified Python algorithmic trading SDK integrating Zerodha, Angel One, and FivePaisa broker APIs. Designed a broker-agnostic instrument master schema and sqlite ingestion pipeline that normalizes 100% of broker-specific fields.",
      tech: ["Python", "SQLite", "Poetry", "REST APIs", "Structured Logging"],
      image: trading,
      link: "https://github.com/UnbeatableBann",
    },
  ];

  return (
    <section
      id="projects"
      className="scroll-mt-[100px] mx-auto max-w-[1280px] px-6 lg:px-10 pt-[70px] pb-[140px]"
    >
      <div className="max-w-2xl mb-16">
        <div className="text-label-custom text-muted font-semibold mb-3">Featured Work</div>
        <h2 className="text-section-title font-bold tracking-tight text-heading">
          Flagship Products
        </h2>
        <p className="mt-4 text-body-custom text-body">
          A selection of AI products and tools built end-to-end, solving real classroom, developer,
          and data-engineering challenges.
        </p>
      </div>

      <div className="space-y-24">
        {projects.map((proj, idx) => (
          <div key={idx} className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Side (Details) */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {proj.domain}
              </span>
              <h3 className="text-3xl font-bold text-heading">{proj.name}</h3>
              <p className="text-body-custom text-body leading-[1.8]">{proj.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-[#FAFAF8] text-body border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/products/$slug"
                  params={{ slug: proj.slug }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white px-5 py-3 text-sm font-semibold hover:bg-primary-hover transition duration-200"
                >
                  View Project <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side (Visual Mockup) */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-border shadow-card aspect-[4/3] bg-[#FAFAF8] group">
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactCTA() {
  const resumeUrl = useResumeUrl();

  const handleDownload = () => {
    trackEvent("resume_download", { method: "button", page: "home" });
    if (!resumeUrl) return;
    // Automatically trigger the file download
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Shadab_Jamadar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-[100px] mx-auto max-w-[1280px] px-6 lg:px-10 pb-[140px] pt-12"
    >
      <div className="relative rounded-3xl border border-border bg-white p-6 md:p-16 shadow-card overflow-hidden">
        {/* Subtle moving grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-accent-soft/40 blur-3xl -z-10 animate-ambient-flow" />
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-label-custom text-muted font-semibold">Get In Touch</div>
            <h2 className="text-section-title font-bold tracking-tight text-heading">
              Let's build something real.
            </h2>
            <p className="text-body-custom text-body max-w-lg">
              Have a product challenge, research initiative, or interesting role? Let's connect and
              design AI that does useful work.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:shadabjamadar4@gmail.com?subject=Collaboration%20Inquiry%20%2F%20Let's%20Connect&body=Hi%20Shadab%2C%0A%0AI%20hope%20you%20are%20doing%20well.%20I%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20work%20in%20AI%20and%20software%20engineering.%20I%20would%20love%20to%20connect%20to%20discuss%20potential%20opportunities%20or%20collaborations.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"
                onClick={() => trackEvent("contact_form_submission", { method: "email_button" })}
                className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3.5 text-sm font-semibold hover:bg-primary-hover transition duration-200"
              >
                Send an Email <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-semibold text-heading hover:bg-[#FAFAF8] transition duration-200"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {[
              {
                Icon: Mail,
                label: "Email",
                value: "shadabjamadar4@gmail.com",
                href: "mailto:shadabjamadar4@gmail.com?subject=Collaboration%20Inquiry%20%2F%20Let's%20Connect&body=Hi%20Shadab%2C%0A%0AI%20hope%20you%20are%20doing%20well.%20I%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20work%20in%20AI%20and%20software%20engineering.%20I%20would%20love%20to%20connect%20to%20discuss%20potential%20opportunities%20or%20collaborations.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D",
              },
              {
                Icon: LinkedinIcon,
                label: "LinkedIn",
                value: "in/shadab-jamadar",
                href: "https://linkedin.com/in/shadab-jamadar",
              },
              {
                Icon: MediumIcon,
                label: "Medium",
                value: "medium.com/@shadabjamadar",
                href: "https://medium.com/@shadabjamadar",
              },
              {
                Icon: Github,
                label: "GitHub",
                value: "github/UnbeatableBann",
                href: "https://github.com/UnbeatableBann",
              },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (href.startsWith("mailto:")) {
                    trackEvent("contact_form_submission", { method: "email_card" });
                  } else {
                    trackEvent("external_click", { destination: label, page: "home_contact" });
                  }
                }}
                className="flex items-center gap-3 sm:gap-4 rounded-xl border border-border p-3 sm:p-4 bg-[#FAFAF8] hover:bg-white hover:border-[#8A8A8A] transition duration-200 min-w-0"
              >
                <span className="grid place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-border text-heading flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted font-semibold">{label}</div>
                  <div
                    className="text-xs sm:text-sm font-semibold text-heading truncate break-all"
                    title={value}
                  >
                    {value}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto text-muted flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsGraphFallback() {
  return (
    <section
      id="skills"
      className="scroll-mt-[100px] mx-auto max-w-[1280px] px-6 lg:px-10 pt-10 md:pt-14 pb-[140px] select-none"
    >
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

      <div className="w-full relative bg-white rounded-2xl border border-border overflow-hidden h-[580px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-primary animate-spin" />
          <p className="text-sm font-semibold text-muted-foreground">
            Loading interactive skills graph...
          </p>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111]">
      <Navbar />
      <Hero />
      <CurrentlyBuilding />
      <ExperienceSnapshot />
      <Products />
      <Suspense fallback={<SkillsGraphFallback />}>
        <SkillsGraph />
      </Suspense>
      <ContactCTA />
      <Footer />
    </main>
  );
}
