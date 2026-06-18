import { useState, useEffect, useCallback } from "react";
import { NormalizedActivity } from "../types";

export function useActivityFeed() {
  const [activities, setActivities] = useState<NormalizedActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = useCallback(async (force = false) => {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();
    try {
      const url = force ? `/api/activity-feed?t=${Date.now()}` : "/api/activity-feed";

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch activities (status ${response.status})`,
        );
      }

      const data = await response.json();

      // Enforce a minimum load time of 800ms for manual refreshes for smooth, premium UI transitions
      if (force) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = 800 - elapsedTime;
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
      }

      setActivities(data.activities || []);
    } catch (err: unknown) {
      console.error("[useActivityFeed] Fetch error:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    isLoading,
    error,
    refresh: useCallback(() => fetchActivities(true), [fetchActivities]),
  };
}
