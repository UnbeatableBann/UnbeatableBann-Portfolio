import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/blog")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const shouldRefresh = url.searchParams.get("refresh") === "true";

        try {
          const { BlogAggregator } = await import("../../features/blog/aggregator");
          const aggregator = new BlogAggregator();
          const articles = await aggregator.getArticles(shouldRefresh);

          return new Response(JSON.stringify({ articles }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": shouldRefresh
                ? "no-store, no-cache, must-revalidate, proxy-revalidate"
                : "public, max-age=60, s-maxage=3600",
            },
          });
        } catch (error: any) {
          console.error("[API blog] Unhandled error fetching blog articles:", error);
          return new Response(
            JSON.stringify({ error: error.message || "Internal server error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
