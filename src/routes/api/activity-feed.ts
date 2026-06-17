import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/activity-feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const shouldRefresh = url.searchParams.get("refresh") === "true";

        try {
          const { ActivityAggregator } = await import("../../features/recent-activity/aggregator");
          const aggregator = new ActivityAggregator();
          const activities = await aggregator.getActivities(shouldRefresh);

          return new Response(JSON.stringify({ activities }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": shouldRefresh
                ? "no-store, no-cache, must-revalidate, proxy-revalidate"
                : "public, max-age=60, s-maxage=3600",
            },
          });
        } catch (error: any) {
          console.error("[API activity-feed] Unhandled error fetching activities:", error);
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
