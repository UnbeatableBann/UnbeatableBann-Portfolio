import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  Mail,
  MapPin,
  Globe,
  Github,
  Compass,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Assets
import portraitHeroJpg from "@/assets/shadab-portrait-hero.jpg";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Me — Shadab Jamadar | AI Engineer & Product Builder" },
      {
        name: "description",
        content:
          "Who is Shadab Jamadar? Learn about my focus on AI products, agentic systems, contact details, and current research.",
      },
    ],
  }),
});

// Custom Icons consistent with existing branding
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

function AboutPage() {
  // FAQ Accordion State
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What are you currently working on?",
      a: "Building AI products focused on education, automation, and agentic systems.",
    },
    {
      q: "What technologies do you use?",
      a: "Python, FastAPI, LangGraph, RAG systems, LLMs, and modern backend infrastructure.",
    },
    {
      q: "Are you open to opportunities?",
      a: "Yes, especially AI Engineering, Backend Engineering, and Product Engineering opportunities.",
    },
    {
      q: "Why AI?",
      a: "Because it enables software to evolve from static tools into intelligent systems.",
    },
    {
      q: "How can we work together?",
      a: "Through freelance work, collaborations, internships, research, or full-time opportunities.",
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
            <div className="text-label-custom text-muted font-bold tracking-wider">
              ABOUT
            </div>

            <h1 className="text-hero-title leading-[1.05] tracking-tight text-heading">
              Hello, I'm
              <br />
              <span className="font-serif italic text-accent/80 font-normal">Shadab Jamadar</span>
              <span className="text-accent">.</span>
            </h1>

            <p className="text-hero-desc text-body max-w-xl font-normal leading-[1.7]">
              AI Engineer focused on building intelligent products, agentic systems, and educational
              technology.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-7 py-3.5 text-sm font-semibold hover:bg-primary-hover transition-all duration-200"
              >
                Let's Connect
              </a>
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-heading hover:bg-[#FAFAF8] transition-all duration-200"
              >
                View Products
              </a>
            </div>
          </div>

          {/* Right Column (Professional Image) */}
          <div className="lg:col-span-5 relative flex items-center justify-center animate-fade-up [animation-delay:0.2s]">
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-border shadow-soft bg-white p-4">
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
              <img
                src={portraitHeroJpg}
                alt="Shadab Jamadar professional portrait"
                className="w-full h-full object-cover rounded-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-24 border-t border-border bg-white">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Header Label Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                Introduction
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-heading">
              Who I Am & What I Do<span className="text-accent">.</span>
            </h2>
          </div>

          {/* Content Details Column */}
          <div className="lg:col-span-8 space-y-8 text-body text-base leading-[1.8] font-normal">
            <p className="text-lg text-heading font-medium leading-relaxed">
              I am an AI Engineer passionate about building systems that bridge the gap between
              complex research models and production-ready software.
            </p>
            <p>
              Rather than simply wrapping commercial LLM APIs, I focus on engineering modular
              backend architectures, structural knowledge databases, and custom evaluators. My
              development philosophy is rooted in stability, testability, and clean microservices
              design.
            </p>

            {/* Quick highlight pillars */}
            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border/60">
              <div className="space-y-2">
                <h3 className="font-bold text-heading text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Product Engineering
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Translating client problems and system bottlenecks into clean interfaces,
                  normalized schemas, and responsive user layouts.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-heading text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Complex Reasoning
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Structuring systems that reason autonomously using tools, semantic graphs, and
                  context-dependent search.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-border bg-[#FAFAF8] scroll-mt-[0px]">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto animate-fade-up">
            <div className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                CONTACT
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-heading">
              Get in touch today<span className="text-accent">.</span>
            </h2>
            <p className="text-sm md:text-base text-body leading-relaxed font-normal">
              Feel free to contact me if you have any questions. I'm available for new projects,
              collaborations, or just for a quick chat.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start animate-fade-up [animation-delay:0.2s]">
            {/* Card 1: Email */}
            <div className="bg-[#EFEFEA] p-2 rounded-[24px] shadow-soft hover:shadow-card transition-all duration-300 group">
              <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-6 flex flex-col items-center text-center gap-5 min-h-[260px] justify-between">
                <div className="p-3.5 rounded-full border border-border bg-[#FAFAF8] group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-accent shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-grow flex flex-col justify-center">
                  <h3 className="text-[13px] font-bold text-muted uppercase tracking-wider">
                    Email Address
                  </h3>
                  <a
                    href="mailto:shadabjamadar4@gmail.com?subject=Inquiry"
                    className="text-base font-bold text-heading hover:text-accent transition-colors break-all block"
                  >
                    shadabjamadar4@gmail.com
                  </a>
                </div>
                <p className="text-xs text-muted leading-relaxed font-normal max-w-[240px]">
                  For collaborations or recruiter inquiries, drop me an email and I’ll respond
                  within 24 hours.
                </p>
              </div>
            </div>

            {/* Card 2: LinkedIn & Socials */}
            <div className="bg-[#EFEFEA] p-2 rounded-[24px] shadow-soft hover:shadow-card transition-all duration-300 group">
              <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-6 flex flex-col items-center text-center gap-5 min-h-[260px] justify-between">
                <div className="p-3.5 rounded-full border border-border bg-[#FAFAF8] group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-accent shadow-sm">
                  <LinkedinIcon className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-grow flex flex-col justify-center items-center">
                  <h3 className="text-[13px] font-bold text-muted uppercase tracking-wider">
                    Professional Networks
                  </h3>
                  <a
                    href="https://linkedin.com/in/shadab-jamadar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-heading hover:text-accent transition-colors block mb-1"
                  >
                    linkedin.com/in/shadab-jamadar
                  </a>

                  {/* Secondary Socials */}
                  <div className="flex gap-4 pt-1 justify-center">
                    <a
                      href="https://github.com/UnbeatableBann"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted hover:text-accent font-semibold transition-colors flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                    <a
                      href="https://medium.com/@shadabjamadar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted hover:text-accent font-semibold transition-colors flex items-center gap-1"
                    >
                      <MediumIcon className="w-3.5 h-3.5" /> Medium
                    </a>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed font-normal max-w-[240px]">
                  Prefer a professional network? Connect or message me for direct consultations and
                  articles.
                </p>
              </div>
            </div>

            {/* Card 3: Location */}
            <div className="bg-[#EFEFEA] p-2 rounded-[24px] shadow-soft hover:shadow-card transition-all duration-300 group">
              <div className="bg-white rounded-[16px] border border-[#e8e8e8] p-6 flex flex-col items-center text-center gap-5 min-h-[260px] justify-between">
                <div className="p-3.5 rounded-full border border-border bg-[#FAFAF8] group-hover:scale-110 transition-transform duration-300 flex-shrink-0 text-accent shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-grow flex flex-col justify-center">
                  <h3 className="text-[13px] font-bold text-muted uppercase tracking-wider">
                    Current Location
                  </h3>
                  <a
                    href="https://maps.google.com/?q=18.611487,73.773248"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-heading hover:text-accent transition-colors block"
                  >
                    Ayesha Manzil, Pune
                  </a>
                </div>
                <p className="text-xs text-muted leading-relaxed font-normal max-w-[240px]">
                  <a
                    href="https://maps.google.com/?q=18.611487,73.773248"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors hover:underline block"
                  >
                    Kanihaya Park, Belthika Nagar, Thergaon, Pune, Maharashtra
                  </a>
                </p>
              </div>
            </div>

            {/* Row 2 - Card 4: Google Map (Spans 3 Columns) */}
            <div className="md:col-span-3 bg-[#EFEFEA] p-2 rounded-[24px] shadow-soft hover:shadow-card transition-all duration-300 group/map">
              <div className="bg-white rounded-[16px] border border-[#e8e8e8] overflow-hidden flex flex-col md:relative md:h-[500px]">
                {/* Floating Location Card */}
                <div className="place-details-compact-container w-full bg-white p-6 border-b md:border border-border md:absolute md:top-6 md:left-6 md:z-10 md:max-w-[340px] md:rounded-[20px] md:shadow-card transition-all duration-300 hover:md:-translate-y-1 hover:md:shadow-card/90 flex flex-col gap-4 animate-fade-up">
                  <div className="space-y-1 text-left">
                    <h4 className="text-lg font-bold text-heading leading-tight">Ayesha Manzil</h4>
                    <p className="text-xs text-muted leading-relaxed font-normal">
                      Residential location in Thergaon, Pune.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 text-left">
                    <div className="p-2 rounded-lg bg-accent-soft text-accent flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-body leading-relaxed font-normal">
                      Kanihaya Park, Belthika Nagar, Thergaon, Pune, Maharashtra
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/80">
                    <a
                      href="https://maps.google.com/?q=18.611487,73.773248"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-border bg-white text-xs font-bold text-heading hover:bg-[#FAFAF8] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Open Maps</span>
                    </a>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=18.611487,73.773248"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-xs font-bold text-white hover:bg-primary-hover active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>

                {/* Map Iframe Container */}
                <div className="w-full h-[450px] md:h-full relative flex-grow">
                  {/* Subtle overlay gradient to improve card readability */}
                  <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background/45 via-background/15 to-transparent pointer-events-none z-0" />

                  <iframe
                    style={{ border: 0 }}
                    className="w-full h-full relative z-0"
                    src="https://maps.google.com/maps?q=18.611487,73.773248&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ayesha Manzil Map Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-border bg-white">
        <div className="mx-auto max-w-[1280px] w-full px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Header */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-xs uppercase tracking-widest text-muted font-bold">
                Inquiries
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-heading">
              Frequently Asked Questions<span className="text-accent">.</span>
            </h2>
            <p className="text-sm text-body leading-relaxed max-w-sm font-normal">
              Quick answers to common questions about my technical background, projects, and work
              philosophy.
            </p>
          </div>

          {/* Accordion container */}
          <div className="lg:col-span-8 divide-y divide-border/60">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div key={idx} className="py-5 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-heading hover:text-accent transition-colors py-2 bg-transparent border-0 cursor-pointer text-base md:text-lg tracking-tight"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`p-1.5 rounded-full border border-border bg-[#FAFAF8] text-body group-hover:text-accent transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "max-h-[250px] opacity-100 mt-3"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-body text-sm leading-[1.7] font-normal pl-1 border-l-2 border-accent-soft">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
