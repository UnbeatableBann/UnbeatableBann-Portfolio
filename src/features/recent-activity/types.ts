export interface NormalizedActivity {
  id: string;
  source: string;
  type: string;
  title: string;
  description?: string;
  url: string;
  timestamp: string; // ISO 8601 timestamp string
  score: number;
  metadata?: Record<string, unknown>;

  // Optional field to assist the ranking/priority boosts
  repository?: string;
}

export interface ActivityProvider {
  name: string;
  fetchActivities(): Promise<NormalizedActivity[]>;
}

export interface CacheData {
  lastFetched: string; // ISO 8601 timestamp string
  activities: NormalizedActivity[];
}
