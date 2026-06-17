import { useState, useEffect } from "react";
import { getThoughtOfTheDay, ThoughtEngine } from "../engine";
import { Thought } from "../types";

export function useThoughtOfTheDay() {
  const { thought } = getThoughtOfTheDay();
  const [timeUntilNextRotation, setTimeUntilNextRotation] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const msRemaining = ThoughtEngine.getMsUntilNextRotation();
      const totalMinutes = Math.floor(msRemaining / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setTimeUntilNextRotation(`${hours}h ${minutes}m`);
    };

    updateCountdown();

    // Update countdown every minute
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return {
    thought,
    category: thought.category,
    author: thought.author,
    timeUntilNextRotation,
  };
}
