import { useActivityFeed } from "../hooks/useActivityFeed";
import { Github, RefreshCw, AlertCircle, ExternalLink } from "lucide-react";

function MediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="5.5" cy="12" r="5.5" />
      <ellipse cx="14.5" cy="12" rx="2.75" ry="5.25" />
      <ellipse cx="20.5" cy="12" rx="1.25" ry="4.75" />
    </svg>
  );
}

export function ActivityFeed() {
  const { activities, isLoading, error, refresh } = useActivityFeed();

  // Show only the latest 3 items
  const latestActivities = activities.slice(0, 3);

  // Helper to get relative time
  function formatRelativeTime(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();

      if (isNaN(diffMs)) return "some time ago";

      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 10) return "just now";
      if (diffSecs < 60) return `${diffSecs}s ago`;
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "yesterday";
      if (diffDays < 30) return `${diffDays} days ago`;

      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return "some time ago";
    }
  }

  // Get corresponding logo and styles for each platform source
  function getActivityStyles(source: string) {
    if (source === "medium") {
      return {
        icon: MediumIcon,
        bgClass: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
      };
    }

    // Default GitHub styles
    return {
      icon: Github,
      bgClass: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    };
  }

  return (
    <div className="rounded-3xl p-6 md:p-8 bg-surface border border-border shadow-soft h-full flex flex-col justify-between relative overflow-hidden">
      {/* Background glow spanning the entire top area */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-48 rounded-full bg-warm-gradient opacity-35 blur-2xl pointer-events-none" />

      {/* Premium Glassmorphic Refreshing Overlay */}
      {isLoading && activities.length > 0 && (
        <div className="absolute inset-0 bg-surface/60 backdrop-blur-[2.5px] flex flex-col items-center justify-center z-20 transition-all duration-300">
          <div className="flex flex-col items-center gap-2.5 p-5 rounded-2xl bg-surface/90 border border-border/40 shadow-soft">
            <RefreshCw className="w-5 h-5 text-brand-orange animate-spin" />
            <span className="text-[11px] font-medium tracking-tight text-foreground/80">
              Checking for updates...
            </span>
          </div>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Recent Activity
          </div>
          <button
            onClick={() => refresh()}
            disabled={isLoading}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 disabled:opacity-50"
            title="Refresh Feed"
            aria-label="Refresh Feed"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-brand-orange" : ""}`}
            />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && activities.length === 0 && (
          <ul className="space-y-5">
            {[1, 2, 3].map((i) => (
              <li key={i} className="flex items-start gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-muted rounded w-4/5" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Error State */}
        {error && activities.length === 0 && (
          <div className="py-6 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto opacity-80" />
            <p className="text-sm text-muted-foreground">Failed to load feed</p>
            <button
              onClick={() => refresh()}
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted text-foreground font-medium transition-all"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && latestActivities.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No recent activity found.
          </div>
        )}

        {/* Feed List */}
        {latestActivities.length > 0 && (
          <ul className="space-y-5">
            {latestActivities.map((act) => {
              const styles = getActivityStyles(act.source);
              const IconComponent = styles.icon;

              return (
                <li
                  key={act.id}
                  className="group flex items-start gap-4 transition-all duration-200"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200 ${styles.bgClass}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <a
                      href={act.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-foreground hover:text-brand-orange transition-colors duration-150 flex items-start gap-1.5 group/link max-w-full break-words"
                    >
                      <span>{act.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-60 transition-opacity duration-150 flex-shrink-0 mt-1" />
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground font-normal">
                        {act.source === "github" ? `${act.description} • ` : ""}
                        {formatRelativeTime(act.timestamp)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
