import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/activity-feed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const shouldRefresh = url.searchParams.get("refresh") === "true";

        if (shouldRefresh) {
          const { CONFIG } = await import("../../features/recent-activity/config");
          const authHeader = request.headers.get("Authorization");
          const urlSecret = url.searchParams.get("secret");
          const cronSecret = CONFIG.cronSecret;

          const isDev = process.env.NODE_ENV === "development";
          const hasSecret = cronSecret && cronSecret.trim() !== "";
          const isAuthorized =
            isDev ||
            (hasSecret &&
              ((authHeader && authHeader === `Bearer ${cronSecret}`) ||
                (urlSecret && urlSecret === cronSecret)));

          if (!isAuthorized) {
            return new Response(
              JSON.stringify({ error: "Unauthorized. Invalid or missing CRON_SECRET." }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              },
            );
          }
        }

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
        } catch (error: unknown) {
          console.error("[API activity-feed] Unhandled error fetching activities:", error);
          const message = error instanceof Error ? error.message : "Internal server error.";
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
