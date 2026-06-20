import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Shield, Eye, Lock, Globe, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/config";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Shadab Jamadar" },
      {
        name: "description",
        content: "Privacy Policy and cookie usage disclosure for Shadab Jamadar's portfolio.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
});

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased selection:bg-accent-soft selection:text-heading">
      <Navbar />

      {/* Main Content */}
      <section className="flex-grow pt-32 pb-24 px-6 lg:px-10 max-w-4xl mx-auto w-full space-y-12">
        {/* Header */}
        <div className="space-y-4 animate-fade-up">
          <div className="inline-flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs uppercase tracking-widest text-muted font-bold">
              COMPLIANCE
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-heading">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted">Last updated: June 20, 2026</p>
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none text-body space-y-6 leading-relaxed animate-fade-up [animation-delay:0.1s]">
          <p>
            This Privacy Policy explains how I (Shadab Jamadar) collect, use, and safeguard
            information when you visit my portfolio website at{" "}
            <a href={SITE_URL} className="text-accent font-semibold hover:underline">
              {SITE_URL.replace(/^https?:\/\//, "")}
            </a>
            . I am committed to respecting your privacy and ensuring transparency regarding any data
            collected.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 animate-fade-up [animation-delay:0.2s]">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-accent-soft/20 flex items-center justify-center text-accent">
                <Eye className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-heading">Information We Collect</h2>
            </div>
            <div className="text-body text-sm md:text-base space-y-3 leading-relaxed">
              <p>
                <strong>Google Analytics 4 (GA4):</strong> We use analytics cookies to measure site
                traffic, popular content, and product engagement. This compiles anonymous, aggregate
                statistics (such as page views, duration of visits, device types, and geographic
                region) without personally identifying you.
              </p>
              <p>
                <strong>Direct Communications:</strong> If you use the email buttons on this
                website, any information provided (including your name, email address, and message
                contents) is handled directly by your local email provider and is only used to
                respond to your inquiry.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-accent-soft/20 flex items-center justify-center text-accent">
                <Globe className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-heading">Cookies & Tracker Usage</h2>
            </div>
            <div className="text-body text-sm md:text-base space-y-3 leading-relaxed">
              <p>
                This website uses small text files called cookies to analyze visitor patterns. You
                can choose to accept or decline cookies via our consent notice. If you select
                "Decline", analytics scripts are completely blocked from running on your browser.
              </p>
              <p>
                You can also configure your browser to reject cookies automatically or block them
                via third-party extensions.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-accent-soft/20 flex items-center justify-center text-accent">
                <Lock className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-heading">GDPR & Regional Rights</h2>
            </div>
            <div className="text-body text-sm md:text-base space-y-3 leading-relaxed">
              <p>
                If you reside in the European Economic Area (EEA) or California, you are protected
                by regulatory frameworks (GDPR and CCPA). Under these policies, you have the right
                to access, rectify, or request erasure of any personal data.
              </p>
              <p>
                Since this site does not store or process personal databases or contact
                registrations, there is no direct personal information maintained on our servers.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-accent-soft/20 flex items-center justify-center text-accent">
                <FileText className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-heading">Contact Details</h2>
            </div>
            <p className="text-body text-sm md:text-base leading-relaxed">
              If you have any questions about this Privacy Policy or cookie settings, you can reach
              out via email at{" "}
              <a
                href="mailto:shadabjamadar4@gmail.com"
                className="text-accent font-semibold hover:underline"
              >
                shadabjamadar4@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
