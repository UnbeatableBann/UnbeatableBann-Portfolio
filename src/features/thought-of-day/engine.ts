import { THOUGHTS } from "./data/thoughts";
import { Thought, ThoughtOfTheDayResult } from "./types";

export class ThoughtEngine {
  private static MS_PER_DAY = 24 * 60 * 60 * 1000;

  /**
   * Get the deterministic day number since the Unix Epoch.
   * Uses UTC time so all visitors see the same thought on the same day.
   */
  static getDayNumber(): number {
    return Math.floor(Date.now() / this.MS_PER_DAY);
  }

  /**
   * Returns milliseconds remaining until the next UTC day rotation (midnight UTC).
   */
  static getMsUntilNextRotation(): number {
    const now = Date.now();
    const nextRotation = (this.getDayNumber() + 1) * this.MS_PER_DAY;
    return nextRotation - now;
  }

  /**
   * Retrieves the deterministic thought of the day.
   */
  static getThought(): Thought {
    const dayNumber = this.getDayNumber();
    const totalThoughts = THOUGHTS.length;

    if (totalThoughts === 0) {
      throw new Error("[ThoughtEngine] Thought library is empty.");
    }

    const thoughtIndex = dayNumber % totalThoughts;
    return THOUGHTS[thoughtIndex];
  }

  /**
   * Formats a date string (e.g. YYYY-MM-DD).
   */
  static getFormattedDate(): string {
    const date = new Date();
    return date.toISOString().split("T")[0];
  }
}

export function getThoughtOfTheDay(): ThoughtOfTheDayResult {
  return {
    thought: ThoughtEngine.getThought(),
    date: ThoughtEngine.getFormattedDate(),
  };
}
