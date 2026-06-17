import { NormalizedActivity } from "./types";
import { CONFIG } from "./config";

export class ActivityScoringEngine {
  /**
   * Calculates the final score for a normalized activity.
   * Final Score = Source Weight + Recency Bonus + Project Weight + Activity Importance
   */
  static score(activity: NormalizedActivity): number {
    const sourceWeight = this.calculateSourceWeight(activity);
    const recencyBonus = this.calculateRecencyBonus(activity);
    const projectWeight = this.calculateProjectWeight(activity);
    const activityImportance = this.calculateActivityImportance(activity);

    const finalScore = sourceWeight + recencyBonus + projectWeight + activityImportance;

    console.log(
      `[ScoringEngine] Item: "${activity.title}" (${activity.source}) | ` +
        `Base: ${sourceWeight}, Recency: ${recencyBonus}, Project: ${projectWeight}, Importance: ${activityImportance} | ` +
        `Total: ${finalScore}`,
    );

    return finalScore;
  }

  private static calculateSourceWeight(activity: NormalizedActivity): number {
    const { source, type } = activity;

    // Phase 1 support for Medium and GitHub
    if (source === "medium" || type === "article") {
      if (source === "medium") return CONFIG.weights.medium; // 100
      if (source === "devto") return CONFIG.weights.devto; // 80
      return CONFIG.weights.medium;
    }

    if (source === "github") {
      const commitCount = (activity.metadata?.commitCount as number) || 1;
      // Major GitHub Update is >= 10 commits, otherwise Minor GitHub Update
      if (commitCount >= 10) {
        return CONFIG.weights.githubMajor; // 75
      }
      return CONFIG.weights.githubMinor; // 50
    }

    // Future-proofing other types
    if (type === "release") return CONFIG.weights.projectRelease; // 95
    if (type === "milestone") return CONFIG.weights.projectMilestone; // 90
    if (type === "casestudy") return CONFIG.weights.caseStudy; // 85

    return 50; // Fallback default weight
  }

  private static calculateRecencyBonus(activity: NormalizedActivity): number {
    const activityTime = new Date(activity.timestamp).getTime();
    const now = new Date().getTime();
    const diffMs = now - activityTime;

    if (isNaN(diffMs) || diffMs < 0) {
      return 0; // Invalid date or future date
    }

    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 1) {
      return CONFIG.recency.today; // +25
    } else if (diffDays < 2) {
      return CONFIG.recency.oneDay; // +20
    } else if (diffDays < 4) {
      return CONFIG.recency.threeDays; // +15
    } else if (diffDays < 8) {
      return CONFIG.recency.sevenDays; // +10
    } else if (diffDays < 15) {
      return CONFIG.recency.fourteenDays; // +5
    }

    return 0;
  }

  private static calculateProjectWeight(activity: NormalizedActivity): number {
    if (!activity.repository) return 0;

    // Check for repository priority boosts in config
    const boost = CONFIG.github.priorityBoosts[activity.repository];
    return boost || 0;
  }

  private static calculateActivityImportance(activity: NormalizedActivity): number {
    if (activity.source !== "github") {
      return 0;
    }

    const commitCount = (activity.metadata?.commitCount as number) || 0;

    if (commitCount >= 15) {
      return CONFIG.importance.majorCommitTier; // +15
    } else if (commitCount >= 10) {
      return CONFIG.importance.mediumCommitTier; // +10
    } else if (commitCount >= 5) {
      return CONFIG.importance.minorCommitTier; // +5
    }

    return 0;
  }
}

export class ActivityRankingEngine {
  /**
   * Sorts the activities by their scores and applies diversity rules to prevent
   * a single source from dominating the feed.
   */
  static rank(activities: NormalizedActivity[]): NormalizedActivity[] {
    // 1. Score all activities and sort by score descending
    const scoredActivities = activities.map((act) => ({
      ...act,
      score: ActivityScoringEngine.score(act),
    }));

    // Sort descending by score. If scores are equal, sort by recency (newest first)
    scoredActivities.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // 2. Apply diversity rules: Maximum 2 consecutive items from the same source
    const ranked: NormalizedActivity[] = [];
    const pool = [...scoredActivities];

    const maxConsecutive = CONFIG.diversity.maxConsecutiveFromSameSource || 2;

    while (pool.length > 0) {
      // Find the first item in the pool that doesn't violate consecutive constraints
      let candidateIndex = -1;

      for (let i = 0; i < pool.length; i++) {
        const item = pool[i];
        if (this.canAddWithoutViolatingDiversity(item.source, ranked, maxConsecutive)) {
          candidateIndex = i;
          break;
        }
      }

      // If we found a valid candidate, add it and remove from pool
      if (candidateIndex !== -1) {
        ranked.push(pool[candidateIndex]);
        pool.splice(candidateIndex, 1);
      } else {
        // Edge case: No items in the pool can be added without violating the rule.
        // We are forced to take the highest score remaining item (which is at index 0)
        ranked.push(pool[0]);
        pool.splice(0, 1);
      }
    }

    return ranked;
  }

  /**
   * Helper to check if adding an item from the given source would violate
   * the maximum consecutive constraint.
   */
  private static canAddWithoutViolatingDiversity(
    source: string,
    rankedList: NormalizedActivity[],
    maxConsecutive: number,
  ): boolean {
    if (rankedList.length < maxConsecutive) {
      return true;
    }

    // Check if the last `maxConsecutive` items in the ranked list are all from the same source
    const startIdx = rankedList.length - maxConsecutive;
    let consecutiveCount = 0;

    for (let i = rankedList.length - 1; i >= startIdx; i--) {
      if (rankedList[i].source === source) {
        consecutiveCount++;
      } else {
        break;
      }
    }

    return consecutiveCount < maxConsecutive;
  }
}
