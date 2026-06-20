import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import "../styles.css";
import shadabLogo from "@/assets/shadab-logo.png";
import { Analytics } from "@/components/Analytics";
import { GA_ID } from "@/lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shadab Jamadar — AI Engineer & Product Builder" },
      {
        name: "description",
        content:
          "AI Engineer building intelligent products, agentic systems and production-ready AI applications that create real-world impact.",
      },
      { name: "author", content: "Shadab Jamadar" },
      { property: "og:title", content: "Shadab Jamadar — AI Engineer & Product Builder" },
      {
        property: "og:description",
        content: "Building AI systems that teach, reason and automate real work.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://unbeatable-bann-portfolio.vercel.app" },
      {
        property: "og:image",
        content: "https://unbeatable-bann-portfolio.vercel.app/og-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Shadab Jamadar — AI Engineer & Product Builder" },
      {
        name: "twitter:description",
        content: "Building AI systems that teach, reason and automate real work.",
      },
    ],
    links: [
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      ...(GA_ID ? [{ rel: "dns-prefetch", href: "https://www.googletagmanager.com" }] : []),
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "icon", type: "image/png", href: shadabLogo },
      // Single stylesheet link — display=swap in the URL prevents render-blocking.
      // React 19 adds `precedence` to every head() stylesheet, which is incompatible
      // with the media="print"/onLoad trick, so we use display=swap instead.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    // Inject the gtag.js loader script only when VITE_GA_ID is set.
    // Using scripts[] here puts it in <head> as a real <script> tag.
    scripts: GA_ID
      ? [
          {
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
            async: true,
          },
        ]
      : [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Tracks GA4 page views on every SPA navigation — renders nothing */}
      <Analytics />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
