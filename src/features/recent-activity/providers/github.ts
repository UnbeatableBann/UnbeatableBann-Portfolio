import { ActivityProvider, NormalizedActivity } from "../types";
import { CONFIG } from "../config";

export class GitHubProvider implements ActivityProvider {
  name = "github";
  private username: string;
  private token?: string;

  constructor() {
    this.username = CONFIG.githubUsername;
    this.token = CONFIG.githubToken;
  }

  async fetchActivities(): Promise<NormalizedActivity[]> {
    if (!this.username) {
      console.warn("[GitHubProvider] GITHUB_USERNAME is not configured.");
      return [];
    }

    const url = `https://api.github.com/users/${this.username}/events/public`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Antigravity-Portfolio-Activity-Aggregator",
    };

    if (this.token) {
      headers["Authorization"] = `token ${this.token}`;
    }

    try {
      console.log(`[GitHubProvider] Fetching public events for username: ${this.username}`);
      const response = await fetch(url, { headers, next: { revalidate: 0 } } as any);

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
      }

      const events = await response.json();
      if (!Array.isArray(events)) {
        throw new Error("GitHub API response is not an array");
      }

      return this.aggregateGitHubEvents(events);
    } catch (error) {
      console.error("[GitHubProvider] Error fetching activities:", error);
      return [];
    }
  }

  /**
   * Aggregates public events into repository-level updates.
   * Grouping Rules: Repository + Time Window (e.g., 48 hours).
   * Filtering Rules: Min commits threshold (e.g., 3).
   */
  private aggregateGitHubEvents(events: any[]): NormalizedActivity[] {
    const groupedByRepo: Record<string, any[]> = {};

    // Group only PushEvents by repository
    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      const repoName = event.repo?.name || "unknown";
      if (!groupedByRepo[repoName]) {
        groupedByRepo[repoName] = [];
      }
      groupedByRepo[repoName].push(event);
    }

    const aggregatedActivities: NormalizedActivity[] = [];
    const windowMs = CONFIG.github.aggregationWindowHours * 60 * 60 * 1000;

    for (const repoName of Object.keys(groupedByRepo)) {
      const repoEvents = groupedByRepo[repoName];

      // Sort events from latest to oldest
      repoEvents.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      let currentGroup: any[] = [];
      let groupLatestTime = 0;

      for (const event of repoEvents) {
        const eventTime = new Date(event.created_at).getTime();

        if (currentGroup.length === 0) {
          currentGroup.push(event);
          groupLatestTime = eventTime;
        } else if (groupLatestTime - eventTime <= windowMs) {
          // Push event falls within the rolling window
          currentGroup.push(event);
        } else {
          // Process current group, then start a new one
          const activity = this.createGroupedActivity(repoName, currentGroup);
          if (activity) {
            aggregatedActivities.push(activity);
          }
          currentGroup = [event];
          groupLatestTime = eventTime;
        }
      }

      // Process the last group
      if (currentGroup.length > 0) {
        const activity = this.createGroupedActivity(repoName, currentGroup);
        if (activity) {
          aggregatedActivities.push(activity);
        }
      }
    }

    return aggregatedActivities;
  }

  /**
   * Summarizes a grouped list of push events into a single, clean activity.
   */
  private createGroupedActivity(repoName: string, events: any[]): NormalizedActivity | null {
    // Sum total commits in this aggregation group
    let totalCommits = 0;
    for (const event of events) {
      const size =
        event.payload?.size || event.payload?.distinct_size || event.payload?.commits?.length || 1;
      totalCommits += size;
    }

    // FILTER: Ignore repository updates with commits below the threshold (low-value updates)
    if (totalCommits < CONFIG.github.minCommitsThreshold) {
      console.log(
        `[GitHubProvider] Filtering out repository update for ${repoName} (${totalCommits} commits) - below threshold ${CONFIG.github.minCommitsThreshold}`,
      );
      return null;
    }

    const cleanRepoName = repoName.replace(`${this.username}/`, "");
    const latestEvent = events[0];
    const earliestEvent = events[events.length - 1];

    const timeDiffMs =
      new Date(latestEvent.created_at).getTime() - new Date(earliestEvent.created_at).getTime();
    const totalDays = Math.max(1, Math.ceil(timeDiffMs / (1000 * 60 * 60 * 24)));

    const repoUrl = `https://github.com/${repoName}`;
    const timestamp = latestEvent.created_at;

    // Create a meaningful description
    const description =
      totalDays > 1
        ? `${totalCommits} commits across ${totalDays} days`
        : `${totalCommits} commits`;

    return {
      id: `github-repo-${repoName}-${latestEvent.id}`,
      source: "github",
      title: `Updated ${cleanRepoName}`,
      description,
      url: repoUrl,
      timestamp,
      type: "commit",
      score: 0,
      repository: cleanRepoName,
      metadata: {
        repoName,
        commitCount: totalCommits,
        aggregationDays: totalDays,
        originalEventCount: events.length,
      },
    };
  }
}
