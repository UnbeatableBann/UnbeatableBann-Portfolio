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

import { SITE_URL } from "@/lib/config";
import { AnalyticsEngine } from "@/components/AnalyticsEngine";

function NotFoundComponent() {
  // ... (rest of NotFoundComponent/ErrorComponent/etc. are unchanged)
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
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="mailto:shadabjamadar4@gmail.com?subject=Let's%20Connect%20(Also,%20I%20found%20a%20bug!)&body=Hi%20Shadab%2C%0A%0AThis%20is%20%5BYour%20Name%5D.%20I%20was%20checking%20out%20your%20portfolio%20and%20I'm%20really%20impressed%20by%20your%20work%20in%20AI%20and%20product%20building.%20I%20would%20love%20to%20connect%20with%20you%20to%20discuss%20potential%20opportunities%20or%20just%20talk%20tech.%0A%0ABTW%2C%20your%20website%20is%20not%20working!%20%F0%9F%98%85%20I%20got%20an%20error%20screen%20while%20browsing%20your%20portfolio.%20You%20might%20want%20to%20look%20into%20that.%0A%0ACheers%2C%0A%5BYour%20Name%5D"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Mail me
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
      { property: "og:url", content: SITE_URL },
      {
        property: "og:image",
        content: `${SITE_URL}/og-image.png`,
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

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shadab Jamadar",
          url: SITE_URL,
          image: `${SITE_URL}/og-image.png`,
          sameAs: [
            "https://github.com/UnbeatableBann",
            "https://linkedin.com/in/shadab-jamadar",
            "https://medium.com/@shadabjamadar",
          ],
          jobTitle: "AI Engineer & Product Builder",
          description:
            "AI Engineer building intelligent products, agentic systems and production-ready AI applications that create real-world impact.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const gtmId = import.meta.env.VITE_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
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
      <AnalyticsEngine />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
