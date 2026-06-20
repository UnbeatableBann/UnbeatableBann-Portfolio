import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the user has already chosen
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small timeout to make it feel deliberate and not block initial page render
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined");
    setVisible(false);

    // Fire event to notify Analytics component
    window.dispatchEvent(new Event("cookie-consent-updated"));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-fade-up">
      {/* Premium Glassmorphic Card */}
      <div className="bg-[#FAF8F5]/90 backdrop-blur-md border border-[#e5e0d8] rounded-2xl p-5 shadow-xl flex flex-col gap-4 relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-muted hover:text-heading transition-colors"
          aria-label="Close consent banner"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-lg bg-accent-soft/20 flex items-center justify-center text-accent flex-shrink-0">
            <Cookie className="w-5 h-5 animate-pulse" />
          </span>
          <div className="space-y-1.5 min-w-0 pr-6">
            <h3 className="text-sm font-bold text-heading flex items-center gap-1.5">
              Cookie Preferences <Sparkles className="w-3.5 h-3.5 text-accent" />
            </h3>
            <p className="text-xs text-body leading-relaxed font-normal">
              I use analytics cookies to measure how you interact with my projects. You can choose
              to decline if you prefer not to be tracked. Read the{" "}
              <Link to="/privacy" className="text-accent hover:underline font-semibold">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>

        <div className="flex gap-2.5 justify-end">
          <button
            onClick={() => handleChoice(false)}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-body hover:bg-[#EFECE6]/50 transition duration-200"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-primary hover:bg-primary-hover shadow-sm transition duration-200"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
