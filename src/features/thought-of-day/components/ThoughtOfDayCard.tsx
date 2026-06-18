import { useThoughtOfTheDay } from "../hooks/useThoughtOfTheDay";
import { Sparkles } from "lucide-react";

export function ThoughtOfDayCard() {
  const { thought, author } = useThoughtOfTheDay();

  return (
    <div className="rounded-3xl p-6 md:p-8 bg-soft-gradient border border-border shadow-soft relative overflow-hidden flex flex-col justify-between h-full">
      <div>
        <Sparkles className="w-6 h-6 text-brand-orange mb-6" />
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
          Thoughts
        </div>
        <p className="text-2xl font-display leading-snug text-foreground">"{thought.text}"</p>
        <p className="mt-6 text-xs text-muted-foreground font-medium">— {author}</p>
      </div>
      <div className="mt-6">
        <p className="text-[10px] text-muted-foreground opacity-65 font-normal">
          Tomorrow's perspective is currently loading.
        </p>
      </div>
    </div>
  );
}
