import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useResumeUrl } from "@/hooks/useResumeUrl";

export function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="5.5" cy="12" r="5.5" />
      <ellipse cx="14.5" cy="12" rx="2.75" ry="5.25" />
      <ellipse cx="20.5" cy="12" rx="1.25" ry="4.75" />
    </svg>
  );
}

export function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const resumeUrl = useResumeUrl();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSubPage = location.pathname.startsWith("/blog") || location.pathname.startsWith("/products") || location.pathname.startsWith("/journey") || location.pathname.startsWith("/about");
  const isBlogPage = location.pathname.startsWith("/blog");
  const isProductsPage = location.pathname.startsWith("/products");
  const isJourneyPage = location.pathname.startsWith("/journey");
  const isAboutPage = location.pathname.startsWith("/about");

  const navLinks = [
    { label: "Home", href: isSubPage ? "/#home" : "#home" },
    { label: "About", href: "/about", active: isAboutPage },
    { label: "Journey", href: "/journey", active: isJourneyPage },
    { label: "Products", href: "/products", active: isProductsPage },
    { label: "Blog", href: "/blog", active: isBlogPage },
  ];


  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "top-4 px-4 md:px-8" : "top-0 px-0"
      }`}
    >
      <header
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "max-w-[850px] h-14 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E8E8] shadow-soft px-6"
            : "max-w-[1280px] h-20 bg-transparent px-6 lg:px-10"
        }`}
      >
        <a href={isBlogPage ? "/#home" : "#home"} className="flex items-center gap-2">
          <span className="grid place-items-center w-7 h-7 rounded-lg bg-primary text-white font-bold text-xs">
            SJ
          </span>
          <span className="font-semibold tracking-tight text-heading text-sm md:text-base">
            Shadab Jamadar
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                l.active
                  ? "text-primary font-semibold"
                  : "text-body hover:text-heading"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={resumeUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-full bg-primary text-white font-semibold hover:bg-primary-hover transition-all duration-200 ${
            isScrolled ? "text-xs px-4 py-2" : "text-sm px-5 py-2.5"
          }`}
        >
          Resume
        </a>
      </header>
    </div>
  );
}
